import { Symbol } from "~/app/components/Symbol";
import { listBlogs } from "../utils/listBlogs";
import { NavLink } from "~/app/components/NavLink";
import { dashNameToSentence } from "~/utils/lambdas/dashNameToSentence";

export default async function BlogList() {
  const blogs = await listBlogs();

  return (
    <div className="mx-auto flex h-full flex-col gap-8 p-4">
      <div className="flex animate-fade-in flex-col items-center justify-center">
        <h1 className="text-4xl font-light">Blogs</h1>
        <div className="text-xs font-light text-center tracking-tighter">
          Pure Miles Generated Content
        </div>
      </div>
      <ul className="flex animate-fade-in-2 flex-col gap-2">
        {blogs.map(({ slug, createdAt, symbol }) => (
          <li
            key={slug}
            className="group relative flex flex-row items-center justify-center gap-2"
          >
            <NavLink
              href={`/blog/${slug}`}
              className="relative md:min-w-96"
              target="_self"
            >
              {dashNameToSentence(slug)}
              <Symbol>{symbol}</Symbol>
              <p className="invisible absolute left-0 top-[50%] -translate-x-[100%] -translate-y-[50%] pr-2 text-sm font-light text-black group-hover:visible">
                {createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </p>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex-grow" />
      <div className="flex w-full animate-fade-in flex-row items-center justify-center">
        <NavLink href="/" target="_self">
          Home
        </NavLink>
      </div>
    </div>
  );
}
