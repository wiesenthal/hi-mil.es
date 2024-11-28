import Link from "next/link";
import VisitCount from "./components/VisitCount";

export default function HomePage() {
  return (
    <main className="fixed flex size-full flex-col items-center justify-between">
      <div className="container h-2/3 flex-col items-center justify-center space-y-8 p-4 md:p-16">
        <div className="flex flex-row justify-end">
          <div className="flex flex-col items-center">
            <h1 className="bg-gradient-to-tl from-[#5751ff7b] to-[#00eaff7b] bg-clip-text text-5xl font-thin tracking-tight text-transparent sm:text-[5rem]">
              hi-mil.es
            </h1>
            <h1 className="text-5xl font-normal tracking-tight sm:text-[5rem]">
              hi, miles
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-xl">
            Hello, visitor. You&apos;ve found my website. For now, this is all
            there is.
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-8 justify-self-end pb-2">
        <PrettyLink href="https://substack.com/@milessmiles">
          substack
        </PrettyLink>
        <PrettyLink href="https://github.com/wiesenthal/hi-mil.es">github</PrettyLink>
        <PrettyLink href="https://www.linkedin.com/in/miles-wiesenthal/">
          linkedin
        </PrettyLink>
        <PrettyLink href="https://x.com/gardening_gnome">twitter</PrettyLink>
      </div>
      <div className="absolute bottom-0 right-0">
        <VisitCount />
      </div>
    </main>
  );
}

const PrettyLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="text-xl text-blue-500 hover:scale-105 hover:text-blue-600 hover:underline"
      target="_blank"
    >
      {children}
    </Link>
  );
};
