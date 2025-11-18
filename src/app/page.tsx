import HomePageClient from "./home-page-client";
import { fetchProjects } from "@/lib/api";

type ShowcaseItem = {
  id: number | string;
  title: string;
  description: string;
  image: string;
};

const FALLBACK_SHOWCASE: ShowcaseItem[] = [
  {
    id: "fallback-1",
    title: "Shadcn Landing Page",
    description:
      "Sebuah landing page modern yang dibangun dengan Shadcn UI dan React. Fokus pada kecepatan, konsistensi desain, serta pengalaman pengguna yang sederhana namun elegan.",
    image: "/assets/landing/project_highlights.png",
  },
  {
    id: "fallback-2",
    title: "Project 2",
    description: "Sample description for project 2.",
    image: "/logo-iit.png",
  },
  {
    id: "fallback-3",
    title: "Project 3",
    description: "Sample description for project 3.",
    image: "/assets/landing/project_highlights.png",
  },
];

export default async function HomePage() {
  const projects = await fetchProjects({ featured: true });

  const showcase: ShowcaseItem[] = projects.slice(0, 5).map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.thumbnail || "/assets/landing/project_highlights.png",
  }));

  return (
    <HomePageClient
      projectShowcase={showcase.length > 0 ? showcase : [...FALLBACK_SHOWCASE]}
    />
  );
}
