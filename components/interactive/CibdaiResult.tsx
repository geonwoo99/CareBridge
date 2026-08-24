// components/interactive/CibdaiResult.tsx
// ─────────────────────────────────────────────────────────────
// CIBDAI/CCECAI 평가 결과 화면. 총점 · 심각도 · 문항별 답변 · 다음 단계.
// ─────────────────────────────────────────────────────────────

"use client";

import { useMemo } from "react";
import { ScoreDial } from "@/components/primitives/ScoreDial";
import {
  totalScore,
  findSeverity,
  classifyResponse,
  type AssessmentTool,
} from "@/lib/assessment";
import { loadForPet, type AssessmentRecord } from "@/lib/storage";

interface Props {
  tool: AssessmentTool;
  answers: Record<string, number>;
  petName?: string;
  petCode?: string;
  savedRecord?: AssessmentRecord | null;
  onRestart: () => void;
  onOpenAbout: (initialTabId?: string) => void;
}

export function CibdaiResult({
  tool,
  answers,
  petName,
  petCode,
  savedRecord,
  onRestart,
  onOpenAbout,
}: Props) {
  const score = totalScore(tool.items, answers);
  const severity = findSeverity(tool.severityBands, score);

  // 과거 기록과 비교
  const history = useMemo(() => {
    const records = loadForPet(tool.slug, petName, petCode);
    // 현재 기록 이전의 것들만
    return savedRecord
      ? records.filter((r) => r.id !== savedRecord.id)
      : records;
  }, [savedRecord, tool.slug, petName, petCode]);

  const previous = history.length > 0 ? history[history.length - 1] : null;
  const response = previous
    ? classifyResponse(previous.totalScore, score)
    : null;
  const responseLabels: Record<string, { label: string; tone: string }> = {
    complete: { label: "완전 관해", tone: "text-primary" },
    partial: { label: "부분 반응", tone: "text-warning-foreground" },
    none: { label: "무반응", tone: "text-danger-foreground" },
  };

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="not-prose flex flex-col gap-6">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          평가 결과 · {today}
        </span>
        <h2 className="mt-2 font-serif text-2xl font-extrabold text-foreground">
          {severity?.headline ?? "결과"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {severity?.description}
        </p>
      </div>

      {/* 점수 + 심각도 밴드 */}
      <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
          <ScoreDial
            score={score}
            maxScore={tool.maxScore}
            severityLabel={severity?.label}
            caption={`총점 ${score}점 / ${tool.maxScore}점 만점`}
          />
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {tool.severityBands.map((b) => {
                const active = b.id === severity?.id;
                const range =
                  b.toScore == null
                    ? `≥ ${b.fromScore}`
                    : b.fromScore === b.toScore
                    ? `${b.fromScore}`
                    : `${b.fromScore}–${b.toScore}`;
                return (
                  <div
                    key={b.id}
                    className={`rounded-lg border p-2 text-center transition ${
                      active
                        ? "border-primary bg-accent shadow-sm"
                        : "border-border bg-muted/30"
                    }`}
                  >
                    <div
                      className={`text-xs font-bold ${
                        active ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {b.label}
                    </div>
                    <div className="text-[11px] text-muted-foreground">
                      {range}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 과거 기록과 비교 */}
        <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              📊 {previous ? "이전 평가와 비교" : "첫 평가 기록"}
            </span>
          </div>
          {previous ? (
            <p className="text-sm leading-relaxed text-foreground/85">
              지난 평가({previous.totalScore}점) 대비{" "}
              <strong className={responseLabels[response ?? "none"].tone}>
                {responseLabels[response ?? "none"].label}
              </strong>{" "}
              — 이번 점수는 <strong>{score}점</strong>입니다.
              1~2주 뒤 다시 평가하시면 치료 반응이 계속 추적됩니다.
            </p>
          ) : (
            <p className="text-sm leading-relaxed text-foreground/85">
              이번이 첫 평가입니다. 1~2주 뒤 다시 평가하시면 점수 변화로
              치료 반응을 자동으로 계산해 드립니다.
            </p>
          )}
        </div>
      </div>

      {/* 문항별 답변 */}
      <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span className="font-serif text-base font-bold text-foreground">
            항목별 점수
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            BREAKDOWN
          </span>
        </div>
        <ul className="flex flex-col gap-2 pl-0 list-none">
          {tool.items.map((it) => {
            const score = answers[it.id];
            const chosen = it.options.find((o) => o.score === score);
            return (
              <li
                key={it.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  {it.emoji && <span className="text-lg" aria-hidden>{it.emoji}</span>}
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      {it.category}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {chosen?.label ?? "미응답"}
                    </div>
                  </div>
                </div>
                <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                  {typeof score === "number" ? `${score}점` : "—"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 다음 단계 */}
      <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span className="font-serif text-base font-bold text-foreground">
            지금 시도해볼 수 있는 것
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            NEXT STEP
          </span>
        </div>
        <NextStepBlock severity={severity?.id ?? "normal"} />

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onOpenAbout("diagnosis")}
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition hover:border-primary/40"
          >
            진단에 대해 자세히
          </button>
          <button
            type="button"
            onClick={() => onOpenAbout("treatment")}
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition hover:border-primary/40"
          >
            치료에 대해 자세히
          </button>
        </div>
      </div>

      {/* 다시 시작 */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onRestart}
          className="text-sm font-semibold text-muted-foreground hover:text-foreground hover:underline"
        >
          처음으로 돌아가기
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 심각도별 다음 단계 안내. 데이터/문구는 콘텐츠 성격이라 여기서만 관리
// (일반적인 임상 흐름 안내이며 개별 처방을 대체하지 않음)
// ─────────────────────────────────────────────────────────────
function NextStepBlock({ severity }: { severity: string }) {
  const blocks: Record<string, { title: string; body: string }[]> = {
    normal: [
      { title: "관찰 유지", body: "지금은 특별한 조치가 필요해 보이지 않아요. 평소 식이와 관찰을 유지해 주세요." },
      { title: "1~2주 후 재평가", body: "변화가 놓치지 않도록 다음 주말쯤 다시 평가해 주세요." },
    ],
    mild: [
      { title: "식이 시험 고려", body: "가수분해·신규 단백·저지방 사료 중 하나를 최소 2주 유지하며 점수 변화를 관찰합니다." },
      { title: "1주 후 재평가", body: "증상 흐름을 확인하기 위해 일주일 뒤 다시 평가해 주세요." },
    ],
    moderate: [
      { title: "진료 예약", body: "가까운 시일 내에 진료를 받고 검사·치료 계획을 세워 주세요." },
      { title: "혈액·분변·소변 검사", body: "다른 원인 배제를 위해 기본 검사가 권장됩니다." },
      { title: "식이 시험", body: "동시에 식이 시험을 시작할 수 있습니다." },
    ],
    severe: [
      { title: "빠른 진료 예약", body: "오늘 또는 내일 중 진료 일정을 잡아 주십시오." },
      { title: "혈액·영상 검사", body: "단백 소실(PLE) 확인을 위한 알부민·UPC·초음파를 시행합니다." },
      { title: "내시경 + 조직 검사", body: "다른 원인 배제와 정확한 치료 결정을 위해 권장됩니다." },
      { title: "면역 조절 치료", body: "프레드니솔론 등 약물 치료가 시작될 수 있습니다." },
    ],
    "very-severe": [
      { title: "즉시 진료", body: "매우 중증 상태입니다. 오늘 안에 병원과 연락해 진료 일정을 잡아 주세요." },
      { title: "PLE 대응 검사", body: "알부민·UPC·복부 초음파와 함께 흉·복수 평가가 필요합니다." },
      { title: "정밀 진단 + 면역 억제", body: "내시경·조직 검사 후 저지방 식이와 면역 억제제를 병행할 수 있습니다." },
      { title: "혈전 예방", body: "저알부민 상태에서는 혈전 예방까지 함께 고려됩니다." },
    ],
  };
  const list = blocks[severity] ?? blocks.normal;
  return (
    <ul className="grid gap-3 sm:grid-cols-2 pl-0 list-none">
      {list.map((b, i) => (
        <li
          key={i}
          className="rounded-lg border border-border bg-muted/30 p-3"
        >
          <div className="text-sm font-bold text-foreground">{b.title}</div>
          <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {b.body}
          </div>
        </li>
      ))}
    </ul>
  );
}
