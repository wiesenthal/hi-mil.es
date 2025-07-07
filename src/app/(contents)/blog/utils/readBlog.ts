import { BlogPostSchema } from "./BlogPost";
import { makeReadContent } from "~/utils/content/makeReadContent";

export const readBlog = makeReadContent(BlogPostSchema)("blog");
