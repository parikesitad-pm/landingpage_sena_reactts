import type { Milestone } from '@/types/milestone';
import {
  Sparkles,
  Smile,
  Footprints,
  Cake,
  HeartPulse,
  Users,
  Code2,
} from 'lucide-react';

export interface MilestoneCardProps {
  milestone: Milestone;
  isLast?: boolean;
}

export default function MilestoneCard({
  milestone,
  isLast = false,
}: MilestoneCardProps) {
  const getIcon = () => {
    switch (milestone.icon) {
      case 'birth':
        return <Sparkles className="w-4 h-4 text-[#C98F55]" />;
      case 'tooth':
        return <Smile className="w-4 h-4 text-[#C98F55]" />;
      case 'steps':
        return <Footprints className="w-4 h-4 text-[#C98F55]" />;
      case 'birthday':
        return <Cake className="w-4 h-4 text-[#C98F55]" />;
      case 'health':
        return <HeartPulse className="w-4 h-4 text-[#C98F55]" />;
      case 'family':
        return <Users className="w-4 h-4 text-[#C98F55]" />;
      case 'future':
        return <Code2 className="w-4 h-4 text-[#C98F55]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#C98F55]" />;
    }
  };

  return (
    <div className="relative flex items-start gap-4 sm:gap-6 group">
      {/* Timeline spine dot and connector line */}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#FFFDF8] border border-[#E7E0D6] shadow-xs group-hover:border-[#C98F55] transition-colors">
          {getIcon()}
        </div>
        {!isLast && (
          <div className="w-px h-full min-h-[48px] bg-gradient-to-b from-[var(--border)] to-[var(--border-soft)] my-1" />
        )}
      </div>

      {/* Content box */}
      <div className="pb-8 pt-1 flex-1">
        <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-1">
          <h3 className="text-base sm:text-lg font-bold text-[var(--foreground)] font-sans">
            {milestone.title}
          </h3>

          {milestone.date && (
            <time
              dateTime={milestone.date}
              className="font-mono text-xs font-medium text-[var(--accent)] bg-[var(--surface-soft)] border border-[var(--border)] px-2.5 py-0.5 rounded-full"
            >
              {milestone.date}
            </time>
          )}

          {milestone.ageText && (
            <span className="font-mono text-xs text-[var(--muted-foreground)] bg-[var(--surface-soft)] border border-[var(--border)] px-2 py-0.5 rounded-full">
              {milestone.ageText}
            </span>
          )}
        </div>

        <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
          {milestone.description}
        </p>
      </div>
    </div>
  );
}
