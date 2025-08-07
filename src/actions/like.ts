"use server";

import { db } from "~/db";
import { likes } from "~/db/schema";
import { eq, and, count } from "drizzle-orm";
import { getFirst } from "~/utils/lambdas/getFirst";

export type LikeInput = {
  userId: number;
  contentType: "blog" | "quote";
  contentSlug: string;
};

export type LikeStats = {
  count: number;
  isLiked: boolean;
};

/**
 * Toggle like for a piece of content (add if not liked, remove if liked)
 */
export const toggleLike = async (input: LikeInput) => {
  const { userId, contentType, contentSlug } = input;

  // Check if already liked
  const existingLike = await db.query.likes.findFirst({
    where: and(
      eq(likes.userId, userId),
      eq(likes.contentType, contentType),
      eq(likes.contentSlug, contentSlug),
    ),
  });

  if (existingLike) {
    // Remove like
    await db
      .delete(likes)
      .where(
        and(
          eq(likes.userId, userId),
          eq(likes.contentType, contentType),
          eq(likes.contentSlug, contentSlug),
        ),
      );
    return { action: "removed" as const };
  } else {
    // Add like
    const newLike = await db
      .insert(likes)
      .values(input)
      .returning()
      .then(getFirst);
    return { action: "added" as const, like: newLike };
  }
};

/**
 * Get like statistics for a piece of content
 */
export const getLikeStats = async (
  contentType: "blog" | "quote",
  contentSlug: string,
  userId?: number,
): Promise<LikeStats> => {
  // Get total count
  const [countResult] = await db
    .select({ count: count() })
    .from(likes)
    .where(
      and(eq(likes.contentType, contentType), eq(likes.contentSlug, contentSlug)),
    );

  const likeCount = countResult?.count || 0;

  // Check if user has liked (if userId provided)
  let isLiked = false;
  if (userId) {
    const userLike = await db.query.likes.findFirst({
      where: and(
        eq(likes.userId, userId),
        eq(likes.contentType, contentType),
        eq(likes.contentSlug, contentSlug),
      ),
    });
    isLiked = !!userLike;
  }

  return {
    count: likeCount,
    isLiked,
  };
};

/**
 * Check if user has liked a piece of content
 */
export const hasUserLiked = async (input: LikeInput): Promise<boolean> => {
  const { userId, contentType, contentSlug } = input;

  const like = await db.query.likes.findFirst({
    where: and(
      eq(likes.userId, userId),
      eq(likes.contentType, contentType),
      eq(likes.contentSlug, contentSlug),
    ),
  });

  return !!like;
};

/**
 * Get all likes for a piece of content
 */
export const getContentLikes = async (
  contentType: "blog" | "quote",
  contentSlug: string,
) => {
  return db.query.likes.findMany({
    where: and(eq(likes.contentType, contentType), eq(likes.contentSlug, contentSlug)),
    with: {
      user: true,
    },
    orderBy: (likes, { desc }) => [desc(likes.createdAt)],
  });
};