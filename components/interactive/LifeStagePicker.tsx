// components/interactive/LifeStagePicker.tsx
// ─────────────────────────────────────────────────────────────
// 생애주기 단계 선택 위젯 — 종(Species)에 따라 강아지 4단계 또는
// 고양이 5단계를 자동 표시. 선택한 단계는 컴포넌트 내부 상태로만 관리하며
// 하단 카드(SCREENING_ITEMS)의 정렬/강조에 활용될 수 있도록 콜백을 제공합니다.
//
// 데이터는 content/data/checkup.ts, 종 컨텍스트는
// components/primitives/SpeciesToggle.tsx의 useSpecies()에서 옵니다.
// ─────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";
import { useSpecies } from "@/components/primitives/SpeciesToggle";
import { getLifeStages, LIFE_STAGE_NOTE } from "@/content/data/checkup";

interface Props {
  /** 초기 선택 단계(id). 미지정이면 선택 안 됨. */
  defaultStageId?: string;
  onChange?: (stageId: string) => void;
}

export function LifeStagePicker({ defaultStageId, onChange }: Props) {
  const { species } = useSpecies();
  const stages = getLifeStages(species === "common" ? "dog" : species);
  const note = LIFE_STAGE_NOTE[species === "common" ? "dog" : species];
  const [selected, setSelected] = useState<string | null>(defaultStageId ?? null);

  function pick(id: string) {
    setSelected(id);
    onChange?.(id);
  }

  return (
    <div className="not-prose my-6">
      <div className="mb-3 text-sm font-semibold text-foreground">
        생애주기는 이렇게 나눠요
      </div>
      <div
        className={`grid gap-3 ${
          stages.length >= 5
            ? "sm:grid-cols-3 lg:grid-cols-5"
            : "sm:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {stages.map((s) => {
          const active = selected === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => pick(s.id)}
              aria-pressed={active}
              className={`flex flex-col rounded-xl border p-4 text-left transition ${
                active
                  ? "border-primary bg-accent shadow-sm"
                  : "border-border bg-background hover:border-primary/40"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {s.order} · {s.labelEn}
              </span>
              {active && (
                <span className="mt-1 inline-flex w-fit items-center rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                  현재
                </span>
              )}
              <span className="mt-1.5 font-serif text-base font-bold text-foreground">
                {s.label}
              </span>
              <span className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {s.range}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
        {note}
      </p>
      {!selected && (
        <p className="mt-3 rounded-lg border border-primary/20 bg-accent px-3 py-2 text-xs text-foreground/85">
          우리 아이는 지금 어느 단계일까요? 위 카드를 눌러 선택해 주세요.
        </p>
      )}
    </div>
  );
}
