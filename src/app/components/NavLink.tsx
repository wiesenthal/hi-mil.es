import Link from "next/link";

export const NavLink = ({
  href,
  className,
  children,
  target = "_self",
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  target?: "_blank" | "_self" | "_parent" | "_top";
}) => {
  return (
    <Link
      href={href}
      // prettier-ignore
      className={`min-w-52 max-w-52 text-ellipsis py-2 text-center transition-all duration-150 text-white hover:brightness-105
        ring-2 ring-[#0000ee] active:ring-[#0000ee80] active:ring-2
        rounded-md hover:rounded
        bg-gradient-to-b from-[#0000eea0] via-[#0000ee] to-[#0000eea0] 
        shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.4)] hover:shadow-[inset_4px_4px_4px_rgba(128,128,255,0.4),inset_-4px_-4px_4px_rgba(0,0,128,0.4)] active:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4),inset_-2px_-2px_4px_rgba(255,255,255,0.4)]
        ${className}`}
      target={target}
    >
      {children}
    </Link>
  );
};
