import { z } from "zod";

export const BlogPostSchema = z.object({
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
  isComplete: z.boolean().default(true),
  symbol: z.string().nullable().default(null),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
