/* eslint-disable @typescript-eslint/no-explicit-any */
import { createImageUrlBuilder } from '@sanity/image-url'

const getBuilder = () => {
  const pId = typeof window !== "undefined" ? ((window as typeof window & { __ENV?: Record<string, string> }).__ENV?.NEXT_PUBLIC_SANITY_PROJECT_ID) : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dSet = typeof window !== "undefined" ? ((window as typeof window & { __ENV?: Record<string, string> }).__ENV?.NEXT_PUBLIC_SANITY_DATASET) : process.env.NEXT_PUBLIC_SANITY_DATASET;
  return createImageUrlBuilder({
    projectId: pId || "mock-project-id",
    dataset: dSet || "production",
  });
};

export const urlFor = (source: any) => {
  return getBuilder().image(source);
};

export const resolveImageUrl = (image: any): string => {
  if (!image) return '';
  if (typeof image === 'string') return image;
  try {
    return urlFor(image).format('webp').url();
  } catch (err) {
    console.error("Error building image URL", err);
    return '';
  }
}
