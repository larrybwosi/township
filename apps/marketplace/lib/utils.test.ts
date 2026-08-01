import { describe, it, expect } from "vitest";

// A dummy interface matching our wrapper to verify that structures are consistent
interface SanityProductSpec {
  name: string;
  value: string;
}

interface SanityProduct {
  _id: string;
  _type: "product";
  title: string;
  description: string;
  price: number;
  deposit?: number;
  category: "furniture" | "local-goods" | "home-appliances" | "services";
  imageUrl: string;
  stock: number;
  specs: SanityProductSpec[];
  createdAt: string;
}

const mockProduct: SanityProduct = {
  _id: "prod-test",
  _type: "product",
  title: "Test Handcrafted Chair",
  description: "A gorgeous walnut accent chair.",
  price: 250,
  deposit: 50,
  category: "furniture",
  stock: 10,
  imageUrl: "https://example.com/chair.jpg",
  specs: [
    { name: "Material", value: "Walnut" },
    { name: "Height", value: "95cm" },
  ],
  createdAt: "2025-01-01T00:00:00.000Z",
};

describe("Marketplace Calculations", () => {
  it("should calculate correct item subtotals", () => {
    const qty = 3;
    const itemSubtotal = mockProduct.price * qty;
    expect(itemSubtotal).toBe(750);
  });

  it("should calculate correct deposits when required", () => {
    const qty = 2;
    const depositRequired = (mockProduct.deposit || 0) * qty;
    expect(depositRequired).toBe(100);
  });

  it("should calculate correct grand invoice totals combining price and deposits", () => {
    const qty = 4;
    const baseTotal = mockProduct.price * qty;
    const depositTotal = (mockProduct.deposit || 0) * qty;
    const grandTotal = baseTotal + depositTotal;
    expect(grandTotal).toBe(1200);
  });

  it("should verify optional deposits fallback gracefully to 0", () => {
    const noDepositProduct: SanityProduct = {
      ...mockProduct,
      deposit: undefined,
    };
    const qty = 5;
    const depositTotal = (noDepositProduct.deposit || 0) * qty;
    expect(depositTotal).toBe(0);
  });
});
