// components/interactive/KittenCareBlocks.tsx
// ─────────────────────────────────────────────────────────────
// kitten-care.mdx 안에서 인자 없이 바로 쓸 수 있는 블록 래퍼 모음.
// MDX에서 데이터 배열을 직접 쓰지 않게(하드코딩 방지) 하기 위해
// content/data/kitten-care.ts의 값을 컴포넌트에 주입한 프리셋을 제공합니다.
// (규칙: .agents/rules/10-content-vs-code.md, 20-design-tokens.md)
// ─────────────────────────────────────────────────────────────

"use client";

import { ColorDiagnostic } from "@/components/primitives/ColorDiagnostic";
import { Timeline } from "@/components/primitives/Timeline";
import { ExpandableCards } from "@/components/primitives/ExpandableCards";
import {
  URINE_COLOR_ITEMS,
  STOOL_COLOR_ITEMS,
  WEANING_TIMELINE,
  RED_FLAG_ITEMS,
} from "@/content/data/kitten-care";

export function UrineColorDiagnostic() {
  return <ColorDiagnostic emoji="💧" title="소변 색" items={URINE_COLOR_ITEMS} />;
}

export function StoolColorDiagnostic() {
  return <ColorDiagnostic emoji="💩" title="변 상태" items={STOOL_COLOR_ITEMS} />;
}

export function WeaningTimeline() {
  return <Timeline items={WEANING_TIMELINE} />;
}

export function KittenRedFlags() {
  return <ExpandableCards items={RED_FLAG_ITEMS} />;
}
