import { Symbol } from "~/app/components/Symbol";
import { listQuotes } from "../utils/listQuotes";
import { NavLink } from "~/app/components/NavLink";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default async function BlogList() {
  const quotes = await listQuotes();

  return (
    <div className="mx-auto flex h-full flex-col gap-8 p-4 lg:max-w-5xl">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-4xl font-bold">Quotes & Thoughts</h1>
        <div className="text-sm italic">Ideas I live by</div>
      </div>
      <ul className="flex max-h-full w-full flex-col gap-8 overflow-y-auto">
        {quotes.map(({ slug, author, content, type }, i) => (
          <Link
            href={`/quote/${slug}`}
            key={slug}
            className={`flex cursor-default flex-col justify-between gap-1 p-1 border-b border-black ${
              i % 2 === 0
                ? "ml-auto items-end text-right rounded-bl"
                : "mr-auto items-start text-left rounded-br"
            } ${type === "quote" ? "border-dotted" : type === "thought" ? "border-dashed" : type === "poem" ? "border-solid" : ""} `}
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
