const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(/src="\/icon.svg"/g, 'src="/app-icon-v2026.png"');
fs.writeFileSync('src/App.tsx', app);

let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/href="\/icon.svg"/g, 'href="/icon-192-v2026.png"');
html = html.replace(/type="image\/svg\+xml"/g, 'type="image/png"');
fs.writeFileSync('index.html', html);

let manifest = fs.readFileSync('public/manifest.json', 'utf8');
manifest = manifest.replace(/"src": "\/icon.svg"/g, '"src": "/icon-512-v2026.png"');
manifest = manifest.replace(/"sizes": "any"/g, '"sizes": "512x512"');
manifest = manifest.replace(/"type": "image\/svg\+xml"/g, '"type": "image/png"');
fs.writeFileSync('public/manifest.json', manifest);

let vite = fs.readFileSync('vite.config.ts', 'utf8');
vite = vite.replace(/includeAssets: \['icon.svg', 'screenshot-wide.svg', 'screenshot-narrow.svg'\]/, 
  "includeAssets: ['icon-192-v2026.png', 'icon-512-v2026.png', 'screenshot-wide-v2026.png', 'screenshot-narrow-v2026.png', 'app-icon-v2026.png']");
vite = vite.replace(/\{ src: "\/icon.svg", sizes: "any", type: "image\/svg\+xml" \}/g, '{ src: "/icon-192-v2026.png", sizes: "192x192", type: "image/png" }');
vite = vite.replace(/icons: \[\s*\{\s*src: '\/icon.svg',\s*sizes: 'any',\s*type: 'image\/svg\+xml',\s*purpose: 'any maskable'\s*\}\s*\]/m, `icons: [
            {
              src: '/icon-192-v2026.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: '/icon-512-v2026.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]`);
vite = vite.replace(/screenshots: \[\s*\{\s*src: '\/screenshot-wide.svg',\s*sizes: '1920x1080',\s*type: 'image\/svg\+xml',\s*form_factor: 'wide'\s*\},\s*\{\s*src: '\/screenshot-narrow.svg',\s*sizes: '1080x1920',\s*type: 'image\/svg\+xml',\s*form_factor: 'narrow'\s*\}\s*\]/m, `screenshots: [
            {
              src: '/screenshot-wide-v2026.png',
              sizes: '1920x1080',
              type: 'image/png',
              form_factor: 'wide'
            },
            {
              src: '/screenshot-narrow-v2026.png',
              sizes: '1080x1920',
              type: 'image/png',
              form_factor: 'narrow'
            }
          ]`);
fs.writeFileSync('vite.config.ts', vite);

console.log('Refs updated successfully.');
