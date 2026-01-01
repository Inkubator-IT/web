import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Have an idea or a project in mind? We'd love to hear from you. Fill out our project inquiry form and we'll get back to you within 24 hours.",
  openGraph: {
    title: `Contact Us | ${SITE_CONFIG.name}`,
    description:
      "Have an idea or a project in mind? We'd love to hear from you. Fill out our project inquiry form and we'll get back to you within 24 hours.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
