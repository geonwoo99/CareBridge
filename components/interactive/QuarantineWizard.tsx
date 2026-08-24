// components/interactive/QuarantineWizard.tsx
// ─────────────────────────────────────────────────────────────
// 해외 출국 검역 도구의 최상위 컨테이너.
// 국가 선택 + 출발일 입력 → 요구사항 카드 + 타임라인 표시.
// 원본 페이지의 랜딩 화면(Phase 1)에 해당합니다.
// 실제 서류 발급/제출은 별도 세션(Phase 2/3)에서 다룹니다.
// ─────────────────────────────────────────────────────────────

"use client";

import { useMemo, useState } from "react";
import {
  QUARANTINE_DESTINATIONS,
} from "@/content/data/quarantine/destinations";
import {
  checkFeasibility,
  findDestination,
  formatKoreanDate,
  groupByRegion,
  todayISO,
  type Destination,
} from "@/lib/quarantine";
import { QuarantineRequirements } from "./QuarantineRequirements";
import { QuarantineTimeline } from "./QuarantineTimeline";

export function QuarantineWizard() {
  const [code, setCode] = useState<string>("");
  const [targetDate, setTargetDate] = useState<string>("");

  const grouped = useMemo(
    () => groupByRegion(QUARANTINE_DESTINATIONS),
    []
  );
  const dest: Destination | null = useMemo(
    () => (code ? findDestination(QUARANTINE_DESTINATIONS, code) : null),
    [code]
  );
  const feasibility = useMemo(
    () => (dest ? checkFeasibility(dest, targetDate || null) : null),
    [dest, targetDate]
  );

  const verdictClass = feasibility
    ? {
        feasible: "border-primary/30 bg-accent text-primary",
        tight: "border-warning/40 bg-warning-muted text-warning-foreground",
        infeasible: "border-danger/40 bg-danger-muted text-danger-foreground",
        unknown: "border-border bg-muted/40 text-muted-foreground",
      }[feasibility.verdict]
    : "";

  const today = todayISO();

  return (
    <div className="not-prose flex flex-col gap-6">
      {/* Step 01 — 출국 정보 */}
      <section className="rounded-2xl border border-border bg-background p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
            STEP 01 · 출국 정보
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-muted-foreground">
              어느 나라로 출국하시나요?
            </span>
            <select
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">국가를 선택해 주세요</option>
              {grouped.map((g) => (
                <optgroup key={g.region} label={g.region}>
                  {g.items.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.country_name_ko}
                      {d.service_level === "advisory_only" ? " · 안내만" : ""}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <span className="text-[11px] text-muted-foreground">
              국가마다 필요한 검사·서류·리드타임이 달라요. 먼저 선택해 주세요.
            </span>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-muted-foreground">
              출국 예정일 (대략)
            </span>
            <input
              type="date"
              min={today}
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              disabled={!code}
              className="rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <span className="text-[11px] text-muted-foreground">
              대략적인 날짜만 알려 주셔도 가능한지 확인해 드려요.
            </span>
          </label>
        </div>

        {/* Feasibility 판정 */}
        {feasibility && (
          <div
            className={`mt-4 rounded-xl border p-4 ${verdictClass}`}
            aria-live="polite"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider">
              {feasibility.verdict === "feasible" && "출국 가능"}
              {feasibility.verdict === "tight" && "빠듯해요"}
              {feasibility.verdict === "infeasible" && "일정 조정 필요"}
              {feasibility.verdict === "unknown" && "안내"}
            </div>
            {feasibility.earliestFromToday && (
              <div className="mt-1 font-serif text-lg font-bold">
                가장 빠른 출국 가능일: {formatKoreanDate(feasibility.earliestFromToday)}
              </div>
            )}
            <p className="mt-1 text-sm leading-relaxed">
              {feasibility.message}
            </p>
          </div>
        )}
      </section>

      {/* Step 02 — 요구사항 */}
      {dest && (
        <section className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                STEP 02 · 요구사항
              </span>
              <span className="font-serif text-base font-bold text-foreground">
                {dest.country_name_ko}
              </span>
              <span className="text-xs text-muted-foreground">
                · {dest.country_name_en}
              </span>
            </div>
            {dest.service_level === "advisory_only" && (
              <span className="inline-flex items-center rounded-full bg-warning-muted px-2.5 py-1 text-[11px] font-bold text-warning-foreground">
                안내만 가능
              </span>
            )}
          </div>

          {dest.service_level === "advisory_only" ? (
            <AdvisoryOnlyBlock destination={dest} />
          ) : (
            <QuarantineRequirements destination={dest} />
          )}
        </section>
      )}

      {/* Step 03 — 준비 일정 */}
      {dest && dest.service_level === "full" && dest.default_steps.length > 0 && (
        <section className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
              STEP 03 · 준비 일정
            </span>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            오늘({formatKoreanDate(today)}) 시작 기준으로 계산한 최소 일정이에요.
            이미 완료된 항목이 있다면 병원과 상의해 조정해 주세요.
          </p>
          <QuarantineTimeline
            steps={dest.default_steps}
            earliestDeparture={dest.earliest_departure_from_today}
            targetDate={targetDate || null}
          />
        </section>
      )}

      {/* 안내 문구 */}
      <div className="rounded-xl border border-border bg-muted/40 p-4 text-xs leading-relaxed text-muted-foreground">
        <strong className="text-foreground">📌 참고</strong> — 이 화면은 준비 일정을 미리 가늠하기 위한 안내이며, 실제 검역증명서 발급은 병원 진료를 통해 진행됩니다. 국가별 요구사항은 수시로 변경될 수 있으니 출국 4~6주 전 다시 확인해 주세요.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Advisory Only 국가용 별도 블록 (호주·뉴질랜드·미국/캐나다 상업)
// ─────────────────────────────────────────────────────────────
function AdvisoryOnlyBlock({ destination: d }: { destination: Destination }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-warning/30 bg-warning-muted p-4 text-sm leading-relaxed text-warning-foreground">
        <strong>이 나라는 요구사항이 복잡해 개별 안내가 필요해요.</strong>
        <br />
        준비 기간이 6개월 이상 걸리거나 특수 서류가 필요한 경우가 많아, 병원과 함께 일정을 세우시는 것을 권해드려요.
      </div>

      {d.notes && (
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-primary">
            📌 참고 사항
          </div>
          <p className="m-0 text-sm leading-relaxed text-foreground/85">
            {d.notes}
          </p>
        </div>
      )}

      {d.source && (
        <div className="text-[11px] text-muted-foreground">
          근거: <span className="font-semibold">{d.source}</span>
        </div>
      )}
    </div>
  );
}
