import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter"; // Import gray-matter

export async function readFile(filePath: string) {
  const rawContent = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(rawContent);

  const createdAt = data.createdAt
    ? new Date(data.createdAt as string)
    : new Date();
  const updatedAt = data.updatedAt
    ? new Date(data.updatedAt as string)
    : new Date();

  return {
    content,
    createdAt,
    updatedAt,
  };
}

export const readBlog = (blogSlug: string) =>
  readFile(path.join(process.cwd(), "content", "blog", `${blogSlug}.md`));
