// content/data/kitten-care.ts
// ─────────────────────────────────────────────────────────────
// 어미 잃은 새끼 고양이 케어에 쓰이는 "값(데이터)"만 모아둔 파일.
// 로직(계산 방식)은 lib/kittenCare.ts, UI는 컴포넌트에서 처리하고,
// 여기서는 오직 주령별 온도·수유 간격·에너지 요구량·발달 표지처럼
// 나중에 문구·수치만 손보기 쉬운 값들을 관리합니다.
// (규칙: .agents/rules/10-content-vs-code.md, 40-medical-safety.md)
//
// 근거: 오늘동물병원 보호자용 돌봄 안내 · AAHA / ISFM 자묘 케어 자료
// (구체 수치는 운영자 검수 예정)
// ─────────────────────────────────────────────────────────────

export type KittenStageId = "w1" | "w2" | "w3" | "w4to12";

export interface KittenStageMarker {
  id: string;
  label: string;
  hint?: string;
}

export interface KittenStage {
  id: KittenStageId;
  label: string;              // "생후 1주" 같은 표기
  ageRange: string;           // "0–7일"
  weight: { minGrams: number; maxGrams: number };
  ambientTempC: string;       // "32–34°C"
  feedsPerDay: string;        // "8–10회"
  feedsPerDayMid: number;     // 계산용 중앙값
  intervalHours: string;      // "2–3시간마다"
  kcalPerKgPerDay: number;    // 하루 kcal/kg
  markers: KittenStageMarker[]; // 발달 표지(체크 항목)
  notes?: string;
}

export const KITTEN_STAGES: KittenStage[] = [
  {
    id: "w1",
    label: "생후 1주",
    ageRange: "0–7일",
    weight: { minGrams: 50, maxGrams: 150 },
    ambientTempC: "32–34°C",
    feedsPerDay: "8–10회",
    feedsPerDayMid: 9,
    intervalHours: "2–3시간마다",
    kcalPerKgPerDay: 20,
    markers: [
      { id: "eyes-closed", label: "눈이 아직 감겨 있어요" },
      { id: "ears-folded", label: "귀가 접혀 있어요" },
      { id: "umbilical", label: "탯줄이 붙어 있거나 최근 떨어졌어요" },
    ],
  },
  {
    id: "w2",
    label: "생후 2주",
    ageRange: "8–14일",
    weight: { minGrams: 151, maxGrams: 250 },
    ambientTempC: "27–29°C",
    feedsPerDay: "6–8회",
    feedsPerDayMid: 7,
    intervalHours: "2–4시간마다",
    kcalPerKgPerDay: 25,
    markers: [
      { id: "eyes-opening", label: "눈이 뜨이기 시작했어요" },
      { id: "ears-opening", label: "귀가 펴지기 시작했어요" },
    ],
  },
  {
    id: "w3",
    label: "생후 3주",
    ageRange: "15–21일",
    weight: { minGrams: 251, maxGrams: 350 },
    ambientTempC: "24–27°C",
    feedsPerDay: "4–6회",
    feedsPerDayMid: 5,
    intervalHours: "4–5시간마다",
    kcalPerKgPerDay: 28,
    markers: [
      { id: "wobble-walk", label: "뒤뚱뒤뚱 걷기 시작했어요" },
      { id: "teeth-in", label: "앞니가 나기 시작했어요" },
    ],
  },
  {
    id: "w4to12",
    label: "생후 4–12주",
    ageRange: "22일 이후",
    weight: { minGrams: 351, maxGrams: 5000 },
    ambientTempC: "약 24°C",
    feedsPerDay: "3–4회",
    feedsPerDayMid: 4,
    intervalHours: "6–8시간마다",
    kcalPerKgPerDay: 25,
    markers: [
      { id: "self-toilet", label: "스스로 배변·배뇨를 시작했어요" },
      { id: "weaning", label: "이유식·물을 스스로 먹어요" },
    ],
  },
];

/** 시중 자묘용 분유의 대략적 열량 밀도(kcal/mL). 제품별 편차가 있어 상수로 관리. */
export const FORMULA_KCAL_PER_ML = 1.0;

/** 소변 색 진단 — 범용 ColorDiagnostic에 그대로 넘길 수 있는 구조 */
export const URINE_COLOR_ITEMS = [
  {
    id: "pale-yellow",
    swatch: "hsl(52 90% 88%)",
    label: "옅은 노랑",
    verdict: "ok" as const,
    detail:
      "정상이에요. 새끼 고양이는 소변을 진하게 농축하지 못해서 묽고 옅은 게 자연스러워요.",
  },
  {
    id: "deep-yellow",
    swatch: "hsl(40 90% 55%)",
    label: "진한 노랑·주황",
    verdict: "warn" as const,
    detail:
      "탈수 신호일 수 있어요. 수분이 부족하다는 뜻이니 병원에 들러 탈수를 교정해 주세요.",
  },
];

