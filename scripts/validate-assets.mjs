import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

console.log('🔍 Starting comprehensive asset audit and validation...');

const REQUIRED_RESPONSIVE_WIDTHS = [480, 768, 1024, 1280];

let errors = [];
let checkedAssetsCount = 0;

// Helper to recursively collect files matching extensions
function getFiles(dir, exts, ignoreDirs = ['node_modules', 'dist', '.git', 'assets']) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignoreDirs.includes(entry.name)) {
        results = results.concat(getFiles(fullPath, exts, ignoreDirs));
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (exts.includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

// 1. Audit files in src, index.html, public/site.webmanifest, and scripts/generate-locale-html.mjs
const filesToScan = [
  ...getFiles(path.join(rootDir, 'src'), ['.ts', '.tsx', '.json']),
  path.join(rootDir, 'index.html'),
  path.join(rootDir, 'public', 'site.webmanifest'),
  path.join(rootDir, 'scripts', 'generate-locale-html.mjs'),
].filter((f) => fs.existsSync(f));

// Set of base paths and static paths to check
const responsiveBasePaths = new Set();
const staticAssetPaths = new Set();

for (const file of filesToScan) {
  const content = fs.readFileSync(file, 'utf-8');
  const relativeFile = path.relative(rootDir, file);

  // Check 1: Disallowed path patterns in production code (src & index.html)
  if (file.includes('/src/') || file.endsWith('index.html')) {
    const invalidPatterns = [
      /['"`]\/assets\//g,
      /['"`]assets\//g,
      /['"`]\/public\//g,
      /['"`]public\/images\//g,
      /['"`]public\/branding\//g,
      /['"`]\.\.\/images\//g,
    ];

    for (const pattern of invalidPatterns) {
      if (pattern.test(content)) {
        errors.push(
          `[INVALID PATH] ${relativeFile} contains forbidden path matching ${pattern}`
        );
      }
    }
  }

  // Check 2: Extract ResponsiveImage basePaths and data basePaths
  // e.g. basePath="/images/senna/..." or image: '/images/senna/...'
  const basePathRegex = /(?:basePath|image)\s*[:=]\s*['"](\/images\/senna\/[^'"]+)['"]/g;
  let match;
  while ((match = basePathRegex.exec(content)) !== null) {
    const p = match[1].trim();
    // If it doesn't end with an extension, it's a responsive base path
    if (!path.extname(p)) {
      responsiveBasePaths.add(p);
    } else {
      staticAssetPaths.add(p);
    }
  }

  // Check 3: Extract any image path strings with extensions
  // e.g. /branding/..., /images/..., /favicon.ico, etc.
  const staticAssetRegex = /['"]((?:\/images\/|\/branding\/|\/)[a-zA-Z0-9_\-\.\/]+\.(?:webp|avif|png|jpg|jpeg|svg|ico))['"]/g;
  while ((match = staticAssetRegex.exec(content)) !== null) {
    const assetPath = match[1].trim();
    // Ignore external URLs, react-router internal paths, or schema.org definitions
    if (!assetPath.startsWith('//') && !assetPath.startsWith('http')) {
      staticAssetPaths.add(assetPath);
    }
  }

  // Also catch full URLs pointing to domain assets: https://luca-senna.vercel.app/images/...
  const fullUrlRegex = /https?:\/\/luca-senna\.vercel\.app((?:\/images\/|\/branding\/|\/)[a-zA-Z0-9_\-\.\/]+\.(?:webp|avif|png|jpg|jpeg|svg|ico))/g;
  while ((match = fullUrlRegex.exec(content)) !== null) {
    staticAssetPaths.add(match[1].trim());
  }
}

// 2. Validate all ResponsiveImage basePaths
console.log(`\nChecking ${responsiveBasePaths.size} responsive photo base paths...`);
for (const basePath of responsiveBasePaths) {
  // Check fallback .webp
  const fallbackFile = path.join(publicDir, `${basePath}.webp`);
  checkedAssetsCount++;
  if (!fs.existsSync(fallbackFile)) {
    errors.push(`[MISSING FALLBACK] Expected fallback not found: ${basePath}.webp`);
  }

  // Check all required widths in both .webp and .avif
  for (const width of REQUIRED_RESPONSIVE_WIDTHS) {
    const webpFile = path.join(publicDir, `${basePath}-${width}.webp`);
    const avifFile = path.join(publicDir, `${basePath}-${width}.avif`);

    checkedAssetsCount += 2;
    if (!fs.existsSync(webpFile)) {
      errors.push(`[MISSING VARIANT] Expected WebP not found: ${basePath}-${width}.webp`);
    }
    if (!fs.existsSync(avifFile)) {
      errors.push(`[MISSING VARIANT] Expected AVIF not found: ${basePath}-${width}.avif`);
    }
  }
}

// 3. Validate all static assets
console.log(`Checking ${staticAssetPaths.size} static asset paths...`);
for (const assetPath of staticAssetPaths) {
  const filePath = path.join(publicDir, assetPath);
  checkedAssetsCount++;
  if (!fs.existsSync(filePath)) {
    errors.push(`[MISSING ASSET] Referenced asset not found on disk: ${assetPath} (expected at ${filePath})`);
  }
}

// 4. Validate Asset Naming & Directory Discipline (Rule 4)
console.log('Checking asset naming convention in public/images and public/branding...');
const publicAssetFiles = [
  ...getFiles(path.join(publicDir, 'images'), ['.webp', '.avif', '.png', '.jpg', '.jpeg', '.svg', '.ico']),
  ...getFiles(path.join(publicDir, 'branding'), ['.webp', '.avif', '.png', '.jpg', '.jpeg', '.svg', '.ico']),
];

for (const file of publicAssetFiles) {
  const baseName = path.basename(file);
  // Check for uppercase
  if (/[A-Z]/.test(baseName)) {
    errors.push(`[INVALID NAMING] File contains uppercase characters: ${baseName}`);
  }
  // Check for whitespace
  if (/\s/.test(baseName)) {
    errors.push(`[INVALID NAMING] File contains spaces: ${baseName}`);
  }
}

// 5. Final Report
console.log('----------------------------------------------------');
console.log(`Total asset checks performed: ${checkedAssetsCount}`);
console.log(`Total public image assets:    ${publicAssetFiles.length}`);

if (errors.length > 0) {
  console.error(`\n❌ Asset validation FAILED with ${errors.length} error(s):`);
  for (const err of errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
} else {
  console.log('✅ ALL referenced images & variants exist on disk and follow conventions!\n');
  process.exit(0);
}
