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
      className={`rounded bg-[#00eaff] min-w-52 text-center py-2 text-black border-black border hover:brightness-125 ${className}`}
      target={target}
    >
      {children}
    </Link>
  );
};
