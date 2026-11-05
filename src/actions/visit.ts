"use server";

import { cookies, headers } from "next/headers";
import { db } from "~/db";
import { users, visits } from "~/db/schema";
import type { User } from "~/db/types";
import { eq } from "drizzle-orm";

const userIdCookie = "hi-miles-userId";

export async function visit() {
  const cookiesList = await cookies();
  const userId = cookiesList.get(userIdCookie)?.value;

  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const ip = forwardedFor
    ? forwardedFor.split(",")[0]?.trim()
    : headersList.get("x-real-ip")?.trim();

  const url = headersList.get("referer");

  let user: User | undefined;
  if (userId)
    user = await db.query.users.findFirst({
      where: eq(users.id, Number(userId)),
    });
  if (!user) [user] = await db.insert(users).values({}).returning();

  if (!user) throw new Error("Failed to create or find user");

  const [visit] = await db
    .insert(visits)
    .values({
      userId: user.id,
      ip,
      url,
    })
    .returning();

  if (!visit) throw new Error("Failed to create visit");

  cookiesList.set(userIdCookie, String(user.id), {
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return {
    visitId: visit.id,
    userId: user.id,
    name: user.name,
  };
}
