import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/features/hero/components/HeroSection";
import StorySection from "@/features/story/components/StorySection";
import MilestonesSection from "@/features/milestones/components/MilestonesSection";
import MemoriesSection from "@/features/memories/components/MemoriesSection";
import FamilySection from "@/features/family/components/FamilySection";
import HospitalSection from "@/features/hospital/components/HospitalSection";
import RemembranceSection from "@/features/remembrance/components/RemembranceSection";
import ParentMessageSection from "@/features/parent-message/components/ParentMessageSection";
import FutureSection from "@/features/future/components/FutureSection";

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <StorySection />
      <MilestonesSection />
      <MemoriesSection />
      <FamilySection />
      <HospitalSection />
      <RemembranceSection />
      <ParentMessageSection />
      <FutureSection />
    </MainLayout>
  );
}
