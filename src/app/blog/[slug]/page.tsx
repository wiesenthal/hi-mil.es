import { redirect } from "next/navigation";
import { readBlog } from "../utils/readBlog";
import ReactMarkdown from "react-markdown";
import { NavLink } from "~/app/components/NavLink";

export const dynamic = "force-static";

export default async function Blog({ params }: { params: { slug: string } }) {
  try {
    const { content, createdAt, updatedAt } = await readBlog(params.slug);

    return (
      <div className="mx-auto flex h-full flex-col p-4 lg:max-w-5xl">
        <ReactMarkdown className="markdown">{content}</ReactMarkdown>
        <div className="flex-grow" />
        <div className="flex flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-500">
            Created at: {createdAt.toLocaleDateString()}
          </p>
          <NavLink href="/blog" target="_self">
            Back
          </NavLink>
          <p className="text-sm text-gray-500">
            Updated at: {updatedAt.toLocaleDateString()}
          </p>
        </div>
      </div>
    );
  } catch (error) {
    return redirect("/blog");
  }
}
