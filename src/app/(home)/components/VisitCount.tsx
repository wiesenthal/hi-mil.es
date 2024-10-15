"use client";

import { useVisitContext } from "~/visitContext";

export default function VisitCount() {
  const { visitId, userId } = useVisitContext();

  if (!userId) return null;

  return (
    <div className="flex flex-col items-end gap-1 rounded-tl border-l border-t border-[#d1c4ff]/50 bg-[#d1c4ff]/5 p-2 text-sm text-[#d1c4ff]/80">
      <span className="flex flex-row gap-1">
        <span className="hidden md:block">You are the</span>
        <span className="text-[#d1c4ff]">{formatOrdinal(userId)}</span>
        <span className="hidden md:block">visitor</span>
      </span>
      {visitId > 1 && (
        <span className="flex flex-row gap-1">
          <span className="hidden md:block">Welcome back for the</span>
          <span className="font-thin text-[#d1c4ff] md:font-normal">
            {formatOrdinal(visitId)}
          </span>
          <span className="hidden md:block">time</span>
        </span>
      )}
    </div>
  );
}

function formatOrdinal(num: number) {
  const suffix = ["th", "st", "nd", "rd"] as const;
  const v = num % 100;
  return num + (suffix[(v - 20) % 10] || suffix[v] || suffix[0]);
}
