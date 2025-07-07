import { z } from "zod";

export const contentSchema = z.object({
  slug: z.string(),
  content: z.string(),
});

export type Content<T> = z.infer<typeof contentSchema> & T;
