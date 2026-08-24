// content/data/cibdai.ts
// ─────────────────────────────────────────────────────────────
// CIBDAI / CCECAI 평가 도구의 문항·선택지·심각도 구간·안내 문구.
// 로직은 lib/assessment.ts, UI는 컴포넌트에서 처리하고,
// 여기서는 오직 "값"만 관리합니다. (규칙 10, 40)
//
// 근거: ACVIM 2026 Consensus Statement (Chronic Enteropathy in Dogs)
//   - CIBDAI: Canine IBD Activity Index (6 items, 0–18)
//   - CCECAI: Canine Chronic Enteropathy Clinical Activity Index (9 items, 0–27)
//   - 치료 반응: 완전 관해(>75%↓), 부분 반응(25–75%↓), 무반응(<25%↓)
// 문항·선택지 문구는 오늘동물병원 보호자용 평가지 원문 그대로.
// ─────────────────────────────────────────────────────────────

import type {
  AssessmentItem,
  AssessmentTool,
  SeverityBand,
} from "@/lib/assessment";

// ── 공통 문항 6개 (CIBDAI = 이것 그대로, CCECAI = 여기에 3개 추가) ──
export const COMMON_ITEMS: AssessmentItem[] = [
  {
    id: "activity",
    category: "활기·기력",
    emoji: "✨",
    question: "요즘 우리 아이의 활기와 기력은 어때요?",
    helper: "산책, 놀이, 가족과 반응하는 모습을 떠올려 보세요.",
    options: [
      { score: 0, label: "평소와 똑같이 활기차요", hint: "늘 그렇듯 잘 놀고 반응도 그대로예요." },
      { score: 1, label: "조금 시무룩해요", hint: "평소보다 살짝 덜 활발하지만 큰 차이는 없어요." },
      { score: 2, label: "눈에 띄게 처져 있어요", hint: "산책이나 놀이를 귀찮아하고 반응이 느려졌어요." },
      { score: 3, label: "거의 누워만 있어요", hint: "불러도 반응이 약하고 하루 종일 무기력해요." },
    ],
  },
  {
    id: "appetite",
    category: "식욕",
    emoji: "🍚",
    question: "사료·간식을 먹는 모습은 어떤가요?",
    helper: "평소 먹던 양과 비교해 주세요.",
    options: [
      { score: 0, label: "평소처럼 잘 먹어요", hint: "먹던 양을 그대로 잘 먹어요." },
      { score: 1, label: "조금 덜 먹어요", hint: "이따금 남기지만 큰 변화는 아니에요." },
      { score: 2, label: "분명히 적게 먹어요", hint: "한참 망설이거나 절반 정도만 먹는 날이 잦아요." },
      { score: 3, label: "거의 먹지 않아요", hint: "좋아하던 음식도 거부하거나 안 먹어요." },
    ],
  },
  {
    id: "vomiting",
    category: "구토",
    emoji: "🤮",
    question: "최근 일주일, 토하는 일이 있었나요?",
    helper: "음식, 거품, 노란 위액 모두 포함이에요.",
    options: [
      { score: 0, label: "전혀 없었어요", hint: "토하는 모습을 보지 못했어요." },
      { score: 1, label: "가끔 (주 1회)", hint: "일주일에 한 번 정도 살짝 게운 적이 있어요." },
      { score: 2, label: "꽤 자주 (주 2~3회)", hint: "일주일에 두세 번 토하는 모습을 봤어요." },
      { score: 3, label: "매우 자주 (주 4회 이상)", hint: "하루에도 여러 번, 거의 매일 토해요." },
    ],
  },
  {
    id: "stool-consistency",
    category: "변 굳기",
    emoji: "💩",
    question: "변의 굳기는 어떤가요?",
    helper: "최근 3~5번 본 변의 평균 모습으로 골라 주세요.",
    options: [
      { score: 0, label: "단단하고 모양이 잘 잡혀요", hint: "평소 모양 그대로의 정상 변이에요." },
      { score: 1, label: "살짝 무른 편이에요", hint: "모양은 있지만 평소보다 부드러워요." },
      { score: 2, label: "많이 묽어요", hint: "형태가 거의 없고 흐물거리는 변이에요." },
      { score: 3, label: "물처럼 줄줄 흘러요", hint: "완전 설사 상태예요. 피·점액이 비치기도 해요." },
    ],
  },
  {
    id: "stool-frequency",
    category: "배변 횟수",
    emoji: "📅",
    question: "하루에 변을 몇 번 보나요?",
    helper: "평소와 비교해 횟수가 어떻게 달라졌는지 봐 주세요.",
    options: [
      { score: 0, label: "평소와 같아요", hint: "하루 1~2번, 늘 보던 횟수와 비슷해요." },
      { score: 1, label: "조금 늘었어요 (3~4회)", hint: "또는 변에 점액·피가 비치기 시작했어요." },
      { score: 2, label: "많이 늘었어요 (5~6회)", hint: "평소보다 자주 화장실에 가요." },
      { score: 3, label: "매우 자주 봐요 (7회 이상)", hint: "또는 자다가 깨서 보거나 실수하는 일이 생겼어요." },
    ],
  },
  {
    id: "weight-change",
    category: "체중 변화",
    emoji: "⚖️",
    question: "최근 체중은 어떻게 변했나요?",
    helper: "병원 기록이나 집 저울 기준이면 좋아요. 모르겠다면 갈비뼈/허리 만져본 느낌으로요.",
    options: [
      { score: 0, label: "변화 없어요", hint: "평소 체중을 그대로 유지하고 있어요." },
      { score: 1, label: "살짝 빠진 듯해요 (5% 미만)", hint: "옷이나 하네스가 조금 헐거워졌을 정도예요." },
      { score: 2, label: "확실히 빠졌어요 (5~10%)", hint: "갈비뼈가 또렷하게 만져지고 허리가 들어가요." },
      { score: 3, label: "많이 빠졌어요 (10% 초과)", hint: "등뼈·골반이 두드러지고 마른 느낌이 분명해요." },
    ],
  },
];

