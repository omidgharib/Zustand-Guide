import { type VitePWAOptions } from 'vite-plugin-pwa';

export const newsApiKey = 'pub_97975dc870625c92568f10bdbf1cb8a0f9a9';

export const PWAConfig: Partial<VitePWAOptions> = {
  includeAssets: [
    'favicon.svg',
    'favicon.ico',
    'robots.txt',
    'apple-touch-icon.png',
  ],
  manifest: {
    name: 'Zustand Guide',
    short_name: 'Zustand',
    description:
      'A comprehensive guide to React, Zustand, and Vite with PWA capabilities',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
    orientation: 'portrait',
    start_url: '/',
    scope: '/',
    categories: ['productivity', 'education', 'utilities'],
    lang: 'en',
    icons: [
      {
        src: 'icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: 'icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: 'icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: 'icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: 'icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: 'icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: 'icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: 'icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: 'icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    screenshots: [
      {
        src: 'icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        form_factor: 'wide',
      },
    ],
  },
  devOptions: {
    enabled: true,
    type: 'module',
  },
  workbox: {
    sourcemap: true,
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365,
          },
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 30,
          },
        },
      },
      {
        urlPattern: /^https:\/\/api\./i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 5,
          },
          networkTimeoutSeconds: 10,
        },
      },
    ],
    cleanupOutdatedCaches: true,
    skipWaiting: true,
    clientsClaim: true,
  },
  registerType: 'autoUpdate',
  injectRegister: 'auto',
};
