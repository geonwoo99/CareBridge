import React from 'react';

export interface EvidenceQuoteItem {
  source: string;
  original?: string;
  translation: React.ReactNode;
}

interface EvidenceQuoteProps {
  items: EvidenceQuoteItem[];
}

export function EvidenceQuote({ items }: EvidenceQuoteProps) {
  return (
    <figure className="not-prose my-8 rounded-r-lg border-l-[3px] border-primary/50 bg-accent/20 py-6 pl-6 pr-6 m-0">
      <div className="flex flex-col gap-6">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col gap-2.5 ${
              idx > 0 ? "border-t border-dashed border-border pt-6" : ""
            }`}
          >
            {/* 출처 — 차분하게 */}
            <span className="text-xs font-semibold tracking-wide text-primary/70 uppercase">
              {item.source}
            </span>

            {/* 원문 — 주인공이되 과하지 않게 */}
            {item.original && (
              <blockquote className="m-0 text-[15px] md:text-base italic text-foreground/85 leading-relaxed">
                &ldquo;{item.original}&rdquo;
              </blockquote>
            )}

            {/* 번역 — 보조 */}
            <div className="text-sm text-muted-foreground leading-relaxed">
              {item.translation}
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
