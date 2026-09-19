import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/features/hero/components/HeroSection';
import StorySection from '@/features/story/components/StorySection';
import MilestonesSection from '@/features/milestones/components/MilestonesSection';
import MemoriesSection from '@/features/memories/components/MemoriesSection';
import FamilySection from '@/features/family/components/FamilySection';
import HospitalSection from '@/features/hospital/components/HospitalSection';
import LogoPhilosophySection from '@/features/brand/components/LogoPhilosophySection';
import RemembranceSection from '@/features/remembrance/components/RemembranceSection';
import ParentMessageSection from '@/features/parent-message/components/ParentMessageSection';
import FutureSection from '@/features/future/components/FutureSection';
import FamilyHopeSection from '@/features/hopes/components/FamilyHopeSection';
import { usePreferences } from '@/features/preferences/context/PreferencesContext';
import { pathPrefixToLocale } from '@/features/preferences/lib/locale';

export default function HomePage() {
  const { lang } = useParams<{ lang?: string }>();
  const { setActiveLocaleOverride } = usePreferences();

  useEffect(() => {
    if (lang) {
      const resolved = pathPrefixToLocale(lang);
      if (resolved) {
        setActiveLocaleOverride(resolved);
      }
    }
  }, [lang, setActiveLocaleOverride]);

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
      <ParentMessageSection />
      <FutureSection />
      <FamilyHopeSection />
    </MainLayout>
  );
}
