"use client";

import React, { createContext, useContext, useState } from "react";

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
  setRole: (role: UserRole) => void;
  addProperty: (property: Omit<Property, "id" | "createdAt" | "ownerId">) => Property;
  bookProperty: (propertyId: string, startDate: string, endDate: string) => { success: boolean; message: string; booking?: Booking };
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

const initialTowns: Town[] = [
  { id: "t-1", name: "Greenwood", description: "A lush, peaceful suburb with beautiful parks and historic homes." },
  { id: "t-2", name: "Riverdale", description: "Vibrant riverside district featuring rich local culture and dining." },
  { id: "t-3", name: "Oakwood", description: "Upscale wooded neighborhood known for absolute tranquility and scenery." },
  { id: "t-4", name: "Lakeside", description: "Breathtaking views and cozy lakefront cabins perfect for weekend escapes." },
];

const initialProperties: Property[] = [
  {
    id: "p-1",
    title: "Charming Lakeside Cottage with Private Dock",
    description: "Enjoy a relaxing getaway in this beautifully appointed cottage right on the shores of Lake Serene. Features an expansive deck, fully equipped gourmet kitchen, and private boat dock. Perfect for swimming, kayaking, and sunset viewing. Within walking distance to Lakeside's historic village shops and bistros.",
    price: 240,
    address: "412 Lakeview Dr",
    townId: "t-4",
    ownerId: "u-2",
    amenities: ["Lake View", "Private Dock", "Wifi", "Kitchen", "Fireplace", "Kayaks Included", "Air Conditioning"],
    imageUrl: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1000",
    createdAt: "2025-01-10T12:00:00.000Z",
  },
  {
    id: "p-2",
    title: "Modern Greenwood Townhouse with Rooftop Deck",
    description: "Sleek and contemporary 3-story townhouse in the heart of Greenwood. Features brand-new high-end appliances, floor-to-ceiling windows, and a massive private rooftop terrace with views of the sunset. Enjoy nearby biking paths, cafes, and easy access to transit.",
    price: 185,
    address: "88 Maple Ave",
    townId: "t-1",
    ownerId: "u-2",
    amenities: ["Rooftop Terrace", "Wifi", "Modern Kitchen", "Dedicated Workspace", "Smart TV", "Washer & Dryer"],
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000",
    createdAt: "2025-01-15T09:30:00.000Z",
  },
  {
    id: "p-3",
    title: "Luxury Riverfront Loft",
    description: "Industrial chic loft with stunning views of the Riverdale waters. Highlights include soaring 14ft ceilings, exposed brick walls, and custom steel finishes. Step outside and enjoy the vibrant boardwalk, top-rated sushi restaurants, and live music venues just steps from your entrance.",
    price: 310,
    address: "102 Boardwalk Way",
    townId: "t-2",
    ownerId: "u-2",
    amenities: ["River View", "Boardwalk Access", "High Ceilings", "Gym Access", "Wifi", "Pet Friendly", "Secure Parking"],
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000",
    createdAt: "2025-01-18T15:45:00.000Z",
  },
  {
    id: "p-4",
    title: "Cozy Redwood Cabin in Oakwood Hills",
    description: "Nestled among towering redwood trees, this romantic cabin offers the ultimate peaceful forest escape. Melt away stress in the outdoor cedar hot tub, cozy up by the stone fireplace, or explore miles of hiking trails starting directly from your backyard.",
    price: 195,
    address: "740 Forest Glen Rd",
    townId: "t-3",
    ownerId: "u-3",
    amenities: ["Outdoor Hot Tub", "Wood Fireplace", "Mountain Views", "Hiking Trails", "Wifi", "BBQ Grill"],
    imageUrl: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=1000",
    createdAt: "2025-01-20T08:00:00.000Z",
  },
  {
    id: "p-5",
    title: "Sunset Marina Apartment",
    description: "Modern, light-filled 1-bedroom apartment overlooking Riverdale's yacht club. Includes a large private balcony perfect for your morning espresso, high-speed fiber internet, and premium mattress. Access to a heated infinity pool and luxury clubroom.",
    price: 150,
    address: "33 Yacht Club Ln",
    townId: "t-2",
    ownerId: "u-2",
    amenities: ["Marina View", "Private Balcony", "Infinity Pool Access", "Wifi", "Kitchen", "Air Conditioning"],
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000",
    createdAt: "2025-01-22T10:15:00.000Z",
  }
];

const initialBookings: Booking[] = [
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
];

const initialReviews: Review[] = [
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
    comment: "Sensational rooftop view! The townhouse was incredibly clean and the neighborhood is lovely. John was very helpful with suggestions.",
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
  }
];

export const MockDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeUser, setActiveUser] = useState<MockUser>(initialUsers[0]!);
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

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

  const bookProperty = (propertyId: string, startDate: string, endDate: string) => {
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

    // Check conflict
    const hasConflict = bookings.some((b) => {
      if (b.propertyId !== propertyId || b.status === "CANCELLED") return false;
      const bStart = new Date(b.startDate);
      const bEnd = new Date(b.endDate);
      return start < bEnd && end > bStart;
    });

    if (hasConflict) {
      return { success: false, message: "These dates are already booked. Please choose a different date range." };
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const totalPrice = diffDays * targetProp.price;

    const booking: Booking = {
      id: `b-${Date.now()}`,
      propertyId,
      userId: activeUser.id,
      startDate,
      endDate,
      status: "CONFIRMED",
      totalPrice,
      createdAt: new Date().toISOString(),
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
        towns: initialTowns,
        properties,
        bookings,
        reviews,
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
