import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore our tailored IT solutions designed to empower businesses, optimize operations, and drive innovation through technology. From web development to AI/ML solutions.",
  openGraph: {
    title: `Our Services | ${SITE_CONFIG.name}`,
    description:
      "Explore our tailored IT solutions designed to empower businesses, optimize operations, and drive innovation through technology.",
  },
};

export default function OurServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
