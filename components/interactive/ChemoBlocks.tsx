// components/interactive/ChemoBlocks.tsx
// ─────────────────────────────────────────────────────────────
// chemotherapy.mdx 전용 프리셋 래퍼.
// content/data/chemotherapy.ts의 값을 각 컴포넌트에 주입.
// ─────────────────────────────────────────────────────────────

"use client";

import { useState, type ReactNode } from "react";
import { DrugFilter } from "./DrugFilter";
import {
  HANDLING_STEPS,
  CHEMO_FAQ,
  BAG_TABS,
  CHEMO_DRUGS,
  type VesicantLevel,
} from "@/content/data/chemotherapy";

/** SECTION 01 · 대소변 치우기 3단계 */
export function ChemoHandlingSteps() {
  const [idx, setIdx] = useState(0);
  const step = HANDLING_STEPS[idx];
  const isLast = idx === HANDLING_STEPS.length - 1;

  return (
    <div className="not-prose my-6 rounded-2xl border border-primary/20 bg-accent p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
          Most Important
        </span>
      </div>
      <h3 className="font-serif text-xl font-bold text-foreground m-0">
        {step.n}. {step.title}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">
        치료 후 2~3일간 꼭 지켜 주세요
      </p>
      <p className="mt-4 text-sm leading-relaxed text-foreground/85">
        {renderBold(step.body)}
      </p>
      <div className="mt-3 rounded-lg border border-primary/20 bg-background p-3 text-xs leading-relaxed text-foreground/85">
        <strong className="text-primary">TIP.</strong> {step.tip}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex gap-2" aria-hidden>
          {HANDLING_STEPS.map((s, i) => (
            <span
              key={s.n}
              className={`h-2 rounded-full transition-all ${
                i === idx ? "w-6 bg-primary" : "w-2 bg-primary/25"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="rounded-lg border border-border bg-background px-4 py-1.5 text-xs font-semibold text-foreground transition hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-40"
          >
            이전
          </button>
          <button
            type="button"
            onClick={() => setIdx((i) => (isLast ? 0 : i + 1))}
            className="rounded-lg bg-foreground px-4 py-1.5 text-xs font-bold text-background transition hover:opacity-90"
          >
            {isLast ? "처음부터" : "다음"}
          </button>
        </div>
      </div>
    </div>
  );
}

/** FAQ 6개 아코디언 */
export function ChemoFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="not-prose my-6 flex flex-col gap-2">
      {CHEMO_FAQ.map((f, i) => {
        const open = openIdx === i;
        const isWarning = f.severity === "warning";
        return (
          <div
            key={i}
            className={`overflow-hidden rounded-xl border ${
              isWarning
                ? "border-warning/30 bg-warning-muted"
                : "border-border bg-background"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIdx(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center gap-3 px-4 py-3 text-left"
            >
              <span className="text-xl" aria-hidden>{f.icon}</span>
              <span className="flex-1 text-sm font-semibold text-foreground">
                {f.title}
              </span>
              <span className="shrink-0 text-xs text-primary">
                {open ? "▲" : "▼"}
              </span>
            </button>
            {open && (
              <div className="border-t border-border/60 px-4 py-3 text-sm leading-relaxed text-foreground/85 whitespace-pre-line">
                {renderBold(f.detail)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** B·A·G 부작용 탭 */
export function BagSideEffects() {
  const [activeId, setActiveId] = useState(BAG_TABS[2].letter); // 기본은 G(가장 중요)
  const active = BAG_TABS.find((t) => t.letter === activeId) ?? BAG_TABS[2];

  return (
    <div className="not-prose my-6 rounded-2xl border border-border bg-background p-6 shadow-sm">
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        항암제는 종류에 관계없이 공통적으로 세 가지 부작용이 있을 수 있어요. 영문 첫 글자를 따서{" "}
        <strong className="text-foreground">B · A · G</strong>라고 부릅니다. 이 가운데 보호자님께서 가장 가까이서 살펴 주실 부분은{" "}
        <strong className="text-primary">G(소화기)</strong>예요.
      </p>

      <div className="grid gap-3 sm:grid-cols-3">
        {BAG_TABS.map((t) => {
          const isActive = t.letter === activeId;
          return (
            <button
              key={t.letter}
              type="button"
              onClick={() => setActiveId(t.letter)}
              aria-pressed={isActive}
              className={`flex flex-col rounded-xl border p-4 text-left transition ${
                isActive
                  ? "border-primary bg-accent shadow-sm"
                  : "border-border bg-muted/30 hover:border-primary/40"
              }`}
            >
              <span
                className={`font-serif text-3xl font-extrabold leading-none ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {t.letter}
              </span>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {t.wordEn}
              </span>
              <span className="mt-0.5 text-sm font-bold text-foreground">
                {t.wordKo}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl border border-border bg-muted/30 p-5">
        <p className="text-sm leading-relaxed text-foreground/85 m-0">
          {active.body}
        </p>
        <ul className="mt-3 flex flex-col gap-1.5 pl-0 list-none">
          {active.bullets.map((b, i) => (
            <li
              key={i}
              className="relative pl-4 text-xs leading-relaxed text-muted-foreground"
            >
              <span
                className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-primary"
                aria-hidden
              />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** 약물 선택 필터 */
export function ChemoDrugFilter() {
  const toneMap: Record<VesicantLevel, "default" | "warning" | "danger" | "muted"> = {
    strong: "danger",
    mild: "warning",
    irritant: "warning",
    special: "warning",
    none: "muted",
  };

  return (
    <DrugFilter
      items={CHEMO_DRUGS.map((d) => ({
        id: d.id,
        chipLabel: d.nameKo,
        chipBadge: d.vesicantLabel,
        tone: toneMap[d.vesicantLevel],
        render: () => <DrugCard drug={d} />,
      }))}
    />
  );
}

function DrugCard({ drug }: { drug: (typeof CHEMO_DRUGS)[number] }) {
  const border =
    drug.vesicantLevel === "strong"
      ? "border-danger/30 bg-danger-muted"
      : drug.vesicantLevel === "none"
      ? "border-border bg-muted/30"
      : "border-warning/30 bg-warning-muted";

  return (
    <div className={`rounded-xl border p-5 ${border}`}>
      <div className="mb-2 flex items-baseline gap-2 flex-wrap">
        <span className="font-serif text-base font-bold text-foreground">
          {drug.nameKo}
        </span>
        {drug.category && (
          <span className="text-xs text-muted-foreground">· {drug.category}</span>
        )}
        <span className="text-xs text-muted-foreground">· {drug.nameEn}</span>
      </div>
      <p className="text-sm leading-relaxed text-foreground/85 m-0">
        {renderBold(drug.body)}
      </p>
      {drug.bullets && drug.bullets.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1.5 pl-0 list-none">
          {drug.bullets.map((b, i) => (
            <li
              key={i}
              className="relative pl-4 text-xs leading-relaxed text-muted-foreground"
            >
              <span
                className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-primary"
                aria-hidden
              />
              {renderBold(b)}
            </li>
          ))}
        </ul>
      )}
      {drug.perSpecies && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {drug.perSpecies.dog && (
            <div className="rounded-lg border border-border bg-background p-3 text-xs leading-relaxed">
              <span className="mr-1" aria-hidden>🐕</span>
              <strong className="text-foreground">강아지</strong> —{" "}
              {renderBold(drug.perSpecies.dog)}
            </div>
          )}
          {drug.perSpecies.cat && (
            <div className="rounded-lg border border-border bg-background p-3 text-xs leading-relaxed">
              <span className="mr-1" aria-hidden>🐈</span>
              <strong className="text-foreground">고양이</strong> —{" "}
              {renderBold(drug.perSpecies.cat)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** **bold** → <strong> */
function renderBold(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="text-foreground">
        {p.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}
