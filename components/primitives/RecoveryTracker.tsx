// components/primitives/RecoveryTracker.tsx
// ─────────────────────────────────────────────────────────────
// 회복 트래커 — 수술(또는 치료 시작)일을 입력하면 며칠째인지,
// 어느 회복 단계에 있는지를 시각적으로 표시하는 범용 컴포넌트.
//
// 어떤 회복 안내 페이지에서도 재사용할 수 있도록 단계(stages)와
// 입력 라벨(dateLabel)을 props로 받습니다. 하드코딩 없음.
// (규칙: .agents/rules/10-content-vs-code.md, 20-design-tokens.md)
// ─────────────────────────────────────────────────────────────

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  daysBetween,
  findStage,
  todayISO,
  type RecoveryStage,
} from "@/lib/recoveryTracker";

interface Props {
  /** 회복 단계 목록. content/data/*.ts에서 주입. */
  stages: RecoveryStage[];
  /** 날짜 입력 라벨 (예: "수술일", "치료 시작일") */
  dateLabel: string;
  /** 배지 라벨 (예: "Recovery Tracker") */
  badgeText?: string;
  /** 컴포넌트 제목 */
  title?: string;
  /** localStorage 키 접미사 (페이지별 구분) */
  storageKey?: string;
}

export function RecoveryTracker({
  stages,
  dateLabel,
  badgeText = "Recovery Tracker",
  title,
  storageKey,
}: Props) {
  const [startDate, setStartDate] = useState<string>("");
  const today = todayISO();

  // localStorage 복원 (선택적)
  useEffect(() => {
    if (!storageKey) return;
    try {
      const saved = localStorage.getItem(`recovery-tracker:${storageKey}`);
      if (saved) setStartDate(saved);
    } catch {
      /* noop */
    }
  }, [storageKey]);

  function handleChange(v: string) {
    setStartDate(v);
    if (storageKey) {
      try {
        localStorage.setItem(`recovery-tracker:${storageKey}`, v);
      } catch {
        /* noop */
      }
    }
  }

  const day = useMemo(() => daysBetween(startDate, today), [startDate, today]);
  const currentStage = findStage(day, stages);

  return (
    <div className="not-prose my-6 rounded-xl border border-border bg-background p-6 shadow-sm print:hidden">
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
          {badgeText}
        </span>
        {title && (
          <span className="font-serif text-base font-bold text-foreground">
            {title}
          </span>
        )}
      </div>

      {/* 날짜 입력 + 일차 표시 */}
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-muted-foreground">
            {dateLabel}
          </span>
          <input
            type="date"
            value={startDate}
            max={today}
            onChange={(e) => handleChange(e.target.value)}
            className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <div className="text-right sm:pl-6">
          {day != null ? (
            <>
              <span className="font-serif text-4xl font-extrabold text-primary">
                {day + 1}
              </span>
              <span className="ml-1 text-sm font-semibold text-muted-foreground">
                일차
              </span>
            </>
          ) : (
            <span className="text-xs text-muted-foreground">
              {dateLabel}을 입력하면 일차와 단계를 알려드려요
            </span>
          )}
        </div>
      </div>

      {/* 단계 진행 표시 */}
      <div className="mt-6 grid gap-2 sm:grid-cols-4">
        {stages.map((s) => {
          const isActive = currentStage?.id === s.id;
          const rangeLabel =
            s.toDay == null
              ? `${s.fromDay + 1}일차 이후`
              : s.fromDay === s.toDay
              ? `${s.fromDay + 1}일차`
              : `${s.fromDay + 1}–${s.toDay + 1}일차`;
          return (
            <div
              key={s.id}
              className={`rounded-lg border p-3 text-left transition ${
                isActive
                  ? "border-primary bg-accent shadow-sm"
                  : "border-border bg-muted/30"
              }`}
              aria-current={isActive ? "step" : undefined}
            >
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {rangeLabel}
              </div>
              <div
                className={`text-sm font-bold ${
                  isActive ? "text-primary" : "text-foreground"
                }`}
              >
                {s.label}
              </div>
              {s.description && (
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
