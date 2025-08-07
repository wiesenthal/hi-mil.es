import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

export default function SlugLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      lang="en"
      className={`${GeistSans.variable} slug-layout h-full animate-bg-pull-in bg-gradient-to-br from-[#00eaff40] via-white to-zinc-100 bg-[length:200%_100%] text-black`}
      style={{
        backgroundAttachment: "fixed",
      }}
    >
      {children}
    </div>
  );
}
