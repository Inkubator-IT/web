import PortfolioPageClient from "./portfolio-page-client";
import { fetchProjects } from "@/lib/api";

export default async function PortfolioPage() {
  const projects = await fetchProjects();

  return <PortfolioPageClient projects={projects} />;
}
