import type { z } from "zod";
import path from "path";
import { contentDir } from "./contentDir";
import { makeReadContentFile } from "./makeReadContentFile";

export const makeReadContent =
  <S extends z.ZodType, T = z.infer<S>>(schema: S) =>
  (subDir: string) =>
  (slug: string) =>
    makeReadContentFile<S, T>(schema)(
      path.join(contentDir, subDir, slug.endsWith(".md") ? slug : `${slug}.md`),
    );
