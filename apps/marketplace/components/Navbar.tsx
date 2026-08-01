"use client";

import React from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import { ShoppingBag, ShoppingCart, Clock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { getCartItemsCount, orders } = useMarketplace();
  const pathname = usePathname();

  const cartCount = getCartItemsCount();
  const activeOrdersCount = orders.filter((o) => o.status === "PENDING" || o.status === "PROCESSING").length;

  return (
    <header className="bg-dark text-white shadow-lg sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-md bg-accent flex items-center justify-center shrink-0 shadow-md">
              <ShoppingBag className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-lg tracking-tight group-hover:text-accent transition-colors">
                Township Marketplace
              </span>
              <span className="text-white/50 text-[10px] uppercase tracking-widest font-medium">
                Deliveries & Local Goods
              </span>
            </div>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-4">
            {/* My Orders Link */}
            <Link
              href="/orders"
              className={`relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-md transition ${
                pathname === "/orders"
                  ? "bg-white/10 text-white"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              <Clock className="w-4 h-4 text-accent" />
              <span>My Orders</span>
              {activeOrdersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse border-2 border-dark">
                  {activeOrdersCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Link */}
            <Link
              href="/cart"
              className={`relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-md transition ${
                pathname === "/cart"
                  ? "bg-accent text-white"
                  : "bg-white/10 text-white/90 hover:bg-white/20"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-dark">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
