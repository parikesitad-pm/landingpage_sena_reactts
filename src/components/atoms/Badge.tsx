import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "accent" | "mono";
  dot?: boolean;
  children: ReactNode;
}

export default function Badge({
  variant = "neutral",
  dot = false,
  children,
  className,
  ...props
}: BadgeProps) {
  const variantStyles = {
    neutral: "bg-[#F4ECE1] text-[#2F3437] border border-[#E4D9C8]",
    accent: "bg-[#F8EFE4] text-[#8C5D2C] border border-[#E9D6BE]",
    mono: "font-mono bg-[#FFFDF8] text-[#555C61] border border-[#E5DDD0] text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-[#C98F55]" />}
      {children}
    </span>
  );
}
