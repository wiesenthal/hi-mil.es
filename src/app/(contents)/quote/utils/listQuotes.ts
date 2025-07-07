import { byRank } from "~/utils/lambdas/byRank";
import { QuoteSchema } from "./Quote";
import { makeListContent } from "~/utils/content/makeListContent";

export const listQuotes = makeListContent(QuoteSchema)("quote")({
  sort: byRank,
});
