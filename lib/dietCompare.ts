// lib/dietCompare.ts
// ─────────────────────────────────────────────────────────────
// 여러 제품 비교 판정 로직.
// 각 영양성분마다 "높을수록 좋음/낮을수록 좋음/판정 없음"을 정의하고,
// 선택된 제품 리스트에서 최고·최저값을 찾아 하이라이트합니다.
//
// 순수 함수 모듈 — UI/데이터를 모릅니다.
// (규칙: .agents/rules/10-content-vs-code.md)
// ─────────────────────────────────────────────────────────────

import { convertBasis, type Basis, type Product } from "@/lib/dietMath";

export type Verdict = "best" | "worst" | null;

export interface CompareMetric {
  key: string;
  label: string;
  /** 컬럼명 옆에 붙는 단위 표시 (선택). */
  unitHint?: string;
  /** 기준 전환에서 숨길지 여부. 예) 칼로리는 /1000kcal 기준에서 표시 X. */
  hideOnBasis?: Basis[];
  /** 값 추출기. basis에 따라 변환 적용된 값. */
  extract: (p: Product, basis: Basis) => number | null;
  /**
   * 판정 방향.
   *   true  → 높을수록 좋음 (단백질·오메가3 등)
   *   false → 낮을수록 좋음 (인·나트륨 등)
   *   null  → 판정 없음 (지방·수분·칼슘 등 — 아이 상태에 따라 다름)
   */
  higherBetter: boolean | null;
  /** 사용자 지정 포맷터. 없으면 기본 (basis에 맞춰 %/g/숫자). */
  format?: (v: number | null) => string;
}

// ─────────────────────────────────────────────────────────────
// 표준 비교 항목 정의 — 데이터로 관리(하드코딩 방지)
// ─────────────────────────────────────────────────────────────

export const COMPARE_METRICS: CompareMetric[] = [
  {
    key: "kcal",
    label: "칼로리",
    unitHint: "kcal/100g",
    hideOnBasis: ["per_1000kcal"], // 1000kcal 기준에서는 의미 없음
    extract: (p) => p.kcal_per_100g,
    higherBetter: null,
    format: (v) => (v == null ? "—" : `${v.toFixed(0)}`),
  },
  {
    key: "protein",
    label: "단백질",
    extract: (p, b) => convertBasis(p.crude_protein_percent, b, p.moisture_percent, p.kcal_per_100g),
    higherBetter: true,
  },
  {
    key: "fat",
    label: "지방",
    extract: (p, b) => convertBasis(p.crude_fat_percent, b, p.moisture_percent, p.kcal_per_100g),
    higherBetter: null,
  },
  {
    key: "fiber",
    label: "섬유",
    extract: (p, b) => convertBasis(p.crude_fiber_percent, b, p.moisture_percent, p.kcal_per_100g),
    higherBetter: null,
  },
  {
    key: "ash",
    label: "회분",
    extract: (p, b) => convertBasis(p.crude_ash_percent, b, p.moisture_percent, p.kcal_per_100g),
    higherBetter: null,
  },
  {
    key: "moisture",
    label: "수분",
    extract: (p) => p.moisture_percent,
    higherBetter: null,
    format: (v) => (v == null ? "—" : `${v.toFixed(0)}%`),
  },
  {
    key: "calcium",
    label: "칼슘",
    extract: (p, b) => convertBasis(p.calcium_percent, b, p.moisture_percent, p.kcal_per_100g),
    higherBetter: null,
  },
  {
    key: "phosphorus",
    label: "인",
    extract: (p, b) => convertBasis(p.phosphorus_percent, b, p.moisture_percent, p.kcal_per_100g),
    higherBetter: false,
  },
  {
    key: "caphos",
    label: "칼슘:인 비",
    extract: (p) =>
      p.calcium_percent != null && p.phosphorus_percent != null && p.phosphorus_percent > 0
        ? p.calcium_percent / p.phosphorus_percent
        : null,
    higherBetter: null,
    format: (v) => (v == null ? "—" : `${v.toFixed(2)}:1`),
  },
  {
    key: "sodium",
    label: "나트륨",
    extract: (p, b) => convertBasis(p.sodium_percent, b, p.moisture_percent, p.kcal_per_100g),
    higherBetter: false,
  },
  {
    key: "magnesium",
    label: "마그네슘",
    extract: (p, b) => convertBasis(p.magnesium_percent, b, p.moisture_percent, p.kcal_per_100g),
    higherBetter: null,
  },
  {
    key: "omega3",
    label: "오메가3",
    extract: (p, b) => convertBasis(p.omega3_percent, b, p.moisture_percent, p.kcal_per_100g),
    higherBetter: true,
  },
  {
    key: "taurine",
    label: "타우린",
    extract: (p, b) => convertBasis(p.taurine_percent, b, p.moisture_percent, p.kcal_per_100g),
    higherBetter: null,
  },
];

/**
 * 값 배열에서 각 값의 판정(best/worst/null)을 리턴.
 * higherBetter=null이거나 유효값이 2개 미만이면 모두 null.
 */
export function classifyValues(
  values: Array<number | null>,
  higherBetter: boolean | null
): Verdict[] {
  if (higherBetter === null) return values.map(() => null);
  const valid = values.filter((v): v is number => v != null && !isNaN(v));
  if (valid.length < 2) return values.map(() => null);

  const best = higherBetter ? Math.max(...valid) : Math.min(...valid);
  const worst = higherBetter ? Math.min(...valid) : Math.max(...valid);

  return values.map((v) => {
    if (v == null || isNaN(v)) return null;
    if (v === best) return "best";
    if (v === worst) return "worst";
    return null;
  });
}

/**
 * 기본 포맷터 (metric에 format이 없을 때 사용).
 * basis에 따라 g 또는 %를 붙임.
 */
export function defaultFormat(v: number | null, basis: Basis): string {
  if (v == null) return "—";
  const unit = basis === "per_1000kcal" ? " g" : "%";
  if (basis === "per_1000kcal") return `${v.toFixed(2)}${unit}`;
  if (v >= 10) return `${v.toFixed(1)}${unit}`;
  if (v >= 1) return `${v.toFixed(2)}${unit}`;
  return `${v.toFixed(3)}${unit}`;
}

/**
 * 비교 화면에서 사용할 metric만 필터링 (basis에 따라 숨김).
 */
export function visibleMetrics(basis: Basis): CompareMetric[] {
  return COMPARE_METRICS.filter((m) => !m.hideOnBasis?.includes(basis));
}
