import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Navbar from "@/components/navbar";
import { Providers } from "./providers";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Inkubator IT | Digital Product Studio",
  description:
    "Trusted ITB engineers crafting websites, mobile apps, and AI solutions for ambitious brands.",
  openGraph: {
    type: "website",
    siteName: "Inkubator IT",
    title: "Inkubator IT — Trusted Digital Solutions",
    description:
      "See how Inkubator IT ships production-grade software for top Indonesian brands.",
    images: [
      {
        url: "https://assets.inkubatorit.com/uploads/dark-mode-03b32b09-5ac2-4785-ba3f-7a52b4d314c8.png",
        width: 735,
        height: 521,
        alt: "Inkubator IT showcase preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inkubator IT — Trusted Digital Solutions",
    description:
      "Web, mobile, and AI products built by ITB's top engineers for leading brands.",
    images: [
      "https://assets.inkubatorit.com/uploads/dark-mode-03b32b09-5ac2-4785-ba3f-7a52b4d314c8.png",
    ],
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
        className={`${montserrat.variable} antialiased bg-[#0C0C0C] font-sans`}
      >
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <Image
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
        </Providers>
      </body>
    </html>
  );
}
