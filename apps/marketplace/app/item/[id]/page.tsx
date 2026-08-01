"use client";

import React, { useState, useEffect } from "react";
import { useMarketplace } from "../../../context/MarketplaceContext";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { resolveImageUrl } from "../../../lib/image";
import {
  ArrowLeft,
  Info,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  ShoppingCart,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ItemDetailPage({ params }: PageProps) {
  const unwrappedParams = React.use(params);
  const productId = unwrappedParams.id;

  const { products, addToCart } = useMarketplace();

  // Search local products list
  const product = products.find((p) => p._id === productId);

  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Reset quantities if product changes
    setQuantity(1);
    setSuccessMessage("");
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <Info className="w-12 h-12 text-red-500 mb-3" />
          <h2 className="text-xl font-bold text-foreground">
            Item Not Found
          </h2>
          <p className="text-sm text-muted mt-1 max-w-sm">
            We could not locate the product listing you are looking for. It may have been sold out or deleted.
          </p>
          <Link
            href="/"
            className="mt-4 px-5 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-md transition shadow-xs"
          >
            Back to Marketplace
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity((q) => q + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleAddToCartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    if (product.stock <= 0) return;

    addToCart(product, quantity);
    setSuccessMessage(`Successfully added ${quantity} item(s) to your cart!`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to All Products</span>
          </Link>
        </div>

        {/* Detailed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Product Image & Descriptions */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-surface border border-border rounded-xl p-6 md:p-8 space-y-6 shadow-xs">

              {/* Product Header Row */}
              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-black bg-accent/10 text-accent border border-accent/10">
                  {product.category.replace("-", " ")}
                </span>
                <h1 className="text-2xl md:text-3xl font-black text-foreground leading-tight">
                  {product.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-bold text-muted pt-1">
                  <span className="flex items-center gap-1 text-foreground-secondary">
                    Category: {product.category.replace("-", " ")}
                  </span>
                  {product.stock > 0 ? (
                    <span className="text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      In Stock ({product.stock} units remaining)
                    </span>
                  ) : (
                    <span className="text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-100 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Sold Out
                    </span>
                  )}
                </div>
              </div>

              {/* Main Image */}
              <div className="relative h-[250px] sm:h-[400px] w-full bg-muted rounded-xl overflow-hidden border border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveImageUrl(product.imageUrl)}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div className="pt-4">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">
                  Item Description
                </h3>
                <p className="text-foreground-secondary text-sm leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              {/* Specs & Data Sheets */}
              {product.specs && product.specs.length > 0 && (
                <div className="pt-6 border-t border-border space-y-4">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-accent" />
                    <span>Technical Specifications & Specs</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.specs.map((spec, index) => (
                      <div
                        key={index}
                        className="flex justify-between p-3 rounded-lg border border-border bg-background text-xs"
                      >
                        <span className="font-semibold text-muted">{spec.name}</span>
                        <span className="font-extrabold text-foreground text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order Placement & Quick Pricing Summary Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-surface border border-border rounded-xl p-6 shadow-md space-y-4">
              <div className="flex justify-between items-baseline border-b border-border pb-3.5">
                <div className="leading-none">
                  <span className="text-2xl font-black text-primary">
                    ${product.price}
                  </span>
                  <span className="text-[10px] text-muted font-bold ml-1.5">
                    {product.category === "services" ? "/ EST BASE" : "/ ITEM"}
                  </span>
                </div>
              </div>

              {/* Deposit notification if required */}
              {product.deposit && (
                <div className="bg-primary-light/40 border border-primary/15 rounded-lg p-3.5 space-y-1">
                  <h4 className="font-bold text-primary text-xs flex items-center gap-1.5">
                    Required Deposit Required: ${product.deposit}
                  </h4>
                  <p className="text-[11px] text-foreground-secondary leading-relaxed">
                    This item requires a security deposit of ${product.deposit} to secure purchase delivery. This will be added to your cart total during check out.
                  </p>
                </div>
              )}

              {/* Alerts */}
              {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-800 text-xs p-3.5 rounded-lg font-semibold space-y-1.5">
                  <div className="flex items-center gap-1.5 text-green-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </div>
                  <p className="font-normal text-[11px] leading-relaxed text-green-700">
                    {successMessage}
                  </p>
                  <Link
                    href="/cart"
                    className="mt-2 block text-center py-1.5 bg-green-600 hover:bg-green-700 text-white text-[11px] font-bold rounded-md"
                  >
                    Proceed to Shopping Cart
                  </Link>
                </div>
              )}

              {product.stock <= 0 ? (
                <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3.5 rounded-lg font-medium text-center">
                  This item is currently sold out. Please check back later!
                </div>
              ) : (
                <form onSubmit={handleAddToCartSubmit} className="space-y-4">
                  {/* Quantity selector */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-foreground uppercase tracking-wider">
                      Quantity to Order
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleDecrement}
                        disabled={quantity <= 1}
                        className="w-9 h-9 border border-border rounded-lg bg-background flex items-center justify-center hover:bg-muted/10 transition disabled:opacity-40"
                      >
                        <Minus className="w-4 h-4 text-foreground" />
                      </button>
                      <span className="font-extrabold text-sm text-foreground w-8 text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={handleIncrement}
                        disabled={quantity >= product.stock}
                        className="w-9 h-9 border border-border rounded-lg bg-background flex items-center justify-center hover:bg-muted/10 transition disabled:opacity-40"
                      >
                        <Plus className="w-4 h-4 text-foreground" />
                      </button>
                    </div>
                  </div>

                  {/* Calculations breakdown for multiple quantities */}
                  {quantity > 1 && (
                    <div className="bg-background rounded-lg p-3 space-y-2 text-xs border border-border">
                      <div className="flex justify-between font-medium text-foreground-secondary">
                        <span>
                          ${product.price} x {quantity} items
                        </span>
                        <span>${product.price * quantity}</span>
                      </div>
                      {product.deposit && (
                        <div className="flex justify-between font-medium text-foreground-secondary">
                          <span>
                            Deposit: ${product.deposit} x {quantity} items
                          </span>
                          <span>${product.deposit * quantity}</span>
                        </div>
                      )}
                      <div className="border-t border-border pt-1.5 flex justify-between font-bold text-primary">
                        <span>Estimated Total</span>
                        <span>
                          ${(product.price + (product.deposit || 0)) * quantity}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Add to cart trigger */}
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-black rounded-lg uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Shopping Cart</span>
                  </button>
                </form>
              )}

              <div className="pt-2 border-t border-border text-center">
                <p className="text-[10px] text-muted flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                  <span>Interactive simulation — No credit card required</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