// ── CCECAI 추가 3문항 (혈액 검사 결과가 있을 때) ──
export const CCECAI_EXTRA_ITEMS: AssessmentItem[] = [
  {
    id: "albumin",
    category: "알부민",
    emoji: "🧪",
    question: "혈액 검사상 알부민(Albumin) 수치는 어떤가요?",
    helper: "혈청 알부민 농도예요. 검사지에 'ALB'로 표기돼요.",
    options: [
      { score: 0, label: "2.0 g/dL 초과", hint: "정상 범위예요." },
      { score: 1, label: "1.5 ~ 1.9 g/dL", hint: "가벼운 저알부민혈증이에요." },
      { score: 2, label: "1.0 ~ 1.4 g/dL", hint: "중등도 저알부민혈증이에요." },
      { score: 3, label: "1.0 g/dL 미만", hint: "중증 저알부민혈증이에요." },
    ],
  },
  {
    id: "ascites-edema",
    category: "복수·부종",
    emoji: "🫧",
    question: "배가 빵빵해지거나 다리·얼굴이 붓는 증상이 있나요?",
    helper: "복수(배에 물이 차는 것), 다리·얼굴 부종, 흉수(가슴에 물이 차는 것)를 의미해요.",
    options: [
      { score: 0, label: "전혀 없어요", hint: "붓거나 부풀어 오른 곳이 없어요." },
      { score: 1, label: "가벼운 복수 또는 부종", hint: "진찰 시 약간의 복수나 부종이 만져져요." },
      { score: 2, label: "중간 정도의 복수와 부종", hint: "눈에 띄게 배가 부르거나 다리가 붓고 있어요." },
      { score: 3, label: "흉수 + 복수 + 부종", hint: "호흡까지 영향을 줄 정도로 심해요." },
    ],
  },
  {
    id: "pruritus",
    category: "가려움",
    emoji: "🐾",
    question: "피부를 긁거나 핥는 가려움 증상이 있나요?",
    helper: "장 질환과 동반되는 식이 알레르기 신호일 수 있어요.",
    options: [
      { score: 0, label: "없어요", hint: "긁거나 핥는 행동이 거의 없어요." },
      { score: 1, label: "가끔 긁어요", hint: "하루에 몇 번, 잠깐씩 긁어요." },
      { score: 2, label: "자주 긁고 핥아요", hint: "발·배·귀를 자주 긁고 핥아요." },
      { score: 3, label: "끊임없이 긁어요", hint: "잠을 설칠 만큼, 하루 종일 가려워해요." },
    ],
  },
];

