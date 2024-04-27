import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

interface BodyOptions {
  folder?: string;
  images: string[];
}

export async function POST(req: Request) {
  try {
    const data: BodyOptions = await req.json();

    if (data && data.images.length > 0) {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });

      const cloudinaryPromises = data.images.map(async (image) => {
        return cloudinary.uploader
          .upload(image, {
            folder: data?.folder ?? 'list',
          })
          .then((response) => {
            return {
              id: response.public_id,
              url: response.url,
            };
          });
      });

      const res = await Promise.all(cloudinaryPromises);

      console.log('API', res);
      return NextResponse.json(res);
    } else {
      return new NextResponse('NO FUCKING IMAGE', { status: 200 });
    }
  } catch (error) {
    console.log(error);

    return new NextResponse('ERROR ANYING', {
      status: 500,
    });
  }
}
