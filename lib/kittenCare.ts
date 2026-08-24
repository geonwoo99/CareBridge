// lib/kittenCare.ts
// ─────────────────────────────────────────────────────────────
// 새끼 고양이(자묘) 케어 계산 로직 — 순수 함수 모듈.
// UI·데이터를 모르는 상태로 "체중·체크된 발달 표지 → 주령 추정"과
// "체중·주령 → 하루 분유량·1회량"을 계산합니다.
//
// 데이터(주령별 온도·수유 간격 등)는 content/data/kitten-care.ts에서 관리하며,
// 이 파일은 그 데이터를 소비하는 로직만 담습니다.
// (규칙: .agents/rules/10-content-vs-code.md — 로직/데이터 분리)
// ─────────────────────────────────────────────────────────────

import {
  KITTEN_STAGES,
  type KittenStageId,
  type KittenStage,
} from "@/content/data/kitten-care";

/** 체중(g)만으로 주령 단계를 추정 */
export function estimateStageByWeight(weightGrams: number): KittenStageId | null {
  if (!Number.isFinite(weightGrams) || weightGrams <= 0) return null;
  const hit = KITTEN_STAGES.find(
    (s) => weightGrams >= s.weight.minGrams && weightGrams <= s.weight.maxGrams
  );
  return hit?.id ?? null;
}

/**
 * 체중 + 체크된 발달 표지(marker id 배열)로 주령 단계를 추정.
 * - 마커가 하나 이상 체크되어 있으면 "그 마커가 속한 단계 중 가장 늦은 단계"를 우선.
 * - 마커가 없으면 체중 기준으로 폴백.
 */
export function estimateStage(
  weightGrams: number | null,
  checkedMarkerIds: string[]
): KittenStageId | null {
  if (checkedMarkerIds.length > 0) {
    // 마커별로 소속 단계 찾고, 가장 늦은 단계(순서상 뒤)를 채택
    let bestIndex = -1;
    for (const markerId of checkedMarkerIds) {
      const idx = KITTEN_STAGES.findIndex((s) =>
        s.markers.some((m) => m.id === markerId)
      );
      if (idx > bestIndex) bestIndex = idx;
    }
    if (bestIndex >= 0) return KITTEN_STAGES[bestIndex].id;
  }
  if (weightGrams != null) return estimateStageByWeight(weightGrams);
  return null;
}

export function getStage(id: KittenStageId | null): KittenStage | null {
  if (!id) return null;
  return KITTEN_STAGES.find((s) => s.id === id) ?? null;
}

/**
 * 하루 총 분유량(mL) 계산.
 * - 단계별 kcalPerKgPerDay(체중 1kg당 하루 필요 열량)를 사용.
 * - 분유 열량 밀도(kcalPerMl)로 나눠 하루 mL로 환산.
 * - 체중 없거나 단계 미확정이면 null.
 */
export function calcDailyFormulaMl(
  weightGrams: number | null,
  stage: KittenStage | null,
  kcalPerMl: number
): number | null {
  if (!weightGrams || !stage || !kcalPerMl) return null;
  const kg = weightGrams / 1000;
  const kcalPerDay = kg * stage.kcalPerKgPerDay;
  return kcalPerDay / kcalPerMl;
}

/** 1회 수유량(mL) = 하루량 / 하루 수유 횟수의 중앙값 */
export function calcPerFeedingMl(
  dailyMl: number | null,
  feedsPerDayMid: number
): number | null {
  if (dailyMl == null || feedsPerDayMid <= 0) return null;
  return dailyMl / feedsPerDayMid;
}

/** 굶은 채 구조된 아이용 — 첫 24-48시간은 계산량의 절반 */
export function calcStarvedInitialMl(dailyMl: number | null): number | null {
  if (dailyMl == null) return null;
  return dailyMl / 2;
}
