import { redirect } from "next/navigation";
import { readBlog } from "../utils/readBlog";
import ReactMarkdown from "react-markdown";
import { NavLink } from "~/app/components/NavLink";

export const dynamic = "force-static";

export default async function Blog({ params }: { params: { slug: string } }) {
  try {
    const { content, createdAt, updatedAt } = await readBlog(params.slug);

    return (
      <div className="size-full overflow-y-auto p-4">
        <div className="mx-auto flex max-w-4xl flex-col">
          <div className="markdown">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
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
      </div>
    );
  } catch (error) {
    return redirect("/blog");
  }
}
