import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const visits = pgTable(
  "visits",
  {
    userId: integer("user_id").references(() => users.id),
    id: integer("visit_number").notNull().default(1),
    ip: text("ip"),
    url: text("url"),
    createdAt: timestamp("created_at").default(sql`now()`),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.id] }),
  }),
);
