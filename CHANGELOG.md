# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Restorasi dan reset scroll global (`scrollRestoration.ts` & `ScrollManager.tsx`) di seluruh rute: reset instan ke posisi paling atas (`(0, 0)`) tanpa animasi saat browser reload, pembersihan hash basi dari URL bar (`history.replaceState`), preservasi posisi relatif scroll saat beralih bahasa, dan penonaktifan scroll saat beralih tema (Dark/Light/Device).
- Modal komposer buku tamu interaktif (`MessageComposerModal.tsx`) dengan live chat preview, emoji cepat, status draft (`drafting...` -> `ready to send ✦`), dan alat stempel/kartu spesial Luca Lab (_Popo Authority Certificate_, _LUCA Card_, _Love Meter_).
- Animasi scroll native CSS (_Scroll-Driven Animations_) via `animation-timeline: view()` untuk header seksi, foto, dan IDE container dengan progressive enhancement dan fallback penuh ke reduced motion.
- Easter egg konsol pengembang bertema Tokyo Night (`consoleEasterEgg.ts`) yang berjalan satu kali saat bootstrap dengan guard `__LUCA_CONSOLE_SHOWN__`, metadata personal Popo & Momo, serta tautan publik WhatsApp.
- Story signature pengembang `// Popo wrote the code. Luca writes the story.` pada footer tepat sebelum build signature.
- Form buku tamu interaktif terhubung WhatsApp (`GuestbookSection.tsx`) pada halaman beranda dengan field nama (opsional) dan pesan (wajib), validasi ramah, serta tautan pre-filled `https://wa.me/6282298503412` via `encodeURIComponent()`.
- Halaman galeri foto terpisah `MomentsPage.tsx` (`/moments` dan `/:lang/moments`) dengan koleksi lengkap momen foto, caption terlokalisasi, dan navigasi kembali ke beranda.
- Halaman identitas terpisah `LogoPhilosophyPage.tsx` (`/logo-philosophy` dan `/:lang/logo-philosophy`) yang berfokus pada identitas logo LUCA, 4 kartu makna simbolis (Create, Wonder, Explore, Become), dan Guiding Values (Curious Today, Growing Always, Brighter Tomorrows, Build With Purpose).
- Tanda tangan penutup eksplisit `— Momo & Popo` pada seksi harapan keluarga (`FamilyHopeSection.tsx`) di seluruh 5 bahasa.

### Changed

- Mengubah seksi Buku Tamu di halaman utama menjadi CTA-only murni tanpa formulir/input inline (`GuestbookSection.tsx`), tombol terpusat langsung membuka `MessageComposerModal` sebagai satu-satunya komposer.
- Menghapus seluruh redaksi kata doa (*prayer/prayers/doa*) khusus pada fitur Buku Tamu di seluruh 5 bahasa, berfokus murni pada harapan kecil (*little wishes*), pesan hangat, dan sapaan untuk Luca.
- Merestrukturisasi arsitektur router dengan `RootLayout` (`router.tsx`) sehingga `MainLayout`, `SmoothScrollProvider`, dan `ScrollManager` terpasang permanen di level root dan tidak pernah mengalami unmount/remount saat perpindahan rute maupun pergantian tema.
- Mengimplementasikan `ScrollSnapshot` semantik terpusat (`scrollRestoration.ts` & `ScrollManager.tsx`) untuk mengunci ID seksi dan offset visual dalam seksi saat perpindahan bahasa, serta menjamin 0px pergerakan scroll saat beralih tema (Dark/Light/Device).
- Mengembalikan seksi lengkap Luca Protocol ke halaman utama (`/#protocol`) di antara seksi Keluarga dan Untuk Senna.
- Mengubah canonical route filosofi logo menjadi `/logo-philosophy` yang berfokus murni pada identitas logo LUCA dan nilai-nilai panduan, dengan cross-link ke Luca Protocol.
- Mengunci urutan 7 navigasi utama pada navbar dan footer: _Story_, _Family_, _Luca Protocol_, _For Senna_, _Future_, _Moments_, dan _Logo Philosophy_.
- Memecah tampilan build metadata footer menjadi 3 token chip responsif (`portfolio.version = "1.0"`, `status = "growing"`, `next.release = "whenever Luca is ready"`) yang membungkus rapi di mobile.
- Mengganti label "Memories" menjadi "Moments" dan mengarahkan navigasi header serta footer ke route `/moments`.
- Menghubungkan tautan "The Mark of Luca" / "Tanda Luca" di header dan footer ke route baru `/brand-mark`.
- Menyelaraskan navigasi footer dengan navbar utama.
- Memperbarui tombol CTA foto di Hero section untuk mengarah ke `/moments` tanpa broken anchor.

