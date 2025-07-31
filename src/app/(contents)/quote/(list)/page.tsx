import { listQuotes } from "../utils/listQuotes";
import { NavLink } from "~/app/components/NavLink";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default async function BlogList() {
  const quotes = await listQuotes();

  return (
    <div className="mx-auto flex h-full flex-col gap-8 p-4 lg:max-w-5xl">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-4xl font-light">Quotes ~ Thoughts ~ Poems</h1>
        <div className="text-sm italic font-light">Ideas I Live With</div>
      </div>
      <ul className="flex max-h-full w-full flex-col gap-8 overflow-y-auto">
        {quotes.map(({ slug, author, content, type }, i) => (
          <Link
            href={`/quote/${slug}`}
            key={slug}
            className={`flex cursor-default rounded-t flex-col justify-between gap-1 border-b border-[#15ffad] p-1  from-white/10 via-20% via-white/30 to-white/50 ${
              i % 2 === 0
                ? "ml-auto items-end rounded-bl text-right bg-gradient-to-tr pr-2 pl-4"
                : "mr-auto items-start rounded-br text-left bg-gradient-to-tl pl-2 pr-4"
            } ${type === "quote" ? "border-solid border-b-2" : type === "thought" ? "border-double border-b-4" : type === "poem" ? "border-solid border-b-4" : ""} `}
          >
            <div className="prose">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
            <p className="text-sm text-gray-500">{author}</p>
          </Link>
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
