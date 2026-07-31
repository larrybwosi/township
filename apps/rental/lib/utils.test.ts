import { describe, it, expect } from "vitest";
import { formatPrice, calculateNights, formatUserGreeting } from "./utils";

describe("Rental App Utility Functions", () => {
  describe("formatPrice", () => {
    it("should correctly format various numeric prices", () => {
      expect(formatPrice(150)).toBe("$150");
      expect(formatPrice(1200)).toBe("$1,200");
      expect(formatPrice(0)).toBe("$0");
    });
  });

  describe("calculateNights", () => {
    it("should correctly calculate positive date difference", () => {
      expect(calculateNights("2025-03-10", "2025-03-15")).toBe(5);
      expect(calculateNights("2025-04-01", "2025-04-02")).toBe(1);
    });

    it("should handle identical dates as 0 nights", () => {
      expect(calculateNights("2025-03-10", "2025-03-10")).toBe(0);
    });

    it("should handle check-out before check-in as 0 nights", () => {
      expect(calculateNights("2025-03-15", "2025-03-10")).toBe(0);
    });

    it("should handle empty or malformed inputs gracefully", () => {
      expect(calculateNights("", "2025-03-15")).toBe(0);
      expect(calculateNights("2025-03-10", "")).toBe(0);
      expect(calculateNights("invalid-date", "2025-03-15")).toBe(0);
    });
  });

  describe("formatUserGreeting", () => {
    it("should return custom host greetings", () => {
      expect(formatUserGreeting("Alice", "HOMEOWNER")).toBe("Welcome back, Host Alice!");
    });

    it("should return admin greetings", () => {
      expect(formatUserGreeting("Bob", "ADMIN")).toBe("Admin Panel: Bob");
    });

    it("should return standard guest greetings", () => {
      expect(formatUserGreeting("John", "CUSTOMER")).toBe("Hello, John! Find your perfect stay today.");
    });
  });
});
