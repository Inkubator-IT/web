interface Blog {
  slug: string;
}

interface ApiResponse {
  success: boolean;
  data?: Blog[];
}

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  try {
    // Construct the API URL correctly
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
    const blogsUrl = apiUrl.endsWith("/api")
      ? `${apiUrl}/blogs`
      : `${apiUrl}/api/blogs`;

    console.log("Fetching blogs from:", blogsUrl);

    const response = await fetch(blogsUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch blogs: ${response.status} ${response.statusText}`,
      );
      return [];
    }

    const result: ApiResponse = await response.json();

    if (
      result.success &&
      Array.isArray(result.data) &&
      result.data.length > 0
    ) {
      const params = result.data.map((blog) => ({
        slug: blog.slug,
      }));
      console.log(`Generated static params for ${params.length} blogs`);
      return params;
    }

    console.warn("No blogs found or invalid response format");
    return [];
  } catch (error) {
    console.error("Error generating static params:", error);
    console.error("Make sure your API server is running at build time!");
    // Return empty array to allow build to continue
    return [];
  }
}

export default function BlogSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
