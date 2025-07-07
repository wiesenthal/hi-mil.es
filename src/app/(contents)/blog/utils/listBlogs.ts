import { pickKey } from "~/utils/lambdas/pickKey";
import { BlogPostSchema } from "./BlogPost";
import { makeListContent } from "~/utils/content/makeListContent";
import { byCreatedAt } from "~/utils/lambdas/byCreatedAt";

export const listBlogs = makeListContent(BlogPostSchema)("blog")({
  filter: pickKey("isComplete"),
  sort: byCreatedAt,
});
