import { Symbol } from "~/app/components/Symbol";
import { listBlogs } from "../utils/listBlogs";
import { NavLink } from "~/app/components/NavLink";

export default async function BlogList() {
  const blogs = await listBlogs();

  return (
    <div className="mx-auto flex h-full flex-col gap-8 p-4 lg:max-w-5xl">
      <div className="animate-fade-in flex flex-row items-center justify-between">
        <h1 className="text-4xl font-light">Blogs</h1>
        <div className="text-sm font-light italic">
          One Hundred Percent Miles Generated Content
        </div>
      </div>
      <ul className="animate-fade-in-2 flex flex-col gap-2">
        {blogs.map(({ slug, createdAt, symbol }) => (
          <li
            key={slug}
            className="flex flex-row items-center justify-between gap-2"
          >
            <NavLink
              href={`/blog/${slug}`}
              className="relative md:min-w-96"
              target="_self"
            >
              {slug}
              <Symbol>{symbol}</Symbol>
            </NavLink>
            <p className="text-sm font-light">
              {createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </p>
          </li>
        ))}
      </ul>
      <div className="flex-grow" />
      <div className="flex w-full flex-row items-center justify-center animate-fade-in">
        <NavLink href="/" target="_self">
          Home
        </NavLink>
      </div>
    </div>
  );
}
