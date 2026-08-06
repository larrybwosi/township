import React from "react";
import { MarketplaceProvider } from "../context/MarketplaceContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Township Marketplace",
  description: "Browse local goods, furniture, home appliances, and services.",
};

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
