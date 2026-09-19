import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const BASE_URL = 'https://luca-senna.vercel.app';

const LOCALES = [
  {
    code: 'en',
    htmlLang: 'en',
    dir: 'en',
    path: '/en/',
    title: 'Muhammad Gabriel Luca Senna | First Portfolio & Growing Story',
    description:
      "Muhammad Gabriel Luca Senna's first portfolio — memories, milestones, family moments, and a growing story that began on 13 February 2025.",
    ogLocale: 'en_US',
  },
  {
    code: 'id',
    htmlLang: 'id',
    dir: 'id',
    path: '/id/',
    title: 'Muhammad Gabriel Luca Senna | Portfolio Pertama & Kisah Perjalanannya',
    description:
      'Portfolio pertama Muhammad Gabriel Luca Senna — memori berharga, langkah tumbuh kembang, momen keluarga, dan kisah perjalanan yang bermula pada 13 Februari 2025.',
    ogLocale: 'id_ID',
  },
  {
    code: 'zh-CN',
    htmlLang: 'zh-CN',
    dir: 'zh-cn',
    path: '/zh-cn/',
    title: 'Muhammad Gabriel Luca Senna | 第一个个人作品集与成长故事',
    description:
      'Muhammad Gabriel Luca Senna 的第一个个人作品集 —— 珍贵回忆、成长足迹、家庭温情时光，以及始于 2025 年 2 月 13 日的成长故事。',
    ogLocale: 'zh_CN',
  },
  {
    code: 'ja',
    htmlLang: 'ja',
    dir: 'ja',
    path: '/ja/',
    title: 'Muhammad Gabriel Luca Senna | はじめてのポートフォリオと成長の物語',
    description:
      'Muhammad Gabriel Luca Senna のファーストポートフォリオ —— かけがえのない思い出、成長の節目、家族の時間、そして2025年2月13日にはじまった成長の物語。',
    ogLocale: 'ja_JP',
  },
  {
    code: 'ko',
    htmlLang: 'ko',
    dir: 'ko',
    path: '/ko/',
    title: 'Muhammad Gabriel Luca Senna | 첫 포트폴리오와 성장 이야기',
    description:
      'Muhammad Gabriel Luca Senna의 첫 포트폴리오 —— 소중한 추억, 성장의 순간들, 가족과의 시간, 그리고 2025년 2월 13일에 시작된 따뜻한 이야기.',
    ogLocale: 'ko_KR',
  },
];

async function generateLocaleHtml() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('dist/index.html does not exist. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

  for (const locale of LOCALES) {
    const localeDir = path.join(distDir, locale.dir);
    fs.mkdirSync(localeDir, { recursive: true });

    let localizedHtml = baseHtml;

    // 1. Update <html lang="...">
    localizedHtml = localizedHtml.replace(
      /<html\s+lang="[^"]*"/i,
      `<html lang="${locale.htmlLang}"`
    );

    // 2. Update <title>
    localizedHtml = localizedHtml.replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${locale.title}</title>`
    );

    // 3. Update <meta name="description">
    localizedHtml = localizedHtml.replace(
      /<meta\s+name="description"\s+content="[^"]*"/i,
      `<meta name="description" content="${locale.description}"`
    );

    // 4. Update canonical
    const canonicalUrl = `${BASE_URL}${locale.path}`;
    localizedHtml = localizedHtml.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"/i,
      `<link rel="canonical" href="${canonicalUrl}"`
    );

    // 5. Update OpenGraph tags
    localizedHtml = localizedHtml.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"/i,
      `<meta property="og:title" content="${locale.title}"`
    );
    localizedHtml = localizedHtml.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"/i,
      `<meta property="og:description" content="${locale.description}"`
    );
    localizedHtml = localizedHtml.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"/i,
      `<meta property="og:url" content="${canonicalUrl}"`
    );

    // 6. Update Twitter Card tags
    localizedHtml = localizedHtml.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"/i,
      `<meta name="twitter:title" content="${locale.title}"`
    );
    localizedHtml = localizedHtml.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"/i,
      `<meta name="twitter:description" content="${locale.description}"`
    );

    // 7. Update JSON-LD WebPage metadata
    localizedHtml = localizedHtml.replace(
      /"name":\s*"Muhammad Gabriel Luca Senna \| First Portfolio &amp; Growing Story"/,
      `"name": "${locale.title}"`
    );
    localizedHtml = localizedHtml.replace(
      /"description":\s*"Memories, milestones, family moments, and the growing journey of Muhammad Gabriel Luca Senna\."/,
      `"description": "${locale.description}"`
    );

    const outFilePath = path.join(localeDir, 'index.html');
    fs.writeFileSync(outFilePath, localizedHtml, 'utf-8');
    console.log(`[SEO Prerender] Generated localized HTML: ${locale.path} -> dist/${locale.dir}/index.html`);
  }

  console.log('All localized HTML files successfully generated!');
}

generateLocaleHtml().catch((err) => {
  console.error('Error generating locale HTML:', err);
  process.exit(1);
});
