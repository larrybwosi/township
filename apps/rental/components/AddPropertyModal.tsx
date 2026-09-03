"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useMockData, PropertyCategory } from "../context/MockDataContext";
import { X, Plus, Info } from "lucide-react";

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultImages = [
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000",
];

const availableAmenities = [
  "Wifi",
  "Kitchen",
  "Air Conditioning",
  "Wood Fireplace",
  "Private Dock",
  "Outdoor Hot Tub",
  "Pet Friendly",
  "Dedicated Workspace",
  "Private Balcony",
  "Mountain Views",
  "Infinity Pool Access",
];

export default function AddPropertyModal({
  isOpen,
  onClose,
}: AddPropertyModalProps) {
  const { towns, addProperty, activeUser } = useMockData();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("150");
  const [address, setAddress] = useState("");
  const [townId, setTownId] = useState(towns[0]?.id || "");
  const [category, setCategory] = useState<PropertyCategory>("house");
  const [imageUrl, setImageUrl] = useState(defaultImages[0]!);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) return setError("Property title is required.");
    if (!description.trim() || description.length < 15) {
      return setError(
        "Please provide a description of at least 15 characters.",
      );
    }
    if (!address.trim()) return setError("Property address is required.");
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return setError("Price must be a positive number.");
    }

    try {
      addProperty({
        title,
        description,
        price: priceNum,
        address,
        townId,
        category,
        imageUrl,
        amenities: selectedAmenities,
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        // Reset
        setTitle("");
        setDescription("");
        setPrice("150");
        setAddress("");
        setTownId(towns[0]?.id || "");
        setCategory("house");
        setSelectedAmenities([]);
        onClose();
      }, 1500);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-surface rounded-xl shadow-2xl border border-border w-full max-w-2xl max-h-[90vh] flex flex-col relative z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              List a New Property
            </h3>
            <p className="text-xs text-muted">
              Listing as{" "}
              <span className="font-semibold text-primary">
                {activeUser.name}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-muted/10 text-muted hover:text-foreground transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {success ? (
          <div className="p-8 text-center flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
              <Plus className="w-10 h-10 rotate-45" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-1">
              Property Listed!
            </h3>
            <p className="text-sm text-muted">
              Your property was added successfully and is now live on the
              Portal.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto p-6 space-y-4"
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 text-sm p-3.5 rounded-lg font-medium flex items-center gap-2">
                <Info className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Title */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Property Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Elegant Forest View Villa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Detailed Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your property amenities, layout, nearby attractions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Price Per Night ($)
                </label>
                <input
                  type="number"
                  placeholder="150"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3.5 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>

              {/* Town selection */}
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Location / Town
                </label>
                <select
                  value={townId}
                  onChange={(e) => setTownId(e.target.value)}
                  className="w-full px-3.5 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  {towns.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Category selection */}
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Property Type / Category
                </label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as PropertyCategory)
                  }
                  className="w-full px-3.5 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="house">House</option>
                  <option value="apartment_single">
                    Single Apartment House
                  </option>
                  <option value="apartment_building">
                    Apartment Building (Multi-unit)
                  </option>
                  <option value="guesthouse">Guest House</option>
                  <option value="motel">Motel</option>
                  <option value="hotel">Hotel</option>
                </select>
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Exact Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. 104 Woodland Road"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>

              {/* Cover Image URL Selection */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Select Cover Image Preset
                </label>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {defaultImages.map((img, i) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setImageUrl(img)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                        imageUrl === img
                          ? "border-accent scale-95 shadow-md"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Preset ${i + 1}`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Or enter a custom image URL..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 mt-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>

              {/* Amenities Checklist */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                  Select Amenities Included
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableAmenities.map((amenity) => {
                    const checked = selectedAmenities.includes(amenity);
                    return (
                      <button
                        type="button"
                        key={amenity}
                        onClick={() => handleAmenityToggle(amenity)}
                        className={`px-3 py-1.5 rounded-lg border text-xs text-left font-medium transition flex items-center justify-between ${
                          checked
                            ? "bg-primary-light border-primary/40 text-primary"
                            : "bg-background border-border text-foreground-secondary hover:border-muted"
                        }`}
                      >
                        <span>{amenity}</span>
                        {checked && (
                          <span className="text-accent font-bold">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-border flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-border text-foreground-secondary rounded-md text-sm hover:bg-muted/5 transition font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-primary hover:bg-primary-hover text-white rounded-md text-sm transition font-semibold shadow-sm"
              >
                Publish Listing
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
