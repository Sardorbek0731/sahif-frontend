"use client";

import { useTranslations } from "next-intl";

import { Icon, IconName } from "@/components/ui/icons";
import { FEATURE_KEYS } from "@/constants";

const FEATURE_ICONS: IconName[] = [
  "notebookText",
  "truck",
  "search",
  "shieldCheck",
  "sparkles",
  "callCenter",
];

const ACCENTS = [
  {
    icon: "text-amber-500",
    bg: "bg-amber-500/10",
    hover: "hover:border-amber-500/40",
    hoverBg: "hover:bg-amber-500/10",
  },
  {
    icon: "text-blue-500",
    bg: "bg-blue-500/10",
    hover: "hover:border-blue-500/40",
    hoverBg: "hover:bg-blue-500/10",
  },
  {
    icon: "text-violet-500",
    bg: "bg-violet-500/10",
    hover: "hover:border-violet-500/40",
    hoverBg: "hover:bg-violet-500/10",
  },
  {
    icon: "text-emerald-500",
    bg: "bg-emerald-500/10",
    hover: "hover:border-emerald-500/40",
    hoverBg: "hover:bg-emerald-500/10",
  },
  {
    icon: "text-rose-500",
    bg: "bg-rose-500/10",
    hover: "hover:border-rose-500/40",
    hoverBg: "hover:bg-rose-500/10",
  },
  {
    icon: "text-orange-500",
    bg: "bg-orange-500/10",
    hover: "hover:border-orange-500/40",
    hoverBg: "hover:bg-orange-500/10",
  },
];

function FeatureCard({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  const accent = ACCENTS[index];

  return (
    <div
      className={`relative rounded-lg bg-card ${accent.hover} ${accent.hoverBg} p-6 transition-all`}
    >
      <span className="absolute right-6 top-6 font-mono text-foreground/10 select-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className={`mb-6 row-center w-11 h-11 rounded-lg ${accent.bg} ${accent.icon}`}
      >
        <Icon name={FEATURE_ICONS[index]} size={22} />
      </div>

      <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-foreground/50">{description}</p>
    </div>
  );
}

export default function Features() {
  const t = useTranslations("home.features");

  return (
    <section className="my-4">
      <div className="mb-4 text-center">
        <div className="row-center mb-1">
          <div className="h-px w-6 bg-foreground/20" />
          <span className="text-xs font-semibold text-foreground/30 mx-3">
            {t("tag")}
          </span>
          <div className="h-px w-6 bg-foreground/20" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {t("heading")}
        </h2>
        <p className="text-sm text-foreground/50">{t("subheading")}</p>
      </div>

      <div className="grid gap-4 grid-cols-3">
        {FEATURE_KEYS.map((key, i) => (
          <FeatureCard
            key={key}
            index={i}
            title={t(`items.${key}.title`)}
            description={t(`items.${key}.description`)}
          />
        ))}
      </div>
    </section>
  );
}
