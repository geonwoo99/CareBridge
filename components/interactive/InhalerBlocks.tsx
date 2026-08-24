// components/interactive/InhalerBlocks.tsx
// ─────────────────────────────────────────────────────────────
// inhaler.mdx 전용 프리셋 래퍼.
// content/data/inhaler.ts의 값을 컴포넌트에 주입.
// ─────────────────────────────────────────────────────────────

"use client";

import { StatGrid } from "@/components/primitives/StatGrid";
import { StepCarousel } from "@/components/primitives/StepCarousel";
import { TrainingProgress } from "./TrainingProgress";
import { useSpecies } from "@/components/primitives/SpeciesToggle";
import {
  INHALER_WHY,
  INHALER_STEPS,
  INHALER_STEP_TIP,
  TRAINING_STEPS,
  TRAINING_PRINCIPLES,
  INHALER_MINDSET,
  CLEANING_STEPS,
  CHAMBER_BY_SPECIES,
} from "@/content/data/inhaler";

/** 흡입치료 3가지 이점 */
export function InhalerWhy() {
  return (
    <StatGrid
      items={INHALER_WHY.map((w) => ({
        label: w.tag,
        value: w.title,
        desc: w.body,
      }))}
    />
  );
}

/** 사용 순서 4단계 캐러셀 */
export function InhalerHowToCarousel() {
  const { species } = useSpecies();
  const s = species === "common" ? "cat" : species;
  const chamber = CHAMBER_BY_SPECIES[s];

  return (
    <StepCarousel
      steps={INHALER_STEPS.map((step) => ({
        n: step.n,
        title: step.title,
        body: step.body,
        image: `/media/inhaler/${step.image}`,
        imageAlt: step.imageAlt,
      }))}
      footerTip={INHALER_STEP_TIP}
      headerRight={
        <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-primary">
          {chamber}
        </span>
      }
    />
  );
}

/** 적응 훈련 6단계 진행률 */
export function InhalerTraining() {
  return (
    <TrainingProgress
      steps={TRAINING_STEPS}
      storageKey="inhaler-training"
      principles={TRAINING_PRINCIPLES}
      heading="서두르지 않아도 괜찮아요. 한 단계씩 진행해 보세요."
      helper="훈련의 원칙은 하나예요. **강요하지 않고, 아이가 스스로 선택하게.** 단계를 마칠 때마다 체크해 보세요. 이 기록은 이 기기에 저장돼요."
    />
  );
}

/** 기억할 세 가지 */
export function InhalerMindset() {
  return (
    <StatGrid
      items={INHALER_MINDSET.map((m) => ({
        label: m.tag,
        value: m.title,
        desc: m.body,
      }))}
    />
  );
}

/** 세척 4단계 카드 그리드 */
export function InhalerCleaning() {
  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {CLEANING_STEPS.map((c, i) => (
        <div
          key={i}
          className="flex flex-col rounded-2xl border border-border bg-background p-4 shadow-sm"
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h4 className="mt-1 font-serif text-base font-bold text-foreground m-0">
            {c.title}
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground m-0">
            {c.body}
          </p>
        </div>
      ))}
    </div>
  );
}
