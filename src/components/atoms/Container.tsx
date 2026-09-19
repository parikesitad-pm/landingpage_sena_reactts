import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Container({
  children,
  size = "lg",
  className,
  ...props
}: ContainerProps) {
  const maxSizes = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-5xl",
    xl: "max-w-6xl",
  };

  return (
    <div
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8",
        maxSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
