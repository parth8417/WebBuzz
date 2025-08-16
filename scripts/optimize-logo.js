/**
 * Logo Optimization Script
 * 
 * This script optimizes the WebBuzz logo for different use cases
 * It creates variants for different parts of the site
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get the directory name equivalent to __dirname in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define source and destinations
const SOURCE_LOGO = path.join(__dirname, '../src/assets/webbuzz-logo.png');
const DESTINATIONS = [
  // Navbar logo
  {
    path: path.join(__dirname, '../src/assets/webbuzz-logo-navbar.png'),
    width: 160,
    quality: 90
  },
  // Hero logo
  {
    path: path.join(__dirname, '../src/assets/webbuzz-logo-hero.png'),
    width: 200,
    quality: 90
  },
  // Footer logo
  {
    path: path.join(__dirname, '../src/assets/webbuzz-logo-footer.png'),
    width: 120,
    quality: 90
  },
  // Favicon (higher quality)
  {
    path: path.join(__dirname, '../public/webbuzz-logo.png'),
    width: 192,
    quality: 100
  }
];

async function optimizeLogos() {
  console.log('🔍 Checking if source logo exists...');
  
  if (!fs.existsSync(SOURCE_LOGO)) {
    console.error('❌ Source logo not found! Please make sure the logo is at:', SOURCE_LOGO);
    return;
  }
  
  console.log('✅ Source logo found!');
  console.log('🔄 Creating optimized versions...');
  
  try {
    // Process each destination
    for (const dest of DESTINATIONS) {
      await sharp(SOURCE_LOGO)
        .resize(dest.width)
        .png({ quality: dest.quality })
        .toFile(dest.path);
      
      console.log(`✅ Created: ${path.basename(dest.path)}`);
    }
    
    console.log('🎉 All logo variants created successfully!');
  } catch (err) {
    console.error('❌ Error optimizing logos:', err);
  }
}

// Run the optimization
optimizeLogos();
