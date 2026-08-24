// content/data/chemotherapy.ts
// ─────────────────────────────────────────────────────────────
// 항암치료 후 홈 케어 안내에 쓰이는 "값(데이터)"만 관리.
// (규칙: .agents/rules/10-content-vs-code.md, 40-medical-safety.md)
//
// 근거: ACVIM/VCS Consensus on Safe Handling of Chemotherapy 및
//       일반 종양학 홈 케어 권장 사항.
// ─────────────────────────────────────────────────────────────

/** 대소변 치우기 3단계 (SECTION 01) */
export const HANDLING_STEPS = [
  {
    n: 1,
    title: "장갑 착용",
    body: "치료 후 2~3일은 미량의 항암제가 대소변으로 배출돼요. 반드시 **일회용 장갑(라텍스·비닐)**을 착용하고 치워 주세요.",
    tip: "주방용 비닐장갑도 괜찮아요. 맨손은 금물!",
  },
  {
    n: 2,
    title: "배출물 처리",
    body: "대변은 **변기에 버리고 물**을 내려 주세요. 소변은 페이퍼타월·배변패드로 흡수해 **비닐봉지에 2중 포장** 후 일반쓰레기로 버려 주세요.",
    tip: "사용한 장갑도 같은 봉지에 함께 넣어 버려 주세요.",
  },
  {
    n: 3,
    title: "표면 소독 & 손 씻기",
    body: "눈에 보이는 오염물을 치운 뒤, **희석한 락스 등 환경소독제**로 한 번 더 닦아 주세요. 마지막으로 **손을 깨끗이** 씻어 주세요.",
    tip: "락스는 1:30~1:50 비율로 희석한 뒤 환기와 함께 사용해 주세요.",
  },
];

/** FAQ 6개 (SECTION 02) */
export const CHEMO_FAQ = [
  {
    title: "옷·이불에 묻으면 어떻게 세탁하나요?",
    icon: "👕",
    detail:
      "오염된 옷, 침구, 수건은 **다른 빨래와 분리**해 따로 세탁해 주세요. 반드시 **세탁기를 사용**해야 하며, **손빨래는 절대 하지 마세요.**\n\n• 바로 세탁이 어렵다면 **비닐봉지에 밀봉**해 보관해 주세요.\n• 세탁 후 세탁조를 **빈 상태로 한 번 더** 헹궈 주세요.",
  },
  {
    title: "다른 반려동물과 접촉해도 되나요?",
    icon: "🐾",
    detail:
      "**격리는 필요하지 않아요.** 같은 밥·물그릇을 사용해도 괜찮고, 같은 장난감을 가지고 놀거나 함께 잠을 자도 문제없습니다.\n\n• 대소변이 섞이지 않게 **화장실 정리는 자주** 해 주세요.",
  },
  {
    title: "어린이가 있는 집이에요",
    icon: "👶",
    detail:
      "치료 후 48~72시간 동안 어린이가 환자의 **대소변에 닿지 않도록** 주의해 주세요. 쓰다듬거나 함께 노는 것은 괜찮지만, 배변물 처리는 어른이 맡아 주세요.\n\n• **쓰다듬기·함께 놀기**는 괜찮아요.\n• 배변·뒤처리·세탁은 **반드시 어른이** 맡아 주세요.\n• 나이가 많은 **노인분들**도 동일하게 주의해 주세요.",
  },
  {
    title: "구토나 설사를 해요",
    icon: "🤢",
    detail:
      "우선 6~12시간 정도 **금식**해 주세요. 이후 **소화가 잘 되는 음식을 소량**씩 주시고, 괜찮으면 양을 조금씩 늘려 정상 식이로 돌아가 주세요.\n\n• 물은 평소처럼 자유롭게 마시게 해 주세요.\n• 증상이 **24시간 이상 지속**되면 바로 연락 주세요.",
    severity: "warning" as const,
  },
  {
    title: "임산부인데 어떻게 해야 하나요?",
    icon: "🤰",
    detail:
      "임산부 또는 임신을 계획 중인 분은 환자의 **대소변을 직접 만지지 말아 주세요.** 다른 가족 구성원이 대신 처리해 주시는 것이 가장 안전합니다.\n\n• 항암제는 **세포독성**이 있어 임산부에게 위험합니다.\n• 가능하면 **마스크와 장갑**을 갖춘 보호자가 맡아 주세요.",
    severity: "warning" as const,
  },
  {
    title: "주사 부위를 자꾸 핥아요",
    icon: "💉",
    detail:
      "평소보다 많이 핥는다면 **가능한 빨리 병원으로 연락** 주세요. 일부 항암제는 혈관 밖으로 새면 주사 부위 괴사를 유발할 수 있습니다.\n\n• 주사 부위에 붉음·부음·열감이 있는지 확인해 주세요.\n• 이상이 있다면 내원 전까지 **넥카라**를 씌워 주세요.",
    severity: "warning" as const,
  },
];

