"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, Send, ShieldCheck, Heart, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white border-t border-white/5 pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/5">

        {/* Brand Column */}
        <div className="md:col-span-4 space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-emerald-500 flex items-center justify-center shrink-0 shadow-md">
              <ShoppingBag className="w-4.5 h-4.5 text-black" aria-hidden="true" />
            </div>
            <span className="text-white font-black text-lg tracking-tight">
              Township Portal
            </span>
          </Link>
          <p className="text-white/60 text-xs leading-relaxed max-w-sm">
            Bringing the convenience of local regional goods, custom handcrafted furniture, premium appliances, and expert trade repairs directly to your township address.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-emerald-500 font-bold bg-white/5 px-3 py-1.5 rounded-lg w-fit border border-emerald-500/10">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Secure Simulated Trading Hub</span>
          </div>
        </div>

        {/* Categories / Quick Links */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-emerald-500">Categories</h4>
          <ul className="space-y-2 text-xs text-white/65 font-medium">
            <li><Link href="/" className="hover:text-emerald-400 transition-colors">Furniture</Link></li>
            <li><Link href="/" className="hover:text-emerald-400 transition-colors">Appliances</Link></li>
            <li><Link href="/" className="hover:text-emerald-400 transition-colors">Local Produce</Link></li>
            <li><Link href="/" className="hover:text-emerald-400 transition-colors">Trade Services</Link></li>
          </ul>
        </div>

        {/* Contact/Support */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-emerald-500">Local Support</h4>
          <ul className="space-y-3 text-xs text-white/65 font-medium">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Township Admin Center, Suite 101, Greenwood</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
              <a href="mailto:support@township.gov" className="hover:text-emerald-400 transition-colors">support@township.gov</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>+1 (555) TOWNSHIP</span>
            </li>
          </ul>
        </div>

        {/* Local Newsletter Signup */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-emerald-500">Newsletter</h4>
          <p className="text-white/60 text-xs leading-relaxed">
            Subscribe to recieve instant alerts about seasonal organic goods and furniture drops.
          </p>
          <div className="flex gap-1.5">
            <input
              type="email"
              placeholder="Your email..."
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full font-normal"
            />
            <button className="bg-emerald-500 hover:bg-emerald-400 text-black px-3.5 py-2 rounded-lg transition-colors flex items-center justify-center shrink-0">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-[11px] font-medium">
        <p>© {new Date().getFullYear()} Township Portal. All products, services, and transactions are simulated.</p>
        <p className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-emerald-500 fill-emerald-500" />
          <span>for the Greenwood community.</span>
        </p>
      </div>
    </footer>
  );
}
