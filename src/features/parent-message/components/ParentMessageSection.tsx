import Container from "@/components/atoms/Container";
import { useTranslation } from "react-i18next";

export default function ParentMessageSection() {
  const { t } = useTranslation();

  return (
    <section
      id="for-senna"
      className="py-24 sm:py-32 bg-[var(--surface)] border-t border-[var(--border)] scroll-mt-12 transition-colors"
      aria-labelledby="parent-message-title"
    >
      <Container size="md">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-mono text-xs font-semibold tracking-widest text-[#C98F55] uppercase block mb-3">
            {t("parentMessage.eyebrow")}
          </span>

          <h2
            id="parent-message-title"
            className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] font-sans tracking-tight mb-10"
          >
            {t("parentMessage.title")}
          </h2>

          <div className="space-y-6 text-[var(--muted-foreground)] text-lg sm:text-xl font-normal leading-relaxed">
            <p className="italic font-serif text-[var(--foreground)]">
              &ldquo;{t("parentMessage.p1")}&rdquo;
            </p>
            <p className="italic font-serif text-[var(--foreground)]">
              &ldquo;{t("parentMessage.p2")}&rdquo;
            </p>
            <p className="italic font-serif text-[var(--foreground)]">
              &ldquo;{t("parentMessage.p3")}&rdquo;
            </p>
            <p className="italic font-serif text-[var(--foreground)]">
              &ldquo;{t("parentMessage.p4")}&rdquo;
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--border)] inline-block">
            <span className="font-mono text-xs text-[var(--muted-foreground)] tracking-wider uppercase block">
              {t("parentMessage.signoff")}
            </span>
            <span className="font-sans text-sm font-semibold text-[var(--foreground)] mt-1 block">
              {t("parentMessage.from")}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
