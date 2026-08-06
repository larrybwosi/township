"use client";

import React, { useState } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import { ShoppingBag, ShoppingCart, Clock, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { getCartItemsCount, orders } = useMarketplace();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = getCartItemsCount();
  const activeOrdersCount = orders.filter((o) => o.status === "PENDING" || o.status === "PROCESSING").length;

  return (
    <header className="bg-[#111] text-white border-b border-white/5 sticky top-0 z-40 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group transition-transform duration-200 active:scale-95">
            <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:bg-emerald-400 transition-colors">
              <ShoppingBag className="w-5.5 h-5.5 text-black font-extrabold" aria-hidden="true" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-black text-lg lg:text-xl tracking-tight group-hover:text-emerald-400 transition-colors">
                Township Marketplace
              </span>
              <span className="text-emerald-500/80 text-[9px] uppercase tracking-widest font-black pt-0.5">
                Deliveries & Local Goods
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Items */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Home/Browse Catalog */}
            <Link
              href="/"
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                pathname === "/"
                  ? "text-emerald-400 bg-white/5"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              Browse Products
            </Link>

            {/* My Orders Link */}
            <Link
              href="/orders"
              className={`relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                pathname === "/orders"
                  ? "bg-white/10 text-white"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>My Orders</span>
              {activeOrdersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-black font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse border-2 border-[#111]">
                  {activeOrdersCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Link */}
            <Link
              href="/cart"
              className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-black rounded-lg transition-all duration-200 ${
                pathname === "/cart"
                  ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className={`absolute -top-1 -right-1 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                  pathname === "/cart" ? "bg-black text-emerald-500 border-emerald-500" : "bg-emerald-500 text-black border-[#111]"
                }`}>
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-3">
            {/* Quick Cart button for mobile */}
            <Link
              href="/cart"
              className={`relative p-2 rounded-lg transition ${
                pathname === "/cart" ? "text-emerald-400" : "text-white/80 hover:text-white"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-black font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#111]">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#161616] border-t border-white/5 px-4 pt-2 pb-6 space-y-3 shadow-inner animate-in fade-in slide-in-from-top-3 duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-3 rounded-lg text-base font-bold transition ${
              pathname === "/"
                ? "bg-white/5 text-emerald-400"
                : "text-white/80 hover:bg-white/5 hover:text-white"
            }`}
          >
            Browse Products
          </Link>

          <Link
            href="/orders"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-bold transition ${
              pathname === "/orders"
                ? "bg-white/5 text-emerald-400"
                : "text-white/80 hover:bg-white/5 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4.5 h-4.5 text-emerald-400" />
              <span>My Orders</span>
            </div>
            {activeOrdersCount > 0 && (
              <span className="bg-emerald-500 text-black font-black text-xs px-2.5 py-0.5 rounded-full">
                {activeOrdersCount}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-black transition ${
              pathname === "/cart"
                ? "bg-emerald-500 text-black"
                : "bg-white/5 text-white hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4.5 h-4.5" />
              <span>My Cart</span>
            </div>
            {cartCount > 0 && (
              <span className={`font-black text-xs px-2.5 py-0.5 rounded-full ${
                pathname === "/cart" ? "bg-black text-emerald-500" : "bg-emerald-500 text-black"
              }`}>
                {cartCount} items
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}
