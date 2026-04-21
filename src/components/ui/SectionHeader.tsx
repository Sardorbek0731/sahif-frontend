// Server component — "use client" YO'Q
// HomeBooks.tsx va HomeAuthors.tsx server component'lar,
// shuning uchun SectionHeader ham server component bo'lishi kerak.

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SectionHeaderProps {
  title: string;
  href?: string;
  linkLabel?: string;
  className?: string;
  id?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function SectionHeader({
  title,
  href,
  linkLabel = "Ko'proq",
  className,
  id,
}: SectionHeaderProps) {
  return (
    <div className={cn("row-between mb-4", className)}>
      <h2 id={id} className="text-2xl font-bold">
        {title}
      </h2>
      {href && (
        <Link href={href}>
          <Button variant="outline" size="sm" rightIcon="chevronRight">
            {linkLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}
