import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import HeroSection from '@/features/hero/components/HeroSection';
import StorySection from '@/features/story/components/StorySection';
import LucaChangelogSection from '@/features/changelog/components/LucaChangelogSection';
import FamilySection from '@/features/family/components/FamilySection';
import HospitalSection from '@/features/hospital/components/HospitalSection';
import RemembranceSection from '@/features/remembrance/components/RemembranceSection';
import LucaProtocolSection from '@/features/protocol/components/LucaProtocolSection';
import ParentMessageSection from '@/features/parent-message/components/ParentMessageSection';
import FutureSection from '@/features/future/components/FutureSection';
import FamilyHopeSection from '@/features/hopes/components/FamilyHopeSection';
import GuestbookSection from '@/features/guestbook/components/GuestbookSection';
import { usePreferences } from '@/features/preferences/context/PreferencesContext';
import {
  pathPrefixToLocale,
  localeToPathPrefix,
} from '@/features/preferences/lib/locale';
import { localeSeoData } from '@/config/site';
import NotFoundPage from '@/pages/NotFoundPage';

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams<{ lang?: string }>();
  const { activeLocale, setActiveLocaleOverride } = usePreferences();

  const isInvalidLocale =
    lang !== undefined && pathPrefixToLocale(lang) === null;

  useEffect(() => {
    if (isInvalidLocale) return;

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
  }, [
    lang,
    isInvalidLocale,
    activeLocale,
    setActiveLocaleOverride,
    navigate,
    location.hash,
  ]);

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

  if (isInvalidLocale) {
    return <NotFoundPage />;
  }

  return (
    <>
      <HeroSection />
      {/* Sentinel for Mobile & Tablet Floating Back To Top */}
      <div
        id="hero-scroll-sentinel"
        aria-hidden="true"
        className="h-px pointer-events-none"
      />
      <StorySection />
      <LucaChangelogSection />
      <FamilySection />
      <HospitalSection />
      <RemembranceSection />
      <LucaProtocolSection />
      <ParentMessageSection />
      <FutureSection />
      <FamilyHopeSection />
      <GuestbookSection />
    </>
  );
}
