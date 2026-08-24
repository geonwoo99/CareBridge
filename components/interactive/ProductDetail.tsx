// components/interactive/ProductDetail.tsx
// ─────────────────────────────────────────────────────────────
// 처방식·일반사료 제품 상세 페이지.
// 스크린샷의 UI 구조를 그대로 재현:
//   1. 헤더 (사진 · 브랜드 · 이름 · 종 · 처방 카테고리)
//   2. 기준 탭 (as-fed / DM / /1000kcal)
//   3. 주요 영양성분 표
//   4. 영양 분석 도넛
//   5. 영양소 충족도 (DM 기준)
//   6. 전체 성분 표
//   7. 원재료
// ─────────────────────────────────────────────────────────────

"use client";

import { useMemo, useState } from "react";
import {
  analyzeNutrients,
  calciumPhosphorusRatio,
  convertBasis,
  formatPercent,
  rxCategoryLabel,
  speciesLabel,
  type Basis,
  type Product,
} from "@/lib/dietMath";
import { NutrientDonut } from "@/components/primitives/NutrientDonut";

interface Props {
  product: Product;
}

export function ProductDetail({ product: p }: Props) {
  const [basis, setBasis] = useState<Basis>("as_fed");
  const [donutBasis, setDonutBasis] = useState<Basis>("dm");

  const cvt = (v: number | null) =>
    convertBasis(v, basis, p.moisture_percent, p.kcal_per_100g);

  const kcalDisplay = useMemo(() => {
    if (!p.kcal_per_100g) return "—";
    if (basis === "per_1000kcal") return "1,000 kcal";
    return `${Math.round(p.kcal_per_100g)} kcal/100g`;
  }, [p.kcal_per_100g, basis]);

  const unit = basis === "per_1000kcal" ? "g" : "%";
  const ratioLabel =
    basis === "per_1000kcal" ? "1,000kcal 기준" :
    basis === "dm" ? "건물(DM) 기준" :
    "라벨 표시 그대로";

  const donutSegments = useMemo(() => analyzeNutrients(p, donutBasis), [p, donutBasis]);
  const donutMoistureNote = donutBasis === "dm" && p.moisture_percent != null
    ? `수분 ${p.moisture_percent}% → DM ${(100 - p.moisture_percent).toFixed(0)}%`
    : "";

  // 주요 영양소 (상단 표)
  const mainRows: Array<{ label: string; value: string }> = [
    { label: "칼로리", value: kcalDisplay },
    { label: "인", value: formatPercent(cvt(p.phosphorus_percent)) },
    { label: "칼슘:인", value: calciumPhosphorusRatio(p.calcium_percent, p.phosphorus_percent) ?? "—" },
    { label: "단백질", value: fmt(cvt(p.crude_protein_percent), unit) },
    { label: "지방", value: fmt(cvt(p.crude_fat_percent), unit) },
    { label: "수분", value: formatPercent(p.moisture_percent, 0) },
  ];

  // 전체 성분 (하단 표)
  const allRows: Array<[string, string]> = ([
    ["열량", p.kcal_per_100g ? `${p.kcal_per_100g.toFixed(1)} kcal/100g` : "—"],
    ["조단백", formatPercent(p.crude_protein_percent, 1)],
    ["조지방", formatPercent(p.crude_fat_percent, 1)],
    ["조섬유", formatPercent(p.crude_fiber_percent, 1)],
    ["조회분", formatPercent(p.crude_ash_percent, 1)],
    ["수분", formatPercent(p.moisture_percent, 1)],
    ["칼슘", formatPercent(p.calcium_percent, 2)],
    ["인", formatPercent(p.phosphorus_percent, 2)],
    ["나트륨", formatPercent(p.sodium_percent, 2)],
    ["칼륨", formatPercent(p.potassium_percent ?? null, 2)],
    ["마그네슘", formatPercent(p.magnesium_percent, 2)],
    ["오메가3", formatPercent(p.omega3_percent, 2)],
    ["오메가6", formatPercent(p.omega6_percent ?? null, 2)],
    ["타우린", formatPercent(p.taurine_percent, 2)],
  ] as [string, string][]).filter(([, v]) => v !== "—" && v !== "0.0%" && v !== "0.00%");

  return (
    <div className="not-prose flex flex-col gap-4">
      {/* 1. 헤더 */}
      <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
        <div className="flex items-start gap-4">
          {p.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.photo_url}
              alt={p.name}
              className="h-20 w-20 shrink-0 rounded-xl border border-border object-contain bg-muted"
              loading="lazy"
            />
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-2xl" aria-hidden>
              🍽️
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="text-xs text-muted-foreground">{p.brand}</div>
            <h2 className="mt-0.5 font-serif text-xl font-bold text-foreground leading-tight m-0">
              {p.name}
            </h2>
            <div className="mt-1 text-xs text-muted-foreground">
              {speciesLabel(p.species)}
            </div>
          </div>
        </div>

        {p.rx_categories && p.rx_categories.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {p.rx_categories.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
              >
                {rxCategoryLabel(tag)}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 2. 기준 탭 + 주요 영양성분 */}
      <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-end">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            {ratioLabel}
            <span
              className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-muted text-[10px] font-bold"
              aria-hidden
            >
              i
            </span>
          </span>
        </div>
        <div className="mb-4 grid grid-cols-3 rounded-xl border border-border p-1 text-sm">
          {(["as_fed", "dm", "per_1000kcal"] as Basis[]).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBasis(b)}
              aria-pressed={basis === b}
              className={`rounded-lg py-2 text-center font-semibold transition ${
                basis === b
                  ? "border border-primary/40 bg-background text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {b === "as_fed" ? "as-fed" : b === "dm" ? "DM" : "/1,000kcal"}
            </button>
          ))}
        </div>

        <dl className="flex flex-col divide-y divide-border">
          {mainRows.map((r) => (
            <div key={r.label} className="flex items-center justify-between py-3">
              <dt className="text-sm text-foreground/85">{r.label}</dt>
              <dd className="font-bold text-foreground">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* 3. 영양 분석 도넛 */}
      <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span aria-hidden>📊</span>
            <span className="font-serif text-base font-bold text-foreground">
              영양 분석
            </span>
          </div>
          <label className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-muted-foreground">DM 기준</span>
            <span
              role="switch"
              aria-checked={donutBasis === "dm"}
              tabIndex={0}
              onClick={() => setDonutBasis(donutBasis === "dm" ? "as_fed" : "dm")}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  e.preventDefault();
                  setDonutBasis(donutBasis === "dm" ? "as_fed" : "dm");
                }
              }}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
                donutBasis === "dm" ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-background shadow transition-transform ${
                  donutBasis === "dm" ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </span>
          </label>
        </div>
        {p.kcal_per_100g && (
          <p className="mb-4 text-xs text-muted-foreground">
            {p.kcal_per_100g.toFixed(0)} kcal/100g
            {donutMoistureNote && ` · ${donutMoistureNote}`}
          </p>
        )}

        <NutrientDonut
          segments={donutSegments}
          centerValue={p.kcal_per_100g ? `${p.kcal_per_100g.toFixed(0)} kcal` : ""}
          centerLabel={p.kcal_per_100g ? "/ 100g" : ""}
        />

        {/* 영양소 충족도 요약 (DM 기준) */}
        <div className="mt-6">
          <div className="mb-2 text-xs font-semibold text-muted-foreground">
            영양소 충족도 · 항상 건물 기준(DM)
          </div>
          <div className="grid grid-cols-5 gap-2 text-center">
            <MiniStat label="단백질" value={cvtDM(p.crude_protein_percent, p.moisture_percent)} />
            <MiniStat label="지방" value={cvtDM(p.crude_fat_percent, p.moisture_percent)} />
            <MiniStat label="칼슘" value={cvtDM(p.calcium_percent, p.moisture_percent)} />
            <MiniStat label="인" value={cvtDM(p.phosphorus_percent, p.moisture_percent)} />
            <MiniStat
              label="칼슘:인 비"
              rawText={calciumPhosphorusRatio(p.calcium_percent, p.phosphorus_percent) ?? "—"}
            />
          </div>
          <p className="mt-3 text-center text-[11px] italic text-muted-foreground">
            * 본 분석은 라벨 표시값 기준이며 진단을 대체하지 않아요.
          </p>
        </div>
      </div>

      {/* 4. 전체 성분 */}
      <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-serif text-base font-bold text-foreground m-0">
            전체 성분
          </h3>
          <span className="text-xs text-muted-foreground">급여 상태 기준</span>
        </div>
        <dl className="flex flex-col divide-y divide-border">
          {allRows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between py-2.5">
              <dt className="text-sm text-foreground/85">{label}</dt>
              <dd className="font-bold text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* 5. 원재료 */}
      {p.ingredients_text && (
        <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
          <h3 className="mb-2 font-serif text-base font-bold text-foreground m-0">
            원재료
          </h3>
          <p className="m-0 whitespace-pre-line text-sm leading-relaxed text-foreground/85">
            {p.ingredients_text}
          </p>
        </div>
      )}

      {/* 면책 */}
      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        표시 값은 제조사 공개 정보 기반 추정이며 실제와 다를 수 있어요.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 헬퍼
// ─────────────────────────────────────────────────────────────
function fmt(v: number | null, unit: string): string {
  if (v == null) return "—";
  if (unit === "g") return `${v.toFixed(2)} g`;
  return formatPercent(v);
}

function cvtDM(v: number | null, moisture: number | null): number | null {
  if (v == null || moisture == null || moisture >= 100) return null;
  return v / (1 - moisture / 100);
}

function MiniStat({
  label,
  value,
  rawText,
}: {
  label: string;
  value?: number | null;
  rawText?: string;
}) {
  const text =
    rawText != null
      ? rawText
      : value == null
      ? "—"
      : value >= 10
      ? `${value.toFixed(1)}%`
      : `${value.toFixed(2)}%`;
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-2">
      <div className="text-[10px] font-semibold text-muted-foreground">{label}</div>
      <div className="mt-0.5 flex items-center justify-center gap-1 text-sm font-bold text-primary">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        {text}
      </div>
    </div>
  );
}
