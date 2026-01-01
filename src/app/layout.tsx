import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ExportedImage from "next-image-export-optimizer";
import Navbar from "@/components/navbar";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { SITE_CONFIG, DEFAULT_SEO } from "@/lib/seo";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: DEFAULT_SEO.openGraph,
  twitter: DEFAULT_SEO.twitter,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning // no way i found this bug while using grammarly
        className={`${montserrat.variable} bg-[#0C0C0C] font-sans antialiased`}
      >
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <ExportedImage
            src="/Wave.svg"
            alt="bg-wave"
            fill
            className="object-cover"
            priority
          />
        </div>
        <Providers>
          <Navbar />
          <div className="pt-[120px]">{children}</div>
          <Toaster position="bottom-center" theme="dark" />
        </Providers>
      </body>
    </html>
  );
}
