import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { VisitProvider } from "~/visitContext";

export const metadata: Metadata = {
  title: "hi miles",
  description: "hello miles wiesenthal",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} h-full`}>
      <body className="h-full">
        <VisitProvider>{children}</VisitProvider>
      </body>
    </html>
  );
}
