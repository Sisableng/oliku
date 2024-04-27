import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { publicId } = body;

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    if (publicId) {
      const response = await cloudinary.uploader.destroy(publicId);
      return NextResponse.json(response);
    } else {
      return NextResponse.json({ message: 'IMAGEID NULL', status: 404 });
    }

    // return NextResponse.json(publicId);
  } catch (error) {
    return new NextResponse('INTERNAL ERROR', { status: 500 });
  }
}
