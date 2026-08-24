// components/interactive/BleachCalculator.tsx
// ─────────────────────────────────────────────────────────────
// 락스 희석 계산기 — 물의 양 + 희석비(1:10 or 1:32) → 필요 락스 mL.
// 로직은 lib/bleachDilution.ts, 데이터(희석비 프리셋)는 content/data/dermatophyte.ts.
// ─────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";
import { calcBleachMl } from "@/lib/bleachDilution";
import { BLEACH_RATIOS } from "@/content/data/dermatophyte";

interface Props {
  defaultWaterMl?: number;
}

export function BleachCalculator({ defaultWaterMl = 1000 }: Props) {
  const [waterMl, setWaterMl] = useState<number>(defaultWaterMl);
  const [ratioId, setRatioId] = useState<string>(BLEACH_RATIOS[0].id);

  const ratio = BLEACH_RATIOS.find((r) => r.id === ratioId) ?? BLEACH_RATIOS[0];
  const bleachMl = calcBleachMl(waterMl, ratio.ratioN);

  return (
    <div className="not-prose rounded-2xl border border-border bg-background p-6 shadow-sm print:hidden">
      <div className="mb-3 font-serif text-base font-bold text-foreground">
        락스 희석 계산기
      </div>
      <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
        물의 양을 입력하면 필요한 락스 양을 계산해 드려요.
      </p>

      {/* 희석비 선택 */}
      <div className="mb-4 inline-flex rounded-lg border border-border bg-muted p-0.5 text-xs">
        {BLEACH_RATIOS.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setRatioId(r.id)}
            className={`rounded px-3 py-1.5 font-semibold transition ${
              ratioId === r.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
      <p className="mb-4 text-[11px] text-muted-foreground">{ratio.hint}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-muted-foreground">
            물 (mL)
          </span>
          <input
            type="number"
            min={0}
            step={50}
            value={waterMl}
            onChange={(e) => setWaterMl(Number(e.target.value))}
            className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-lg font-bold text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <div className="flex flex-col justify-center rounded-lg bg-accent p-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
            필요한 락스
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="font-serif text-2xl font-extrabold text-primary">
              {bleachMl != null ? bleachMl.toFixed(1) : "—"}
            </span>
            <span className="text-xs text-muted-foreground">mL</span>
          </div>
          {bleachMl != null && (
            <span className="mt-1 text-[11px] text-muted-foreground">
              총 {(waterMl + bleachMl).toFixed(0)} mL 완성
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
