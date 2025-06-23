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
      className={`min-w-52 max-w-52 rounded border border-black bg-[#00eaff] py-2 text-ellipsis text-center text-black hover:brightness-125 ${className}`}
      target={target}
    >
      {children}
    </Link>
  );
};
