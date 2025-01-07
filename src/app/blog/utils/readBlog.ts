import { promises as fs } from "fs";
import path from "path";

export async function readFile(filePath: string) {
  const content = await fs.readFile(filePath, "utf8");
  const stats = await fs.stat(filePath);
  const updatedAt = stats.mtime;
  const createdAt = stats.birthtime;

  return {
    content,
    createdAt,
    updatedAt,
  };
}

export const readBlog = (blogSlug: string) =>
  readFile(path.join(process.cwd(), "content", "blog", `${blogSlug}.md`));
