// import { ProductImage } from '@prisma/client';

export const findImageChanges = (
  dataImages: any[],
  selectedImages: string[]
) => {
  const selectedUrlsSet = new Set(selectedImages);

  const unselectedImagesForDeletion = dataImages.filter(
    (image) => !selectedUrlsSet.has(image.url)
  );

  const newImagesForUpload = selectedImages.filter(
    (url) => !dataImages.some((image) => image.url === url)
  );

  return { unselectedImagesForDeletion, newImagesForUpload };
};
