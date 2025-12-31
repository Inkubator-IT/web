import PortfolioPageClient from "./portfolio-page-client";
import { fetchProjects } from "@/lib/api";
import { Suspense } from "react";

export default async function PortfolioPage() {
  const projects = await fetchProjects();

  return (
    <Suspense>
      <PortfolioPageClient projects={projects} />
    </Suspense>
  );
}
