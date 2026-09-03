import { describe, it, expect } from "vitest";
import { getSiteMetadata, mockSiteMetadataMarketplace } from "./sanity";
import { resolveImageUrl } from "./image";

describe("Sanity Metadata and Image Helpers - Marketplace", () => {
  it("should return correct site metadata for marketplace app", async () => {
    const metadata = await getSiteMetadata("marketplace");
    expect(metadata).toBeDefined();
    expect(metadata.appIdentifier).toBe("marketplace");
    expect(metadata.title).toBe(mockSiteMetadataMarketplace.title);
    expect(metadata.description).toBe(mockSiteMetadataMarketplace.description);
  });

  it("should resolve raw image string URL properly", () => {
    const rawUrl = "https://images.unsplash.com/photo-marketplace-12345";
    const resolved = resolveImageUrl(rawUrl);
    expect(resolved).toBe(rawUrl);
  });

  it("should return empty string for null or undefined image source", () => {
    expect(resolveImageUrl(null)).toBe("");
    expect(resolveImageUrl(undefined)).toBe("");
  });
});
