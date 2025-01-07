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
      className={`rounded bg-[#5751ff] px-24 py-2 text-white hover:brightness-125 ${className}`}
      target={target}
    >
      {children}
    </Link>
  );
};
