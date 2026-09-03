/* eslint-disable @typescript-eslint/no-explicit-any */
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const getBuilder = () => {
  return createImageUrlBuilder({
    projectId: projectId || "mock-project-id",
    dataset: dataset || "production",
  });
};

export const urlFor = (source: SanityImageSource) => {
  return getBuilder().image(source);
};

export const resolveImageUrl = (image: any): string => {
  if (!image) return '';
  if (typeof image === 'string') return image;
  try {
    return urlFor(image).auto('format').fit('max').quality(80).url();
  } catch (err) {
    console.error("Error building image URL", err);
    return '';
  }
}
