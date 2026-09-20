import type { ReactNode } from 'react';
import Navbar from '@/components/organisms/Navbar';
import Footer from '@/components/organisms/Footer';
import RouteProgress from '@/components/atoms/RouteProgress';
import MobileBackToTop from '@/components/atoms/MobileBackToTop';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import ScrollManager from '@/components/navigation/ScrollManager';

export interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <SmoothScrollProvider>
      <ScrollManager />
      <RouteProgress />
      <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors relative">
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
        <MobileBackToTop />
      </div>
    </SmoothScrollProvider>
  );
}
