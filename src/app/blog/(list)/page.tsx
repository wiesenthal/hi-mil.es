import { Symbol } from "~/app/components/Symbol";
import { listBlogs } from "../utils/listBlogs";
import { NavLink } from "~/app/components/NavLink";

export default async function BlogList() {
  const blogs = await listBlogs();

  return (
    <div className="mx-auto flex h-full flex-col gap-8 p-4 lg:max-w-5xl">
      <h1 className="my-5 text-4xl font-bold">Blogs</h1>
      <ul className="flex flex-col gap-2">
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
            <p className="text-sm text-gray-500">
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
      <div className="flex w-full flex-row items-center justify-center">
        <NavLink href="/" target="_self">
          Home
        </NavLink>
      </div>
    </div>
  );
}
