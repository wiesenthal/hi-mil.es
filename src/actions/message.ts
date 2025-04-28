"use server";

import { db } from "~/db";
import { messages } from "~/db/schema";
import { getFirst } from "~/utils/getFirst";

export type MessageInput = {
  userId: number;
  visitId: number;
  content: string;
};

export const createMessage = async (input: MessageInput) =>
  db.insert(messages).values(input).returning().then(getFirst);
