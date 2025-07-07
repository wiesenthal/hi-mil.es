import type { z } from "zod";
import path from "path";
import { contentDir } from "./contentDir";
import { promises as fs } from "fs";
import { isNotNull } from "../lambdas/isNotNull";
import { makeReadContent } from "./makeReadContent";

const True = () => true;

export const makeListContent =
  <S extends z.ZodType, T = z.infer<S>>(schema: S) =>
  (subDir: string) =>
  ({
    filter = True,
    sort,
  }: {
    filter?: (content: T) => unknown;
    sort?: (a: T, b: T) => number;
  } = {}) =>
    async function listContent() {
      const files = await fs.readdir(path.join(contentDir, subDir));

      const contents = await Promise.all(
        files.map(makeReadContent(schema)(subDir)),
      );

      return contents.filter(isNotNull).filter(filter).sort(sort);
    };
