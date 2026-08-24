// components/interactive/QuarantineTimeline.tsx
// ─────────────────────────────────────────────────────────────
// 검역 준비 단계를 날짜순으로 시각화하는 타임라인.
// 스텝 데이터는 백엔드에서 계산된 값을 그대로 사용.
// ─────────────────────────────────────────────────────────────

"use client";

import {
  formatKoreanDate,
  todayISO,
  type QuarantineStep,
} from "@/lib/quarantine";

interface Props {
  steps: QuarantineStep[];
  /** 최소 출발 가능일 (마지막 노드로 강조). */
  earliestDeparture?: string | null;
  /** 사용자가 원하는 출발일 (있으면 최상단에 별도 표시). */
  targetDate?: string | null;
}

export function QuarantineTimeline({
  steps,
  earliestDeparture,
  targetDate,
}: Props) {
  if (!steps || steps.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/40 p-6 text-center text-sm text-muted-foreground">
        이 나라의 준비 단계는 별도 안내가 필요해요.
      </div>
    );
  }

  const today = todayISO();

  return (
    <div className="not-prose relative">
      {/* 세로 라인 */}
      <div
        className="absolute left-4 top-2 bottom-2 w-px bg-border sm:left-5"
        aria-hidden
      />

      <ul className="flex flex-col gap-4 pl-0 list-none">
        {steps.map((s, i) => {
          const isPast = s.date ? s.date < today : false;
          const isToday = s.date ? s.date === today : false;
          return (
            <li key={i} className="relative pl-12 sm:pl-14">
              {/* 노드 */}
              <div
                className={`absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold sm:h-10 sm:w-10 sm:text-sm ${
                  isPast
                    ? "border-muted bg-muted text-muted-foreground"
                    : isToday
                    ? "border-primary bg-accent text-primary"
                    : "border-primary bg-primary text-primary-foreground"
                }`}
              >
                {i + 1}
              </div>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-serif text-base font-bold text-foreground">
                  {s.step}
                </span>
                <span className="text-xs font-semibold text-primary">
                  {s.date ? formatKoreanDate(s.date) : (s.at === "arrival" ? "도착 시" : "일정 미정")}
                </span>
                {isToday && (
                  <span className="inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                    오늘
                  </span>
                )}
              </div>
              {s.note && (
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {s.note}
                </p>
              )}
            </li>
          );
        })}

        {/* 마지막 노드: 최소 출발 가능일 */}
        {earliestDeparture && (
          <li className="relative pl-12 sm:pl-14">
            <div
              className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-warning bg-warning text-warning-foreground sm:h-10 sm:w-10"
              aria-hidden
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12h20M12 2l10 10-10 10" />
              </svg>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-serif text-base font-bold text-foreground">
                출국 가능
              </span>
              <span className="text-xs font-semibold text-warning-foreground">
                {formatKoreanDate(earliestDeparture)}
              </span>
            </div>
            {targetDate && targetDate !== earliestDeparture && (
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                예정 출발일: {formatKoreanDate(targetDate)}
              </p>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}
