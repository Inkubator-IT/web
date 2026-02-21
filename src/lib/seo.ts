export const SITE_CONFIG = {
  name: "Inkubator IT",
  tagline: "Digital Product Studio",
  url: "https://inkubatorit.id",
  defaultOgImage:
    "https://assets.inkubatorit.id/uploads/dark-mode-03b32b09-5ac2-4785-ba3f-7a52b4d314c8.png",
  description:
    "Trusted ITB engineers crafting websites, mobile apps, and AI solutions for ambitious brands.",
} as const;

export const DEFAULT_SEO = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  openGraph: {
    type: "website",
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — Trusted Digital Solutions`,
    description:
      "See how Inkubator IT ships production-grade software for top Indonesian brands.",
    images: [
      {
        url: SITE_CONFIG.defaultOgImage,
        width: 735,
        height: 521,
        alt: "Inkubator IT showcase preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} — Trusted Digital Solutions`,
    description:
      "Web, mobile, and AI products built by ITB's top engineers for leading brands.",
    images: [SITE_CONFIG.defaultOgImage],
  },
};
