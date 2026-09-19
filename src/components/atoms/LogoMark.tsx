import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface LogoMarkProps {
  className?: string;
  variant?: "full" | "short";
}

export default function LogoMark({ className, variant = "full" }: LogoMarkProps) {
  return (
    <Link
      to="/"
      className={cn(
        "inline-flex items-baseline font-bold tracking-widest text-[#2F3437] hover:text-[#C98F55] transition-colors focus-visible:outline-2",
        className
      )}
      aria-label="Muhammad Gabriel Luca Senna - Home"
    >
      {variant === "full" ? (
        <>
          <span className="font-sans text-xl sm:text-2xl font-bold tracking-wider">SENNA</span>
          <span className="text-[#C98F55] font-serif text-2xl ml-0.5 leading-none">.</span>
        </>
      ) : (
        <>
          <span className="font-sans text-xl font-bold">S</span>
          <span className="text-[#C98F55] text-xl ml-0.5">.</span>
        </>
      )}
    </Link>
  );
}
