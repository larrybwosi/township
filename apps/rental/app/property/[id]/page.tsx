"use client";

import React, { useState, useEffect } from "react";
import { useMockData } from "../../../context/MockDataContext";
import Navbar from "../../../components/Navbar";
import AddPropertyModal from "../../../components/AddPropertyModal";
import MyBookingsModal from "../../../components/MyBookingsModal";
import {
  ArrowLeft,
  MapPin,
  Star,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  Info,
  Building,
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyDetailPage({ params }: PageProps) {
  const unwrappedParams = React.use(params);
  const propertyId = unwrappedParams.id;

  const { properties, towns, reviews, bookProperty, addReview, activeUser } =
    useMockData();

  // Modal controls
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);

  // Booking widget form state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");

  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");

  // Find target property
  const property = properties.find((p) => p.id === propertyId);

  // Initialize selected unit if multiple units are available
  useEffect(() => {
    const currentProperty = property;
    if (
      currentProperty &&
      currentProperty.units &&
      currentProperty.units.length > 0
    ) {
      const firstUnit = currentProperty.units[0];
      if (firstUnit) {
        setSelectedUnitId(firstUnit.id);
      }
    }
  }, [property]);

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <Info className="w-12 h-12 text-red-500 mb-3" />
          <h2 className="text-xl font-bold text-foreground">
            Property Not Found
          </h2>
          <p className="text-sm text-muted mt-1 max-w-sm">
            We could not locate the rental listing you are looking for. It may
            have been deleted or the link is incorrect.
          </p>
          <Link
            href="/"
            className="mt-4 px-5 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-md transition shadow-xs"
          >
            Back to All Listings
          </Link>
        </main>
      </div>
    );
  }

  const town = towns.find((t) => t.id === property.townId);

  // Reviews list for this property
  const propertyReviews = reviews.filter((r) => r.propertyId === property.id);
  const averageRating =
    propertyReviews.length > 0
      ? parseFloat(
          (
            propertyReviews.reduce((sum, r) => sum + r.rating, 0) /
            propertyReviews.length
          ).toFixed(1),
        )
      : 0;

  // Selected unit details
  const chosenUnit = property.units?.find((u) => u.id === selectedUnitId);

  // Active dates calculation for booking price display
  let calculatedNights = 0;
  let subtotal = 0;
  let serviceFee = 0;
  let grandTotal = 0;

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && start < end) {
      const diffTime = Math.abs(end.getTime() - start.getTime());
      calculatedNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const activePrice = chosenUnit ? chosenUnit.price : property.price;
      subtotal = calculatedNights * activePrice;
      serviceFee = Math.round(subtotal * 0.08); // 8% service fee
      grandTotal = subtotal + serviceFee;
    }
  }

  // Handle booking form submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError("");
    setBookingSuccess("");

    if (!startDate || !endDate) {
      return setBookingError("Please pick both check-in and check-out dates.");
    }

    const res = bookProperty(
      property.id,
      startDate,
      endDate,
      selectedUnitId || undefined,
    );
    if (!res.success) {
      setBookingError(res.message);
    } else {
      setBookingSuccess(res.message);
      // Clear inputs
      setStartDate("");
      setEndDate("");
    }
  };

  // Handle review form submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError("");
    setReviewSuccess("");

    if (!reviewComment.trim()) {
      return setReviewError("Please write a comment before submitting.");
    }

    addReview(property.id, reviewRating, reviewComment);
    setReviewSuccess("Review submitted successfully!");
    setReviewComment("");
    setReviewRating(5);

    setTimeout(() => {
      setReviewSuccess("");
    }, 2000);
  };

  return (
    <>
      <Navbar
        onOpenAddProperty={() => setIsAddPropertyOpen(true)}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to All Listings</span>
          </Link>
        </div>

        {/* Hero Banner Grid */}
        <div className="bg-surface rounded-2xl overflow-hidden border border-border shadow-xs grid grid-cols-1 md:grid-cols-12 gap-1 mb-8">
          <div className="md:col-span-8 relative h-[300px] md:h-[450px] bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-dark/85 px-3 py-1.5 rounded-full border border-white/10 text-xs font-bold uppercase tracking-wider text-white">
              {town ? town.name : "Local District"}
            </div>
            <div className="absolute top-4 right-4 bg-accent px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-md">
              {property.category.replace("_", " ")}
            </div>
          </div>
          <div className="md:col-span-4 hidden md:flex flex-col gap-1 h-[450px]">
            <div className="flex-1 bg-muted relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=500"
                alt="Room Preset 2"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition duration-300"
              />
            </div>
            <div className="flex-1 bg-muted relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=500"
                alt="Room Preset 3"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition duration-300"
              />
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: General Info */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-surface border border-border rounded-xl p-6 md:p-8 space-y-4 shadow-xs">
              {/* Top Row Title & Rating */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] uppercase font-black bg-accent/10 text-accent border border-accent/10">
                    {property.category.replace("_", " ")}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-foreground leading-tight">
                  {property.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-bold text-muted pt-1">
                  <span className="flex items-center gap-1 text-foreground-secondary">
                    <MapPin className="w-4 h-4 text-accent" />
                    {property.address}
                  </span>
                  {propertyReviews.length > 0 ? (
                    <span className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {averageRating} ({propertyReviews.length} Reviews)
                    </span>
                  ) : (
                    <span className="text-muted/60 bg-muted/10 px-2 py-0.5 rounded-full">
                      No ratings yet
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-border">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">
                  About This Space
                </h3>
                <p className="text-foreground-secondary text-sm leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {/* Multi-unit layout selection and listing */}
              {property.units && property.units.length > 0 && (
                <div className="pt-6 border-t border-border space-y-4">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-accent" />
                    <span>Available Units in Building</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {property.units.map((unit) => {
                      const isSelected = selectedUnitId === unit.id;
                      return (
                        <button
                          key={unit.id}
                          onClick={() => setSelectedUnitId(unit.id)}
                          className={`p-4 rounded-xl border text-left transition flex justify-between items-center ${
                            isSelected
                              ? "border-accent bg-accent/5 ring-1 ring-accent"
                              : "border-border bg-background hover:border-muted"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-foreground text-sm">
                                {unit.name}
                              </span>
                              {isSelected && (
                                <span className="text-[10px] font-bold text-white bg-accent px-1.5 py-0.5 rounded-full">
                                  Selected unit
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted">
                              {unit.rooms} room{unit.rooms > 1 ? "s" : ""} •{" "}
                              {unit.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-base font-black text-primary">
                              ${unit.price}
                            </span>
                            <span className="text-[10px] text-muted font-bold block">
                              PER NIGHT
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Amenities */}
              <div className="pt-6 border-t border-border">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
                  Amenities & Perks
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-xs font-semibold text-foreground-secondary bg-background px-3 py-2.5 rounded-lg border border-border"
                    >
                      <span className="text-accent">✦</span>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Spotlight */}
              <div className="pt-6 border-t border-border space-y-3">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                  Property Location
                </h3>
                <div className="relative overflow-hidden rounded-xl border border-border bg-muted">
                  <iframe
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(property.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  ></iframe>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span>Exact Address: {property.address}</span>
                </div>
              </div>

              {/* Local Area Information Card */}
              {town && (
                <div className="pt-6 border-t border-border">
                  <div className="bg-primary-light/40 border border-primary/10 rounded-xl p-5">
                    <h4 className="font-bold text-primary flex items-center gap-1.5 text-sm mb-1">
                      <MapPin className="w-4 h-4 text-accent" />
                      Neighborhood Spotlight: {town.name}
                    </h4>
                    <p className="text-xs text-foreground-secondary leading-relaxed">
                      {town.description} Feel free to ask your simulated host
                      for additional custom travel tips during your visit.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Reviews Section Card */}
            <div className="bg-surface border border-border rounded-xl p-6 md:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="text-lg font-black text-foreground flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-accent" />
                  <span>Guest Reviews</span>
                </h3>
                <span className="text-xs font-bold text-muted uppercase">
                  {propertyReviews.length} total comments
                </span>
              </div>

              {/* Write a Review Block */}
              <div className="bg-background border border-border rounded-xl p-5 space-y-3">
                <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  Write a Guest Review
                </h4>
                <p className="text-xs text-muted">
                  Logged in as{" "}
                  <span className="font-semibold text-primary">
                    {activeUser.name}
                  </span>
                  . Leave your feedback below.
                </p>

                {reviewSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-800 text-xs p-3 rounded-lg font-medium">
                    {reviewSuccess}
                  </div>
                )}

                {reviewError && (
                  <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3 rounded-lg font-medium">
                    {reviewError}
                  </div>
                )}

                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-foreground-secondary">
                      Star Rating:
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewRating(star)}
                          className="p-0.5 hover:scale-110 transition"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewRating
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted/30"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Describe your stay, the comfort, convenience, or host interactions..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-md transition"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </form>
              </div>

              {/* Reviews List */}
              {propertyReviews.length === 0 ? (
                <div className="text-center py-6 text-muted italic text-xs">
                  No guest reviews yet. Be the first to leave a feedback above!
                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  {propertyReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="border-b border-border/60 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-foreground text-sm">
                          {rev.userName}
                        </span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              className={`w-3.5 h-3.5 ${
                                idx < rev.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-muted/20"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted mb-1.5">
                        {new Date(rev.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-foreground-secondary leading-relaxed italic">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Interactive Booking Form */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-surface border border-border rounded-xl p-6 shadow-md space-y-4">
              <div className="flex justify-between items-baseline border-b border-border pb-3.5">
                <div className="leading-none">
                  <span className="text-2xl font-black text-primary">
                    ${chosenUnit ? chosenUnit.price : property.price}
                  </span>
                  <span className="text-[10px] text-muted font-bold ml-1.5">
                    / NIGHT
                  </span>
                </div>
                <div className="text-xs font-bold text-muted flex items-center gap-1">
                  <Star className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />
                  <span>{averageRating || "N/A"}</span>
                </div>
              </div>

              {/* Form alerts */}
              {bookingSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 text-xs p-3.5 rounded-lg font-semibold space-y-1.5">
                  <div className="flex items-center gap-1.5 text-green-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Booking Confirmed!</span>
                  </div>
                  <p className="font-normal text-[11px] leading-relaxed text-green-700">
                    Your dates are reserved. Access your bookings list in the
                    navigation bar anytime to cancel.
                  </p>
                </div>
              )}

              {bookingError && (
                <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-3 rounded-lg font-medium flex items-start gap-1.5">
                  <Info className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                  <span className="leading-relaxed">{bookingError}</span>
                </div>
              )}

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Unit Selector inside Booking Card if multi-unit */}
                {property.units && property.units.length > 0 && (
                  <div>
                    <label className="block text-[10px] font-bold text-foreground uppercase tracking-wider mb-1">
                      Choose Unit to Book
                    </label>
                    <select
                      value={selectedUnitId}
                      onChange={(e) => setSelectedUnitId(e.target.value)}
                      className="w-full px-2.5 py-2 border border-border rounded-lg text-xs bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      {property.units.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name} - ${u.price}/night
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  {/* Check in */}
                  <div>
                    <label className="block text-[10px] font-bold text-foreground uppercase tracking-wider mb-1">
                      Check-In
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-2.5 py-2 border border-border rounded-lg text-xs bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  {/* Check out */}
                  <div>
                    <label className="block text-[10px] font-bold text-foreground uppercase tracking-wider mb-1">
                      Check-Out
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-2.5 py-2 border border-border rounded-lg text-xs bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Simulated calculation summary */}
                {calculatedNights > 0 && (
                  <div className="bg-background rounded-lg p-3 space-y-2 text-xs border border-border animate-in fade-in duration-200">
                    <div className="flex justify-between font-medium text-foreground-secondary">
                      <span>
                        ${chosenUnit ? chosenUnit.price : property.price} x{" "}
                        {calculatedNights} nights
                      </span>
                      <span>${subtotal}</span>
                    </div>
                    <div className="flex justify-between font-medium text-foreground-secondary">
                      <span>Platform service fee (8%)</span>
                      <span>${serviceFee}</span>
                    </div>
                    <div className="border-t border-border pt-1.5 flex justify-between font-bold text-primary">
                      <span>Total Price</span>
                      <span>${grandTotal}</span>
                    </div>
                  </div>
                )}

                {/* Reserve Trigger */}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white text-xs font-black rounded-lg uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Stay Now</span>
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
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white border-t border-white/5 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2 text-white/50 text-xs">
          <p className="font-semibold text-white/80">
            Township Rental Hub Portal
          </p>
          <p>
            © {new Date().getFullYear()} Township Portal. Designed for seamless
            civic stays and vacation rentals.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <AddPropertyModal
        isOpen={isAddPropertyOpen}
        onClose={() => setIsAddPropertyOpen(false)}
      />
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
      />
    </>
  );
}
