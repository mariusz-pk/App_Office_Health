const sharp = require('sharp');
const fs = require('fs');

async function run() {
  const src = 'src/assets/images/office_health_icon_1783966900818.jpg';
  
  await sharp(src).resize(192, 192).png().toFile('public/icon-192-v2026.png');
  await sharp(src).resize(512, 512).png().toFile('public/icon-512-v2026.png');
  await sharp(src).resize(512, 512).png().toFile('public/app-icon-v2026.png');
  
  // Screenshots
  await sharp({
    create: { width: 1920, height: 1080, channels: 4, background: '#0f172a' }
  }).composite([{ input: src, gravity: 'center' }]).png().toFile('public/screenshot-wide-v2026.png');

  await sharp({
    create: { width: 1080, height: 1920, channels: 4, background: '#0f172a' }
  }).composite([{ input: src, gravity: 'center' }]).png().toFile('public/screenshot-narrow-v2026.png');
  
  console.log('Icons generated successfully.');
}
run();
