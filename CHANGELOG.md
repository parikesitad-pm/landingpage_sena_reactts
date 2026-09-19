# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Integrasi sistem identitas logo resmi LUCA (`< ✦ >` code brackets + star + orbit + orbit dot).
- Aset produksi logo resmi di `/public/branding/` (logo lengkap, logo mark, favicon.ico resmi, apple-touch-icon.png).
- Bagian editorial baru "The Mark of Luca" di homepage dan rute halaman dedikasi `/brand` & `/the-logo`.
- Filosofi inti jenama "Hello, World. Keep becoming." dan nilai panduan "Build With Purpose".
- Pembaruan LogoMark, Hero, Navbar, Footer, dan MobileNavigation dengan identitas LUCA.
- Inisialisasi landing page pertama Muhammad Gabriel Luca Senna berbasis React 19, Vite, TypeScript, dan Tailwind CSS v4.
- Konfigurasi Sharp image optimization pipeline untuk menghasilkan aset responsif AVIF & WebP dengan metadata EXIF/GPS terhapus.
- Implementasi arsitektur atomic shared components dan feature-first sections (Hero, Story, Milestones, Memories, Loved From The Beginning, A Little Brave Chapter, A Story That Started With Love, Parent Message, Future Software Engineer).
- Utility penghitungan usia dinamis berbasis tanggal lahir 13 Februari 2025 (`src/lib/age.ts`).
- Konfigurasi SEO lengkap (JSON-LD Schema.org, OpenGraph 1200x630, Twitter Cards, robots.txt, sitemap.xml, site.webmanifest).
- Konfigurasi deployment Vercel dengan SPA rewrite fallback.
