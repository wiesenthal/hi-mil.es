import { redirect } from "next/navigation";
import { readProject } from "../utils/readProject";
import ReactMarkdown from "react-markdown";
import { NavLink } from "~/app/components/NavLink";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { PrettyLink } from "~/app/components/PrettyLink";
import LikeButton from "~/app/components/LikeButton";

export const dynamic = "force-static";

export default async function Project({
  params: { slug },
}: {
  params: { slug: string };
}) {
  try {
    const project = await readProject(slug);
    
    if (!project) {
      return redirect("/project");
    }

    const { content, name, description, html_url, language, topics, stargazers_count, forks_count, created_at, updated_at } = project;

    return (
      <div className="flex size-full flex-col overflow-y-auto p-4">
        <div className="mx-auto flex w-full flex-grow flex-col relative">
          <LikeButton 
            contentType="project" 
            contentSlug={slug}
            className="absolute top-0 left-0 z-10"
          />
          
          {/* Project Header */}
          <div className="mb-6 animate-fade-in">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{name}</h1>
                {description && (
                  <p className="text-lg text-gray-600 mb-3">{description}</p>
                )}
              </div>
              <PrettyLink href={html_url} target="_blank" className="shrink-0">
                View on GitHub
              </PrettyLink>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center text-sm text-gray-600">
              {language && (
                <span className="bg-gray-100 px-3 py-1 rounded-full">
                  {language}
                </span>
              )}
              {stargazers_count > 0 && (
                <span>⭐ {stargazers_count} stars</span>
              )}
              {forks_count > 0 && (
                <span>🍴 {forks_count} forks</span>
              )}
            </div>
            
            {topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* README Content */}
          <div className="markdown prose prose-invert lg:prose-xl animate-fade-in max-w-none">
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
          <div className="flex flex-row items-center justify-between gap-2 max-md:justify-center animate-fade-in">
            <p className="flex-1 flex-grow text-sm font-light max-md:hidden">
              Created:{" "}
              {new Date(created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <NavLink href="/project" target="_self">
              Projects
            </NavLink>
            <p className="flex-1 flex-grow text-right text-sm font-light max-md:hidden">
              Updated:{" "}
              {new Date(updated_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading project:", error);
    return redirect("/project");
  }
}