### Removed

- Menghapus seluruh input inline (nama, textarea pesan, penghitung karakter, kartu komposer inline) dari seksi buku tamu beranda.
- Menghapus seksi "Growing Up" (`MilestonesSection`) dari halaman utama dan navbar, menjadikan `LucaChangelogSection` sebagai representasi tunggal pertumbuhan berkala.
- Menghapus galeri foto dan filosofi logo dari halaman utama untuk dipindahkan ke halaman terpisah masing-masing (`/moments` dan `/brand-mark`).

### Fixed

- Memperbaiki tata letak nomor baris (gutter) pada `LucaCodeEditor.tsx` dengan sistem grid dua kolom, angka `tabular-nums` rata kanan, lebar gutter tetap (`2.75rem`), tinggi baris identik (`lineHeight: 1.9`), nomor baris aktif beraksen Tokyo Night (`#e0af68`), border kanan pemisah halus, dan pencegahan kolaps baris kosong.
- Memperbaiki penanganan klik tautan berjangkar rute (`/[prefix]/#...`) pada `SmoothScrollProvider.tsx` agar menggunakan pergerakan mulus (smooth scroll) Lenis alih-alih loncat instan bawaan browser.
- Mengembalikan animasi pengetikan karakter demi karakter (typing animation) beserta kursor berkedip `▌` pada seluruh deklarasi aturan keluarga (Rules 01–05) di seksi Luca Protocol dengan tetap menjaga aksesibilitas `sr-only` dan fallback `prefers-reduced-motion`.
- Memperbaiki bug pembatalan timer di seksi Luca Protocol (`LucaProtocolSection.tsx`) di mana state `step` di dalam dependency array `useEffect` menyebabkan pembersihan timer setelah step 1 sehingga judul, stempel, dan seluruh kelima aturan keluarga membeku dan tidak muncul.
- Menambahkan efek stempel fisik karet berotasi (`@keyframes stamp-land`) pada badge `POPO APPROVED` dan membersihkan markup semantik deklarasi aturan.
- Mengatasi 404 pada foto produksi di desktop/retina dengan melengkapi varian responsif 1280px (`.avif` dan `.webp`) untuk semua foto keluarga.
- Normalisasi `basePath` pada `ResponsiveImage` agar selalu diawali slash root-relative (`/images/...`) untuk menjamin semua foto termuat dengan benar di seluruh rute lokal (`/`, `/en/`, `/id/`, `/zh-cn/`, `/ja/`, `/ko/`).
- Perbaikan pada `scripts/optimize-images.mjs` agar selalu mengekspor seluruh set ukuran responsif target (480, 768, 1024, 1280) tanpa melewati ukuran 1280px.

### Added

