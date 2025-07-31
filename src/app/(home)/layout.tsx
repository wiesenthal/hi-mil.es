import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      lang="en"
      className={`${GeistSans.variable} home-layout h-full bg-gradient-to-br from-[#d1c4ff] via-zinc-100 to-[#00eaff80] bg-[length:200%_100%] text-black animate-bg-pull-in`}
      style={{
        backgroundAttachment: "fixed",
      }}
    >
      {children}
    </div>
  );
}
