import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter"; // Import gray-matter

export async function readFile(filePath: string) {
  const rawContent = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(rawContent);

  // consider that these will be in format YYYY-MM-DD
  const createdAt = data.createdAt ? new Date(data.createdAt) : new Date();
  const updatedAt = data.updatedAt ? new Date(data.updatedAt) : new Date();

  return {
    content,
    createdAt,
    updatedAt,
  };
}

export const readBlog = (blogSlug: string) =>
  readFile(path.join(process.cwd(), "content", "blog", `${blogSlug}.md`));
