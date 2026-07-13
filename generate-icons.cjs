const sharp = require('sharp');
const fs = require('fs');

async function generate() {
  const svg = fs.readFileSync('public/icon.svg');
  
  await sharp(svg).resize(192, 192).png().toFile('public/icon-192x192.png');
  await sharp(svg).resize(512, 512).png().toFile('public/icon-512x512.png');
  await sharp(svg).resize(512, 512).png().toFile('public/app-icon.png');
  
  const iconBuffer = await sharp(svg).resize(512, 512).png().toBuffer();

  await sharp({
    create: {
      width: 1920,
      height: 1080,
      channels: 4,
      background: { r: 15, g: 23, b: 42, alpha: 1 }
    }
  }).composite([{ input: iconBuffer, gravity: 'center' }])
    .png().toFile('public/screenshot-wide.png');

  await sharp({
    create: {
      width: 1080,
      height: 1920,
      channels: 4,
      background: { r: 15, g: 23, b: 42, alpha: 1 }
    }
  }).composite([{ input: iconBuffer, gravity: 'center' }])
    .png().toFile('public/screenshot-narrow.png');
    
  console.log('Icons generated successfully.');
}
generate().catch(console.error);
