import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      lang="en"
      className={`${GeistSans.variable} h-full bg-gradient-to-br from-[#00eaff40] via-white to-zinc-100 bg-[length:100%_200%] text-black animate-bg-pull-in`}
      style={{
        backgroundAttachment: "fixed",
      }}
    >
      {children}
    </div>
  );
}
