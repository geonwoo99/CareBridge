// components/interactive/FeedingTubeCalculator.tsx
// ─────────────────────────────────────────────────────────────
// 식도관 강급량 계산기.
// 체중·급여 횟수·처방 식이(kcal/ml)·희석 여부를 입력받아
// RER과 5단계 증량표를 자동 계산합니다.
//
// 로직은 lib/rer.ts, 데이터(식이 프리셋·단계 정의)는
// content/data/feeding-tube.ts에서 오며 이 컴포넌트는 UI만 담당합니다.
// (규칙: .agents/rules/10-content-vs-code.md, 20-design-tokens.md)
// ─────────────────────────────────────────────────────────────

"use client";

import { useMemo, useState } from "react";
import {
  calcRer,
  calcDilution,
  calcStep,
  feedingInterval,
} from "@/lib/rer";
import {
  DIET_PRESETS,
  FEEDS_PER_DAY_OPTIONS,
  FEEDING_STEPS,
} from "@/content/data/feeding-tube";

interface Props {
  defaultWeightKg?: number;
}

export function FeedingTubeCalculator({ defaultWeightKg = 4 }: Props) {
  const [weightKg, setWeightKg] = useState<number>(defaultWeightKg);
  const [feedsPerDay, setFeedsPerDay] = useState<number>(4);
  const [dietId, setDietId] = useState<string>(DIET_PRESETS[0].id);
  const [customKcalPerMl, setCustomKcalPerMl] = useState<number>(1.0);
  const [dilute, setDilute] = useState<boolean>(false);
  const [foodMl, setFoodMl] = useState<number>(200);
  const [waterMl, setWaterMl] = useState<number>(100);

  const diet = useMemo(
    () => DIET_PRESETS.find((d) => d.id === dietId) ?? DIET_PRESETS[0],
    [dietId]
  );
  const baseKcalPerMl =
    diet.id === "custom" ? customKcalPerMl : diet.kcalPerMl;
  const effectiveDilute = dilute || diet.requiresDilution;

  const dilution = calcDilution({
    foodMl,
    waterMl: effectiveDilute ? waterMl : 0,
    kcalPerMl: baseKcalPerMl,
  });
  const kcalPerMl = effectiveDilute ? dilution.kcalPerMlDiluted : baseKcalPerMl;

  const rer = calcRer(weightKg);
  const steps = useMemo(() => {
    if (rer == null || !kcalPerMl || kcalPerMl <= 0) return [];
    return FEEDING_STEPS.map((s) => ({
      ...s,
      result: calcStep({
        rerRatio: s.rerRatio,
        rerKcal: rer,
        kcalPerMl,
        feedsPerDay,
      }),
    }));
  }, [rer, kcalPerMl, feedsPerDay]);

  const interval = feedingInterval(feedsPerDay);

  return (
    <div className="not-prose my-6 rounded-2xl border border-border bg-background p-6 shadow-sm print:hidden">
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
          Calculator
        </span>
        <span className="font-serif text-base font-bold text-foreground">
          RER · 강급량 계산기
        </span>
      </div>

      {/* 입력부 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-muted-foreground">체중 (kg)</span>
          <input
            type="number"
            step="0.1"
            min={0}
            value={weightKg}
            onChange={(e) => setWeightKg(Number(e.target.value))}
            className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-muted-foreground">하루 급여 횟수</span>
          <select
            value={feedsPerDay}
            onChange={(e) => setFeedsPerDay(Number(e.target.value))}
            className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {FEEDS_PER_DAY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-xs font-semibold text-muted-foreground">처방 식이</span>
          <select
            value={dietId}
            onChange={(e) => {
              const id = e.target.value;
              setDietId(id);
              const d = DIET_PRESETS.find((x) => x.id === id);
              if (d?.requiresDilution) setDilute(true);
            }}
            className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            {DIET_PRESETS.map((d) => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
          {diet.hint && (
            <span className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              {diet.hint}
            </span>
          )}
        </label>

        {diet.id === "custom" && (
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-muted-foreground">kcal / ml (처방)</span>
            <input
              type="number"
              step="0.01"
              min={0}
              value={customKcalPerMl}
              onChange={(e) => setCustomKcalPerMl(Number(e.target.value))}
              className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
        )}
      </div>

      {/* 캔 경고 */}
      {diet.requiresDilution && (
        <div className="mt-4 rounded-lg border border-warning/30 bg-warning-muted px-3 py-2 text-xs leading-relaxed text-warning-foreground">
          ⚠ <strong>캔 사료</strong>는 그대로 주입하면 식도관이 막힐 수 있어요. 반드시 물을 섞어 희석해서 주세요. 아래 희석 옵션이 켜져 있어요.
        </div>
      )}

      {/* 희석 옵션 */}
      <div className="mt-4">
        <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <input
            type="checkbox"
            checked={effectiveDilute}
            disabled={diet.requiresDilution}
            onChange={(e) => setDilute(e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          물을 섞어 희석해서 급여할게요
        </label>
        {effectiveDilute && (
          <>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground">식이 양 (ml)</span>
                <input
                  type="number"
                  min={0}
                  value={foodMl}
                  onChange={(e) => setFoodMl(Number(e.target.value))}
                  className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground">섞을 물 (ml)</span>
                <input
                  type="number"
                  min={0}
                  value={waterMl}
                  onChange={(e) => setWaterMl(Number(e.target.value))}
                  className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </label>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              <strong className="text-foreground">캔 사료는 무게와 부피가 거의 같아요.</strong> 200g 캔 한 통이면 약 200ml로 입력하시면 됩니다. (예: 156g ≈ 156ml, 410g ≈ 410ml)
            </p>
          </>
        )}
      </div>

      {/* 결과: 요약 헤더 (다크 카드) */}
      <div className="mt-6 rounded-xl bg-foreground p-5 text-background">
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-background/60">
              RER · 100%
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-serif text-3xl font-extrabold text-warning">
                {rer != null ? Math.round(rer) : "—"}
              </span>
              <span className="text-xs text-background/70">kcal/일</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-background/60">
              {effectiveDilute ? "희석 후 에너지밀도" : "식이 에너지밀도"}
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-serif text-3xl font-extrabold text-background">
                {kcalPerMl > 0 ? kcalPerMl.toFixed(2) : "—"}
              </span>
              <span className="text-xs text-background/70">kcal/ml</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-background/60">
              급여 간격
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-serif text-2xl font-extrabold text-background">{interval}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 단계별 표 */}
      <div className="mt-4 flex flex-col gap-2">
        {steps.map((s) => {
          const emphasized = s.id === "d3"; // 100% 단계 강조
          const isExtra = s.extra;
          return (
            <div
              key={s.id}
              className={`grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 rounded-xl border p-4 ${
                emphasized
                  ? "border-primary bg-accent"
                  : isExtra
                  ? "border-dashed border-border bg-muted/30"
                  : "border-border bg-muted/40"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background text-sm font-bold text-foreground shadow-sm">
                {s.dayLabel}
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">
                  {s.title} <span className="ml-1 text-xs font-semibold text-muted-foreground">{Math.round(s.rerRatio * 100)}% RER</span>
                </div>
                {s.hint && (
                  <div className="text-xs text-muted-foreground">{s.hint}</div>
                )}
              </div>
              <div className="text-right">
                <div className="font-serif text-lg font-extrabold text-primary">
                  {s.result ? `${Math.round(s.result.mlPerFeed)}ml` : "—"}
                </div>
                <div className="text-[10px] text-muted-foreground">/회</div>
              </div>
              <div className="text-right text-[11px] leading-tight text-muted-foreground">
                {s.result && (
                  <>
                    <div>총 {Math.round(s.result.totalMlPerDay)} ml/일</div>
                    <div>{Math.round(s.result.targetKcalPerDay)} kcal/일</div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-lg border border-primary/20 bg-accent p-3 text-xs leading-relaxed text-foreground/85">
        <strong>체중 유지가 핵심이에요.</strong> 매일 같은 시간에 체중을 재서 기록해 주세요. 체중이 빠지면 다음 단계로 증량하고, 늘어나거나 구토·설사가 있으면 한 단계 줄여 주세요. 작은 폭으로 천천히 조절하는 것이 안전합니다.
      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
        ※ 위 값은 일반적인 가이드이며 환자의 컨디션과 처방에 따라 달라질 수 있어요. 100% RER로 48시간 이상 잘 견디면 강급량을 약 10% 정도 가감해 체중을 안정시키는 것을 권장합니다. 계산이 어렵거나 처방 식이가 다른 경우 병원으로 문의해 주세요.
      </p>
    </div>
  );
}
