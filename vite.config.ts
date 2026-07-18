import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { VitePWA, type DisplayOverride, type ManifestOptions } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        // Only the manifest icons are precached — the splash screen reuses icon-512.png,
        // so these cover offline too. Screenshots are fetched on demand by the install
        // prompt and don't belong in the precache.
        includeAssets: ['icon-192.png', 'icon-512.png'],
        workbox: {
          importScripts: ['sw-custom.js']
        },
        manifest: {
          name: 'Office Health v2.0',
          short_name: 'Office Health v2.0',
          description: 'Aplikacja wspierająca zdrowie i efektywność w pracy biurowej.',
          theme_color: '#0f172a',
          background_color: '#0f172a',
          display: 'standalone',
          // 'tabbed' is valid per the W3C manifest spec, but the plugin's DisplayOverride
          // union stops at Display | 'window-controls-overlay', so tsc rejects it.
          display_override: ['window-controls-overlay', 'tabbed', 'standalone'] as unknown as DisplayOverride[],
          orientation: 'portrait',
          lang: 'pl',
          dir: 'ltr',
          scope: '/',
          start_url: '/',
          id: '/?source=pwa',
          categories: ['health', 'productivity'],
          edge_side_panel: {
            preferred_width: 400
          },
          launch_handler: {
            client_mode: ['navigate-existing', 'auto']
          },
          file_handlers: [
            {
              action: "/",
              accept: {
                "text/plain": [".txt"]
              }
            }
          ],
          protocol_handlers: [
            {
              protocol: "web+officehealth",
              url: "/?uri=%s"
            }
          ],
          prefer_related_applications: true,
          related_applications: [
            {
              platform: "play",
              url: "https://play.google.com/store/apps/details?id=com.officehealth.app",
              id: "com.officehealth.app"
            }
          ],
          share_target: {
            action: "/",
            method: "GET",
            params: {
              title: "title",
              text: "text",
              url: "url"
            }
          },
          iarc_rating_id: "e84b072d-71b3-4d3e-86ae-31a8ce4e53b7",
          widgets: [
            {
              name: "Office Health Widget",
              short_name: "Health",
              description: "Widget do szybkiego podglądu nawodnienia i zadań.",
              tag: "office-health-widget",
              template_url: "https://office-health-v2-0-653665935798.europe-west2.run.app/widget.json",
              type: "application/json",
              icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }]
            }
          ],
          note_taking: {
            new_note_url: "/?new_note=true"
          },
          scope_extensions: [
            {
              origin: "https://*.europe-west2.run.app"
            }
          ],
          shortcuts: [
            {
              name: "Rutyna",
              url: "/?tab=routine",
              icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }]
            }
          ],
          icons: [
            {
              src: '/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: '/icon-512.png',
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
          // widgets and note_taking are real spec fields that ManifestOptions doesn't model.
        } as Partial<ManifestOptions>
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
