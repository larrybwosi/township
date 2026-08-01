"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { sanityClient, SanityProduct } from "../lib/sanity";

export interface CartItem {
  product: SanityProduct;
  quantity: number;
}

export interface DeliveryDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  delivery: DeliveryDetails;
  subtotal: number;
  totalDeposit: number;
  grandTotal: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED";
  createdAt: string;
}

interface MarketplaceContextType {
  products: SanityProduct[];
  cart: CartItem[];
  orders: Order[];
  isLoading: boolean;
  addToCart: (product: SanityProduct, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (delivery: DeliveryDetails) => { success: boolean; message: string; order?: Order };
  getCartSubtotal: () => number;
  getCartTotalDeposit: () => number;
  getCartGrandTotal: () => number;
  getCartItemsCount: () => number;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load products and load initial states
  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const fetchedProducts = await sanityClient.fetch<SanityProduct[]>('*[_type == "product"]');
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Failed to load products from mock Sanity", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();

    // Load state from local storage to keep items and orders persistent in session
    const savedCart = localStorage.getItem("marketplace_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        // Safe fallback
      }
    }

    const savedOrders = localStorage.getItem("marketplace_orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch {
        // Safe fallback
      }
    }
  }, []);

  // Sync state to local storage when changed
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("marketplace_cart", JSON.stringify(cart));
    }
  }, [cart, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("marketplace_orders", JSON.stringify(orders));
    }
  }, [orders, isLoading]);

  const addToCart = (product: SanityProduct, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product._id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.product.stock)) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  };

  const getCartTotalDeposit = () => {
    return cart.reduce((acc, item) => acc + (item.product.deposit || 0) * item.quantity, 0);
  };

  const getCartGrandTotal = () => {
    return getCartSubtotal() + getCartTotalDeposit();
  };

  const getCartItemsCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const placeOrder = (delivery: DeliveryDetails) => {
    if (cart.length === 0) {
      return { success: false, message: "Your shopping cart is empty." };
    }

    // Verify stock counts are available
    for (const item of cart) {
      if (item.product.stock < item.quantity) {
        return {
          success: false,
          message: `Insufficient stock for ${item.product.title}. Only ${item.product.stock} items are left in stock.`,
        };
      }
    }

    // Deduct stock levels locally in current session
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const cartMatch = cart.find((item) => item.product._id === p._id);
        if (cartMatch) {
          return { ...p, stock: p.stock - cartMatch.quantity };
        }
        return p;
      })
    );

    const subtotal = getCartSubtotal();
    const totalDeposit = getCartTotalDeposit();
    const grandTotal = getCartGrandTotal();

    const order: Order = {
      id: `ord-${Date.now()}`,
      items: [...cart],
      delivery,
      subtotal,
      totalDeposit,
      grandTotal,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [order, ...prev]);
    clearCart();

    return {
      success: true,
      message: "Your order was successfully submitted for delivery!",
      order,
    };
  };

  return (
    <MarketplaceContext.Provider
      value={{
        products,
        cart,
        orders,
        isLoading,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        placeOrder,
        getCartSubtotal,
        getCartTotalDeposit,
        getCartGrandTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
};
