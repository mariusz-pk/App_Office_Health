import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['icon-192x192.png', 'icon-512x512.png', 'screenshot-wide.png', 'screenshot-narrow.png', 'app-icon.png', 'icon.svg'],
        manifest: {
          name: 'Office Health v2.0',
          short_name: 'Office Health v2.0',
          description: 'Aplikacja wspierająca zdrowie i efektywność w pracy biurowej.',
          theme_color: '#0f172a',
          background_color: '#0f172a',
          display: 'standalone',
          display_override: ['window-controls-overlay', 'standalone'],
          orientation: 'portrait',
          lang: 'pl',
          dir: 'ltr',
          scope: '/',
          start_url: '/',
          id: '/?source=pwa',
          categories: ['health', 'productivity'],
          shortcuts: [
            {
              name: "Rutyna",
              url: "/?tab=routine",
              icons: [{ src: "/icon-192x192.png", sizes: "192x192", type: "image/png" }]
            }
          ],
          icons: [
            {
              src: '/icon-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: '/icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ],
          screenshots: [
            {
              src: '/screenshot-wide.png',
              sizes: '1920x1080',
              type: 'image/png',
              form_factor: 'wide'
            },
            {
              src: '/screenshot-narrow.png',
              sizes: '1080x1920',
              type: 'image/png',
              form_factor: 'narrow'
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
