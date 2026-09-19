import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";
import ResponsiveImage from "@/components/atoms/ResponsiveImage";
import { ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HospitalSection() {
  const { t } = useTranslation();

  return (
    <section
      id="brave-chapter"
      className="py-20 sm:py-28 bg-[var(--surface)] border-t border-[var(--border)] scroll-mt-12 transition-colors"
      aria-labelledby="brave-chapter-title"
    >
      <Container size="lg">
        <SectionTitle
          eyebrow={t("hospital.eyebrow")}
          title={t("hospital.title")}
          align="center"
        />

        <div className="max-w-2xl mx-auto text-center mb-12 space-y-3">
          <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
            {t("hospital.p1")}
          </p>
          <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
            {t("hospital.p2")}
          </p>
          <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
            {t("hospital.p3")}
          </p>
        </div>

        {/* Real photo progression: care -> rest -> recovery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Hospital Care 1 */}
          <figure className="bg-[var(--surface-soft)] p-3 rounded-2xl border border-[var(--border)] shadow-xs">
            <div className="aspect-[4/3] sm:aspect-square overflow-hidden rounded-xl bg-[var(--surface)]">
              <ResponsiveImage
                basePath="/images/senna/senna-dirawat-01"
                alt="Luca resting during medical care"
                width={1303}
                height={1207}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="w-full h-full"
                imgClassName="object-cover object-center"
              />
            </div>
            <figcaption className="pt-3 px-1 text-left">
              <span className="font-mono text-xs font-semibold text-[#C98F55] uppercase tracking-wider block">
                {t("hospital.card1Title")}
              </span>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-0.5">
                {t("hospital.card1Desc")}
              </p>
            </figcaption>
          </figure>

          {/* Hospital Care 2 */}
          <figure className="bg-[var(--surface-soft)] p-3 rounded-2xl border border-[var(--border)] shadow-xs">
            <div className="aspect-[4/3] sm:aspect-square overflow-hidden rounded-xl bg-[var(--surface)]">
              <ResponsiveImage
                basePath="/images/senna/senna-dirawat-02"
                alt="Senna resting peacefully under family watch"
                width={1374}
                height={1145}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="w-full h-full"
                imgClassName="object-cover object-center"
              />
            </div>
            <figcaption className="pt-3 px-1 text-left">
              <span className="font-mono text-xs font-semibold text-[#C98F55] uppercase tracking-wider block">
                {t("hospital.card2Title")}
              </span>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-0.5">
                {t("hospital.card2Desc")}
              </p>
            </figcaption>
          </figure>

          {/* After Hospital / Recovery */}
          <figure className="bg-[var(--surface-soft)] p-3 rounded-2xl border border-[var(--border)] shadow-xs relative">
            <div className="aspect-[4/3] sm:aspect-square overflow-hidden rounded-xl bg-[var(--surface)]">
              <ResponsiveImage
                basePath="/images/senna/senna-setelah-dirawat"
                alt="Senna smiling brightly and recovered after care"
                width={1024}
                height={1536}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="w-full h-full"
                imgClassName="object-cover object-center"
              />
            </div>
            <figcaption className="pt-3 px-1 text-left">
              <div className="flex items-center gap-1 text-[#2E7D32] dark:text-[#81C784]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                  {t("hospital.card3Title")}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-0.5">
                {t("hospital.card3Desc")}
              </p>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
