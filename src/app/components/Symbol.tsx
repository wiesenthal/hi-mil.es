export const Symbol = ({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) =>
  children ? (
    <div
      className={`absolute -right-6 top-[50%] -translate-y-1/2 ${className}`}
    >
      {children}
    </div>
  ) : null;
