import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Township — Your City Guide",
  description:
    "Discover everything about our town — institutions, places of interest, local services and events. Your complete guide for students and locals alike.",
  keywords: [
    "township",
    "city guide",
    "students",
    "local services",
    "institutions",
  ],
};

export const viewport: Viewport = {
  themeColor: "#1a3a5c",
  width: "device-width",
  initialScale: 1,
};

import { SanityLive } from "../sanity/lib/live";

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
              NEXT_PUBLIC_SANITY_PROJECT_ID: ${JSON.stringify(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "")},
              NEXT_PUBLIC_SANITY_DATASET: ${JSON.stringify(process.env.NEXT_PUBLIC_SANITY_DATASET || "")},
              NEXT_PUBLIC_API_URL: ${JSON.stringify(process.env.NEXT_PUBLIC_API_URL || "")}
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
