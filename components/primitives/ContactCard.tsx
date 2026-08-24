// components/primitives/ContactCard.tsx
// ─────────────────────────────────────────────────────────────
// 병원 연락처 카드 — site.config.ts의 값을 읽어와 렌더링.
// 연락처 값이 하나라도 없으면 아무 것도 렌더링하지 않도록 방어.
// (규칙: 20-design-tokens.md — 브랜드/연락처 하드코딩 금지,
//         반드시 site.config.ts를 참조)
// ─────────────────────────────────────────────────────────────

"use client";

import { siteConfig, hasContact } from "@/lib/site.config";

interface Props {
  /** 카드 상단 제목. 페이지 맥락에 맞게 MDX에서 주입. */
  title?: string;
  /** 카드 부제/설명. */
  description?: string;
  /** 연락 CTA 문구(예: "언제든지 연락주세요"). */
  cta?: string;
}

export function ContactCard({
  title = "병원 연락처",
  description,
  cta = "궁금한 점이 있다면 언제든 연락주세요",
}: Props) {
  if (!hasContact) return null;

  const { phone, kakaoUrl, hours } = siteConfig.contact;

  return (
    <div className="not-prose my-8 overflow-hidden rounded-xl border border-border bg-foreground text-background shadow-sm">
      <div className="p-6">
        <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-background/60">
          CONTACT · 고객 응대
        </div>
        <h3 className="font-serif text-xl font-bold text-background m-0">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-background/80 m-0">
            {description}
          </p>
        )}
      </div>

      {cta && (
        <div className="mx-6 mb-4 rounded-lg bg-warning px-4 py-3 text-sm font-semibold text-warning-foreground">
          {cta}
        </div>
      )}

      <div className="grid gap-2 border-t border-background/10 px-6 py-4 sm:grid-cols-2">
        {phone && (
          <a
            href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
            className="flex items-center gap-3 rounded-lg border border-background/15 bg-background/5 px-4 py-3 transition hover:bg-background/10"
          >
            <span className="text-lg" aria-hidden>📞</span>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-wider text-background/60">
                전화
              </span>
              <span className="text-sm font-bold text-background">{phone}</span>
            </div>
          </a>
        )}
        {kakaoUrl && (
          <a
            href={kakaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-background/15 bg-background/5 px-4 py-3 transition hover:bg-background/10"
          >
            <span className="text-lg" aria-hidden>💬</span>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-wider text-background/60">
                카카오톡
              </span>
              <span className="text-sm font-bold text-background">채팅 상담</span>
            </div>
          </a>
        )}
      </div>

      {hours && (
        <div className="border-t border-background/10 px-6 py-3 text-xs text-background/70">
          🕒 {hours}
        </div>
      )}
    </div>
  );
}
