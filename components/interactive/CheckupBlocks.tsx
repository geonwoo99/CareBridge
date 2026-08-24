// components/interactive/CheckupBlocks.tsx
// ─────────────────────────────────────────────────────────────
// checkup.mdx 전용 프리셋 래퍼 모음.
// content/data/checkup.ts의 값을 컴포넌트에 주입하여 MDX에서
// 인자 없이 바로 사용할 수 있도록 합니다 (하드코딩 방지).
// ─────────────────────────────────────────────────────────────

"use client";

import { useSpecies } from "@/components/primitives/SpeciesToggle";
import { LifeStagePicker } from "./LifeStagePicker";
import {
  SCREENING_ITEMS,
  PRE_VISIT_SEDATIVE,
  CHECKUP_EVIDENCE,
  type ScreeningTier,
} from "@/content/data/checkup";

/** 생애주기 선택기 (종 컨텍스트에 따라 자동 분기) */
export function CheckupLifeStagePicker() {
  return <LifeStagePicker />;
}

/** 03 섹션 상단 근거 라벨 */
export function CheckupEvidence() {
  const { species } = useSpecies();
  const s = species === "common" ? "dog" : species;
  const label = CHECKUP_EVIDENCE[s];
  return (
    <p className="text-sm leading-relaxed text-foreground/85">
      어떤 검사가 권장되는지 미리 알고 오시면, 검진 방향을 함께 정하기 수월해요. 아래 내용은{" "}
      <strong>{label}</strong>을 토대로 했어요.
    </p>
  );
}

/** 02 섹션 · 사전 안정제 종별 안내 */
export function PreVisitSedativeCard() {
  const { species } = useSpecies();
  const s = species === "common" ? "dog" : species;
  const info = PRE_VISIT_SEDATIVE[s];
  return (
    <div className="my-4 rounded-xl border border-primary/20 bg-accent px-4 py-3 text-sm">
      <span aria-hidden className="text-lg mr-1">
        {info.emoji}
      </span>
      <strong>{info.speciesLabel}</strong> — {info.example}
    </div>
  );
}

/** 검사 항목 그리드 (권장 / 선택) */
export function ScreeningList({ tier }: { tier: ScreeningTier }) {
  const { species } = useSpecies();
  const s = species === "common" ? "dog" : species;

  const items = SCREENING_ITEMS.filter(
    (it) => it.tier === tier && (!it.species || it.species === s)
  );

  if (items.length === 0) return null;

  const badge =
    tier === "recommended" ? "기본으로 권장돼요" : "꼭 필요한 건 아니에요";

  return (
    <div className="not-prose my-6">
      <div
        className={`mb-3 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
          tier === "recommended"
            ? "bg-accent text-primary"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {badge}
      </div>
      <ul className="grid gap-3 pl-0 list-none sm:grid-cols-2">
        {items.map((it) => (
          <li
            key={it.id}
            className="rounded-xl border border-border bg-background p-4 shadow-sm"
          >
            <span
              className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                tier === "recommended"
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {it.tag}
            </span>
            <div className="mt-2 font-serif text-base font-bold text-foreground">
              {it.title}
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {it.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 권장 검사 리스트 */
export function ScreeningRecommended() {
  return <ScreeningList tier="recommended" />;
}

/** 선택 검사 리스트 */
export function ScreeningOptional() {
  return <ScreeningList tier="optional" />;
}
