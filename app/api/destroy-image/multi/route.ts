import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { publicIds }: { publicIds: string[] } = body;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    if (publicIds.length > 0) {
      const responses: any[] = [];

      publicIds.forEach(async (publicId) => {
        const response = await cloudinary.uploader.destroy(publicId);
        responses.push(response);
      });
      return NextResponse.json(responses);

      // return NextResponse.json(data.content);
    } else {
      return NextResponse.json({ message: 'NO IMAGE', status: 404 });
    }
  } catch (error: any) {
    return new NextResponse('INTERNAL ERROR', {
      status: 500,
    });
  }
}