- Blok verifikasi sistem **Protocol Verification** (`ProtocolVerification.tsx`) di akhir seksi Luca Protocol dengan animasi sekuensial (~90ms per item) untuk validasi aturan keluarga, centang Tokyo Night cyan/green (`#73daca`), dan penutup status `protocol.status = "ENFORCED";` beraksen emas LUCA tepat sebelum disclaimer keamanan keluarga.
- Easter egg konsol DevTools (`devtoolsEasterEgg.ts`) yang mencetak satu pesan hangat bertema LUCA (`✦ LUCA`, `momo.love = Infinity;`, `authority.level = "Popo";`, `Hello, World. Keep becoming.`) satu kali saat startup dengan guard duplikasi window dan beban komputasi teramat minim.
- Halaman kustom 404 (`NotFoundPage.tsx`) dengan desain identitas LUCA, pelestarian bahasa aktif dari prefix rute URL (misal `/id/unknown` -> bahasa Indonesia), pengalihan CTA _"Return Home"_ ke beranda terlokalisasi, tag meta `noindex, follow`, dan proteksi rute invalid pada `HomePage` dan `BrandPage`.
- Kontrol Back to Top mengambang khusus mobile dan tablet (`MobileBackToTop.tsx`) berposisi fixed di sudut kanan bawah dengan kompensasi `safe-area-inset-bottom`, terpicu oleh sentinel `IntersectionObserver` tepat setelah Hero section, transisi transform/opacity bebas reflow, terintegrasi mulus dengan Lenis / reduced motion, dan tersembunyi di desktop.
- Seksi baru **Luca Changelog** (`RELEASE NOTES`) yang menghubungkan perjalanan tumbuh kembang Luca dengan konsep release versioning software engineer (`v0.1.0`, `v0.7.x`, `v1.0.0`, `v1.x`, `NEXT`, chip `status = "growing";`, dan kutipan filosofis penutup) dengan dukungan penuh 5 bahasa dan integrasi menu navigasi header.

- Semantic warning tokens (`--warning`, `--warning-strong`, `--warning-soft`, `--warning-border`) yang selaras dengan Tokyo Night rose/red untuk penandaan status otoritas/larangan tertentu (`outsideBullies = false`, `appeal.allowed = false`, `FINAL AUTHORITY`, `difficulty = "insanity"`).
- Catatan klarifikasi ringan di bawah `difficulty = "insanity"` ("Insanity = absurdly difficult, not actually harmful") serta penegasan konteks humor keluarga yang aman dan penuh kasih sayang di semua 5 bahasa.
- Top loader bergaya GitHub (`RouteProgress.tsx`) dengan garis tipis aksen emas LUCA, animasi `scaleX` bebas reflow, penundaan anti-flicker 120ms, dan ikon mikro `✦` saat selesai.
- Smooth scroll terukur dengan Lenis (`SmoothScrollProvider.tsx`) menggunakan single RAF loop, tanpa mengorbankan scroll native mobile (`syncTouch: false`), dan otomatis fallback ke native jika `prefers-reduced-motion: reduce`.
- Animasi pengetikan ringan (lightweight writing/typing animation) tanpa GSAP via komponen `TypingText` dan `LucaCodeEditor` untuk momen identitas kunci (Hero nama lengkap, nama Popo & Momo, urutan aturan Luca Protocol v1.0, dan jendela kode `luca.ts`), dilengkapi dukungan penuh `prefers-reduced-motion`, pencegahan CLS, dan aksesibilitas screen reader (`sr-only`).
- Efek reveal lembut (opacity & letter-spacing settle) untuk nama Muhammad Alqi Parikesit serta komponen `RevealOnView` untuk judul sekunder penting.
- Skrip validator aset build-time otomatis `scripts/validate-assets.mjs` (`npm run validate:assets`) yang memeriksa keberadaan fisik setiap aset, fallback `.webp`, varian resolusi, serta aturan penamaan file kebab-case.

### Changed

- Memperbarui build signature pengembang di footer menjadi `portfolio.version = "1.0"; status = "growing"; lastBuild = "today";` dan merapikan hierarki visual serta clearance padding mobile (`pb-[calc(4.5rem+env(safe-area-inset-bottom))]`).
- Mengoreksi hierarki dan urutan tampilan seksi Luca Protocol: Blok judul (`eyebrow` -> `title` -> `subtitle`) tampil paling pertama, disusul 4 baris protokol (`protocol.version`, `momo.love`, `authority.level`, `appeal.allowed`) dalam satu baris horizontal terpadu berformat chip/strip JetBrains Mono, diikuti stempel fisik `POPO APPROVED`, dan kemudian seksi artikel serta aturan 01–05.
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
