"use client";

import React, { useState } from "react";
import { useMarketplace, DeliveryDetails } from "../../context/MarketplaceContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { resolveImageUrl } from "../../lib/image";
import {
  Trash2,
  ShoppingCart,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  ArrowRight,
  Truck,
} from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    placeOrder,
    getCartSubtotal,
    getCartTotalDeposit,
    getCartGrandTotal,
  } = useMarketplace();

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState("");

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError("");
    setCheckoutSuccess("");

    if (!fullName || !email || !phone || !address || !city || !postalCode) {
      return setCheckoutError("Please fill out all delivery and contact details.");
    }

    const delivery: DeliveryDetails = {
      fullName,
      email,
      phone,
      address,
      city,
      postalCode,
    };

    const res = placeOrder(delivery);
    if (!res.success) {
      setCheckoutError(res.message);
    } else {
      setCheckoutSuccess(res.message);
      // Reset details
      setFullName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCity("");
      setPostalCode("");
    }
  };

  const subtotal = getCartSubtotal();
  const totalDeposit = getCartTotalDeposit();
  const grandTotal = getCartGrandTotal();

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-foreground flex items-center gap-2">
            <ShoppingCart className="w-8 h-8 text-accent" />
            <span>Shopping Cart</span>
          </h1>
          <p className="text-sm text-muted mt-1">
            Review your order and enter delivery details to submit.
          </p>
        </div>

        {checkoutSuccess ? (
          <div className="max-w-2xl mx-auto bg-surface border border-green-200 rounded-xl p-8 text-center space-y-6 shadow-md my-10">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 border border-green-200">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground">Order Placed Successfully!</h2>
              <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                Your delivery order has been submitted. The local delivery staff will package and ship your items directly to the address provided.
              </p>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/orders"
                className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition"
              >
                Track Your Orders
              </Link>
              <Link
                href="/"
                className="px-5 py-2.5 bg-background border border-border hover:bg-muted/5 text-foreground-secondary text-sm font-semibold rounded-lg transition"
              >
                Back to Marketplace
              </Link>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="text-center py-16 bg-surface border border-border rounded-xl shadow-xs">
            <ShoppingBag className="w-12 h-12 text-muted/40 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-foreground mb-1">Your cart is empty</h3>
            <p className="text-sm text-muted max-w-sm mx-auto">
              You haven&apos;t added any marketplace items or services to your cart yet.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-md hover:bg-primary-hover transition"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left: Cart Items list */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-lg font-bold text-foreground mb-3">Selected Items</h2>
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="bg-surface border border-border rounded-xl p-4 flex gap-4 items-center hover:shadow-xs transition"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveImageUrl(item.product.imageUrl)}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded-lg bg-muted shrink-0 border border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-foreground text-sm truncate">
                      {item.product.title}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">
                      Category: {item.product.category.replace("-", " ")}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs font-bold">
                      <span className="text-primary">${item.product.price} / item</span>
                      {item.product.deposit && (
                        <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 text-[10px]">
                          Deposit: ${item.product.deposit}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity selector & actions */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-1">
                      <select
                        value={item.quantity}
                        onChange={(e) => updateCartQuantity(item.product._id, parseInt(e.target.value))}
                        className="px-2 py-1 text-xs border border-border rounded-md bg-background text-foreground font-semibold"
                      >
                        {Array.from({ length: item.product.stock }).map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            Qty: {i + 1}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="p-1.5 border border-border hover:border-red-200 text-muted hover:text-red-500 rounded-md transition"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs font-extrabold text-foreground">
                      Total: ${(item.product.price + (item.product.deposit || 0)) * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Checkout details form */}
            <div className="lg:col-span-5 space-y-6 sticky top-24">
              <div className="bg-surface border border-border rounded-xl p-6 shadow-md space-y-6">
                <h3 className="text-base font-black text-foreground uppercase tracking-wider flex items-center gap-2 border-b border-border pb-3">
                  <Truck className="w-5 h-5 text-accent" />
                  <span>Delivery & Contact Details</span>
                </h3>

                {checkoutError && (
                  <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3.5 rounded-lg font-medium flex items-start gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                    <span>{checkoutError}</span>
                  </div>
                )}

                <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs font-bold">
                  {/* Full name */}
                  <div className="space-y-1">
                    <label className="block text-[10px] text-foreground uppercase tracking-wider">
                      Recipient Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-normal"
                      required
                    />
                  </div>

                  {/* Contact info row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[10px] text-foreground uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-normal"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] text-foreground uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-normal"
                        required
                      />
                    </div>
                  </div>

                  {/* Street address */}
                  <div className="space-y-1">
                    <label className="block text-[10px] text-foreground uppercase tracking-wider">
                      Street Address
                    </label>
                    <input
                      type="text"
                      placeholder="Apartment, suite, unit, building, floor..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-normal"
                      required
                    />
                  </div>

                  {/* City & Zip codes */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[10px] text-foreground uppercase tracking-wider">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="Greenwood"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-normal"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] text-foreground uppercase tracking-wider">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        placeholder="12345"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-normal"
                        required
                      />
                    </div>
                  </div>

                  {/* Pricing break downs */}
                  <div className="bg-background border border-border rounded-lg p-4 space-y-2.5 mt-6 font-semibold">
                    <h4 className="text-[10px] font-bold text-muted uppercase tracking-wider border-b border-border pb-1">
                      Pricing Summary
                    </h4>
                    <div className="flex justify-between">
                      <span>Products Subtotal</span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-amber-600">
                      <span>Refundable Deposits</span>
                      <span>+${totalDeposit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Service Fee</span>
                      <span className="text-emerald-600">FREE</span>
                    </div>
                    <div className="border-t border-border pt-2 flex justify-between text-base font-black text-primary">
                      <span>Total Invoice</span>
                      <span>${grandTotal}</span>
                    </div>
                  </div>

                  {/* Submit Order Trigger */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-accent hover:bg-accent-hover text-white text-xs font-black rounded-lg uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <span>Place Delivery Order</span>
                  </button>
                </form>

                <div className="pt-2 border-t border-border text-center">
                  <p className="text-[10px] text-muted flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                    <span>Interactive simulation — No credit card required</span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
