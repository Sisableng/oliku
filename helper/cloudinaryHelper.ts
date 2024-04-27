import { checkImageType } from '@/utils/checkImageType';
import { generateCUID } from '@/utils/generateCUID';

export type ImageOptions = {
  id: string;
  url: string;
};

export const uploadImages = async (
  images: string[],
  folder: string
): Promise<ImageOptions[]> => {
  try {
    let imageFile: string[] = [];
    let imageUrl: ImageOptions[] = [];

    // Define type of images
    images.forEach((image) => {
      const imageType = checkImageType(image);

      if (imageType === 'url') {
        // Handle image URL
        imageUrl.push({
          id: generateCUID(),
          url: image,
        });
      } else if (imageType === 'base64') {
        imageFile.push(image);
      }
    });

    // Upload file images to cloudinary
    if (imageFile.length > 0) {
      const req = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          folder,
          images,
        }),
      });

      const res: ImageOptions[] = await req.json();

      // Merger image from cloudinary with image url value
      if (imageUrl.length > 0) {
        return [...imageUrl, ...res];
      }
      // Return only image from cloudinary
      else {
        return res;
      }
    }

    // Only return image url value
    return imageUrl;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw new Error('Failed to upload images');
  }
};

export const removeImage = async (publicId: string) => {
  try {
    const req = await fetch('/api/destroy-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        publicId,
      }),
    });

    if (req.ok) {
      const res = await req.json();
      if (res.status !== 404) {
        return res;
      }
    }

    return null;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw new Error('Failed to upload images');
  }
};

export const removeImages = async (publicIds: string[]) => {
  try {
    const req = await fetch('/api/destroy-image/multi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        publicIds,
      }),
    });

    if (req.ok) {
      const res = await req.json();
      if (res.status !== 404) {
        return res;
      }
    }

    return null;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw new Error('Failed to upload images');
  }
};
