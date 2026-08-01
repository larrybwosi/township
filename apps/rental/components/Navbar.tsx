"use client";

import React, { useState } from "react";
import { useMockData, UserRole } from "../context/MockDataContext";
import { User, Home, PlusCircle, CheckSquare } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  onOpenAddProperty?: () => void;
  onOpenMyBookings?: () => void;
}

export default function Navbar({
  onOpenAddProperty,
  onOpenMyBookings,
}: NavbarProps) {
  const { activeUser, setRole, bookings } = useMockData();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const activeBookingsCount = bookings.filter(
    (b) => b.userId === activeUser.id && b.status !== "CANCELLED",
  ).length;

  const handleRoleChange = (role: UserRole) => {
    setRole(role);
    setShowRoleDropdown(false);
  };

  return (
    <header className="bg-dark text-white shadow-lg sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-md bg-accent flex items-center justify-center shrink-0 shadow-md">
              <Home className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-lg tracking-tight group-hover:text-accent transition-colors">
                Township Rental Hub
              </span>
              <span className="text-white/50 text-[10px] uppercase tracking-widest font-medium">
                Find your perfect stay
              </span>
            </div>
          </Link>

          {/* Desktop Right Panel */}
          <div className="flex items-center gap-4">
            {/* View My Bookings (For everyone, displays count) */}
            {onOpenMyBookings && (
              <button
                onClick={onOpenMyBookings}
                className="relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-white/80 hover:text-white rounded-md hover:bg-white/10 transition"
              >
                <CheckSquare className="w-4 h-4 text-accent" />
                <span>My Bookings</span>
                {activeBookingsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse border-2 border-dark">
                    {activeBookingsCount}
                  </span>
                )}
              </button>
            )}

            {/* List Property Button (Visible to HOMEOWNER/ADMIN) */}
            {(activeUser.role === "HOMEOWNER" || activeUser.role === "ADMIN") &&
              onOpenAddProperty && (
                <button
                  onClick={onOpenAddProperty}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-accent text-white rounded-md hover:bg-accent-hover transition shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>List Property</span>
                </button>
              )}

            {/* Simulated User Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 bg-dark-surface hover:bg-white/5 transition text-sm"
              >
                <User className="w-4 h-4 text-accent" />
                <div className="text-left leading-none hidden sm:block">
                  <p className="font-semibold text-xs text-white">
                    {activeUser.name}
                  </p>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest">
                    {activeUser.role}
                  </p>
                </div>
              </button>

              {showRoleDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowRoleDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-surface text-foreground rounded-lg shadow-xl border border-border py-1.5 z-40">
                    <div className="px-4 py-1 border-b border-border mb-1.5">
                      <p className="text-xs font-semibold text-muted">
                        Simulate Role / Session
                      </p>
                    </div>
                    <button
                      onClick={() => handleRoleChange("CUSTOMER")}
                      className={`w-full text-left px-4 py-2 text-sm flex flex-col hover:bg-primary-light transition-colors ${
                        activeUser.role === "CUSTOMER"
                          ? "bg-primary-light/50 font-semibold text-primary"
                          : "text-foreground-secondary"
                      }`}
                    >
                      <span>John Doe (Customer/Renter)</span>
                      <span className="text-[10px] text-muted">
                        Browse and book properties
                      </span>
                    </button>
                    <button
                      onClick={() => handleRoleChange("HOMEOWNER")}
                      className={`w-full text-left px-4 py-2 text-sm flex flex-col hover:bg-primary-light transition-colors ${
                        activeUser.role === "HOMEOWNER"
                          ? "bg-primary-light/50 font-semibold text-primary"
                          : "text-foreground-secondary"
                      }`}
                    >
                      <span>Alice Smith (Homeowner)</span>
                      <span className="text-[10px] text-muted">
                        Publish, manage & edit properties
                      </span>
                    </button>
                    <button
                      onClick={() => handleRoleChange("ADMIN")}
                      className={`w-full text-left px-4 py-2 text-sm flex flex-col hover:bg-primary-light transition-colors ${
                        activeUser.role === "ADMIN"
                          ? "bg-primary-light/50 font-semibold text-primary"
                          : "text-foreground-secondary"
                      }`}
                    >
                      <span>Bob Jones (Admin)</span>
                      <span className="text-[10px] text-muted">
                        Full administrative control
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
