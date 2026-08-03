import React from "react";
import { MarketplaceProvider } from "../context/MarketplaceContext";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Township Marketplace",
  description: "Browse local goods, furniture, home appliances, and services.",
};

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
              NEXT_PUBLIC_SANITY_PROJECT_ID: ${JSON.stringify(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "")},
              NEXT_PUBLIC_SANITY_DATASET: ${JSON.stringify(process.env.NEXT_PUBLIC_SANITY_DATASET || "")},
              NEXT_PUBLIC_API_URL: ${JSON.stringify(process.env.NEXT_PUBLIC_API_URL || "")}
            };`
          }}
        />
      </head>
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <MarketplaceProvider>
          {children}
        </MarketplaceProvider>
      </body>
    </html>
  );
}
