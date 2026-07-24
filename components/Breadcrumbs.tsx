import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";

type BreadcrumbsProps = {
  items: Crumb[];
  /** Use on dark hero bands */
  tone?: "light" | "dark";
  className?: string;
};

export function Breadcrumbs({
  items,
  tone = "light",
  className = "",
}: BreadcrumbsProps) {
  if (items.length < 2) return null;

  const schema = breadcrumbJsonLd(items);
  const muted = tone === "dark" ? "text-white/55" : "text-ink-mute";
  const current = tone === "dark" ? "text-lime" : "text-ink";
  const hover = tone === "dark" ? "hover:text-lime" : "hover:text-ink";

  return (
    <nav
      aria-label="Breadcrumb"
      className={`font-display text-[11px] font-extrabold uppercase tracking-[0.18em] ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.href}-${item.name}`} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  className={`h-3 w-3 shrink-0 ${muted}`}
                  aria-hidden
                />
              )}
              {isLast ? (
                <span className={current} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`${muted} transition-colors ${hover}`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </nav>
  );
}
