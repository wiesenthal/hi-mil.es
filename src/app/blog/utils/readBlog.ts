import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter"; // Import gray-matter
import { addData } from "~/utils/addKey";
import { contentDir } from "./constants";
import { type BlogPost } from "./BlogPost";

async function readBlogFile(filePath: string) {
  const rawContent = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(rawContent);

  console.log(data);

  const createdAt =
    "createdAt" in data ? new Date(String(data.createdAt)) : new Date();
  const updatedAt =
    "updatedAt" in data ? new Date(String(data.updatedAt)) : new Date();
  const isComplete = "isComplete" in data ? !!data.isComplete : true;
  const symbol = "symbol" in data ? String(data.symbol) : null;

  return {
    content,
    createdAt,
    updatedAt,
    isComplete,
    symbol,
  };
}

export const readBlog = (slug: string): Promise<BlogPost> =>
  readBlogFile(path.join(contentDir, `${slug}.md`)).then(addData({ slug }));
