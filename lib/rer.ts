// lib/rer.ts
// ─────────────────────────────────────────────────────────────
// RER(Resting Energy Requirement) 및 식도관 강급량 계산 로직.
// 순수 함수 모듈 — UI/데이터를 모릅니다. (규칙 10)
//
// 공식(임상 표준, WSAVA Global Nutrition Guidelines):
//   RER (kcal/day) = 70 × BW(kg)^0.75
// ─────────────────────────────────────────────────────────────

/** 체중(kg) → 하루 안정시 에너지요구량(kcal) */
export function calcRer(weightKg: number): number | null {
  if (!Number.isFinite(weightKg) || weightKg <= 0) return null;
  return 70 * Math.pow(weightKg, 0.75);
}

export interface DilutionInput {
  /** 급여할 식이의 원래 부피(ml) */
  foodMl: number;
  /** 섞는 물의 양(ml) */
  waterMl: number;
  /** 식이 자체의 열량 밀도(kcal/ml) — 희석 전 */
  kcalPerMl: number;
}

/** 희석 후 총 부피 · 열량 밀도 */
export function calcDilution({ foodMl, waterMl, kcalPerMl }: DilutionInput): {
  totalMl: number;
  kcalPerMlDiluted: number;
} {
  const totalMl = Math.max(0, foodMl) + Math.max(0, waterMl);
  const totalKcal = Math.max(0, foodMl) * Math.max(0, kcalPerMl);
  const kcalPerMlDiluted = totalMl > 0 ? totalKcal / totalMl : 0;
  return { totalMl, kcalPerMlDiluted };
}

export interface StepInput {
  /** 목표치 대비 RER 비율 (0.33, 0.67, 1.0, 1.1, 1.2 등) */
  rerRatio: number;
  /** 기준 RER (kcal/day) */
  rerKcal: number;
  /** 현재(희석 후) kcal/ml */
  kcalPerMl: number;
  /** 하루 급여 횟수 */
  feedsPerDay: number;
}

export interface StepResult {
  rerRatio: number;
  targetKcalPerDay: number;
  totalMlPerDay: number;
  mlPerFeed: number;
}

/** 단계별 하루/1회 강급량 계산 */
export function calcStep({
  rerRatio,
  rerKcal,
  kcalPerMl,
  feedsPerDay,
}: StepInput): StepResult | null {
  if (
    !Number.isFinite(rerKcal) ||
    !Number.isFinite(kcalPerMl) ||
    kcalPerMl <= 0 ||
    feedsPerDay <= 0
  )
    return null;
  const targetKcalPerDay = rerKcal * rerRatio;
  const totalMlPerDay = targetKcalPerDay / kcalPerMl;
  const mlPerFeed = totalMlPerDay / feedsPerDay;
  return {
    rerRatio,
    targetKcalPerDay,
    totalMlPerDay,
    mlPerFeed,
  };
}

/** 급여 횟수 → 급여 간격(시간) */
export function feedingInterval(feedsPerDay: number): string {
  if (feedsPerDay <= 0) return "—";
  const hours = 24 / feedsPerDay;
  return `${Math.round(hours)}시간마다`;
}
