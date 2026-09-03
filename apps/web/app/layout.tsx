import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getSiteMetadata } from "../lib/sanity";
import { resolveImageUrl } from "../sanity/lib/image";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteMeta = await getSiteMetadata("web");
  const ogImageUrl = siteMeta.ogImage ? resolveImageUrl(siteMeta.ogImage) : undefined;

  return {
    title: siteMeta.title || "Township — Your City Guide",
    description:
      siteMeta.description ||
      "Discover everything about our town — institutions, places of interest, local services and events. Your complete guide for students and locals alike.",
    keywords: siteMeta.keywords || [
      "township",
      "city guide",
      "students",
      "local services",
      "institutions",
    ],
    openGraph: {
      title: siteMeta.title,
      description: siteMeta.description,
      siteName: siteMeta.siteName || "Township",
      images: ogImageUrl ? [{ url: ogImageUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: siteMeta.title,
      description: siteMeta.description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#1a3a5c",
  width: "device-width",
  initialScale: 1,
};

import { SanityLive } from "../sanity/lib/live";

import { frontendEnv } from "@repo/env";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__ENV = {
              NEXT_PUBLIC_SANITY_PROJECT_ID: ${JSON.stringify(frontendEnv.NEXT_PUBLIC_SANITY_PROJECT_ID)},
              NEXT_PUBLIC_SANITY_DATASET: ${JSON.stringify(frontendEnv.NEXT_PUBLIC_SANITY_DATASET)},
              NEXT_PUBLIC_API_URL: ${JSON.stringify(frontendEnv.NEXT_PUBLIC_API_URL)}
            };`
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
