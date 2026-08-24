// lib/assessment.ts
// ─────────────────────────────────────────────────────────────
// 범용 평가 도구 로직 — 문항·응답·점수·심각도를 계산하는 순수 함수.
// 특정 도구(CIBDAI 등)에 종속되지 않도록 데이터 스키마만 다룹니다.
// 데이터는 content/data/*.ts에서 관리합니다.
// (규칙: .agents/rules/10-content-vs-code.md)
// ─────────────────────────────────────────────────────────────

/** 한 문항의 선택지 */
export interface AssessmentOption {
  /** 이 옵션을 선택했을 때 부여되는 점수 */
  score: number;
  label: string;
  hint?: string;
}

/** 한 문항(항목) */
export interface AssessmentItem {
  /** 고유 id — 응답 저장 키가 됨. 절대 바꾸지 않는다. */
  id: string;
  /** 표시용 카테고리명(예: "활기·기력") */
  category: string;
  emoji?: string;
  /** 질문 문장 */
  question: string;
  /** 보조 설명 */
  helper?: string;
  options: AssessmentOption[];
}

/** 심각도 구간 정의 (총점 기준) */
export interface SeverityBand {
  id: string;
  label: string;      // "정상" | "경증" | "중등도" | "중증" | "매우 중증"
  fromScore: number;
  toScore: number | null;
  /** 이 구간에 해당하는 안내 문구 */
  headline: string;
  description: string;
}

/** 하나의 평가 도구 스키마 */
export interface AssessmentTool {
  slug: string;
  title: string;
  subtitle?: string;
  items: AssessmentItem[];
  severityBands: SeverityBand[];
  /** 최고 가능 점수 (계산으로도 구할 수 있지만 명시적으로) */
  maxScore: number;
}

/** 응답 맵 → 총점 */
export function totalScore(
  items: AssessmentItem[],
  answers: Record<string, number>
): number {
  return items.reduce((sum, it) => {
    const v = answers[it.id];
    return sum + (typeof v === "number" ? v : 0);
  }, 0);
}

/** 총점 → 심각도 밴드 */
export function findSeverity(
  bands: SeverityBand[],
  score: number
): SeverityBand | null {
  return (
    bands.find(
      (b) =>
        score >= b.fromScore && (b.toScore == null || score <= b.toScore)
    ) ?? null
  );
}

/** 완료된 문항 수 */
export function answeredCount(
  items: AssessmentItem[],
  answers: Record<string, number>
): number {
  return items.reduce((n, it) => (it.id in answers ? n + 1 : n), 0);
}

/** 진행률(0~1) */
export function progressRatio(
  items: AssessmentItem[],
  answers: Record<string, number>
): number {
  if (items.length === 0) return 0;
  return answeredCount(items, answers) / items.length;
}

/** 두 점수 사이의 치료 반응 판정 (ACVIM 2026 Consensus 기반 가이드라인) */
export type TreatmentResponse = "complete" | "partial" | "none";
export function classifyResponse(
  previousScore: number,
  currentScore: number
): TreatmentResponse | null {
  if (previousScore <= 0) return null;
  const drop = (previousScore - currentScore) / previousScore;
  if (drop > 0.75) return "complete";
  if (drop >= 0.25) return "partial";
  return "none";
}
