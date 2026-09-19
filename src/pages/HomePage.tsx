import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/features/hero/components/HeroSection';
import StorySection from '@/features/story/components/StorySection';
import MilestonesSection from '@/features/milestones/components/MilestonesSection';
import MemoriesSection from '@/features/memories/components/MemoriesSection';
import FamilySection from '@/features/family/components/FamilySection';
import HospitalSection from '@/features/hospital/components/HospitalSection';
import LogoPhilosophySection from '@/features/brand/components/LogoPhilosophySection';
import RemembranceSection from '@/features/remembrance/components/RemembranceSection';
import LucaProtocolSection from '@/features/protocol/components/LucaProtocolSection';
import ParentMessageSection from '@/features/parent-message/components/ParentMessageSection';
import FutureSection from '@/features/future/components/FutureSection';
import FamilyHopeSection from '@/features/hopes/components/FamilyHopeSection';
import { usePreferences } from '@/features/preferences/context/PreferencesContext';
import { pathPrefixToLocale, localeToPathPrefix } from '@/features/preferences/lib/locale';
import { localeSeoData } from '@/config/site';

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams<{ lang?: string }>();
  const { activeLocale, setActiveLocaleOverride } = usePreferences();

  useEffect(() => {
    if (lang) {
      const resolved = pathPrefixToLocale(lang);
      if (resolved) {
        setActiveLocaleOverride(resolved);
      }
    } else {
      // Deterministic root redirect to detected or active locale
      const prefix = localeToPathPrefix(activeLocale);
      navigate(`/${prefix}/${location.hash}`, { replace: true });
    }
  }, [lang, activeLocale, setActiveLocaleOverride, navigate, location.hash]);

  useEffect(() => {
    const seo = localeSeoData[activeLocale] || localeSeoData.en;
    document.title = seo.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.description);
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute(
        'href',
        `https://luca-senna.vercel.app${seo.path}`
      );
    }
  }, [activeLocale]);

  return (
    <MainLayout>
      <HeroSection />
      <StorySection />
      <MilestonesSection />
      <MemoriesSection />
      <FamilySection />
      <HospitalSection />
      <RemembranceSection />
      <LogoPhilosophySection />
      <LucaProtocolSection />
      <ParentMessageSection />
      <FutureSection />
      <FamilyHopeSection />
    </MainLayout>
  );
}
