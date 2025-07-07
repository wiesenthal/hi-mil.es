import matter from "gray-matter";
import { promises as fs } from "fs";
import type { z } from "zod";
import type { Content } from "./contentSchema";
import { getFileName } from "../lambdas/getFileName";

export const makeReadContentFile = <S extends z.ZodType<T>, T = z.infer<S>>(
  schema: S,
) =>
  async function readContentFile(filePath: string): Promise<Content<T> | null> {
    const rawContent = await fs.readFile(filePath, "utf8");
    const { content, data } = matter(rawContent);

    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      console.error(`Error parsing ${filePath}:`, parsed.error);
      return null;
    }

    const slug = getFileName(filePath);

    return {
      slug,
      content,
      ...parsed.data,
    };
  };
