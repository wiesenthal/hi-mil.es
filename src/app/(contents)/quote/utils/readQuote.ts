import { QuoteSchema } from "./Quote";
import { makeReadContent } from "~/utils/content/makeReadContent";

export const readQuote = makeReadContent(QuoteSchema)("quote");
