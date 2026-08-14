import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ibra Salon - Premium Grooming',
    short_name: 'Ibra Salon',
    description: 'Premium men\'s grooming and styling in Kampala. Book your appointment online.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/logo.png', // Points to the logo.png file in your public folder
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo.png', // Points to the logo.png file in your public folder
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo.png', // Ensures it looks perfect on iOS without a white box around it
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
