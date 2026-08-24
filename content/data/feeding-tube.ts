// content/data/feeding-tube.ts
// ─────────────────────────────────────────────────────────────
// 식도관 급여 안내에 쓰이는 "값(데이터)"만 관리.
// 계산 공식은 lib/rer.ts, UI는 컴포넌트에서 처리합니다.
// (규칙: .agents/rules/10-content-vs-code.md, 40-medical-safety.md)
// ─────────────────────────────────────────────────────────────

/** 식이 종류 프리셋 — 처방 사료 열량 밀도의 대략값. 실제 값은 라벨을 확인해야 합니다. */
export interface DietPreset {
  id: string;
  label: string;
  /** 개봉 상태의 kcal/ml */
  kcalPerMl: number;
  /** 캔 사료 등 희석 필수 여부 */
  requiresDilution: boolean;
  hint?: string;
}

export const DIET_PRESETS: DietPreset[] = [
  {
    id: "liquid-critical",
    label: "액상 · 크리티컬 케어 식이",
    kcalPerMl: 1.0,
    requiresDilution: false,
    hint: "그대로 급여 가능한 액상 처방식 (예: 1.0 kcal/ml 계열)",
  },
  {
    id: "canned-recovery",
    label: "캔 사료 · 회복기 식이",
    kcalPerMl: 1.1,
    requiresDilution: true,
    hint: "캔 사료는 그대로 주입하면 식도관이 막힙니다. 반드시 물을 섞어 희석해서 주세요.",
  },
  {
    id: "custom",
    label: "직접 입력 (처방받은 kcal/ml)",
    kcalPerMl: 1.0,
    requiresDilution: false,
    hint: "처방받은 식이의 kcal/ml을 정확히 입력해 주세요.",
  },
];

/** 급여 횟수 옵션 */
export const FEEDS_PER_DAY_OPTIONS = [
  { value: 3, label: "하루 3회 (8시간 간격)" },
  { value: 4, label: "하루 4회 (6시간 간격)" },
  { value: 6, label: "하루 6회 (4시간 간격)" },
];

/** 증량 단계 정의 */
export interface FeedingStep {
  id: string;
  dayLabel: string;
  title: string;
  rerRatio: number;
  hint?: string;
  extra?: boolean;
}

export const FEEDING_STEPS: FeedingStep[] = [
  { id: "d1", dayLabel: "D1", title: "1일차", rerRatio: 0.33, hint: "적응 · 33% RER" },
  { id: "d2", dayLabel: "D2", title: "2일차", rerRatio: 0.67, hint: "증량 · 67% RER" },
  { id: "d3", dayLabel: "D3", title: "유지 단계", rerRatio: 1.0, hint: "목표 · 100% RER" },
  { id: "plus1", dayLabel: "＋", title: "증량 1단계", rerRatio: 1.1, hint: "유지 48시간 이상 잘 견디면 · 110% RER", extra: true },
  { id: "plus2", dayLabel: "＋", title: "증량 2단계", rerRatio: 1.2, hint: "추가로 잘 적응하면 · 120% RER", extra: true },
];

/** 안전 급여 4가지 팁 */
export const FEEDING_TIPS = [
  {
    id: "tip-01",
    number: "TIP 01",
    title: "흡인(Aspiration)으로 잔여물 확인",
    body: "식이 주입 전에, 빈 주사기를 식도관에 연결하고 살짝 당겨 보세요. 공기나 위 내용물이 너무 많이 나오면 위에 음식이 남아있다는 뜻이에요. 이 상태로 바로 급여하면 역류·오연성 폐렴의 위험이 커집니다.",
    bullets: [
      "당겨서 나온 내용물은 다시 부드럽게 넣어주시고, 30분–1시간 후 다시 시도해 주세요.",
      "매번 같은 양 이상이 나온다면 병원으로 연락해 주세요.",
    ],
  },
  {
    id: "tip-02",
    number: "TIP 02",
    title: "식이 온도는 실온으로",
    body: "냉장 보관한 식이를 그대로 급여하면 구토·복부 불편감을 유발할 수 있어요. 급여 전 미온수에 중탕하거나, 잠시 실온에 두어 차가운 기운을 빼주세요.",
    bullets: [
      "손목 안쪽에 한 방울 떨어뜨려 차갑지도 뜨겁지도 않은 정도가 적당합니다 (약 35–38℃).",
      "전자레인지로 가열하면 국소적으로 너무 뜨거워질 수 있으니 피해주세요.",
    ],
  },
  {
    id: "tip-03",
    number: "TIP 03",
    title: "천천히, 일정한 속도로 주입",
    body: "주사기로 한 번에 밀지 말고, 5–10분에 걸쳐 천천히 주입해 주세요. 너무 빠르면 구토하거나 식도관에 압력이 걸려 막힐 수 있어요.",
    bullets: [
      "급여 중·직후에 갑자기 기침을 하거나 호흡이 거칠어지면 즉시 중단하고 병원으로 연락해 주세요.",
      "급여 후 약 10–15분은 머리를 약간 들어 편안한 자세를 유지해 주세요.",
    ],
  },
  {
    id: "tip-04",
    number: "TIP 04",
    title: "마지막은 반드시 미온수 플러싱 🚿",
    body: "식도관 막힘을 예방하는 가장 핵심적인 습관입니다. 급여가 끝나면 식도관 안에 남은 음식물을 미온수로 깨끗이 밀어내 주세요.",
    bullets: [
      "매번 급여가 끝난 직후 · 그리고 약 투여 직후에도 미온수 5–10ml로 플러싱.",
      "걸쭉한 식이일수록 주입 직전·직후 양쪽 모두 플러싱하면 좋습니다.",
      "플러싱을 거르면 관 내부에 음식물이 굳어 다음 급여 때 막힐 수 있어요.",
    ],
  },
];

/** 응급 신호 3가지 */
export const FEEDING_RED_FLAGS = [
  {
    id: "cough",
    title: "갑작스러운 심한 기침",
    body: "특히 급여 중이나 직후에 시작된 기침",
  },
  {
    id: "dyspnea",
    title: "호흡 곤란 · 가쁜 숨",
    body: "가슴/배가 평소보다 크게 들썩이거나 청색증",
  },
  {
    id: "vomiting",
    title: "반복되는 구토 · 역류",
    body: "급여 직후 음식물이 입·코로 다시 넘어옴",
  },
];
