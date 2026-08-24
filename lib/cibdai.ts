// lib/cibdai.ts
// ─────────────────────────────────────────────────────────────
// CIBDAI / CCECAI 도구 헬퍼 — 데이터 접근용 얇은 래퍼.
// 실제 평가 로직은 lib/assessment.ts(범용)를 그대로 사용합니다.
// ─────────────────────────────────────────────────────────────

import type { AssessmentTool } from "@/lib/assessment";
import { CIBDAI_TOOL, CCECAI_TOOL } from "@/content/data/cibdai";

export function getTool(slug: "cibdai" | "ccecai"): AssessmentTool {
  return slug === "cibdai" ? CIBDAI_TOOL : CCECAI_TOOL;
}
