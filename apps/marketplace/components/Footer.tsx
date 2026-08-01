"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white border-t border-white/5 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-2 text-white/50 text-xs">
        <p className="font-semibold text-white/80">
          Township Marketplace Delivery Portal
        </p>
        <p>
          © {new Date().getFullYear()} Township Portal. All products, services, and transactions are simulated.
        </p>
      </div>
    </footer>
  );
}
