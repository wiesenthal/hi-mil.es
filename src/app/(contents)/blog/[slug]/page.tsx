import { redirect } from "next/navigation";
import { readBlog } from "../utils/readBlog";
import ReactMarkdown from "react-markdown";
import { NavLink } from "~/app/components/NavLink";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { PrettyLink } from "~/app/components/PrettyLink";
import LikeButton from "~/app/components/LikeButton";
import type { Metadata } from "next";
import { dashNameToSentence } from "~/utils/lambdas/dashNameToSentence";

export const dynamic = "force-static";

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  return {
    title: dashNameToSentence(slug),
    description: "hi-mil.es",
  };
}

export default async function Blog({
  params: { slug },
}: {
  params: { slug: string };
}) {
  try {
    const { content, createdAt, updatedAt } = (await readBlog(slug))!;

    return (
      <div className="flex size-full flex-col overflow-y-auto p-4">
        <div className="relative mx-auto flex w-full flex-grow flex-col">
          <LikeButton
            contentType="blog"
            contentSlug={slug}
            className="absolute left-0 top-0 z-10"
          />
          <div className="markdown prose prose-invert lg:prose-xl max-w-none animate-fade-in">
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
                      {/* eslint-disable-next-line @typescript-eslint/no-base-to-string */}
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
                h2: ({ children }) => (
                  <h2 style={{ borderBottom: `1px solid black` }}>
                    {children}
                  </h2>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
          <div className="flex-grow" />
          <div className="flex animate-fade-in flex-row items-center justify-between gap-2 max-md:justify-center">
            <p className="flex-1 flex-grow text-sm font-light max-md:hidden">
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
            <p className="flex-1 flex-grow text-right text-sm font-light max-md:hidden">
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
