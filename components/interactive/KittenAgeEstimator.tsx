// components/interactive/KittenAgeEstimator.tsx
// ─────────────────────────────────────────────────────────────
// 어미 잃은 새끼 고양이 케어 안내의 대화형 파트.
//   1) 체중 슬라이더 + 발달 표지 체크 → 주령 단계 추정
//   2) 추정 단계에 따른 적정 온도 · 하루 수유 횟수 · 간격 안내
//   3) 하루 분유량(mL) · 1회량 자동 계산
//   4) 하루 수유 횟수를 시계 형태로 시각화
//
// 로직은 lib/kittenCare.ts, 값(주령별 데이터)은 content/data/kitten-care.ts에서 오며,
// 이 컴포넌트는 오직 UI와 상태 관리만 담당합니다.
// (규칙: .agents/rules/10-content-vs-code.md, 20-design-tokens.md)
// ─────────────────────────────────────────────────────────────

"use client";

import { useMemo, useState } from "react";
import {
  KITTEN_STAGES,
  FORMULA_KCAL_PER_ML,
  type KittenStageId,
} from "@/content/data/kitten-care";
import {
  estimateStage,
  getStage,
  calcDailyFormulaMl,
  calcPerFeedingMl,
  calcStarvedInitialMl,
} from "@/lib/kittenCare";

interface Props {
  /** 분유 열량 밀도(kcal/mL). 기본은 시중 자묘 분유 평균값. */
  formulaKcalPerMl?: number;
  /** 체중 슬라이더 초기값(g) */
  defaultWeightGrams?: number;
}

