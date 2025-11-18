import BlogPageClient from "./blog-page-client";
import { fetchBlogs, fetchTags } from "@/lib/api";

export default async function BlogPage() {
  const [blogs, tags] = await Promise.all([fetchBlogs(), fetchTags()]);

  return <BlogPageClient blogs={blogs} tags={tags} />;
}
