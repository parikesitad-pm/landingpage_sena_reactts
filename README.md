# Muhammad Gabriel Luca Senna

> **A Little Life. A Growing Story.**
> _MY FIRST PORTFOLIO · EST. 2025_

A modern, lightweight, warm personal family landing page and first portfolio for **Muhammad Gabriel Luca Senna** (born 13 February 2025). Created by his family as a digital place to preserve his story, memories, milestones, and journey growing up.

---

## 1. Tech Stack

- **Framework**: React 19 + TypeScript (Strict)
- **Bundler & Tooling**: Vite 6
- **Styling**: Tailwind CSS v4 (with Ubuntu & JetBrains Mono typography)
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Asset Optimization**: Sharp (AVIF, WebP, EXIF/GPS stripped)
- **Hosting Target**: Vercel (SPA fallback rewrite configured in `vercel.json`)

---

## 2. Architecture Overview

Feature-first domain structure combined with Atomic Design for shared UI:

```text
src/
├── app/                  # Application bootstrap & router configuration
├── assets/               # Static web graphics
├── components/           # Atomic shared UI components
│   ├── atoms/            # Button, Badge, Container, SectionTitle, ResponsiveImage, LogoMark
│   ├── molecules/        # MemoryCard, MilestoneCard, NavLink
│   ├── organisms/        # Navbar, MobileNavigation, Footer
│   └── layout/           # MainLayout shell
├── config/               # Site configuration & SEO parameters
├── data/                 # Centralized content & verified family story
├── features/             # Domain features
│   ├── hero/             # Visual hero centerpiece with real portrait
│   ├── story/            # Hello, World & arrival narrative
│   ├── milestones/       # Chronological timeline of verified milestones
│   ├── memories/         # Asymmetric editorial gallery of everyday moments
│   ├── family/           # Loved From The Beginning (Popo, Momo, Luca)
│   ├── hospital/         # A Little Brave Chapter (fever care & recovery)
│   ├── remembrance/      # A Story That Started With Love (Muhammad Alqi Parikesit)
│   ├── parent-message/   # Emotional letter from Mom & Dad
│   └── future/           # Future Software Engineer subtle easter egg
├── hooks/                # Custom React hooks (useScrollPosition)
├── lib/                  # Utilities (dynamic age calculation, class merging)
├── pages/                # Top-level page routes (HomePage, NotFoundPage)
└── styles/               # Global styling & Tailwind v4 theme definitions
```

---

## 3. Photo & Privacy Workflow

To protect family privacy:

```text
assets/ (Local Original Family Photos)
   │
   ▼ (npm run optimize:images via Sharp)
public/images/senna/ (Optimized AVIF/WebP variants, EXIF/GPS stripped)
   │
   ▼ (git commit & push)
GitHub Repository (parikesitad-pm/landingpage_sena_reactts)
   │
   ▼
Vercel Production Deployment
```

- **`assets/`**: Local source directory containing original uncompressed family photos. **Ignored by Git** (`.gitignore`) to keep raw private camera files out of the public repository.
- **`public/images/`**: Contains optimized, stripped AVIF and WebP responsive files (480w, 768w, 1024w, 1280w). **Committed to Git** and served in production by Vercel.

---

## 4. Local Development & Commands

```bash
# 1. Install dependencies
npm install

# 2. Optimize original family photos (when photos are added/changed)
npm run optimize:images

# 3. Start local development server
npm run dev

# 4. Compile strict TypeScript and build production bundle
npm run build

# 5. Preview production output locally
npm run preview
```

---

## 5. Updating Site Content

- **Personal Information & Copy**: Edit `src/data/siteContent.ts`. All textual content, section titles, and narratives are centralized here.
- **Dynamic Age**: Calculated dynamically in `src/lib/age.ts` from birth date `2025-02-13`. It automatically updates as Senna grows.
- **Milestones**: Add confirmed milestones to `src/features/milestones/data/milestones.ts`. Do not fabricate precise dates unless known.
- **Memories**: Add photo memories to `src/features/memories/data/memories.ts`.

---

## 6. Production SEO & Deployment Checklist

Before or immediately after pointing to your custom production domain:

1. **Production Domain Configuration**: Update `src/config/site.ts` with your domain (e.g., `https://landingpage-sena-reactts.vercel.app` or custom domain).
2. **Robots & Sitemap**: Ensure `public/robots.txt` and `public/sitemap.xml` match the final production domain.
3. **Google Search Console**:
   - Open [Google Search Console](https://search.google.com/search-console).
   - Add property and verify ownership.
   - Submit `/sitemap.xml`.
   - Request homepage indexing for `Muhammad Gabriel Luca Senna`.
4. **Bing Webmaster Tools**: Submit sitemap in [Bing Webmaster Tools](https://www.bing.com/webmasters).
5. **Social Sharing Preview**:
   - Inspect OpenGraph preview using standard social preview debuggers (Twitter card validator, Facebook Sharing Debugger).
   - Verify `1200x630` social card rendered at `/images/seo/muhammad-gabriel-luca-senna-og.jpg`.
6. **Core Web Vitals**: Test live URL using Google PageSpeed Insights (LCP, CLS, INP).

---

## 7. License

MIT License &copy; 2026 [parikesitad-pm](https://github.com/parikesitad-pm).
