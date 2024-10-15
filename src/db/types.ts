import type { InferSelectModel } from "drizzle-orm";
import type { users, visits } from "./schema";

export type User = InferSelectModel<typeof users>;
export type Visit = InferSelectModel<typeof visits>;
