import { listQuotes } from "../utils/listQuotes";
import { NavLink } from "~/app/components/NavLink";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default async function BlogList() {
  const quotes = await listQuotes();

  return (
    <div className="mx-auto flex h-full flex-col gap-8 p-4">
      <div className="flex animate-fade-in flex-col items-center justify-center">
        <h1 className="text-4xl font-light">Quotes ~ Thoughts ~ Poems</h1>
        <div className="text-center text-xs font-light tracking-tighter">
          Ideas I Live With
        </div>
      </div>
      <ul className="flex max-h-full w-full animate-fade-in-2 flex-col gap-8 overflow-y-auto">
        {quotes.map(({ slug, author, content, type }, i) => (
          <Link
            href={`/quote/${slug}`}
            key={slug}
            className={`max-w-5xl flex cursor-auto flex-col justify-between gap-1 rounded-t border-b border-[#15ffad] from-white/10 via-white/30 via-20% to-white/50 p-1 ${
              i % 2 === 0
                ? "ml-auto items-end rounded-bl bg-gradient-to-tr pl-4 pr-2 text-right"
                : "mr-auto items-start rounded-br bg-gradient-to-tl pl-2 pr-4 text-left"
            } ${type === "quote" ? "border-b-2 border-solid" : type === "thought" ? "border-b-4 border-double" : type === "poem" ? "border-b-4 border-solid" : ""} `}
          >
            <div className="prose">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            <p className="text-sm text-gray-500">{author}</p>
          </Link>
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
