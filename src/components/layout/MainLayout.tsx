import type { ReactNode } from 'react';
import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
import RouteProgress from '@/components/atoms/RouteProgress';
import MobileBackToTop from '@/components/atoms/MobileBackToTop';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';

export interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <SmoothScrollProvider>
      <RouteProgress />
      {/* Top Sentinel for Mobile Floating Back To Top visibility (~500px threshold) */}
      <div
        id="scroll-sentinel-top"
        className="absolute top-0 left-0 w-full h-[500px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors relative">
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
        <MobileBackToTop />
      </div>
    </SmoothScrollProvider>
  );
}
