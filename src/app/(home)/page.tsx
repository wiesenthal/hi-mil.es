import VisitCount from "~/app/components/VisitCount";
import { PrettyLink } from "~/app/components/PrettyLink";
import { NavLink } from "~/app/components/NavLink";
import UserInput from "./components/UserInput";

export default function HomePage() {
  return (
    <main className="fixed flex size-full flex-col items-center justify-between">
      <div className="container flex-col items-center justify-center space-y-8 p-4">
        <div className="flex flex-row justify-end">
          <div className="flex flex-col items-center">
            <h1 className="bg-gradient-to-tl from-[#0000ee] to-[#00eaff] bg-clip-text font-serif text-5xl font-thin tracking-tight text-transparent sm:text-4xl">
              hi-mil.es
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <p className="animate-fade-in text-xl">
            Hello visitor and welcome to my website.
          </p>
        </div>
        <div className="flex flex-col items-end">
          <UserInput />
        </div>
      </div>
      <div className="flex flex-grow animate-fade-in-2 flex-col gap-2 pt-32">
        <NavLink href="/blog" target="_self">
          Blogs
        </NavLink>
        <NavLink href="/quote" target="_self">
          Quotes
        </NavLink>
      </div>
      <div className="grid animate-fade-in grid-cols-2 items-center justify-center gap-x-8 gap-y-2 justify-self-end pb-4 lg:grid-cols-4">
        <PrettyLink href="https://substack.com/@milessmiles">
          substack
        </PrettyLink>
        <PrettyLink href="https://github.com/wiesenthal/hi-mil.es">
          github
        </PrettyLink>
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
