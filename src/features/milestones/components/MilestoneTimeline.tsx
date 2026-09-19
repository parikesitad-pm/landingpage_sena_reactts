import { confirmedMilestones } from "@/features/milestones/data/milestones";
import MilestoneCard from "@/components/molecules/MilestoneCard";
import { siteContent } from "@/data/siteContent";
import { Clock } from "lucide-react";

export default function MilestoneTimeline() {
  return (
    <div className="relative max-w-2xl mx-auto pl-2 sm:pl-4">
      {confirmedMilestones.map((milestone, idx) => (
        <MilestoneCard
          key={milestone.id}
          milestone={milestone}
          isLast={idx === confirmedMilestones.length - 1}
        />
      ))}

      {/* Continuation node */}
      <div className="flex items-start gap-4 sm:gap-6 pt-2">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FAF2E8] border border-[#E8D7C4] text-[#C98F55]">
          <Clock className="w-4 h-4 animate-pulse" />
        </div>
        <div className="pt-1.5 pb-4">
          <p className="text-sm sm:text-base font-semibold text-[#2F3437]">
            {siteContent.milestones.endingText}
          </p>
          <span className="font-mono text-xs text-[#C98F55] tracking-wider uppercase">
            {siteContent.milestones.continuedText}
          </span>
        </div>
      </div>
    </div>
  );
}
