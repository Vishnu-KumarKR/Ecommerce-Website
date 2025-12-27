const fs = require('fs');
const path = require('path');

const PLACEHOLDER_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAuwB9MPd3vIAAAAASUVORK5CYII=';

const productsDir = path.join(__dirname, '..', 'frontend', 'public', 'products');

const filenames = [
  // Core mobiles already present
  'samsung-galaxy-s22-ultra.jpeg',
  'iphone13.webp',
  'oneplus-10-pro.png',
  'moto-fusion-5g.png',
  'iqoo-z9s-pro-5g.jpg',
  'redmi-note-13.jpg',
  // Samsung lineup
  'galaxy-z-fold5.jpg',
  'galaxy-z-flip5.jpg',
  'galaxy-s23-ultra.jpg',
  'galaxy-watch6-classic.jpg',
  'galaxy-buds2-pro.jpg',
  // Apple lineup
  'iphone-14-pro-max.jpg',
  'iphone-15-plus.jpg',
  'apple-watch-ultra-2.jpg',
  'airpods-max.jpg',
  'macbook-air-m2.jpg',
  // Realme lineup
  'realme-gt-neo-5.jpg',
  'realme-12-pro-plus.jpg',
  'realme-narzo-60.jpg',
  'realme-c67.jpg',
  'realme-buds-air-5.jpg',
  'realme-watch-3.jpg',
  // Xiaomi lineup
  'xiaomi-14-pro.jpg',
  'redmi-k70.jpg',
  'mi-pad-6.jpg',
  'xiaomi-watch-s3.jpg',
  'mi-band-8.jpg',
  'xiaomi-13t.jpg',
  // Cosmetics
  'lipstick.jpg',
  'foundation.jpg',
  'mascara.jpg',
  'eyeliner.jpg',
  'face-powder.jpg',
  'nail-polish.jpg',
  // Furniture
  'sofa.jpg',
  'dining-table.jpg',
  'office-chair.jpg',
  'bookshelf.jpg',
  'bed-frame.jpg',
  'coffee-table.jpg',
  // Watches
  'watch.jpg',
  'gold-watch.jpg',
  'sports-watch.jpg',
  'leather-watch.jpg',
  'fitness-watch.jpg',
  'designer-watch.jpg',
  // Decor
  'plant.jpg',
  'wall-art.jpg',
  'table-lamp.jpg',
  'photo-frame.jpg',
  'vase.jpg',
  'mirror.jpg',
  // Accessories
  'earbuds.jpg',
  'wallet.jpg',
  'sunglasses.jpg',
  'backpack.jpg',
  'phone-case.jpg',
  'power-bank.jpg',
];

if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

const buffer = Buffer.from(PLACEHOLDER_PNG_BASE64, 'base64');

const createdFiles = [];

filenames.forEach((filename) => {
  const filePath = path.join(productsDir, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, buffer);
    createdFiles.push(filename);
  }
});

if (createdFiles.length) {
  console.log('Created placeholder images for:', createdFiles.join(', '));
} else {
  console.log('All placeholder images already exist. No files created.');
}

