import { describe, it, expect } from "vitest";
import { multiply, formatDocTitle } from "./utils";

describe("utils in docs app", () => {
  it("should correctly multiply two numbers", () => {
    expect(multiply(3, 4)).toBe(12);
  });

  it("should correctly format document title", () => {
    expect(formatDocTitle("Introduction")).toBe("Docs: Introduction");
  });
});
