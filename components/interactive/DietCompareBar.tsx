// components/interactive/DietCompareBar.tsx
// ─────────────────────────────────────────────────────────────
// 하단에 떠 있는 비교 바.
// 사용자가 카탈로그에서 체크박스로 고른 제품들을 슬롯으로 표시하고,
// "비교하기" 버튼으로 비교 뷰를 열게 합니다.
// 최대 선택 개수는 props로 (기본 4).
// ─────────────────────────────────────────────────────────────

"use client";

import type { Product } from "@/lib/dietMath";

interface Props {
  products: Product[];
  maxCount?: number;
  onRemove: (id: string) => void;
  onClear: () => void;
  onCompare: () => void;
}

export function DietCompareBar({
  products,
  maxCount = 4,
  onRemove,
  onClear,
  onCompare,
}: Props) {
  const open = products.length > 0;
  const canCompare = products.length >= 2;

  const slots = [];
  for (let i = 0; i < maxCount; i++) {
    slots.push(products[i] ?? null);
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-200 print:hidden ${
        open ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!open}
    >
      <div className="mx-auto flex max-w-4xl items-center gap-3 px-5 py-3">
        <div className="flex flex-1 gap-2 overflow-x-auto">
          {slots.map((p, i) => (
            <div key={i} className="relative w-[68px] shrink-0">
              {p ? (
                <>
                  <button
                    type="button"
                    onClick={() => onRemove(p.id)}
                    aria-label={`${p.name} 제거`}
                    className="absolute -right-1.5 -top-1.5 z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-danger text-[11px] font-bold leading-none text-danger-foreground shadow-sm"
                  >
                    ×
                  </button>
                  <div className="flex h-[51px] w-[68px] items-center justify-center overflow-hidden rounded-md border border-border bg-muted text-xl">
                    {p.photo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.photo_url}
                        alt=""
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span>🍽️</span>
                    )}
                  </div>
                  <div
                    className="mt-0.5 truncate text-[10px] text-muted-foreground"
                    title={p.name}
                  >
                    {p.name}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex h-[51px] w-[68px] items-center justify-center rounded-md border border-dashed border-border bg-muted text-xl text-muted-foreground">
                    +
                  </div>
                  <div className="mt-0.5 text-[10px] text-muted-foreground">
                    비어 있음
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="mr-1 text-right text-xs text-muted-foreground">
            <strong className="text-sm text-foreground">
              {products.length}
            </strong>{" "}
            / {maxCount}
          </div>
          <button
            type="button"
            onClick={onClear}
            className="rounded-lg border border-border bg-background px-3 py-2.5 text-xs font-semibold text-foreground transition hover:border-primary/40"
          >
            초기화
          </button>
          <button
            type="button"
            onClick={onCompare}
            disabled={!canCompare}
            className="rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            비교하기 →
          </button>
        </div>
      </div>
    </div>
  );
}
