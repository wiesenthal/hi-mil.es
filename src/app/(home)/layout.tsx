import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      lang="en"
      className={`${GeistSans.variable} h-full bg-gradient-to-br from-[#d1c4ff] via-zinc-100 to-[#a0ffde] bg-[length:100%_200%] text-black`}
      style={{
        backgroundAttachment: "fixed",
      }}
    >
      {children}
    </div>
  );
}
