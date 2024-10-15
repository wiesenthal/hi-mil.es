"use server";

import { cookies, headers } from "next/headers";
import { setCookie, getCookie } from "cookies-next";
import { db } from "~/db";
import { users, visits } from "~/db/schema";
import { User } from "~/db/types";
import { eq } from "drizzle-orm";

const userIdCookie = "hi-miles-userId";

export async function visit() {
  const options = {
    cookies,
    sameSite: "true",
    maxAge: 60 * 60 * 24 * 365,
  };
  const userId = getCookie(userIdCookie, options);

  const forwardedFor = headers().get("x-forwarded-for");
  const ip = forwardedFor
    ? forwardedFor.split(",")[0]?.trim()
    : headers().get("x-real-ip")?.trim();

  const url = headers().get("referer");
  console.log(`url: ${url}`);

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

  setCookie(userIdCookie, user.id, options);
  return {
    visitId: visit.id,
    userId: user.id,
    name: user.name,
  };
}
