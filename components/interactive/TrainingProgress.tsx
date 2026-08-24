// components/interactive/TrainingProgress.tsx
// ─────────────────────────────────────────────────────────────
// 훈련 단계 진행률 아코디언 — 각 단계를 완료로 체크할 수 있고,
// 상태는 localStorage에 저장됩니다.
// 데이터는 content/data/*.ts, 저장 키는 props로 받아 여러 가이드에서
// 서로 다른 훈련 흐름에 재사용할 수 있습니다.
// ─────────────────────────────────────────────────────────────

"use client";

import { useEffect, useState } from "react";

export interface TrainingStepData {
  n: number;
  title: string;
  subtitle: string;
  bullets: string[];
}

interface Props {
  steps: TrainingStepData[];
  /** localStorage 키 접미사 (페이지별 구분) */
  storageKey: string;
  /** 하단 원칙 태그(예: ["한 세션 10분 이내", ...]) */
  principles?: string[];
  /** 상단 소제목 */
  heading?: string;
  helper?: string;
}

export function TrainingProgress({
  steps,
  storageKey,
  principles,
  heading = "서두르지 않아도 괜찮아요. 한 단계씩 진행해 보세요.",
  helper,
}: Props) {
  const [done, setDone] = useState<Record<number, boolean>>({});
  const [openN, setOpenN] = useState<number | null>(null);
  const key = `training-progress:${storageKey}`;

  // localStorage 복원
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setDone(JSON.parse(raw));
    } catch { /* noop */ }
  }, [key]);

  function toggleDone(n: number) {
    setDone((prev) => {
      const next = { ...prev, [n]: !prev[n] };
      try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* noop */ }
      return next;
    });
  }

  const doneCount = Object.values(done).filter(Boolean).length;

  return (
    <div className="not-prose my-6 rounded-2xl border border-border bg-background p-6 shadow-sm print:hidden">
      {helper && (
        <p className="mb-2 text-sm leading-relaxed text-muted-foreground">
          {helper}
        </p>
      )}

      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm text-foreground/85">{heading}</span>
        <span className="font-serif text-lg font-extrabold text-primary">
          {doneCount} / {steps.length}
        </span>
      </div>

      {/* 진행 바 */}
      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${(doneCount / steps.length) * 100}%` }}
        />
      </div>

      {/* 아코디언 */}
      <ul className="flex flex-col gap-2 pl-0 list-none">
        {steps.map((s) => {
          const isOpen = openN === s.n;
          const isDone = !!done[s.n];
          return (
            <li key={s.n} className={`rounded-xl border ${isDone ? "border-primary/40 bg-accent" : "border-border bg-muted/30"}`}>
              <button
                type="button"
                onClick={() => setOpenN(isOpen ? null : s.n)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 px-4 py-3 text-left"
              >
                <label
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-5 w-5 shrink-0 items-center justify-center"
                >
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggleDone(s.n)}
                    className="h-4 w-4 accent-primary cursor-pointer"
                    aria-label={`${s.n}단계 완료`}
                  />
                </label>
                <span className="flex-1 text-sm font-semibold text-foreground">
                  {s.n}. {s.title}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    {s.subtitle}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-primary" aria-hidden>
                  {isOpen ? "▲" : "▼"}
                </span>
              </button>
              {isOpen && (
                <ul className="border-t border-border/60 px-4 py-3 pl-8 list-disc space-y-1.5 text-xs leading-relaxed text-muted-foreground marker:text-primary">
                  {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      {principles && principles.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {principles.map((p, i) => (
            <span
              key={i}
              className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground"
            >
              {p}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
