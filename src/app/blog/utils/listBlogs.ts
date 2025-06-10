import { promises as fs } from "fs";
import path from "path";
import { readBlog } from "./readBlog";
import { type BlogPost } from "./BlogPost";
import { contentDir } from "./constants";
import { pickKey } from "~/utils/pickKey";

const getFileName = (file: string) => path.parse(file).name;

const byCreatedAt = (a: BlogPost, b: BlogPost) =>
  b.createdAt.getTime() - a.createdAt.getTime();

export async function listBlogs(): Promise<BlogPost[]> {
  const files = await fs.readdir(contentDir);

  const blogs = await Promise.all(files.map(getFileName).map(readBlog));

  return blogs.filter(pickKey("isComplete")).sort(byCreatedAt);
}
