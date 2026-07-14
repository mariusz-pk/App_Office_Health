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
        includeAssets: ['Icon-App_Health_Office.png', 'screenshot-wide.svg', 'screenshot-narrow.svg'],
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
          display_override: ['window-controls-overlay', 'tabbed', 'standalone'],
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
              icons: [{ src: "/Icon-App_Health_Office.png", sizes: "any", type: "image/png" }]
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
              icons: [{ src: "/Icon-App_Health_Office.png", sizes: "any", type: "image/png" }]
            }
          ],
          icons: [
            {
              src: '/Icon-App_Health_Office.png',
              sizes: 'any',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ],
          screenshots: [
            {
              src: '/screenshot-wide.svg',
              sizes: '1920x1080',
              type: 'image/svg+xml',
              form_factor: 'wide'
            },
            {
              src: '/screenshot-narrow.svg',
              sizes: '1080x1920',
              type: 'image/svg+xml',
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
