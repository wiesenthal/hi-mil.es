import { PrettyLink } from "../components/PrettyLink";
import { NavLink } from "../components/NavLink";

export default function NowPage() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-4xl">Now</h1>
      <div className="text-sm text-gray-500">Updated 2025-10-16</div>

      <div className="size-full max-w-4xl">
        This is my now page which I created to appease{" "}
        <PrettyLink href="https://sive.rs/now">Derek Sivers</PrettyLink>.<br />
        I&apos;m currently building{" "}
        <PrettyLink href="https://stickercamera.com">
          Sticker Camera!
        </PrettyLink>
        {` `}Click to learn more {`;)`}
        <br />
        <br /> Also I am working on other stuff, e.g. this very website. It is a
        tree to express myself with blog-ornaments and curious typescript code
        which you can see on its{" "}
        <PrettyLink href="https://github.com/wiesenthal/hi-mil.es/blob/main/src/app/now/page.tsx">
          github
        </PrettyLink>
        .{" "}
      </div>
      <NavLink href="/">Home</NavLink>
    </div>
  );
}
