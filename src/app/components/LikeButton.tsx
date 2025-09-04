"use client";

import { useState, useEffect } from "react";
import { toggleLike, getLikeStats } from "~/actions/like";
import { useVisitContext } from "~/visitContext";

type LikeButtonProps = {
  contentType: "blog" | "quote";
  contentSlug: string;
  className?: string;
};

export function LikeButton({
  contentType,
  contentSlug,
  className = "",
}: LikeButtonProps) {
  const { userId } = useVisitContext();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load initial like stats
  useEffect(() => {
    const loadLikeStats = async () => {
      try {
        const stats = await getLikeStats(contentType, contentSlug, userId);
        setIsLiked(stats.isLiked);
        setLikeCount(stats.count);
        setHasLoaded(true);
      } catch (error) {
        console.error("Error loading like stats:", error);
        setHasLoaded(true);
      }
    };

    void loadLikeStats();
  }, [contentType, contentSlug, userId]);

  const handleToggleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId || isLoading) return;

    setIsLoading(true);
    try {
      const result = await toggleLike({
        userId,
        contentType,
        contentSlug,
      });

      if (result.action === "added") {
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      } else {
        setIsLiked(false);
        setLikeCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // if (!hasLoaded) {
  //   return (
  //     <div
  //       className={`flex text-base items-center gap-1  text-gray-500 ${className}`}
  //     >
  //       <span className="animate-pulse">♡</span>
  //       <span className="animate-pulse font-mono">-</span>
  //     </div>
  //   );
  // }

  return (
    <button
      onClick={handleToggleLike}
      disabled={!userId || isLoading}
      className={`transform-origin-center flex w-9 items-center gap-1 text-sm transition-all duration-150 ${
        userId ? "cursor-pointer" : "cursor-not-allowed opacity-60"
      } ${isLoading ? "animate-heart-beat" : ""} ${className}`}
      title={
        !userId
          ? "Sign in to like content"
          : isLiked
            ? "Unlike this content"
            : "Like this content"
      }
    >
      <span
        className={`text-base transition-all duration-150 ${
          isLiked
            ? "text-red-500 drop-shadow-sm"
            : "text-gray-400 hover:text-red-400"
        }`}
      >
        {isLiked ? "♥" : "♡"}
      </span>
      <span
        className={`${
          isLiked ? "font-medium text-red-500" : "text-gray-500"
        } transition-colors duration-150`}
      >
        {hasLoaded ? likeCount : "-"}
      </span>
    </button>
  );
}

export default LikeButton;
