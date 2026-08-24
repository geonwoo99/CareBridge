// components/interactive/DietCompareView.tsx
// ─────────────────────────────────────────────────────────────
// 여러 제품 나란히 비교 뷰.
//   1. 상단: 기준 탭 (as-fed / DM / /1,000kcal)
//   2. 열별 카드 그리드 — 사진·이름·도넛
//   3. 성분 비교 표 — 최고/최저값 하이라이트
//
// 판정 로직은 lib/dietCompare.ts, 데이터는 부모에서 주입.
// ─────────────────────────────────────────────────────────────

"use client";

import { useMemo, useState } from "react";
import type { Basis, Product } from "@/lib/dietMath";
import { analyzeNutrients } from "@/lib/dietMath";
import {
  classifyValues,
  defaultFormat,
  visibleMetrics,
} from "@/lib/dietCompare";
import {
  feedTypeLabel,
  speciesLabel,
} from "@/content/data/diet/labels";
import { NutrientDonut } from "@/components/primitives/NutrientDonut";

interface Props {
  products: Product[];
  onBack: () => void;
  onRemove: (id: string) => void;
}

export function DietCompareView({ products, onBack, onRemove }: Props) {
  const [basis, setBasis] = useState<Basis>("dm");

  const metrics = useMemo(() => visibleMetrics(basis), [basis]);
  const n = products.length;

  if (n < 2) {
    return (
      <div className="not-prose">
        <button
          type="button"
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          ← 목록으로
        </button>
        <div className="rounded-xl border border-dashed border-border bg-muted/40 p-16 text-center text-muted-foreground">
          <div className="mb-2 text-4xl">🔍</div>
          <div>
            비교하려면 <strong>2개 이상</strong> 선택해 주세요.
          </div>
        </div>
      </div>
    );
  }

  const basisLabel =
    basis === "as_fed"
      ? "라벨 표시 그대로"
      : basis === "dm"
      ? "건물(DM) 기준"
      : "1,000kcal 기준";

  return (
    <div className="not-prose">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
      >
        ← 목록으로
      </button>

      <header className="mb-5">
        <h2 className="m-0 font-serif text-2xl font-extrabold">
          {n}개 제품 비교
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          같은 기준으로 나란히 놓았어요. 초록 배경은 더 좋은 값, 붉은 글자는 낮은 값이에요.
        </p>
      </header>

      {/* 기준 탭 */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="grid max-w-[320px] flex-1 grid-cols-3 gap-1 rounded-lg border border-border p-1">
          {(["as_fed", "dm", "per_1000kcal"] as Basis[]).map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBasis(b)}
              aria-pressed={basis === b}
              className={`rounded-md px-3 py-2 text-xs font-semibold transition ${
                basis === b
                  ? "border border-primary/30 bg-background text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {b === "as_fed" ? "as-fed" : b === "dm" ? "DM" : "/1,000kcal"}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">{basisLabel}</span>
      </div>

      {/* 열별 카드 */}
      <div
        className="grid gap-3 overflow-x-auto pb-2"
        style={{
          gridTemplateColumns: `repeat(${n}, minmax(180px, 1fr))`,
        }}
      >
        {products.map((p) => (
          <ProductColumn
            key={p.id}
            product={p}
            basis={basis}
            onRemove={() => onRemove(p.id)}
          />
        ))}
      </div>

      {/* 성분 비교 표 */}
      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="sticky left-0 z-[1] min-w-[120px] bg-muted px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  영양성분
                </th>
                {products.map((p) => (
                  <th
                    key={p.id}
                    className="bg-muted px-3 py-2.5 text-right text-[11px] font-bold uppercase tracking-wider text-muted-foreground"
                  >
                    {p.brand}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((m) => {
                const values = products.map((p) => m.extract(p, basis));
                const verdicts = classifyValues(values, m.higherBetter);
                const formatter = m.format ?? ((v: number | null) => defaultFormat(v, basis));
                return (
                  <tr key={m.key}>
                    <td className="sticky left-0 z-[1] min-w-[120px] border-t border-border bg-background px-3 py-2.5 text-left text-sm font-semibold text-foreground/85">
                      {m.label}
                      {m.unitHint && (
                        <span className="ml-1 text-[11px] font-normal text-muted-foreground">
                          {m.unitHint}
                        </span>
                      )}
                    </td>
                    {values.map((v, i) => {
                      const verdict = verdicts[i];
                      const cls =
                        verdict === "best"
                          ? "bg-primary/10 text-primary"
                          : verdict === "worst"
                          ? "text-danger-foreground"
                          : "";
                      return (
                        <td
                          key={i}
                          className={`border-t border-border px-3 py-2.5 text-right text-sm font-bold tabular-nums ${cls}`}
                        >
                          {formatter(v)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] text-muted-foreground">
        '더 좋음/낮음'은 일반적인 기준의 참고 표시이며, 아이의 상태에 따라 다를 수 있어요. 처방식 선택은 담당 수의사와 상의해 주세요.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────

function ProductColumn({
  product: p,
  basis,
  onRemove,
}: {
  product: Product;
  basis: Basis;
  onRemove: () => void;
}) {
  // 도넛은 항상 DM 기준으로 (per_1000kcal 기준은 도넛 형태로 표현이 어려움)
  const donutBasis: Basis = basis === "per_1000kcal" ? "dm" : basis;
  const segments = useMemo(
    () => analyzeNutrients(p, donutBasis),
    [p, donutBasis]
  );

  return (
    <div className="rounded-xl border border-border bg-background p-3">
      <div className="mb-2.5 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg bg-muted text-2xl">
        {p.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.photo_url}
            alt={p.name}
            className="h-full w-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <span>🍽️</span>
        )}
      </div>
      <div className="text-[11px] text-muted-foreground">{p.brand}</div>
      <div className="mt-0.5 mb-1.5 font-serif text-sm font-bold leading-snug">
        {p.name}
      </div>
      <div className="mb-2.5 text-[11px] text-muted-foreground">
        {speciesLabel(p.species)} · {feedTypeLabel(p.feed_type)}
      </div>
      <div className="mb-2 flex justify-center">
        <NutrientDonut
          segments={segments}
          size={140}
          centerValue={p.kcal_per_100g ? `${Math.round(p.kcal_per_100g)}` : ""}
          centerLabel={p.kcal_per_100g ? "kcal / 100g" : ""}
        />
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="w-full rounded-md border border-border bg-muted px-2 py-1.5 text-[11px] text-muted-foreground transition hover:border-danger/40 hover:text-danger-foreground"
      >
        ✕ 비교에서 제외
      </button>
    </div>
  );
}
