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
      className={`min-w-52 max-w-52 text-ellipsis rounded bg-[#0000ee] py-2 text-center text-white duration-150 hover:rounded-md hover:ring-4 hover:ring-white hover:brightness-125 ${className}`}
      target={target}
    >
      {children}
    </Link>
  );
};
