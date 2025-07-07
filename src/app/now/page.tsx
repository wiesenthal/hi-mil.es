import { PrettyLink } from "../components/PrettyLink";
import { NavLink } from "../components/NavLink";

export default function NowPage() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-4xl">Now</h1>
      <div className="size-full max-w-4xl">
        This is my now page. I created it to appease{" "}
        <PrettyLink href="https://sive.rs/now">Derek Sivers</PrettyLink>. Right
        now I am exploring, helping friends, creating passion projects, and
        writing. This very website is like a little tree with which I express
        myself by ornamenting it with blogs and by structuring its code which
        you can see on its{" "}
        <PrettyLink href="https://github.com/wiesenthal/hi-mil.es">
          github
        </PrettyLink>
        .{" "}
      </div>
      <NavLink href="/">Home</NavLink>
    </div>
  );
}
