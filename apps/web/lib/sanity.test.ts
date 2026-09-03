import { describe, it, expect } from "vitest";
import { getSiteMetadata, mockSiteMetadataWeb } from "./sanity";
import { resolveImageUrl } from "../sanity/lib/image";

describe("Sanity Metadata and Image Helpers - Web", () => {
  it("should return correct site metadata for web app", async () => {
    const metadata = await getSiteMetadata("web");
    expect(metadata).toBeDefined();
    expect(metadata.appIdentifier).toBe("web");
    expect(metadata.title).toBe(mockSiteMetadataWeb.title);
    expect(metadata.description).toBe(mockSiteMetadataWeb.description);
  });

  it("should resolve raw image string URL properly", () => {
    const rawUrl = "https://images.unsplash.com/photo-12345";
    const resolved = resolveImageUrl(rawUrl);
    expect(resolved).toBe(rawUrl);
  });

  it("should return empty string for empty image source", () => {
    expect(resolveImageUrl(null)).toBe("");
    expect(resolveImageUrl(undefined)).toBe("");
  });
});
