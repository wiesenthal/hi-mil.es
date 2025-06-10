import Link from "next/link";
import type { HTMLAttributeAnchorTarget } from "react";

export const PrettyLink = ({
  href = "",
  className,
  children,
  target = "_blank",
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
  target?: HTMLAttributeAnchorTarget;
}) => {
  return (
    <Link
      href={href}
      className={`text-[#0000ee] transition-all duration-150 hover:underline ${className}`}
      target={target}
    >
      {children}
    </Link>
  );
};
