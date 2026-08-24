// components/primitives/ColorDiagnostic.tsx
// ─────────────────────────────────────────────────────────────
// 색 견본을 눌러 해당 상태의 의미를 확인하는 범용 진단 컴포넌트.
// 소변 색·변 색·잇몸 색처럼 "보이는 색상으로 상태를 판정"하는
// 안내에 두루 쓰기 위해 primitives/에 둡니다.
//
// - swatch(색상)은 임의 색이 아니라 진단에 필요한 실제 색을 전달합니다.
//   (디자인 토큰과 무관한 "그림" 색이므로 하드코딩이 아닌 데이터).
// - verdict("ok" | "warn" | "danger")로 배지 톤만 토큰으로 매핑합니다.
// ─────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";

export type ColorVerdict = "ok" | "warn" | "danger";

export interface ColorDiagnosticItem {
  id: string;
  /** 실제 눈으로 보이는 색(예: 소변의 옅은 노랑). CSS color 값. */
  swatch: string;
  label: string;
  verdict: ColorVerdict;
  detail: string;
}

const verdictStyles: Record<ColorVerdict, { badge: string; ring: string; label: string }> = {
  ok: {
    badge: "bg-accent text-primary",
    ring: "ring-primary/30",
    label: "정상",
  },
  warn: {
    badge: "bg-warning-muted text-warning-foreground",
    ring: "ring-warning/40",
    label: "주의",
  },
  danger: {
    badge: "bg-danger-muted text-danger-foreground",
    ring: "ring-danger/40",
    label: "위험",
  },
};

export function ColorDiagnostic({
  title,
  emoji,
  items,
}: {
  title: string;
  emoji?: string;
  items: ColorDiagnosticItem[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="not-prose my-6 rounded-xl border border-border bg-background p-5">
      <div className="mb-3 flex items-center gap-2 font-serif text-base font-bold text-foreground">
        {emoji && <span aria-hidden>{emoji}</span>}
        <span>{title}</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((it) => {
          const isOpen = openId === it.id;
          const s = verdictStyles[it.verdict];
          return (
            <button
              type="button"
              key={it.id}
              onClick={() => setOpenId(isOpen ? null : it.id)}
              className={`flex flex-col items-start rounded-lg border border-border bg-background p-3 text-left shadow-sm transition hover:border-primary/50 ${
                isOpen ? `ring-2 ${s.ring}` : ""
              }`}
              aria-expanded={isOpen}
            >
              <div className="flex w-full items-center gap-3">
                <span
                  className="inline-block h-8 w-8 shrink-0 rounded-full border border-border"
                  style={{ backgroundColor: it.swatch }}
                  aria-hidden
                />
                <span className="flex-1 text-sm font-semibold text-foreground">
                  {it.label}
                </span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${s.badge}`}
                >
                  {s.label}
                </span>
              </div>
              {/* 화면: 클릭 시 표시 / 인쇄: 항상 표시 */}
              <div
                className={`mt-3 text-xs leading-relaxed text-muted-foreground ${
                  isOpen ? "block" : "hidden print:block"
                }`}
              >
                {it.detail}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
