// lib/bleachDilution.ts
// ─────────────────────────────────────────────────────────────
// 락스(차아염소산나트륨) 희석 계산 로직 — 순수 함수 모듈.
// UI/데이터를 모르며, 물의 양과 희석비만 받아 필요한 락스 양(mL)을 반환합니다.
// (규칙: .agents/rules/10-content-vs-code.md)
// ─────────────────────────────────────────────────────────────

/**
 * 물의 양(mL)과 희석비(예: 10 → 1:10)로 필요한 락스 양을 계산합니다.
 * 1:N 비율 = 락스 1 부피 : 물 N 부피
 */
export function calcBleachMl(waterMl: number, ratioN: number): number | null {
  if (!Number.isFinite(waterMl) || waterMl < 0) return null;
  if (!Number.isFinite(ratioN) || ratioN <= 0) return null;
  return waterMl / ratioN;
}

/** 물 + 락스 총 부피 */
export function calcTotalMl(
  waterMl: number,
  bleachMl: number | null
): number | null {
  if (bleachMl == null) return null;
  return waterMl + bleachMl;
}
