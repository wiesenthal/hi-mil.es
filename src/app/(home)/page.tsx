import VisitCount from "~/app/components/VisitCount";
import { PrettyLink } from "~/app/components/PrettyLink";
import { NavLink } from "~/app/components/NavLink";
import UserInput from "./components/UserInput";

export default function HomePage() {
  return (
    <main className="fixed flex size-full flex-col items-center justify-between">
      <div className="container flex-col items-center justify-center space-y-8 p-4 md:p-16">
        <div className="flex flex-row justify-end">
          <div className="flex flex-col items-center">
            <h1 className="bg-gradient-to-tl from-[#0000ee] to-[#00eaff] bg-clip-text text-5xl font-thin tracking-tight text-transparent sm:text-4xl font-serif">
              hi-mil.es
            </h1>
            {/* <h1 className="text-5xl font-normal tracking-tight sm:text-[5rem]">
              hi, miles
            </h1> */}
          </div>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-xl animate-fade-in">
            Hello visitor and welcome to my website. 
          </p>
        </div>
        <div className="flex flex-col items-end">
          <UserInput />
        </div>
      </div>
      <div className="flex flex-grow flex-col pt-32 gap-2 animate-fade-in-2">
        <NavLink href="/blog" target="_self">
          Blogs
        </NavLink>
        <NavLink href="/quote" target="_self">
          Quotes
        </NavLink>
      </div>
      <div className="grid grid-cols-2 items-center justify-center gap-x-8 gap-y-2 justify-self-end pb-4 lg:grid-cols-4 animate-fade-in">
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
