import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  headingLevel?: "h1" | "h2" | "h3";
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  headingLevel = "h2",
  className,
  ...props
}: SectionTitleProps) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const HeadingTag = headingLevel;

  return (
    <div
      className={cn("flex flex-col max-w-2xl mb-12", alignmentClasses[align], className)}
      {...props}
    >
      {eyebrow && (
        <span className="font-mono text-xs font-semibold tracking-widest text-[#C98F55] uppercase mb-2">
          {eyebrow}
        </span>
      )}
      <HeadingTag className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2F3437] font-sans">
        {title}
      </HeadingTag>
      {description && (
        <p className="mt-3 text-base sm:text-lg text-[#73706A] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