export function KittenAgeEstimator({
  formulaKcalPerMl = FORMULA_KCAL_PER_ML,
  defaultWeightGrams = 200,
}: Props) {
  const [weight, setWeight] = useState<number>(defaultWeightGrams);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const checkedIds = useMemo(
    () => Object.keys(checked).filter((k) => checked[k]),
    [checked]
  );
  const stageId: KittenStageId | null = useMemo(
    () => estimateStage(weight, checkedIds),
    [weight, checkedIds]
  );
  const stage = getStage(stageId);
  const dailyMl = calcDailyFormulaMl(weight, stage, formulaKcalPerMl);
  const perFeedMl = stage ? calcPerFeedingMl(dailyMl, stage.feedsPerDayMid) : null;
  const starvedInitialMl = calcStarvedInitialMl(dailyMl);

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const allMarkers = useMemo(
    () => KITTEN_STAGES.flatMap((s) => s.markers.map((m) => ({ stageId: s.id, ...m }))),
    []
  );

  return (
    <div className="not-prose my-6 space-y-4 print:hidden">
      {/* ───── STEP 01 — 우리 아이 알아보기 ───── */}
      <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-primary">
            STEP 01 · 우리 아이 알아보기
          </span>
        </div>

        {/* 체중 슬라이더 */}
        <label className="block">
          <div className="mb-1 flex items-baseline justify-between">
            <span className="text-sm font-semibold text-foreground">지금 체중</span>
            <span className="font-serif text-2xl font-extrabold text-primary">
              {weight.toLocaleString()}
              <span className="ml-1 text-sm font-sans font-medium text-muted-foreground">g</span>
            </span>
          </div>
          <input
            type="range"
            min={60}
            max={1200}
            step={10}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full accent-primary"
            aria-label="체중"
          />
          <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
            <span>60g</span>
            <span>300g</span>
            <span>600g</span>
            <span>900g</span>
            <span>1.2kg</span>
          </div>
        </label>

        {/* 발달 표지 체크 */}
        <div className="mt-6">
          <div className="mb-2 text-sm font-semibold text-foreground">
            발달 모습도 체크하면 더 정확해져요
          </div>
          <p className="mb-3 text-xs text-muted-foreground">
            확실한 모습만 체크해 주세요 — 애매하면 비워 두는 게 안전해요. 비워 두면 체중 기준으로 안내해 드려요.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {allMarkers.map((m) => (
              <label
                key={m.id}
                className="flex cursor-pointer items-start gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-foreground transition hover:border-primary/40"
              >
                <input
                  type="checkbox"
                  checked={!!checked[m.id]}
                  onChange={() => toggle(m.id)}
                  className="mt-1 h-4 w-4 accent-primary"
                />
                <span>{m.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ───── STEP 02 — 맞춤 안내 ───── */}
      <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-primary">
            STEP 02 · 맞춤 안내
          </span>
          {stage && (
            <span className="text-xs text-muted-foreground">
              추정 단계 · <strong className="text-foreground">{stage.label}</strong>
              <span className="ml-1">({stage.ageRange})</span>
            </span>
          )}
        </div>

        {!stage ? (
          <p className="text-sm text-muted-foreground">
            체중을 조정하거나 발달 모습을 체크하면 발달 단계에 맞는 적정 온도 · 분유량 · 수유 간격을 정리해 드려요.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            {/* 적정 온도 */}
            <div className="flex flex-col rounded-lg border border-border bg-muted/40 p-4 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                적정 온도
              </span>
              <span className="my-2 font-serif text-2xl font-extrabold text-primary">
                {stage.ambientTempC}
              </span>
              <span className="text-xs text-muted-foreground">
                단계가 어릴수록 더 따뜻하게
              </span>
            </div>

            {/* 하루 분유량 */}
            <div className="flex flex-col rounded-lg border border-border bg-muted/40 p-4 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                하루 분유량
              </span>
              <span className="my-2 font-serif text-2xl font-extrabold text-primary">
                {dailyMl ? `${dailyMl.toFixed(1)} mL` : "—"}
              </span>
              <span className="text-xs text-muted-foreground">
                1회 약 {perFeedMl ? `${perFeedMl.toFixed(1)} mL` : "—"} ×{" "}
                {stage.feedsPerDay}
              </span>
            </div>

            {/* 수유 간격 */}
            <div className="flex flex-col rounded-lg border border-border bg-muted/40 p-4 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                수유 간격
              </span>
              <span className="my-2 font-serif text-2xl font-extrabold text-primary">
                {stage.intervalHours}
              </span>
              <span className="text-xs text-muted-foreground">
                하루 {stage.feedsPerDay}
              </span>
            </div>
          </div>
        )}

        {/* 굶은 채 구조된 아이 안내 (계산량과 함께) */}
        {stage && starvedInitialMl != null && (
          <div className="mt-4 rounded-lg border border-warning/30 bg-warning-muted p-3 text-xs leading-relaxed text-warning-foreground">
            <strong>굶은 채로 구조된 아이라면</strong> — 첫 24–48시간은 계산량의 절반(약{" "}
            {starvedInitialMl.toFixed(1)} mL/일)만 먹이고, 이후 몇 번의 수유에 걸쳐 서서히 양을 늘려 주세요.
          </div>
        )}
      </div>

      {/* ───── 하루 수유 횟수 다이얼 ───── */}
      {stage && <FeedingClock feedsPerDay={stage.feedsPerDayMid} stage={stage.label} interval={stage.intervalHours} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 하루 수유 횟수를 시계 다이얼로 시각화
// ─────────────────────────────────────────────────────────────
function FeedingClock({
  feedsPerDay,
  stage,
  interval,
}: {
  feedsPerDay: number;
  stage: string;
  interval: string;
}) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 24;
  const dots = Array.from({ length: feedsPerDay }, (_, i) => {
    const angle = (i / feedsPerDay) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  return (
    <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-primary">
          하루 수유 리듬 · {stage}
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="hsl(var(--border))"
            strokeDasharray="3 4"
          />
          {dots.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={10}
              fill="hsl(var(--primary))"
              opacity={0.9}
            />
          ))}
          <text
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            fontSize="36"
            fontWeight="800"
            fill="hsl(var(--foreground))"
            fontFamily="serif"
          >
            {feedsPerDay}
          </text>
          <text
            x={cx}
            y={cy + 18}
            textAnchor="middle"
            fontSize="11"
            fill="hsl(var(--muted-foreground))"
          >
            하루 수유 횟수
          </text>
        </svg>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-1">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Feeding Interval
            </dt>
            <dd className="font-serif text-lg font-bold text-foreground">{interval}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Per Day
            </dt>
            <dd className="font-serif text-lg font-bold text-foreground">하루 {feedsPerDay}회 안팎</dd>
          </div>
        </dl>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        한밤중에도 깨워서 먹여야 하는 게 가장 힘든 부분이에요. 생후 1주까지는 밤에도 2–4시간마다, 1주가 지나면 4–6시간 간격으로 줄어드니 조금만 버텨봐요.
      </p>
    </div>
  );
}