// ── 심각도 밴드 ──
export const CIBDAI_BANDS: SeverityBand[] = [
  {
    id: "normal",
    label: "정상",
    fromScore: 0,
    toScore: 3,
    headline: "임상적으로 큰 문제는 보이지 않아요",
    description:
      "지금은 특별한 조치가 필요해 보이지 않지만, 변화를 놓치지 않도록 1~2주 뒤 다시 점검해 주세요.",
  },
  {
    id: "mild",
    label: "경증",
    fromScore: 4,
    toScore: 5,
    headline: "가벼운 증상이 관찰됩니다",
    description:
      "식이 관리와 관찰이 도움이 되는 단계입니다. 증상이 지속되면 진료를 권해드립니다.",
  },
  {
    id: "moderate",
    label: "중등도",
    fromScore: 6,
    toScore: 8,
    headline: "치료가 필요한 상태로 보입니다",
    description:
      "가까운 시일 내에 진료를 받고 검사·치료 계획을 세우시는 것이 좋겠습니다.",
  },
  {
    id: "severe",
    label: "중증",
    fromScore: 9,
    toScore: null,
    headline: "증상이 상당히 진행된 상태입니다. 빠른 시일 내에 진료를 권해 드립니다.",
    description:
      "체중·알부민·복수까지 영향을 줄 수 있는 단계입니다. 내시경·조직 검사를 포함한 정밀 진단과 면역 억제 치료가 필요할 수 있습니다.",
  },
];

export const CCECAI_BANDS: SeverityBand[] = [
  {
    id: "normal",
    label: "정상",
    fromScore: 0,
    toScore: 3,
    headline: "임상적으로 큰 문제는 보이지 않아요",
    description:
      "지금은 특별한 조치가 필요해 보이지 않지만, 변화를 놓치지 않도록 1~2주 뒤 다시 점검해 주세요.",
  },
  {
    id: "mild",
    label: "경증",
    fromScore: 4,
    toScore: 5,
    headline: "가벼운 증상이 관찰됩니다",
    description:
      "식이 관리와 관찰이 도움이 되는 단계입니다. 증상이 지속되면 진료를 권해드립니다.",
  },
  {
    id: "moderate",
    label: "중등도",
    fromScore: 6,
    toScore: 8,
    headline: "치료가 필요한 상태로 보입니다",
    description:
      "가까운 시일 내에 진료를 받고 검사·치료 계획을 세우시는 것이 좋겠습니다.",
  },
  {
    id: "severe",
    label: "중증",
    fromScore: 9,
    toScore: 11,
    headline: "증상이 상당히 진행된 상태입니다",
    description:
      "빠른 진료와 정밀 검사가 필요합니다. 저알부민혈증·복수 여부에 따라 치료 강도가 달라집니다.",
  },
  {
    id: "very-severe",
    label: "매우 중증",
    fromScore: 12,
    toScore: null,
    headline: "매우 중증 상태로 판단됩니다. 즉시 진료를 권해 드립니다",
    description:
      "단백 소실 장병증(PLE)의 가능성이 높습니다. 알부민·복수·부종 관리와 면역 억제 치료를 병행하는 정밀 진료가 필요합니다.",
  },
];

// ── 도구 스키마 ──
export const CIBDAI_TOOL: AssessmentTool = {
  slug: "cibdai",
  title: "CIBDAI · 6문항",
  subtitle: "지난 일주일의 모습을 떠올리며",
  items: COMMON_ITEMS,
  severityBands: CIBDAI_BANDS,
  maxScore: 18,
};

export const CCECAI_TOOL: AssessmentTool = {
  slug: "ccecai",
  title: "CCECAI · 9문항",
  subtitle: "혈액 검사 결과가 있을 때 더 정밀한 점수",
  items: [...COMMON_ITEMS, ...CCECAI_EXTRA_ITEMS],
  severityBands: CCECAI_BANDS,
  maxScore: 27,
};

// ── "이 평가에 대해" 모달 콘텐츠 (3개 탭) ──
export interface AboutTab {
  id: string;
  label: string;
  sections: {
    heading: string;
    body: string;
    list?: string[];
  }[];
}

