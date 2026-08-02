/* eslint-disable @typescript-eslint/no-explicit-any */
import { createImageUrlBuilder } from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mock-project-id"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: any) => {
  return builder.image(source)
}

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
