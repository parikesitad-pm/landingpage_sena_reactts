import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import LogoMark from "@/components/atoms/LogoMark";

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ label: string; href: string }>;
}

export default function MobileNavigation({
  isOpen,
  onClose,
  navItems,
}: MobileNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 bg-[#2F3437]/40 backdrop-blur-xs flex flex-col justify-start md:hidden"
    >
      <div
        ref={containerRef}
        className="w-full bg-[#FFFDF8] border-b border-[#E7E0D6] shadow-lg px-6 py-5 transition-all"
      >
        <div className="flex items-center justify-between pb-5 border-b border-[#EFEAE2]">
          <LogoMark />
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#73706A] hover:text-[#2F3437] hover:bg-[#F2ECE1] focus-visible:outline-2"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 py-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="px-3 py-3 text-lg font-medium text-[#2F3437] hover:text-[#C98F55] hover:bg-[#FAF6EE] rounded-xl transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="pt-4 border-t border-[#EFEAE2] flex justify-between items-center text-xs font-mono text-[#8C8479]">
          <span>MY FIRST PORTFOLIO</span>
          <span>EST. 2025</span>
        </div>
      </div>
    </div>
  );
}
