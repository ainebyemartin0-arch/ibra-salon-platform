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
        src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=192&auto=format&fit=crop',
        sizes: '192x192',
        type: 'image/jpeg',
        purpose: 'any',
      },
      {
        src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=512&auto=format&fit=crop',
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'any',
      },
    ],
  };
}
