import type { Metadata } from "next";
import Script from "next/script";
import HomePageClient from "./home-page-client";
import { fetchProjects } from "@/lib/api";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
  openGraph: {
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
};

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
    title: "Legali – AI-Powered Legal Assistance & Case Management Platform",
    description:
      "Legali is an AI-powered web platform designed to bridge the justice gap for individuals whose legal cases are too complex for small claims courts yet too minor to justify hiring traditional law firms. The platform provides structured legal guidance, case and timeline management, automated red flag detection, AI-assisted legal document generation, and comprehensive legal dossiers. Users can organize files, collaborate on cases, participate in legal discussions, and access an attorney marketplace offering affordable professional services. Legali integrates third-party LLM APIs for legal analysis, supports subscription-based access with payment gateway integration, and includes a full admin panel for user, knowledge, pricing, and content management—delivering actionable legal insights in an accessible and scalable digital solution.",
    image: "/assets/landing/test.png",
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
    <>
      <Script
        id="org-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_CONFIG.name,
            url: SITE_CONFIG.url,
            logo: SITE_CONFIG.defaultOgImage,
            description: SITE_CONFIG.description,
          }),
        }}
      />
      <HomePageClient
        projectShowcase={showcase.length > 0 ? showcase : [...FALLBACK_SHOWCASE]}
      />
    </>
  );
}
