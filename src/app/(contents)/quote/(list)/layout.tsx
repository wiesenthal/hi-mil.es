import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      lang="en"
      className={`${GeistSans.variable} h-full bg-gradient-to-br from-zinc-100 via-[#a0ffde80] to-white bg-[length:100%_200%] text-black`}
      style={{
        backgroundAttachment: "fixed",
      }}
    >
      {children}
    </div>
  );
}
