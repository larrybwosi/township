import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MockDataProvider } from "../context/MockDataContext";
import { getSiteMetadata } from "../lib/sanity";
import { resolveImageUrl } from "../lib/image";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const siteMeta = await getSiteMetadata("rental");
  const ogImageUrl = siteMeta.ogImage ? resolveImageUrl(siteMeta.ogImage) : undefined;

  return {
    title: siteMeta.title || "Township Rental Hub — Find Your Next Home",
    description:
      siteMeta.description ||
      "Browse, discover, and book perfect rental properties in our gorgeous towns. The ultimate rental finder and host portal.",
    keywords: siteMeta.keywords || [
      "township",
      "rental properties",
      "apartments",
      "cabins",
      "booking",
    ],
    openGraph: {
      title: siteMeta.title,
      description: siteMeta.description,
      siteName: siteMeta.siteName || "Township Rental Hub",
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

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  themeColor: "#1a3a5c",
  width: "device-width",
  initialScale: 1,
};

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
      <body
        className={`${inter.className} antialiased text-foreground min-h-screen flex flex-col`}
      >
        <MockDataProvider>{children}</MockDataProvider>
      </body>
    </html>
  );
}
