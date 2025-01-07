import Link from "next/link";

export const PrettyLink = ({
  href,
  className,
  children,
  target = "_blank",
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  target?: "_blank" | "_self" | "_parent" | "_top";
}) => {
  return (
    <Link
      href={href}
      className={`text-xl text-blue-500 hover:scale-105 hover:text-blue-600 hover:underline transition-all duration-150 ${className}`}
      target={target}
    >
      {children}
    </Link>
  );
};
