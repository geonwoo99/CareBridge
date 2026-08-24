// components/interactive/DrugFilter.tsx
// ─────────────────────────────────────────────────────────────
// 태그 다중 선택 → 관련 카드만 필터링해서 보여주는 범용 컴포넌트.
// 항암제 · 알레르겐 · 성분 등 "여러 항목 중 관련 있는 것만 골라 보는" UX에 재사용.
// (규칙: .agents/rules/10-content-vs-code.md — 데이터는 props로 주입)
// ─────────────────────────────────────────────────────────────

"use client";

import { useState, type ReactNode } from "react";

export interface DrugFilterItem {
  id: string;
  /** 태그(칩)에 표시할 짧은 이름 */
  chipLabel: string;
  /** 태그에 부착할 강조 뱃지(예: "수포제 · 강함") */
  chipBadge?: string;
  /** 강조 등급 — 태그·카드 색 톤 결정 */
  tone?: "default" | "warning" | "danger" | "muted";
  /** 카드 상세 렌더러(자유롭게 커스텀 가능) */
  render: () => ReactNode;
}

interface Props {
  items: DrugFilterItem[];
  /** 필터 상단 안내 */
  helper?: string;
  /** 아무 것도 선택하지 않았을 때의 안내 */
  emptyState?: string;
}

const toneRing: Record<NonNullable<DrugFilterItem["tone"]>, string> = {
  default: "ring-primary/30 bg-primary/10 text-primary",
  warning: "ring-warning/40 bg-warning-muted text-warning-foreground",
  danger: "ring-danger/40 bg-danger-muted text-danger-foreground",
  muted: "ring-border bg-muted text-muted-foreground",
};

export function DrugFilter({
  items,
  helper = "우리 아이가 맞은 항암제를 **선택**해 주세요 · 다중 선택 가능",
  emptyState = "위에서 항암제를 선택하시면 해당 약물의 **집에서 살펴야 할 내용**만 보이게 돼요.",
}: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selectedItems = items.filter((it) => selected.has(it.id));

  return (
    <div className="not-prose my-6">
      <p className="mb-3 text-sm leading-relaxed text-foreground/85">
        {renderBold(helper)}
      </p>

      {/* 태그 칩 리스트 */}
      <div className="flex flex-wrap gap-2">
        {items.map((it) => {
          const active = selected.has(it.id);
          const tone = it.tone ?? "default";
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => toggle(it.id)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                active
                  ? `${toneRing[tone]} border-transparent ring-2`
                  : "border-border bg-background text-foreground hover:border-primary/40"
              }`}
            >
              <span>{it.chipLabel}</span>
              {it.chipBadge && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    active
                      ? "bg-background/60 text-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {it.chipBadge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 결과 영역 */}
      <div className="mt-4">
        {selectedItems.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/40 p-6 text-center text-sm leading-relaxed text-muted-foreground">
            {renderBold(emptyState)}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {selectedItems.map((it) => (
              <div key={it.id}>{it.render()}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** **bold** → <strong> 렌더러 */
function renderBold(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="text-foreground">
        {p.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}
