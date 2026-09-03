import { describe, it, expect } from "vitest";
import { getSiteMetadata, mockSiteMetadataRental } from "./sanity";
import { resolveImageUrl } from "./image";

describe("Sanity Metadata and Image Helpers - Rental", () => {
  it("should return correct site metadata for rental app", async () => {
    const metadata = await getSiteMetadata("rental");
    expect(metadata).toBeDefined();
    expect(metadata.appIdentifier).toBe("rental");
    expect(metadata.title).toBe(mockSiteMetadataRental.title);
    expect(metadata.description).toBe(mockSiteMetadataRental.description);
  });

  it("should resolve raw image string URL properly", () => {
    const rawUrl = "https://images.unsplash.com/photo-rental-12345";
    const resolved = resolveImageUrl(rawUrl);
    expect(resolved).toBe(rawUrl);
  });

  it("should return empty string for null or undefined image source", () => {
    expect(resolveImageUrl(null)).toBe("");
    expect(resolveImageUrl(undefined)).toBe("");
  });
});
