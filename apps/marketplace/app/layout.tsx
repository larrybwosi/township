import React from "react";
import type { Metadata } from "next";
import { MarketplaceProvider } from "../context/MarketplaceContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";
import { getSiteMetadata } from "../lib/sanity";
import { resolveImageUrl } from "../lib/image";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const siteMeta = await getSiteMetadata("marketplace");
  const ogImageUrl = siteMeta.ogImage ? resolveImageUrl(siteMeta.ogImage) : undefined;

  return {
    title: siteMeta.title || "Township Marketplace",
    description: siteMeta.description || "Browse local goods, furniture, home appliances, and services.",
    keywords: siteMeta.keywords || ["township", "marketplace", "local goods"],
    openGraph: {
      title: siteMeta.title,
      description: siteMeta.description,
      siteName: siteMeta.siteName || "Township Marketplace",
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

import { frontendEnv } from "@repo/env";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <MarketplaceProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
            <Footer />
          </div>
        </MarketplaceProvider>
      </body>
    </html>
  );
}
