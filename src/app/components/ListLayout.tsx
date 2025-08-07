import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      lang="en"
      className={`${GeistSans.variable} list-layout h-full animate-bg-pull-in bg-gradient-to-br from-zinc-100 via-[#00eaff40] to-white bg-[length:200%_100%] text-black`}
      style={{
        backgroundAttachment: "fixed",
      }}
    >
      {children}
    </div>
  );
}
