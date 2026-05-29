import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'caqex6rwohoivkg0.public.blob.vercel-storage.com',
        pathname: '**', // Разрешаем все картинки с этого домена
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos/id/200/800/600',
        pathname: '**', // Разрешаем все картинки с этого домена
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
