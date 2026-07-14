const fs = require('fs');
let manifest = JSON.parse(fs.readFileSync('public/manifest.json', 'utf8'));
manifest.icons = [
  {
    "src": "/icon-192-v2026.png",
    "sizes": "192x192",
    "type": "image/png",
    "purpose": "maskable any"
  },
  {
    "src": "/icon-512-v2026.png",
    "sizes": "512x512",
    "type": "image/png",
    "purpose": "maskable any"
  }
];
fs.writeFileSync('public/manifest.json', JSON.stringify(manifest, null, 2));
console.log('Fixed manifest icons');
