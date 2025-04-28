import { sql } from "drizzle-orm";
import {
  foreignKey,
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

export const messages = pgTable(
  "messages",
  {
    userId: integer("user_id").references(() => users.id),
    visitId: integer("visit_id"),
    id: integer("message_number").notNull().default(1),
    content: text("content"),
    createdAt: timestamp("created_at").default(sql`now()`),
  },
  (table) => ({
    visitIdUserId: foreignKey({
      columns: [table.visitId, table.userId],
      foreignColumns: [visits.id, visits.userId],
    }),
    pk: primaryKey({ columns: [table.userId, table.visitId, table.id] }),
  }),
);
