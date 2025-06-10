import { redirect } from "next/navigation";
import { readBlog } from "../utils/readBlog";
import ReactMarkdown from "react-markdown";
import { NavLink } from "~/app/components/NavLink";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { PrettyLink } from "~/app/components/PrettyLink";

export const dynamic = "force-static";

export default async function Blog({
  params: { slug },
}: {
  params: { slug: string };
}) {
  try {
    const { content, createdAt, updatedAt } = await readBlog(slug);

    return (
      <div className="flex size-full flex-col overflow-y-auto p-4">
        <div className="mx-auto flex w-full max-w-5xl flex-grow flex-col">
          <div className="markdown prose prose-invert lg:prose-xl max-w-none">
            <ReactMarkdown
              components={{
                code({ children, className, ...rest }) {
                  const match = /language-(\w+)/.exec(className ?? "");
                  return match ? (
                    <SyntaxHighlighter
                      PreTag="div"
                      language={match[1]}
                      style={oneLight}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
                a: ({ children, href, target }) => (
                  <PrettyLink href={href} target={target}>
                    {children}
                  </PrettyLink>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
          <div className="flex-grow" />
          <div className="flex flex-row items-center justify-between gap-2 max-md:justify-center">
            <p className="flex-1 flex-grow text-sm text-gray-500 max-md:hidden">
              Created at:{" "}
              {createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </p>
            <NavLink href="/blog" target="_self">
              Blogs
            </NavLink>
            <p className="flex-1 flex-grow text-right text-sm text-gray-500 max-md:hidden">
              Updated at:{" "}
              {updatedAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    return redirect("/blog");
  }
}
