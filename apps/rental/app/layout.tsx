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
  keywords: ["township", "rental properties", "apartments", "cabins", "booking"],
};

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
      <body className={`${inter.className} antialiased text-foreground min-h-screen flex flex-col`}>
        <MockDataProvider>{children}</MockDataProvider>
      </body>
    </html>
  );
}
