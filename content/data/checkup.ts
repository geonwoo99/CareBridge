// content/data/checkup.ts
// ─────────────────────────────────────────────────────────────
// 건강검진 안내에 쓰이는 "값(데이터)"만 관리.
// 종별로 다른 생애주기 단계·검사 항목·안정제 성분 등을 여기서만 정의합니다.
// (규칙: .agents/rules/10-content-vs-code.md, 40-medical-safety.md)
//
// 근거:
//   - AAHA 2019 Canine Life Stage Guidelines
//   - AAHA/AAFP 2021 Feline Life Stage Guidelines
// ─────────────────────────────────────────────────────────────

import type { Species } from "@/components/primitives/SpeciesToggle";

/** 생애주기 한 단계 */
export interface LifeStage {
  id: string;
  order: string;         // "01"
  labelEn: string;       // "Puppy"
  label: string;         // "강아지 (퍼피)"
  range: string;         // "출생 ~ 급성장기 종료 (대략 6~12개월)"
}

export const DOG_LIFE_STAGES: LifeStage[] = [
  { id: "puppy",    order: "01", labelEn: "Puppy",        label: "강아지 (퍼피)", range: "출생 ~ 급성장기 종료 (대략 6~12개월)" },
  { id: "young",    order: "02", labelEn: "Young adult",  label: "어린 성견",     range: "성장 완료 후 ~ 신체·사회적 성숙까지" },
  { id: "mature",   order: "03", labelEn: "Mature adult", label: "중년 성견",     range: "성숙 이후 ~ 기대수명의 마지막 25% 전까지" },
  { id: "senior",   order: "04", labelEn: "Senior",       label: "노령견",         range: "기대수명의 마지막 25% 구간부터" },
];

/** AAHA/AAFP 2021 Feline Life Stage Guidelines은 5단계로 나눕니다. */
export const CAT_LIFE_STAGES: LifeStage[] = [
  { id: "kitten",    order: "01", labelEn: "Kitten",        label: "새끼 고양이 (키튼)", range: "출생 ~ 급성장기 종료 (대략 6~12개월)" },
  { id: "young",     order: "02", labelEn: "Young adult",   label: "어린 성묘",         range: "성장 완료 후 ~ 6세까지" },
  { id: "mature",    order: "03", labelEn: "Mature adult",  label: "중년 성묘",         range: "약 7~10세" },
  { id: "senior",    order: "04", labelEn: "Senior",        label: "노령묘",             range: "약 10세 이후" },
  { id: "geriatric", order: "05", labelEn: "Geriatric",     label: "초고령묘",           range: "기대수명의 마지막 25% 구간부터 (검수 예정)" },
];

export function getLifeStages(species: Species): LifeStage[] {
  return species === "cat" ? CAT_LIFE_STAGES : DOG_LIFE_STAGES;
}

/** 검사 항목 카테고리 */
export type ScreeningTier = "recommended" | "optional";

export interface ScreeningItem {
  id: string;
  tag: string;      // 왼쪽 컬러 배지 (예: "혈액", "소변")
  title: string;
  body: string;
  tier: ScreeningTier;
  /** 이 종에만 해당하면 지정. 미지정이면 공용 */
  species?: Species;
}

/** 강아지 · 고양이 공용 + 종 특이 검사 항목 */
export const SCREENING_ITEMS: ScreeningItem[] = [
  // ── 기본 권장 (공용) ──
  {
    id: "cbc-chem",
    tag: "혈액",
    title: "혈액검사 (CBC·혈액화학)",
    body: "빈혈·염증·장기 기능 등 기본 평가. 어릴 때는 기준치 확보용, 중년 이후 매년, 노령은 6~12개월마다.",
    tier: "recommended",
  },
  {
    id: "urinalysis",
    tag: "소변",
    title: "소변검사",
    body: "신장 기능, 요로 상태 등을 확인해요.",
    tier: "recommended",
  },
  // ── 강아지 특이 ──
  {
    id: "heartworm-tick",
    tag: "감염",
    title: "심장사상충 / 진드기 매개 질환",
    body: "매년 정기적으로 검사해요.",
    tier: "recommended",
    species: "dog",
  },
  // ── 고양이 특이 ──
  {
    id: "felv-fiv",
    tag: "바이러스",
    title: "고양이 백혈병·면역결핍 (FeLV·FIV)",
    body: "특히 야외 노출 이력이 있거나 다묘 가정, 첫 방문일 때 권장돼요. (검수 예정)",
    tier: "recommended",
    species: "cat",
  },
  {
    id: "t4",
    tag: "호르몬",
    title: "갑상선 (T4)",
    body: "중년 이후 고양이에게 갑상선 항진증 선별을 위해 권장돼요. (검수 예정)",
    tier: "recommended",
    species: "cat",
  },
  // ── 선택 (공용) ──
  {
    id: "imaging",
    tag: "영상",
    title: "영상검사 (방사선·초음파)",
    body: "건강한 아이의 기본 검진 항목으로는 권장하지 않아요. 다만 대형견의 정형외과 선별검사, 특정 품종 위험, 또는 신체검사에서 이상이 발견되면 추가될 수 있어요.",
    tier: "optional",
  },
  {
    id: "ecg",
    tag: "심장",
    title: "심전도 (ECG)",
    body: "품종 특이적이거나 증상이 있을 때 선택적으로 시행해요.",
    tier: "optional",
  },
];

/** 종별 사전 안정제 예시 (수의사 처방 필요) */
export const PRE_VISIT_SEDATIVE = {
  dog: {
    emoji: "🐕",
    speciesLabel: "강아지",
    example: "트라조돈(trazodone) 등",
  },
  cat: {
    emoji: "🐈",
    speciesLabel: "고양이",
    example: "가바펜틴(gabapentin) 등 (검수 예정)",
  },
} as const;

/** 종별 근거 라벨 (03 섹션 상단) */
export const CHECKUP_EVIDENCE = {
  dog: "AAHA 개 생애주기 가이드라인(2019)",
  cat: "AAHA/AAFP 고양이 생애주기 가이드라인(2021)",
} as const;

/** 종별 생애주기 단계 산정 방식 안내 */
export const LIFE_STAGE_NOTE = {
  dog: "강아지는 품종·체격에 따라 기대수명이 크게 달라, 정해진 나이보다 기대수명에서 차지하는 비율로 단계를 나눠요. · AAHA 개 생애주기 가이드라인 2019",
  cat: "고양이는 나이 구간을 기준으로 5단계로 나눠요. 개별 아이의 신체 상태·활동성에 따라 조정될 수 있어요. · AAHA/AAFP 고양이 생애주기 가이드라인 2021",
} as const;
