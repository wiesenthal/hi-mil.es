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
      className={`min-w-52 max-w-52 text-ellipsis rounded bg-[#0000ee] py-2 text-center text-white duration-150 hover:rounded-md hover:shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),inset_-2px_-2px_4px_rgba(0,0,0,0.3)] hover:brightness-110 ${className}`}
      target={target}
    >
      {children}
    </Link>
  );
};
