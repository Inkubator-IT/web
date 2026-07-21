import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/seo";
import AboutUsClient from "./about-us-client";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Inkubator IT's vision, mission, and story. Founded under HMIF ITB, we're a trusted partner for businesses seeking digital solutions with integrity, collaboration, and activeness.",
  openGraph: {
    title: `About Us | ${SITE_CONFIG.name}`,
    description:
      "Learn about Inkubator IT's vision, mission, and story. Founded under HMIF ITB, we're a trusted partner for businesses seeking digital solutions.",
  },
};

const page = () => {
  return <AboutUsClient />;
};

export default page;
