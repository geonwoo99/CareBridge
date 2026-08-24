// components/interactive/DermatophyteBlocks.tsx
// ─────────────────────────────────────────────────────────────
// dermatophyte.mdx 전용 프리셋 래퍼.
// content/data/dermatophyte.ts의 값을 컴포넌트에 주입.
// ─────────────────────────────────────────────────────────────

"use client";

import { PrincipleGrid } from "@/components/primitives/PrincipleGrid";
import { StatGrid } from "@/components/primitives/StatGrid";
import { ExpandableCards } from "@/components/primitives/ExpandableCards";
import { Checklist } from "@/components/primitives/Checklist";
import { CountdownTimer } from "@/components/primitives/CountdownTimer";
import {
  CCATS_PRINCIPLES,
  DERMATO_HERO_STATS,
  DERMATO_STEPS,
  DERMATO_FAQ,
  DAILY_CHECKLIST,
  CLEAN_FREQUENCY,
  DISINFECTANT_OPTIONS,
} from "@/content/data/dermatophyte";

/** 상단 히어로 통계 3개 */
export function DermatoHeroStats() {
  return <StatGrid items={DERMATO_HERO_STATS} />;
}

/** CCATS 5원칙 그리드 */
export function CcatsGrid() {
  return <PrincipleGrid principles={CCATS_PRINCIPLES} />;
}

/** 5단계 실천 가이드 */
export function DermatoSteps() {
  return <ExpandableCards items={DERMATO_STEPS} />;
}

/** 10분 카운트다운 타이머 */
export function TenMinuteTimer() {
  return (
    <CountdownTimer
      durationSec={600}
      title="10분 소독 타이머"
      caption="소독제를 분사한 뒤, 정확히 10분간 그대로 두어야 효과가 있습니다."
    />
  );
}

/** 3가지 소독제 옵션 */
export function DisinfectantOptions() {
  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-3">
      {DISINFECTANT_OPTIONS.map((d) => (
        <div
          key={d.id}
          className="flex flex-col rounded-2xl border border-border bg-background p-5 shadow-sm"
        >
          <h4 className="font-serif text-base font-bold text-foreground m-0">
            {d.title}
          </h4>
          <div className="mt-1 text-[11px] text-muted-foreground">
            {d.subtitle}
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {d.tags.map((t, i) => (
              <span
                key={i}
                className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-primary"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/85 m-0">
            {d.body}
          </p>
        </div>
      ))}
    </div>
  );
}

/** 매일 체크리스트 7항목 */
export function DermatoChecklist() {
  return <Checklist items={DAILY_CHECKLIST.map((label) => ({ label }))} />;
}

/** 청소 빈도 3개 */
export function DermatoCleanFrequency() {
  return <StatGrid items={CLEAN_FREQUENCY} />;
}

/** FAQ 6개 */
export function DermatoFaq() {
  return <ExpandableCards items={DERMATO_FAQ} />;
}
