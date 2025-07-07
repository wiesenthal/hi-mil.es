import { randomInt } from "crypto";
import { z } from "zod";

export const QuoteSchema = z.object({
  author: z.string(),
  type: z.enum(["quote", "thought", "poem"]),
  rank: z.number().default(() => randomInt(420)),
});

export type Quote = z.infer<typeof QuoteSchema>;