export const CIBDAI_ABOUT_TABS: AboutTab[] = [
  {
    id: "scoring",
    label: "점수 시스템",
    sections: [
      {
        heading: "CIBDAI · 보호자가 답할 수 있는 6가지 항목",
        body:
          "Canine IBD Activity Index의 줄임말입니다. 활기, 식욕, 구토, 변의 굳기, 배변 횟수, 체중 변화 — 집에서 관찰만으로 평가할 수 있는 6가지를 각각 0~3점으로 매겨, 총 0~18점으로 증상의 무게를 가늠하는 도구입니다.",
        list: [
          "0~3점 — 임상적으로 큰 문제 없음",
          "4~5점 — 경증",
          "6~8점 — 중등도",
          "9점 이상 — 중증",
        ],
      },
      {
        heading: "CCECAI · 혈액검사가 있을 때 더 정밀한 점수",
        body:
          "Canine Chronic Enteropathy Clinical Activity Index는 CIBDAI에 혈청 알부민, 복수·부종, 가려움 3가지 항목을 더해 총 0~27점으로 평가해요. 혈액검사 결과가 있다면 이 점수가 예후 예측에 더 유리해요.",
        list: [
          "0~3점 — 임상적으로 큰 문제 없음",
          "4~5점 — 경증",
          "6~8점 — 중등도",
          "9~11점 — 중증",
          "12점 이상 — 매우 중증",
        ],
      },
      {
        heading: "치료 반응 평가 (가이드라인)",
        body: "",
        list: [
          "완전 관해 — 점수가 75% 넘게 줄어듦",
          "부분 반응 — 점수가 25~75% 줄어듦",
          "무반응 — 점수 감소 25% 미만",
        ],
      },
    ],
  },
  {
    id: "diagnosis",
    label: "진단",
    sections: [
      {
        heading: "만성 장병증(CIE)이란?",
        body:
          "3주 이상 구토·설사·식욕 부진·체중 감소가 이어지면 만성 장병증(Chronic Inflammatory Enteropathy)으로 의심해요. 비슷한 증상을 일으킬 수 있는 다른 질병(기생충, 췌장 질환, 내분비 질환, 종양 등)을 하나하나 배제하면서 진단해요.",
      },
      {
        heading: "병원에서 권장하는 검사",
        body: "",
        list: [
          "혈액 검사 (혈구·생화학·전해질) + 분변 검사 + 소변 검사",
          "중등도 이상이거나 체중 감소·저알부민혈증이 있을 땐 복부 초음파",
          "2주 식이 시험에 반응하지 않으면 내시경·조직검사를 고려해요",
        ],
      },
      {
        heading: "증상 점수의 역할",
        body:
          "CIBDAI / CCECAI 점수는 진단보다는 병의 무게를 정량화하고 치료 반응을 추적하는 도구입니다. 병원에서는 매주 또는 1~2주마다 이 점수를 다시 매기며 치료 방향을 조정합니다.",
      },
    ],
  },
  {
    id: "treatment",
    label: "치료",
    sections: [
      {
        heading: "1단계 — 식이 시험",
        body:
          "만성 장병증의 38~89%는 식이만으로 호전됩니다. 가수분해 단백 사료, 신규 단백 사료, 저지방 사료 중 한 가지를 골라 최소 2주 이상 그것만 급여하면서 점수 변화를 살펴봅니다. 좋아진다면 12주까지 유지합니다.",
      },
      {
        heading: "2단계 — 보조 요법",
        body:
          "비타민 B12 (코발라민) 보충, 일부 프로바이오틱스(특히 드시모네 8종 제제, S. boulardii)는 보조 효과가 보고되어 있습니다.",
      },
      {
        heading: "3단계 — 면역 조절",
        body:
          "식이로 충분치 않으면 프레드니솔론 같은 스테로이드로 염증을 가라앉혀요. 치료 시작 후 매주 점수를 매겨 반응을 확인하고, 좋아지면 천천히 감량해요.",
      },
      {
        heading: "단백 소실 장병증(PLE)",
        body:
          "알부민이 낮고 복수·부종이 있는 경우엔 저지방 식이와 면역 억제제 병용, 혈전 예방, 알부민 보충까지 함께 다뤄요. 혼자 판단하지 말고 꼭 병원과 상의하세요.",
      },
      {
        heading: "",
        body:
          "※ 본 안내는 ACVIM 2026 Consensus Statement를 토대로 정리한 일반 정보입니다. 실제 치료 계획은 진료를 통해 결정됩니다.",
      },
    ],
  },
];
