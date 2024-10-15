import { InferSelectModel } from "drizzle-orm";
import { users, visits, messages } from "./schema";

export type User = InferSelectModel<typeof users>;
export type Visit = InferSelectModel<typeof visits>;
export type Message = InferSelectModel<typeof messages>;
