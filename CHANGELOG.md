# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Memperbaiki bug pembatalan timer di seksi Luca Protocol (`LucaProtocolSection.tsx`) di mana state `step` di dalam dependency array `useEffect` menyebabkan pembersihan timer setelah step 1 sehingga judul, stempel, dan seluruh kelima aturan keluarga membeku dan tidak muncul.
- Menambahkan efek stempel fisik karet berotasi (`@keyframes stamp-land`) pada badge `POPO APPROVED` dan membersihkan markup semantik deklarasi aturan.
- Mengatasi 404 pada foto produksi di desktop/retina dengan melengkapi varian responsif 1280px (`.avif` dan `.webp`) untuk semua foto keluarga.
- Normalisasi `basePath` pada `ResponsiveImage` agar selalu diawali slash root-relative (`/images/...`) untuk menjamin semua foto termuat dengan benar di seluruh rute lokal (`/`, `/en/`, `/id/`, `/zh-cn/`, `/ja/`, `/ko/`).
- Perbaikan pada `scripts/optimize-images.mjs` agar selalu mengekspor seluruh set ukuran responsif target (480, 768, 1024, 1280) tanpa melewati ukuran 1280px.

### Added

- Top loader bergaya GitHub (`RouteProgress.tsx`) dengan garis tipis aksen emas LUCA, animasi `scaleX` bebas reflow, penundaan anti-flicker 120ms, dan ikon mikro `✦` saat selesai.
- Smooth scroll terukur dengan Lenis (`SmoothScrollProvider.tsx`) menggunakan single RAF loop, tanpa mengorbankan scroll native mobile (`syncTouch: false`), dan otomatis fallback ke native jika `prefers-reduced-motion: reduce`.
- Animasi pengetikan ringan (lightweight writing/typing animation) tanpa GSAP via komponen `TypingText` dan `LucaCodeEditor` untuk momen identitas kunci (Hero nama lengkap, nama Popo & Momo, urutan aturan Luca Protocol v1.0, dan jendela kode `luca.ts`), dilengkapi dukungan penuh `prefers-reduced-motion`, pencegahan CLS, dan aksesibilitas screen reader (`sr-only`).
- Efek reveal lembut (opacity & letter-spacing settle) untuk nama Muhammad Alqi Parikesit serta komponen `RevealOnView` untuk judul sekunder penting.
- Skrip validator aset build-time otomatis `scripts/validate-assets.mjs` (`npm run validate:assets`) yang memeriksa keberadaan fisik setiap aset, fallback `.webp`, varian resolusi, serta aturan penamaan file kebab-case.

### Changed

- Kunci urutan animasi Luca Protocol: tiga baris boot (`protocol.version = "1.0"; momo.love = Infinity; authority.level = "Popo";`) tampil paling pertama sebelum judul, disusul stempel `POPO APPROVED` dengan efek landing fisik, punchline `appeal.allowed = false;`, dan kemunculan sekuensial aturan 01–05 (Rule 05 dipertegas dengan aksen emas dan lencana `FINAL AUTHORITY`).
- Penerapan tema Tokyo Night khusus pada jendela editor `luca.ts` (latar `#1a1b26`, chrome `#202231`, tab, highlight baris aktif, penomoran baris JetBrains Mono, dan sintaks violet/green/cyan/gold) tanpa mengubah tema hangat editorial situs utama.
- Penghapusan total konsep splash screen / blocking overlay agar seluruh konten langsung tampil instan tanpa penundaan buatan.
- Penyesuaian `scroll-margin-top` (`scroll-mt-16 sm:scroll-mt-20`) pada seluruh seksi navigasi jangkar agar tidak tertutup sticky header.
- Peningkatan deteksi viewport Luca Protocol (`rootMargin: 120px`) agar metadata bar langsung tampil saat seksi mendekat dan sekuens aturan berjalan tanpa jeda.
- Peningkatan kontras tema gelap (dark mode) dengan variabel semantik berstandar WCAG AA dan perbaikan keterbacaan judul, paragraf, kartu, dan navigasi.
- Implementasi varian logo adaptif tema (`luca-logo-dark.webp` & `luca-logo-light.webp`) serta komponen atom `LucaLogo` dengan warna lettering warm ivory di dark mode tanpa mengubah aksen emas.
- Pembaruan domain produksi resmi menjadi `https://luca-senna.vercel.app` pada seluruh konfigurasi, sitemap, robots.txt, canonical, dan OpenGraph metadata.
- Pembaruan teks kredit footer menjadi `Crafted with <3 for Luca` dan tautan ke `a MODULA Project`.

### Added

- Pipeline build prerender SEO (`scripts/generate-locale-html.mjs`) untuk menghasilkan file HTML statis dengan judul, deskripsi, canonical, dan OpenGraph khusus per bahasa (`/en/`, `/id/`, `/zh-cn/`, `/ja/`, `/ko/`).

- File verifikasi kepemilikan Google Search Console (`google5893aaf2832e50e4.html`) dan meta tag verifikasi di `index.html`.
- Bagian humor keluarga "Luca Protocol v1.0" (Lima hukum aturan keluarga, House Protection Policy anti-bullying, dan prinsip batas "Belajar Nakal Sama Popo").
- Pembaruan menyeluruh seluruh penyebutan orang tua menjadi konsisten hanya Popo & Momo di semua bahasa (tidak ada Mom/Dad).
- Sistem tema 3 mode (Device / Light / Dark) dengan inisialisasi anti-flash sinkron di `index.html`.
- Variabel CSS semantik untuk tema light dan dark tanpa flash putih saat refresh.
- Dukungan multibahasa penuh untuk 5 bahasa (English, Bahasa Indonesia, 中文, 日本語, 한국어) menggunakan i18next & react-i18next.
- Deteksi bahasa perangkat otomatis (`Device / System`) dengan rute URL `/en/`, `/id/`, `/zh-cn/`, `/ja/`, `/ko/`.
- Hreflang alternates multibahasa dan pembaruan sitemap.xml dengan rute lokal.
- Pembaruan makna bagian "Popo's Little Dream" (Future Software Engineer sebagai impian kakek, bukan takdir kaku bagi Luca).
- Bagian baru "Our Hope for Luca" (harapan keluarga tentang iman, akhlak, tanggung jawab, ketegaran menghadapi kesedihan, dan kebebasan memilih jalan hidup).
- Menu preferensi terintegrasi di Navbar dan Mobile Navigation untuk pengaturan tema dan bahasa secara mudah dan aksesibel.
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
