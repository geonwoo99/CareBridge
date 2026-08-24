// lib/dietMath.ts
// ─────────────────────────────────────────────────────────────
// 처방식·일반사료 영양성분 표시 방식 변환 로직.
// 순수 함수 모듈 — UI/데이터를 모릅니다. (규칙 10)
//
// 세 가지 표시 기준:
//   1) as-fed    — 제조사가 라벨에 표기한 그대로 (수분 포함)
//   2) DM        — 건물(Dry Matter) 기준. 수분을 제외해 브랜드 간 비교에 유리
//   3) /1000kcal — 열량 밀도로 정규화 (kcal 기준 영양 비교)
//
// 변환 공식:
//   DM %       = as-fed % ÷ (1 - moisture/100)
//   /1000kcal  = as-fed g ÷ kcal_per_100g × 1000 × 10  (g/1000kcal)
// ─────────────────────────────────────────────────────────────

/** 표시 기준. */
export type Basis = "as_fed" | "dm" | "per_1000kcal";

/** 종 코드 */
export type Species = "canine" | "feline" | "both";

/** 사료 제품 스키마 (원본 Supabase 스키마와 동일한 부분집합). */
export interface Product {
  id: string;
  name: string;
  brand: string;
  species: Species;
  feed_type: string;
  format_tag: string;
  kcal_per_100g: number | null;
  moisture_percent: number | null;
  crude_protein_percent: number | null;
  crude_fat_percent: number | null;
  crude_fiber_percent: number | null;
  crude_ash_percent: number | null;
  calcium_percent: number | null;
  phosphorus_percent: number | null;
  carbohydrate_percent?: number | null;
  sodium_percent: number | null;
  potassium_percent?: number | null;
  magnesium_percent: number | null;
  omega3_percent: number | null;
  omega6_percent?: number | null;
  taurine_percent: number | null;
  ingredients_text?: string | null;
  ingredients_language?: string | null;
  verification_tier?: string | null;
  source_basis?: string | null;
  source_notes?: string | null;
  photo_url?: string | null;
  rx_categories: string[];
  extra_notes?: string | null;
  product_kind?: string;
  net_weight_g?: number | null;
}

// ─────────────────────────────────────────────────────────────
// 기준 변환
// ─────────────────────────────────────────────────────────────

/** 수분 % → DM 배율. moisture=12 이면 1/0.88 = 1.136. */
export function dmMultiplier(moisturePercent: number | null): number | null {
  if (moisturePercent == null || moisturePercent >= 100 || moisturePercent < 0) return null;
  return 1 / (1 - moisturePercent / 100);
}

/**
 * 값(as-fed %) → 다른 기준으로 변환.
 * asFedValue 는 % 단위 (예: 20 = 20%).
 * kcalPer100g 는 kcal/100g (per_1000kcal 계산용).
 * per_1000kcal 반환값 단위는 g/1000kcal.
 */
export function convertBasis(
  asFedValue: number | null,
  basis: Basis,
  moisturePercent: number | null,
  kcalPer100g: number | null
): number | null {
  if (asFedValue == null) return null;
  if (basis === "as_fed") return asFedValue;
  if (basis === "dm") {
    const mult = dmMultiplier(moisturePercent);
    return mult == null ? null : asFedValue * mult;
  }
  if (basis === "per_1000kcal") {
    if (!kcalPer100g || kcalPer100g <= 0) return null;
    // as-fed % → g/100g → g/1000kcal
    return (asFedValue / kcalPer100g) * 1000;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────
// 영양 분석 (도넛 차트용)
// ─────────────────────────────────────────────────────────────

/**
 * DM 기준 영양 분석 세그먼트를 계산.
 * 단백질 · 지방 · 섬유 · 회분 · 기타(탄수화물 등) 5개.
 * 합계가 100이 되도록 정규화됩니다.
 */
export interface NutrientSegment {
  key: "protein" | "fat" | "fiber" | "ash" | "other";
  label: string;
  percent: number;
  color: string;
}

export function analyzeNutrients(
  p: Product,
  basis: Basis = "dm"
): NutrientSegment[] {
  const protein = convertBasis(p.crude_protein_percent, basis, p.moisture_percent, p.kcal_per_100g);
  const fat = convertBasis(p.crude_fat_percent, basis, p.moisture_percent, p.kcal_per_100g);
  const fiber = convertBasis(p.crude_fiber_percent, basis, p.moisture_percent, p.kcal_per_100g);
  const ash = convertBasis(p.crude_ash_percent, basis, p.moisture_percent, p.kcal_per_100g);

  // 유효값만 사용 (null 은 0 취급하지 않고 분모에서 제외)
  const known = [protein, fat, fiber, ash].filter((v): v is number => v != null);
  const knownSum = known.reduce((a, b) => a + b, 0);
  // 나머지가 "기타" (탄수화물+수분+미네랄 등). DM 기준에서는 100 - 알려진 것.
  const other = Math.max(0, 100 - knownSum);

  const segments: NutrientSegment[] = [
    { key: "protein", label: "단백", percent: protein ?? 0, color: "hsl(340 65% 65%)" },
    { key: "fat",     label: "지방", percent: fat ?? 0,     color: "hsl(40 75% 55%)" },
    { key: "fiber",   label: "섬유", percent: fiber ?? 0,   color: "hsl(150 55% 55%)" },
    { key: "ash",     label: "회분", percent: ash ?? 0,     color: "hsl(210 8% 55%)" },
    { key: "other",   label: "기타", percent: other,        color: "hsl(260 45% 65%)" },
  ];

  // 합계를 100으로 재정규화 (반올림 오차 흡수)
  const total = segments.reduce((a, s) => a + s.percent, 0);
  if (total > 0 && total !== 100) {
    const scale = 100 / total;
    segments.forEach((s) => (s.percent = s.percent * scale));
  }

  return segments;
}

// ─────────────────────────────────────────────────────────────
// 표시 헬퍼
// ─────────────────────────────────────────────────────────────

/** 소수점 자리수를 값 크기에 맞게 적응적으로. */
export function formatPercent(v: number | null, digits?: number): string {
  if (v == null) return "—";
  if (digits != null) return `${v.toFixed(digits)}%`;
  if (v >= 10) return `${v.toFixed(1)}%`;
  if (v >= 1) return `${v.toFixed(2)}%`;
  return `${v.toFixed(3)}%`;
}

/** 칼슘:인 비율 계산. */
export function calciumPhosphorusRatio(
  ca: number | null,
  p: number | null
): string | null {
  if (ca == null || p == null || p === 0) return null;
  return `${(ca / p).toFixed(2)}:1`;
}

/** 종 코드 → 한국어 라벨. */
export function speciesLabel(species: Product["species"]): string {
  return species === "canine" ? "강아지" : species === "feline" ? "고양이" : "강아지·고양이";
}

/** 처방 카테고리 태그 한국어 라벨 (원본과 동일한 매핑). */
export function rxCategoryLabel(tag: string): string {
  const map: Record<string, string> = {
    urinary: "요로",
    kidney: "신장",
    liver: "간",
    allergy: "알러지",
    hydrolyzed: "가수분해",
    novel_protein: "신규 단백",
    gi: "소화기",
    weight: "체중",
    diabetes: "당뇨",
    dental: "치아",
    skin: "피부",
    joint: "관절",
    heart: "심장",
    cancer: "종양",
  };
  return map[tag] ?? tag;
}
