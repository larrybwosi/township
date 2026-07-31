"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { sanityClient, SanityProperty, SanityTown } from "../lib/sanity";

export type UserRole = "CUSTOMER" | "HOMEOWNER" | "ADMIN";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Town {
  id: string;
  name: string;
  description: string;
}

export type PropertyCategory = "house" | "apartment_single" | "apartment_building" | "guesthouse" | "motel" | "hotel";

export interface PropertyUnit {
  id: string;
  name: string;
  price: number;
  rooms: number;
  description: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  townId: string;
  ownerId: string;
  amenities: string[];
  imageUrl: string;
  createdAt: string;
  category: PropertyCategory;
  units?: PropertyUnit[];
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  totalPrice: number;
  createdAt: string;
  unitId?: string; // Optional field for multi-unit properties
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface MockDataContextType {
  users: MockUser[];
  activeUser: MockUser;
  towns: Town[];
  properties: Property[];
  bookings: Booking[];
  reviews: Review[];
  isLoading: boolean;
  setRole: (role: UserRole) => void;
  addProperty: (property: Omit<Property, "id" | "createdAt" | "ownerId">) => Property;
  bookProperty: (
    propertyId: string,
    startDate: string,
    endDate: string,
    unitId?: string
  ) => { success: boolean; message: string; booking?: Booking };
  addReview: (propertyId: string, rating: number, comment: string) => void;
  deleteProperty: (propertyId: string) => void;
  cancelBooking: (bookingId: string) => void;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

const initialUsers: MockUser[] = [
  { id: "u-1", name: "John Doe", email: "john@township.com", role: "CUSTOMER" },
  { id: "u-2", name: "Alice Smith", email: "alice@township.com", role: "HOMEOWNER" },
  { id: "u-3", name: "Bob Jones", email: "bob@township.com", role: "ADMIN" },
];

export const MockDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeUser, setActiveUser] = useState<MockUser>(initialUsers[0]!);
  const [properties, setProperties] = useState<Property[]>([]);
  const [towns, setTowns] = useState<Town[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and load from "Sanity" client
  useEffect(() => {
    async function loadSanityContent() {
      setIsLoading(true);
      try {
        const fetchedTowns = await sanityClient.fetch<SanityTown[]>('*[_type == "town"]');
        const fetchedProperties = await sanityClient.fetch<SanityProperty[]>('*[_type == "property"]');

        setTowns(
          fetchedTowns.map((t) => ({
            id: t.id,
            name: t.name,
            description: t.description,
          }))
        );

        setProperties(
          fetchedProperties.map((p) => ({
            id: p._id,
            title: p.title,
            description: p.description,
            price: p.price,
            address: p.address,
            townId: p.townId,
            ownerId: p.ownerId,
            amenities: p.amenities,
            imageUrl: p.imageUrl,
            createdAt: p.createdAt,
            category: p.category,
            units: p.units?.map((u) => ({
              id: u.id,
              name: u.name,
              price: u.price,
              rooms: u.rooms,
              description: u.description,
            })),
          }))
        );

        // Seeding some initial bookings & reviews that align with p-1, etc.
        setBookings([
          {
            id: "b-1",
            propertyId: "p-1",
            userId: "u-1",
            startDate: "2025-03-10",
            endDate: "2025-03-15",
            status: "CONFIRMED",
            totalPrice: 1200,
            createdAt: "2025-02-01T10:00:00.000Z",
          },
        ]);

        setReviews([
          {
            id: "r-1",
            propertyId: "p-1",
            userId: "u-1",
            userName: "John Doe",
            rating: 5,
            comment: "Absolutely breathtaking! The cabin is beautifully maintained and the dock was perfect for afternoon swimming. Will definitely come back!",
            createdAt: "2025-02-15T16:00:00.000Z",
          },
          {
            id: "r-2",
            propertyId: "p-1",
            userId: "u-3",
            userName: "Bob Jones",
            rating: 4,
            comment: "Lovely place, great location. Kitchen was super equipped. Wifi was slightly slow but the lake views make up for it completely.",
            createdAt: "2025-02-18T14:30:00.000Z",
          },
          {
            id: "r-3",
            propertyId: "p-2",
            userId: "u-1",
            userName: "John Doe",
            rating: 5,
            comment: "Sensational townhouse view! The design is incredibly clean and the neighborhood is lovely.",
            createdAt: "2025-02-20T11:00:00.000Z",
          },
          {
            id: "r-4",
            propertyId: "p-4",
            userId: "u-1",
            userName: "John Doe",
            rating: 5,
            comment: "Unbelievable cabin. The wood fire was incredibly cozy and soaking in the outdoor hot tub under the star-filled redwood canopy was magic.",
            createdAt: "2025-02-22T21:10:00.000Z",
          },
        ]);
      } catch (err) {
        console.error("Failed to fetch from mock Sanity client", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadSanityContent();
  }, []);

  const setRole = (role: UserRole) => {
    const user = initialUsers.find((u) => u.role === role) || initialUsers[0]!;
    setActiveUser(user);
  };

  const addProperty = (newProp: Omit<Property, "id" | "createdAt" | "ownerId">) => {
    const property: Property = {
      ...newProp,
      id: `p-${Date.now()}`,
      ownerId: activeUser.id,
      createdAt: new Date().toISOString(),
    };
    setProperties((prev) => [property, ...prev]);
    return property;
  };

  const bookProperty = (propertyId: string, startDate: string, endDate: string, unitId?: string) => {
    const targetProp = properties.find((p) => p.id === propertyId);
    if (!targetProp) {
      return { success: false, message: "Property not found." };
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { success: false, message: "Please select valid check-in and check-out dates." };
    }

    if (start >= end) {
      return { success: false, message: "Check-out date must be after check-in date." };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (start < today) {
      return { success: false, message: "Check-in date cannot be in the past." };
    }

    // Check conflict (either same property-wide, or same unit)
    const hasConflict = bookings.some((b) => {
      if (b.propertyId !== propertyId || b.status === "CANCELLED") return false;
      // If booking a specific unit, only conflict if it's the exact same unit
      if (unitId || b.unitId) {
        if (b.unitId !== unitId) return false;
      }
      const bStart = new Date(b.startDate);
      const bEnd = new Date(b.endDate);
      return start < bEnd && end > bStart;
    });

    if (hasConflict) {
      return { success: false, message: "These dates are already booked. Please choose a different date range." };
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Determine the price: either specific unit price or default property price
    let activePrice = targetProp.price;
    if (unitId && targetProp.units) {
      const targetUnit = targetProp.units.find((u) => u.id === unitId);
      if (targetUnit) {
        activePrice = targetUnit.price;
      }
    }

    const totalPrice = diffDays * activePrice;

    const booking: Booking = {
      id: `b-${Date.now()}`,
      propertyId,
      userId: activeUser.id,
      startDate,
      endDate,
      status: "CONFIRMED",
      totalPrice,
      createdAt: new Date().toISOString(),
      unitId,
    };

    setBookings((prev) => [booking, ...prev]);
    return { success: true, message: "Your booking was successfully confirmed!", booking };
  };

  const addReview = (propertyId: string, rating: number, comment: string) => {
    const review: Review = {
      id: `r-${Date.now()}`,
      propertyId,
      userId: activeUser.id,
      userName: activeUser.name,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };
    setReviews((prev) => [review, ...prev]);
  };

  const deleteProperty = (propertyId: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    setBookings((prev) => prev.filter((b) => b.propertyId !== propertyId));
    setReviews((prev) => prev.filter((r) => r.propertyId !== propertyId));
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "CANCELLED" } : b))
    );
  };

  return (
    <MockDataContext.Provider
      value={{
        users: initialUsers,
        activeUser,
        towns,
        properties,
        bookings,
        reviews,
        isLoading,
        setRole,
        addProperty,
        bookProperty,
        addReview,
        deleteProperty,
        cancelBooking,
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error("useMockData must be used within a MockDataProvider");
  }
  return context;
};
