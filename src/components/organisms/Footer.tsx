import { ArrowUp, Heart } from "lucide-react";
import LogoMark from "@/components/atoms/LogoMark";
import { siteContent } from "@/data/siteContent";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-20 border-t border-[#E7E0D6] bg-[#FFFDF8] py-12 sm:py-16 text-[#73706A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#EFEAE2]">
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <LogoMark variant="compact" />
            <p className="text-xs sm:text-sm text-[#73706A]">
              {siteContent.hero.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/brand"
              className="text-xs font-mono text-[#73706A] hover:text-[#2F3437] transition-colors underline decoration-[#E2D7C6] underline-offset-4"
            >
              The Mark of Luca &rarr;
            </Link>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-mono text-[#73706A] hover:text-[#2F3437] bg-[#F8F5EF] hover:bg-[#EFE7DA] border border-[#E2D7C6] px-4 py-2 rounded-full transition-colors cursor-pointer focus-visible:outline-2"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-center">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#C98F55] fill-[#C98F55]" />
            <span>
              for <strong className="font-semibold text-[#2F3437]">Muhammad Gabriel Luca Senna</strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[#8C8479]">
            <span>&copy; {currentYear} &middot; Our Little Senna</span>
            <span>&middot;</span>
            <span>Crafted with &lt;3 by Luca</span>
            <span>&middot;</span>
            <a
              href="https://github.com/parikesitad-pm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2F3437] underline decoration-[#DCD3C5] underline-offset-2 transition-colors"
            >
              {siteContent.footer.author}
            </a>
          </div>
        </div>

        <div className="mt-4 text-center flex flex-wrap items-center justify-center gap-3">
          <code className="text-[11px] font-mono text-[#A8A095] bg-[#F8F5EF] px-2.5 py-1 rounded-md">
            {siteContent.footer.portfolioMetadata}
          </code>
          <span className="font-mono text-[11px] text-[#A8A095]">
            &ldquo;Hello, World. Keep becoming.&rdquo;
          </span>
        </div>
      </div>
    </footer>
  );
}