/** 공통 부작용 B·A·G */
export interface SideEffectTab {
  letter: string;
  wordEn: string;
  wordKo: string;
  body: string;
  bullets: string[];
}

export const BAG_TABS: SideEffectTab[] = [
  {
    letter: "B",
    wordEn: "Bone marrow suppression",
    wordKo: "골수억제",
    body: "백혈구·적혈구·혈소판이 일시적으로 감소할 수 있어요. 보통 치료 후 7~10일에 가장 낮아지고, 이후 회복됩니다.",
    bullets: [
      "감염·발열·무기력이 보이면 즉시 연락해 주세요.",
      "잇몸·눈 결막이 유난히 창백하지 않은지 살펴 주세요.",
      "예정된 혈액검사는 반드시 챙겨 주세요.",
    ],
  },
  {
    letter: "A",
    wordEn: "Alopecia / Anorexia",
    wordKo: "탈모·식욕부진",
    body: "반려동물은 사람만큼 탈모가 심하지 않지만, 수염이 빠지거나 털 성장이 느려질 수 있어요. 식욕이 며칠간 줄어드는 경우가 흔합니다.",
    bullets: [
      "따뜻하게 데운 음식을 소량씩 자주 주세요.",
      "좋아하는 향이 강한 간식을 얹으면 도움이 돼요.",
      "48시간 이상 식음전폐라면 반드시 연락해 주세요.",
    ],
  },
  {
    letter: "G",
    wordEn: "Gastrointestinal",
    wordKo: "소화기 (가장 중요)",
    body: "구토·설사·식욕부진이 가장 흔한 부작용이에요. 대부분 치료 후 3~5일 내에 나타나고 스스로 좋아집니다.",
    bullets: [
      "구토·설사가 24시간 이상 지속되면 연락 주세요.",
      "혈변·검은 변·기력 저하가 함께 있으면 즉시 내원.",
      "처방받은 진토제·지사제가 있다면 지시대로 사용해 주세요.",
    ],
  },
];

/** 약물별 안내 (수포제 등급, 종별 주의사항 등) */
export type VesicantLevel = "strong" | "mild" | "irritant" | "none" | "special";

export interface ChemoDrug {
  id: string;
  nameKo: string;
  nameEn: string;
  category: string;
  vesicantLabel: string;
  vesicantLevel: VesicantLevel;
  body: string;
  bullets?: string[];
  /** 종별 특이 안내 */
  perSpecies?: { dog?: string; cat?: string };
}

