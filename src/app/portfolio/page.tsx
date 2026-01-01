import type { Metadata } from "next";
import PortfolioPageClient from "./portfolio-page-client";
import { fetchProjects } from "@/lib/api";
import { Suspense } from "react";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore our portfolio of websites, mobile apps, and AI solutions built for leading Indonesian brands. See how we deliver production-grade software.",
  openGraph: {
    title: `Portfolio | ${SITE_CONFIG.name}`,
    description:
      "Explore our portfolio of websites, mobile apps, and AI solutions built for leading Indonesian brands.",
  },
};

export default async function PortfolioPage() {
  const projects = await fetchProjects();

  return (
    <Suspense>
      <PortfolioPageClient projects={projects} />
    </Suspense>
  );
}
