"use client";

import React from "react";
import { useMockData } from "../context/MockDataContext";
import { X, Calendar, DollarSign, MapPin, Trash2 } from "lucide-react";

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyBookingsModal({
  isOpen,
  onClose,
}: MyBookingsModalProps) {
  const { bookings, properties, activeUser, cancelBooking } = useMockData();

  if (!isOpen) return null;

  const userBookings = bookings.filter((b) => b.userId === activeUser.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="bg-surface rounded-xl shadow-2xl border border-border w-full max-w-2xl max-h-[85vh] flex flex-col relative z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h3 className="text-lg font-bold text-foreground">
              My Rental Bookings
            </h3>
            <p className="text-xs text-muted">
              Logged in as{" "}
              <span className="font-semibold text-primary">
                {activeUser.name}
              </span>{" "}
              ({activeUser.role})
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

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {userBookings.length === 0 ? (
            <div className="text-center py-10">
              <Calendar className="w-12 h-12 text-muted/40 mx-auto mb-3" />
              <p className="text-foreground-secondary font-medium">
                No bookings found
              </p>
              <p className="text-xs text-muted mt-1">
                Browse properties and pick dates to make your first rental
                booking!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {userBookings.map((booking) => {
                const property = properties.find(
                  (p) => p.id === booking.propertyId,
                );
                return (
                  <div
                    key={booking.id}
                    className={`border rounded-lg p-4 transition duration-150 ${
                      booking.status === "CANCELLED"
                        ? "bg-muted/5 border-border opacity-70"
                        : "bg-surface border-border hover:border-primary-light shadow-xs"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-bold text-foreground hover:text-primary transition-colors text-base">
                          {property ? property.title : "Unknown Property"}
                        </h4>
                        <p className="text-xs text-muted flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-accent" />
                          {property ? property.address : "N/A"}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 pt-2 border-t border-border/50 text-sm">
                          <span className="flex items-center gap-1.5 text-foreground-secondary font-medium">
                            <Calendar className="w-4 h-4 text-primary" />
                            {booking.startDate} to {booking.endDate}
                          </span>
                          <span className="flex items-center gap-1 text-primary font-bold">
                            <DollarSign className="w-4 h-4" />
                            {booking.totalPrice} total
                          </span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-end gap-2 shrink-0">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            booking.status === "CONFIRMED"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {booking.status}
                        </span>

                        {booking.status === "CONFIRMED" && (
                          <button
                            onClick={() => {
                              if (
                                confirm(
                                  "Are you sure you want to cancel this booking reservation?",
                                )
                              ) {
                                cancelBooking(booking.id);
                              }
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-600 rounded-md hover:bg-red-50 text-xs font-bold transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-muted/5 border-t border-border text-center">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold bg-primary text-white rounded-md hover:bg-primary-hover transition"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
}
