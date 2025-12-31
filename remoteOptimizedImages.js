/**
 * Remote Optimized Images Configuration
 * 
 * This file exports an array of remote image URLs that will be optimized
 * during the build process by next-image-export-optimizer.
 * 
 * The optimizer will download these images, optimize them, and replace
 * the URLs in the exported static site.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

/**
 * Fetches all projects from the API and extracts image URLs
 */
async function fetchProjectImages() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/projects`, {
      cache: "no-store", // Always fetch fresh data at build time
    });

    if (!response.ok) {
      console.warn(`Failed to fetch projects: ${response.statusText}`);
      return [];
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      console.warn("No project data found");
      return [];
    }

    const projects = result.data;
    const imageUrls = new Set();

    projects.forEach((project) => {
      // Add thumbnail if it exists and is a remote URL
      if (project.thumbnail && (project.thumbnail.startsWith("http://") || project.thumbnail.startsWith("https://"))) {
        imageUrls.add(project.thumbnail);
      }

      // Add all images from the images array
      if (Array.isArray(project.images)) {
        project.images.forEach((image) => {
          if (image && (image.startsWith("http://") || image.startsWith("https://"))) {
            imageUrls.add(image);
          }
        });
      }

      // Add tech stack icon URLs
      if (Array.isArray(project.tech_stacks)) {
        project.tech_stacks.forEach((techStack) => {
          if (techStack.icon_url && (techStack.icon_url.startsWith("http://") || techStack.icon_url.startsWith("https://"))) {
            imageUrls.add(techStack.icon_url);
          }
        });
      }
    });

    return Array.from(imageUrls);
  } catch (error) {
    console.error("Error fetching project images:", error);
    return [];
  }
}

/**
 * Fetches all blogs from the API and extracts image URLs
 */
async function fetchBlogImages() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs`, {
      cache: "no-store", // Always fetch fresh data at build time
    });

    if (!response.ok) {
      console.warn(`Failed to fetch blogs: ${response.statusText}`);
      return [];
    }

    const result = await response.json();

    if (!result.success || !result.data) {
      console.warn("No blog data found");
      return [];
    }

    const blogs = result.data;
    const imageUrls = new Set();

    blogs.forEach((blog) => {
      // Add thumbnail if it exists and is a remote URL
      if (blog.thumbnail && (blog.thumbnail.startsWith("http://") || blog.thumbnail.startsWith("https://"))) {
        imageUrls.add(blog.thumbnail);
      }
    });

    return Array.from(imageUrls);
  } catch (error) {
    console.error("Error fetching blog images:", error);
    return [];
  }
}

/**
 * Main function that fetches all remote image URLs
 * Returns a Promise that resolves to an array of image URLs
 */
module.exports = new Promise(async (resolve) => {
  try {
    console.log("Fetching remote image URLs for optimization...");
    
    const [projectImages, blogImages] = await Promise.all([
      fetchProjectImages(),
      fetchBlogImages(),
    ]);

    const allImages = [...projectImages, ...blogImages];
    const uniqueImages = Array.from(new Set(allImages));

    console.log(`Found ${uniqueImages.length} unique remote image(s) to optimize`);
    
    resolve(uniqueImages);
  } catch (error) {
    console.error("Error fetching remote images:", error);
    resolve([]); // Return empty array on error to prevent build failure
  }
});

