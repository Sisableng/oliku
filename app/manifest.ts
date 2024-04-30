import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: 'oliku',
    name: 'Oliku',
    short_name: 'Oliku',
    description: 'Oil change reminder application with Nextjs and Tailwind CSS',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#020617',
    orientation: 'portrait',
    icons: [
      {
        src: '/assets/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/assets/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/assets/android-chrome-180x180.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
