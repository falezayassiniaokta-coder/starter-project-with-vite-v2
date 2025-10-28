import { defineConfig } from 'vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/starter-project-with-vite-v2/',

  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'src', 'public'),

  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      strategy: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Dicoding Story App',
        short_name: 'Story App',
        description: 'Aplikasi berbagi cerita dari Dicoding.',
        theme_color: '#ffffff',
        start_url: '/starter-project-with-vite-v2/',
        display: 'standalone',
        background_color: '#ffffff',
        icons: [
          {
            src: 'images/logo-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'images/logo-512.png', 
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'images/logo-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
