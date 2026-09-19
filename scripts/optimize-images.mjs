import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const assetsDir = path.join(rootDir, "assets");
const outputDir = path.join(rootDir, "public", "images", "senna");
const seoDir = path.join(rootDir, "public", "images", "seo");
const brandingDir = path.join(rootDir, "public", "branding");
const logoSourceDir = path.join(rootDir, "assets", "logo");

// Ensure target directories exist
fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(seoDir, { recursive: true });
fs.mkdirSync(brandingDir, { recursive: true });

// Mapping from asset filename to semantic production base filename
const imageMappings = [
  {
    source: 'aku.png',
    destBase: 'muhammad-gabriel-luca-senna-hero',
    description: 'Hero portrait of Muhammad Gabriel Luca Senna',
  },
  {
    source: 'newborn.png',
    destBase: 'muhammad-gabriel-luca-senna-newborn',
    description: 'Newborn Muhammad Gabriel Luca Senna shortly after birth',
  },
  {
    source: 'aku2.png',
    destBase: 'senna-little-moment-01',
    description: 'Muhammad Gabriel Luca Senna during an everyday moment',
  },
  {
    source: 'aku4.png',
    destBase: 'senna-little-moment-02',
    description: 'Muhammad Gabriel Luca Senna growing and curious',
  },
  {
    source: 'popo.png',
    destBase: 'popo',
    description: 'Popo',
  },
  {
    source: 'momo.png',
    destBase: 'momo',
    description: 'Momo',
  },
  {
    source: 'withpopoandmomo.png',
    destBase: 'senna-with-popo-and-momo',
    description: 'Muhammad Gabriel Luca Senna with Popo and Momo',
  },
  {
    source: 'dirawat1.png',
    destBase: 'senna-dirawat-01',
    description: 'Luca during hospital care for fever',
  },
  {
    source: 'dirawat2.png',
    destBase: 'senna-dirawat-02',
    description: 'Luca resting during hospital care',
  },
  {
    source: 'setelahdirawat.png',
    destBase: 'senna-setelah-dirawat',
    description: 'Luca smiling and recovered after hospital care',
  },
];

const targetWidths = [480, 768, 1024, 1280];

async function optimizeImages() {
  console.log(
    'Starting image optimization with Sharp (stripping EXIF/GPS metadata)...'
  );

  for (const item of imageMappings) {
    const sourcePath = path.join(assetsDir, item.source);
    if (!fs.existsSync(sourcePath)) {
      console.warn(`[SKIP] Source image not found: ${item.source}`);
      continue;
    }

    const metadata = await sharp(sourcePath).metadata();
    const originalWidth = metadata.width || 1200;

    console.log(
      `Processing ${item.source} (${originalWidth}px) -> ${item.destBase}`
    );

    // Generate responsive widths without upscaling
    for (const width of targetWidths) {
      if (width > originalWidth + 40) {
        continue;
      }

      // Generate AVIF
      const avifDest = path.join(outputDir, `${item.destBase}-${width}.avif`);
      await sharp(sourcePath)
        .resize({ width, withoutEnlargement: true })
        .avif({ quality: 60, effort: 4 })
        .toFile(avifDest);

      // Generate WebP
      const webpDest = path.join(outputDir, `${item.destBase}-${width}.webp`);
      await sharp(sourcePath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(webpDest);
    }

    // Also produce a default full-width WebP fallback without upscaling
    const defaultWebpDest = path.join(outputDir, `${item.destBase}.webp`);
    await sharp(sourcePath)
      .resize({
        width: Math.min(originalWidth, 1280),
        withoutEnlargement: true,
      })
      .webp({ quality: 82 })
      .toFile(defaultWebpDest);
  }

  // Generate 1200x630 OpenGraph image for SEO
  console.log('Generating 1200x630 OpenGraph social share card...');
  const heroSourcePath = path.join(assetsDir, 'aku.png');
  if (fs.existsSync(heroSourcePath)) {
    const ogDest = path.join(seoDir, 'muhammad-gabriel-luca-senna-og.jpg');

    // Crop a clean portrait from hero for the OG card
    const heroThumbnail = await sharp(heroSourcePath)
      .resize({ width: 420, height: 510, fit: 'cover', position: 'center' })
      .toBuffer();

    // Create SVG overlay for high-definition editorial typography on warm background
    const svgOverlay = `
      <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="warmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FBF9F5"/>
            <stop offset="100%" stop-color="#F2ECE1"/>
          </linearGradient>
        </defs>
        <!-- Background -->
        <rect width="1200" height="630" fill="url(#warmGrad)"/>

        <!-- Elegant Border Frame -->
        <rect x="36" y="36" width="1128" height="558" rx="20" fill="none" stroke="#E2D7C7" stroke-width="2"/>
        <rect x="44" y="44" width="1112" height="542" rx="16" fill="none" stroke="#EADFCF" stroke-width="1" stroke-dasharray="6 6"/>

        <!-- Eyebrow Badge -->
        <rect x="80" y="80" width="310" height="34" rx="17" fill="#EFE5D6"/>
        <text x="96" y="102" font-family="monospace, sans-serif" font-size="12" font-weight="600" fill="#8C6E4A" letter-spacing="1.5">MY FIRST PORTFOLIO · EST. 2025</text>

        <!-- Brand / Subtitle -->
        <text x="80" y="156" font-family="sans-serif" font-size="15" font-weight="600" fill="#A89078" letter-spacing="3">OUR LITTLE SENNA</text>

        <!-- Main Heading -->
        <text x="80" y="224" font-family="sans-serif" font-size="46" font-weight="700" fill="#2C3238" letter-spacing="-0.5">Muhammad Gabriel</text>
        <text x="80" y="282" font-family="sans-serif" font-size="46" font-weight="700" fill="#2C3238" letter-spacing="-0.5">Luca Senna</text>

        <!-- Poetic Supporting Text -->
        <text x="80" y="356" font-family="sans-serif" font-size="20" font-weight="400" fill="#5F676E">A Little Life. A Growing Story.</text>
        <text x="80" y="388" font-family="sans-serif" font-size="16" font-weight="400" fill="#7D858C">Preserving milestones, family memories, and little adventures.</text>

        <!-- Metadata pill -->
        <rect x="80" y="460" width="220" height="42" rx="21" fill="#FFFFFF" stroke="#E5DDD0" stroke-width="1.5"/>
        <circle cx="106" cy="481" r="5" fill="#C98F55"/>
        <text x="122" y="487" font-family="monospace, sans-serif" font-size="14" font-weight="500" fill="#4B5358">Born 13 Feb 2025</text>

        <!-- Footer status -->
        <text x="80" y="550" font-family="monospace, sans-serif" font-size="13" font-weight="400" fill="#A4998A">journey.status = "just getting started"</text>
      </svg>
    `;

    // Composite background, typography SVG, and Senna's photo
    await sharp(Buffer.from(svgOverlay))
      .composite([
        {
          input: heroThumbnail,
          top: 60,
          left: 710,
        },
      ])
      .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
      .toFile(ogDest);

    console.log(`[DONE] Generated OG image: ${ogDest}`);
  }

  console.log('Image optimization completed successfully!');
}

optimizeImages().catch((err) => {
  console.error('Optimization failed:', err);
  process.exit(1);
});
