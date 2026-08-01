import React from "react";
import { MarketplaceProvider } from "../context/MarketplaceContext";
import "./globals.css";

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
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <MarketplaceProvider>
          {children}
        </MarketplaceProvider>
      </body>
    </html>
  );
}
