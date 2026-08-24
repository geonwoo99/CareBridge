// components/primitives/AssessmentForm.tsx
// ─────────────────────────────────────────────────────────────
// 범용 평가 문항 폼. 문항(AssessmentItem[])을 받아 라디오 카드
// 리스트로 렌더링하고 응답을 상위로 올려줍니다. 특정 도구에 종속되지 않음.
// ─────────────────────────────────────────────────────────────

"use client";

import type { AssessmentItem } from "@/lib/assessment";

interface Props {
  items: AssessmentItem[];
  answers: Record<string, number>;
  onChange: (itemId: string, score: number) => void;
}

export function AssessmentForm({ items, answers, onChange }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {items.map((it, idx) => {
        const current = answers[it.id];
        const answered = typeof current === "number";
        return (
          <section
            key={it.id}
            id={`item-${it.id}`}
            className="rounded-2xl border border-border bg-background p-6 shadow-sm"
            aria-labelledby={`item-${it.id}-heading`}
          >
            {/* 상단 진행 라벨 */}
            <div className="mb-3 flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-muted-foreground">
                {String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
              {answered && (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold text-primary">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  {current}점
                </span>
              )}
            </div>

            {/* 카테고리 헤더 */}
            <div className="mb-4 flex items-center gap-2">
              {it.emoji && <span className="text-2xl" aria-hidden>{it.emoji}</span>}
              <div
                id={`item-${it.id}-heading`}
                className="font-serif text-lg font-bold text-foreground"
              >
                {it.category}
              </div>
            </div>

            <p className="mb-1 font-semibold text-foreground">{it.question}</p>
            {it.helper && (
              <p className="mb-4 text-sm text-muted-foreground">{it.helper}</p>
            )}

            {/* 선택지 */}
            <fieldset className="flex flex-col gap-2 border-0 p-0 m-0">
              <legend className="sr-only">{it.question}</legend>
              {it.options.map((op) => {
                const selected = current === op.score;
                return (
                  <label
                    key={op.score}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition ${
                      selected
                        ? "border-primary bg-accent shadow-sm"
                        : "border-border bg-muted/40 hover:border-primary/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name={it.id}
                      value={op.score}
                      checked={selected}
                      onChange={() => onChange(it.id, op.score)}
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <span className="flex-1">
                      <span
                        className={`block text-sm font-semibold ${
                          selected ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {op.label}
                      </span>
                      {op.hint && (
                        <span className="block text-xs text-muted-foreground">
                          {op.hint}
                        </span>
                      )}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                        selected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {op.score}점
                    </span>
                  </label>
                );
              })}
            </fieldset>
          </section>
        );
      })}
    </div>
  );
}
