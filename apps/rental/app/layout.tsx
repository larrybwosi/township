import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MockDataProvider } from "../context/MockDataContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Township Rental Hub — Find Your Next Home",
  description:
    "Browse, discover, and book perfect rental properties in our gorgeous towns. The ultimate rental finder and host portal.",
  keywords: [
    "township",
    "rental properties",
    "apartments",
    "cabins",
    "booking",
  ],
};

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  themeColor: "#1a3a5c",
  width: "device-width",
  initialScale: 1,
};

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
      <body
        className={`${inter.className} antialiased text-foreground min-h-screen flex flex-col`}
      >
        <MockDataProvider>{children}</MockDataProvider>
      </body>
    </html>
  );
}