/** 변 상태 진단 */
export const STOOL_COLOR_ITEMS = [
  {
    id: "soft-mustard",
    swatch: "hsl(45 65% 55%)",
    label: "부드러운 겨자색",
    verdict: "ok" as const,
    detail:
      "분유·모유를 먹는 아이의 정상 변이에요. 형태가 잡힌 변은 딱딱한 음식을 먹기 시작한 뒤에 나와요.",
  },
  {
    id: "watery",
    swatch: "hsl(35 45% 50%)",
    label: "물기 많은 설사",
    verdict: "warn" as const,
    detail:
      "과식이나 분유가 맞지 않을 때 흔해요. 먼저 병원에서 기생충 검사를 받고, 양을 줄이거나 분유를 50% 물로 희석해 보세요. 설사하는 동안은 엉덩이 주변을 깨끗하게 닦아 주고, 피부가 헐거나 항문이 빠져나오지 않는지 살펴 주세요.",
  },
  {
    id: "hard-dry",
    swatch: "hsl(25 35% 35%)",
    label: "딱딱하고 마른 변",
    verdict: "warn" as const,
    detail:
      "분유에 물이 적었거나 수분·배변 자극이 부족할 때 생겨요. 자극을 더 해주고, 지속되면 병원 상담이 필요해요.",
  },
];

/** 이유식 타임라인 — <Timeline> 컴포넌트에 그대로 넘김 */
export const WEANING_TIMELINE = [
  {
    period: "3–4주",
    title: "접시 분유 연습",
    body: "얕은 접시에 분유를 담아 스스로 핥아 먹는 연습을 시작해요. 지저분해도 괜찮아요.",
  },
  {
    period: "4–5주",
    title: "캔 사료 섞어 주기",
    body: "자묘(키튼)용 캔 사료를 분유와 섞어 38°C로 따뜻하게, 하루 여러 번 조금씩 줘요. 화장실(낮고, 안 뭉치는 모래)도 만들어 주세요.",
  },
  {
    period: "5–6주",
    title: "분유 줄이기",
    body: "이 무렵부터 건사료도 씹을 수 있어요. 스스로 잘 먹게 되면 분유를 점점 줄이고 캔·건사료 비중을 늘려요. 하루 여러 번 나눠서.",
  },
  {
    period: "6–9주",
    title: "젖떼기 완료",
    body: "건사료를 먹을 수 있게 돼요. 면역이 약해지는 예민한 시기라 설사·컨디션을 잘 살펴 주세요.",
  },
];

/** "이럴 땐 바로 병원으로" — ExpandableCards에 그대로 */
export const RED_FLAG_ITEMS = [
  {
    title: "체온이 낮고 축 늘어져요",
    summary: "저체온은 새끼 고양이의 가장 흔한 응급 상황",
    detail:
      "만졌을 때 시원하거나 차갑고, 반응이 둔하며 잘 울지 않아요. 급하게 데우지 말고 담요·손·따뜻한 물병으로 서서히 체온을 올리며 병원으로 이동하세요. 저체온 상태에서는 절대 먹이지 마세요 — 소화가 되지 않아 오연·복부팽만으로 이어질 수 있어요.",
  },
  {
    title: "24시간 이상 소변을 안 봐요",
    summary: "탈수·요로 문제 가능성",
    detail:
      "수유 후 회음부를 자극해도 소변이 나오지 않거나, 배가 팽팽하고 만지면 아파해요. 탈수가 심할 수 있으니 지체 없이 진료가 필요합니다.",
  },
  {
    title: "설사가 하루 이상 이어져요",
    summary: "체중이 아주 작아 탈수 진행이 빨라요",
    detail:
      "특히 물처럼 흐르는 설사, 피가 섞인 설사, 냄새가 심한 설사는 바로 병원에 알려주세요. 엉덩이 주변을 깨끗이 닦아 피부 손상을 예방하고, 이동 중 보온을 유지하세요.",
  },
  {
    title: "먹이려 할 때 사래·기침",
    summary: "오연(誤嚥) 위험",
    detail:
      "분유를 먹이는 중 기침하거나 코로 분유가 흐르면 즉시 중단해 주세요. 억지로 다시 먹이지 말고, 오연성 폐렴으로 이어질 수 있으니 진료를 받으세요.",
  },
  {
    title: "복부가 팽팽하게 부풀었어요",
    summary: "공기·가스·과식 신호",
    detail:
      "젖병을 짜서 먹였거나 과식했을 때 흔해요. 살살 마사지해 봐도 나아지지 않고 힘들어하면 병원 진료가 필요합니다.",
  },
  {
    title: "체중이 늘지 않아요",
    summary: "성장 정체는 뭔가 잘못됐다는 신호",
    detail:
      "새끼 고양이는 하루 5–10g씩 꾸준히 늘어야 정상이에요. 이틀 연속 체중이 그대로거나 줄어들면 수유량·간격·기저 질환 확인이 필요합니다.",
  },
];
