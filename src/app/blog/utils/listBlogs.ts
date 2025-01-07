import { promises as fs } from "fs";
import path from "path";
import { readFile } from "./readBlog";

export type BlogPost = {
  slug: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function listBlogs(): Promise<BlogPost[]> {
  const contentDir = path.join(process.cwd(), "content", "blog");
  const files = await fs.readdir(contentDir);

  const blogs = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(contentDir, file);
      const { content, createdAt, updatedAt } = await readFile(filePath);
      const slug = path.parse(file).name;

      return {
        slug,
        content,
        createdAt,
        updatedAt,
      };
    }),
  );

  return blogs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}
