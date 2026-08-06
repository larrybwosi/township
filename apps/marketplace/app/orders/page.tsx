"use client";

import React from "react";
import { useMarketplace } from "../../context/MarketplaceContext";
import { resolveImageUrl } from "../../lib/image";
import {
  Package,
  Clock,
  CheckCircle2,
  TrendingUp,
  Truck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  const { orders } = useMarketplace();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
      <div className="mb-8 border-b border-border pb-4">
        <h1 className="text-3xl font-black text-foreground flex items-center gap-2">
          <Package className="w-8 h-8 text-emerald-500" />
          <span>My Orders</span>
        </h1>
        <p className="text-sm text-muted mt-1">
          Track active packages, simulated order statuses, and localized delivery logistics.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-surface border border-border rounded-xl shadow-xs">
          <Clock className="w-12 h-12 text-muted/40 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-foreground mb-1">No Orders Found</h3>
          <p className="text-sm text-muted max-w-sm mx-auto">
            You haven&apos;t placed any marketplace orders yet. Submit an order from the cart page to track progress here.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded-md transition"
          >
            <span>Explore Marketplace Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6 max-w-4xl">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-surface border border-border rounded-xl overflow-hidden hover:shadow-xs transition"
            >
              {/* Header bar */}
              <div className="bg-muted px-6 py-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-muted font-bold tracking-wider uppercase">
                    Order Reference
                  </p>
                  <p className="text-xs font-black text-foreground font-mono">
                    {order.id}
                  </p>
                </div>

                <div className="space-y-1 text-left sm:text-right">
                  <p className="text-[10px] text-muted font-bold tracking-wider uppercase">
                    Placed On
                  </p>
                  <p className="text-xs font-semibold text-foreground-secondary">
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/15 px-3 py-1.5 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-wider">
                    Status: {order.status}
                  </span>
                </div>
              </div>

              {/* Main Body */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

                {/* Items list */}
                <div className="md:col-span-7 space-y-3">
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider border-b border-border pb-1">
                    Ordered Products
                  </h4>
                  {order.items.map((item) => (
                    <div key={item.product._id} className="flex gap-3 items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={resolveImageUrl(item.product.imageUrl)}
                        alt={item.product.title}
                        className="w-12 h-12 object-cover rounded-md bg-background border border-border shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-foreground truncate">
                          {item.product.title}
                        </p>
                        <p className="text-[10px] text-muted mt-0.5">
                          Qty: {item.quantity} • ${item.product.price} / unit
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-extrabold text-emerald-500">
                          ${(item.product.price + (item.product.deposit || 0)) * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Location & Pricing */}
                <div className="md:col-span-5 bg-background border border-border rounded-lg p-4 space-y-4">
                  <div className="space-y-1 text-xs">
                    <h4 className="text-[10px] font-bold text-muted uppercase tracking-wider flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Delivery Address</span>
                    </h4>
                    <p className="font-extrabold text-foreground mt-1">
                      {order.delivery.fullName}
                    </p>
                    <p className="text-foreground-secondary font-normal mt-0.5 leading-relaxed">
                      {order.delivery.address}, {order.delivery.city}, {order.delivery.postalCode}
                    </p>
                    <p className="text-muted text-[11px] font-normal mt-1">
                      Tel: {order.delivery.phone}
                    </p>
                  </div>

                  <div className="border-t border-border pt-3 space-y-1.5 text-xs font-semibold">
                    <div className="flex justify-between">
                      <span className="text-muted">Subtotal:</span>
                      <span>${order.subtotal}</span>
                    </div>
                    {order.totalDeposit > 0 && (
                      <div className="flex justify-between text-amber-600">
                        <span>Deposits:</span>
                        <span>+${order.totalDeposit}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-emerald-500 font-bold border-t border-border/40 pt-1.5">
                      <span>Grand Total:</span>
                      <span>${order.grandTotal}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Logistics update bottom text */}
              <div className="bg-emerald-500/5 border-t border-border px-6 py-3 flex items-center gap-2 text-[11px] text-foreground-secondary">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Your delivery dispatch will be executed shortly within the current system run.</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
