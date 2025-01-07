import { listBlogs } from "../utils/listBlogs";
import { NavLink } from "~/app/components/NavLink";
import { PrettyLink } from "~/app/components/PrettyLink";

export default async function BlogList() {
  const blogs = await listBlogs();

  return (
    <div className="mx-auto flex h-full flex-col gap-8 p-4 lg:max-w-5xl">
      <h1 className="text-4xl font-bold my-5">Blogs</h1>
      <ul className="flex flex-col gap-2">
        {blogs.map((blog) => (
          <li
            key={blog.slug}
            className="flex flex-row items-center justify-between gap-2"
          >
            <PrettyLink
              href={`/blog/${blog.slug}`}
              className="underline"
              target="_self"
            >
              {blog.slug}
            </PrettyLink>
            <p className="text-sm text-gray-500">
              {blog.createdAt.toLocaleDateString()}
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
