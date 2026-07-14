import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const src = path.join(__dirname, 'public', 'Icon-App_Health_Office.png');
  
  if (!fs.existsSync(src)) {
    console.error('Source file not found:', src);
    process.exit(0); // Don't fail the build if it doesn't exist yet
  }
  
  try {
    // Create 192x192 and 512x512 icons
    await sharp(src).resize(192, 192).png().toFile(path.join(__dirname, 'public', 'icon-192.png'));
    await sharp(src).resize(512, 512).png().toFile(path.join(__dirname, 'public', 'icon-512.png'));
    
    // Screenshots
    const srcBuffer = await sharp(src).resize(800, 800, {fit: 'inside'}).toBuffer();
    
    await sharp({
      create: { width: 1920, height: 1080, channels: 4, background: '#0f172a' }
    }).composite([{ input: srcBuffer, gravity: 'center' }]).png().toFile(path.join(__dirname, 'public', 'screenshot-wide.png'));

    await sharp({
      create: { width: 1080, height: 1920, channels: 4, background: '#0f172a' }
    }).composite([{ input: srcBuffer, gravity: 'center' }]).png().toFile(path.join(__dirname, 'public', 'screenshot-narrow.png'));
    
    console.log('PWA assets generated successfully');
  } catch (err) {
    console.error('Error generating PWA assets:', err);
  }
}

run();
