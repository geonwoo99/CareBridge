// content/data/diet/labels.ts
// ─────────────────────────────────────────────────────────────
// 사료 카탈로그의 종·유형·처방 카테고리 한국어 라벨 매핑.
// 원본 스키마 코드(canine, wet, urinary 등) → 사람이 읽는 라벨.
// (규칙: .agents/rules/10-content-vs-code.md — 문구는 데이터에서만)
// ─────────────────────────────────────────────────────────────

import type { Species } from "@/lib/dietMath";

/** 종 코드 → 라벨. */
export const SPECIES_LABEL: Record<Species, string> = {
  canine: "강아지",
  feline: "고양이",
  both: "강아지·고양이",
};

/** 사료 유형 코드 → 라벨. */
export const FEED_TYPE_LABEL: Record<string, string> = {
  wet: "습식",
  dry: "건식",
  prescription: "처방식",
  air_dried: "에어드라이",
  freeze_dried: "동결건조",
  snack: "간식",
  dehydrated: "디하이드레이트",
  cooked: "조리식",
};

/** 처방 카테고리 코드 → 라벨. */
export const RX_CATEGORY_LABEL: Record<string, string> = {
  urinary: "요로",
  kidney: "신장",
  liver: "간",
  hepatic: "간",
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
  cardiac: "심장",
  cancer: "종양",
  pancreas: "췌장",
  recovery: "회복",
  pill_assist: "투약 보조",
  immune: "면역",
};

export function speciesLabel(s: Species): string {
  return SPECIES_LABEL[s] ?? s;
}

export function feedTypeLabel(t: string): string {
  return FEED_TYPE_LABEL[t] ?? t;
}

export function rxCategoryLabel(t: string): string {
  return RX_CATEGORY_LABEL[t] ?? t;
}