export const CHEMO_DRUGS: ChemoDrug[] = [
  {
    id: "vincristine",
    nameKo: "빈크리스틴",
    nameEn: "Vincristine",
    category: "빈카 계열",
    vesicantLabel: "수포제 · 약함",
    vesicantLevel: "mild",
    body: "**가벼운 수포제**입니다. 주사할 때 병원에서 신중히 관리하지만, 집에서도 며칠간 **주사 부위 변화**가 없는지 살펴 주세요.",
  },
  {
    id: "vinblastine",
    nameKo: "빈블라스틴",
    nameEn: "Vinblastine",
    category: "빈카 계열",
    vesicantLabel: "수포제 · 약함",
    vesicantLevel: "mild",
    body: "**가벼운 수포제**입니다. 주사할 때 병원에서 신중히 관리하지만, 집에서도 며칠간 **주사 부위 변화**가 없는지 살펴 주세요.",
  },
  {
    id: "vinorelbine",
    nameKo: "비노렐빈",
    nameEn: "Vinorelbine",
    category: "빈카 계열",
    vesicantLabel: "수포제 · 약함",
    vesicantLevel: "mild",
    body: "**가벼운 수포제**입니다. 주사할 때 병원에서 신중히 관리하지만, 집에서도 며칠간 **주사 부위 변화**가 없는지 살펴 주세요.",
  },
  {
    id: "mitoxantrone",
    nameKo: "미톡산트론",
    nameEn: "Mitoxantrone",
    category: "",
    vesicantLabel: "IRRITANT",
    vesicantLevel: "irritant",
    body: "주사제가 파란색이라 치료 후 며칠간 **소변이 푸른빛**으로 보일 수 있어요. 정상 반응이니 놀라지 마세요.",
    bullets: [
      "보통 자극제(irritant)로 분류되지만 경우에 따라 수포제처럼 작용할 수 있어, 주사 부위도 함께 살펴 주세요.",
    ],
  },
  {
    id: "doxorubicin",
    nameKo: "독소루비신",
    nameEn: "Doxorubicin",
    category: "",
    vesicantLabel: "수포제 · 강함",
    vesicantLevel: "strong",
    body: "**강한 수포제**입니다. 주사할 때 한 방울도 혈관 밖으로 새지 않도록 병원에서 가장 신중하게 다룹니다. 만약 주사 부위에 이상이 보이면 **즉시 연락** 주세요.",
    perSpecies: {
      dog: "일생 동안 누적 **180 mg/m²**까지만 사용할 수 있어요. 누적 심장독성을 막기 위해 평생 용량이 정해져 있습니다.",
      cat: "신장에 부담을 줄 수 있어, 정기적으로 **신장 수치를 모니터링**합니다.",
    },
  },
  {
    id: "carboplatin",
    nameKo: "카보플라틴",
    nameEn: "Carboplatin",
    category: "",
    vesicantLabel: "수포제 아님",
    vesicantLevel: "none",
    body: "수포제가 아니에요. 혹시 조금 새더라도 **조직 손상으로 이어지지 않으니**, 주사 부위에 대한 걱정은 덜어두셔도 됩니다.",
  },
  {
    id: "cyclophosphamide",
    nameKo: "사이클로포스파마이드",
    nameEn: "Cyclophosphamide",
    category: "",
    vesicantLabel: "방광 자극",
    vesicantLevel: "special",
    body: "대표적인 부작용은 **출혈성 방광염(sterile hemorrhagic cystitis)**이에요. 아래와 같은 신호가 보이면 바로 연락 주세요.",
    bullets: [
      "소변에 **피가 비치거나** 색이 평소와 달라요.",
      "**자주** 보는데 양이 적거나, 보는 동안 **끙끙거려요**.",
    ],
  },
  {
    id: "l-asparaginase",
    nameKo: "엘-아스파라기나제",
    nameEn: "L-Asparaginase",
    category: "",
    vesicantLabel: "알레르기 주의",
    vesicantLevel: "special",
    body: "가장 큰 부작용은 **아나필락시스(급성 알레르기 반응)**예요. 반복해서 맞을수록 위험이 올라가, 필요한 경우 미리 **덱사메타손·항히스타민**을 전처치로 주사하기도 합니다.",
    bullets: [
      "주사 후 몇 시간 안에 구토가 있다면 보통 알레르기 반응 신호예요. 이 약물은 소화기 부작용 자체는 매우 적습니다.",
    ],
  },
  {
    id: "actinomycin-d",
    nameKo: "악티노마이신 D",
    nameEn: "Actinomycin D",
    category: "",
    vesicantLabel: "수포제 · 강함",
    vesicantLevel: "strong",
    body: "**강한 수포제**입니다. 혈관 밖으로 새면 조직 손상이 클 수 있어, 주사 부위에 **부음·붉음·진물**이 보이면 바로 연락 주세요.",
  },
];
