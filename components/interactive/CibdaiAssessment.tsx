// components/interactive/CibdaiAssessment.tsx
// ─────────────────────────────────────────────────────────────
// CIBDAI / CCECAI 평가 도구 컨테이너.
// 3단계 뷰(landing → assessment → result)를 상태로 관리하며,
// 범용 컴포넌트(AssessmentForm, AboutModal, ScoreDial)와
// 데이터(content/data/cibdai.ts)를 조합합니다.
// ─────────────────────────────────────────────────────────────

"use client";

import { useMemo, useState } from "react";
import { CIBDAI_ABOUT_TABS } from "@/content/data/cibdai";
import { getTool } from "@/lib/cibdai";
import {
  totalScore,
  findSeverity,
  progressRatio,
} from "@/lib/assessment";
import { saveRecord, type AssessmentRecord } from "@/lib/storage";
import { AssessmentForm } from "@/components/primitives/AssessmentForm";
import { AboutModal } from "@/components/primitives/AboutModal";
import { CibdaiLanding } from "./CibdaiLanding";
import { CibdaiResult } from "./CibdaiResult";

type View = "landing" | "assessment" | "result";
type Slug = "cibdai" | "ccecai";

export function CibdaiAssessment() {
  const [view, setView] = useState<View>("landing");
  const [slug, setSlug] = useState<Slug>("cibdai");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [petName, setPetName] = useState<string>("");
  const [petCode, setPetCode] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [savedRecord, setSavedRecord] = useState<AssessmentRecord | null>(null);

  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutTabId, setAboutTabId] = useState<string>("scoring");

  const tool = useMemo(() => getTool(slug), [slug]);
  const progress = progressRatio(tool.items, answers);
  const answered = tool.items.every((it) => it.id in answers);

  function handleStart(chosen: Slug) {
    setSlug(chosen);
    setAnswers({});
    setSavedRecord(null);
    setView("assessment");
  }

  function handleAnswer(itemId: string, score: number) {
    setAnswers((prev) => ({ ...prev, [itemId]: score }));
  }

  function handleSwitchTool(next: Slug) {
    setSlug(next);
    // 답변은 공통 문항만 유지되므로 이전 응답을 그대로 두어도 안전
  }

  function handleSubmit() {
    if (!answered) return;
    const score = totalScore(tool.items, answers);
    const severity = findSeverity(tool.severityBands, score);
    const rec = saveRecord({
      toolSlug: tool.slug,
      totalScore: score,
      maxScore: tool.maxScore,
      severityLabel: severity?.label ?? "미분류",
      answers,
      petName: petName || undefined,
      petCode: petCode || undefined,
      note: note || undefined,
    });
    setSavedRecord(rec);
    setView("result");
    // 결과 뷰 상단으로 스크롤
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleRestart() {
    setAnswers({});
    setSavedRecord(null);
    setNote("");
    setView("landing");
  }

  function openAbout(tabId?: string) {
    if (tabId) setAboutTabId(tabId);
    setAboutOpen(true);
  }

  return (
    <div className="not-prose">
      {/* 상단 진행 헤더 (평가 진행 중일 때만) */}
      {view === "assessment" && (
        <div className="sticky top-0 z-10 -mx-4 mb-6 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-bold text-foreground">
              {Object.keys(answers).length} / {tool.items.length} 항목 · {tool.title.split(" · ")[0]}
            </span>
            <span className="font-bold text-primary">
              {Math.round(progress * 100)}%
            </span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-[width]"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handleRestart}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              ← 처음으로
            </button>
            <button
              type="button"
              onClick={() => openAbout("scoring")}
              className="text-xs font-semibold text-primary hover:underline"
            >
              평가 안내
            </button>
          </div>
        </div>
      )}

      {view === "landing" && (
        <CibdaiLanding
          onStart={handleStart}
          onOpenAbout={openAbout}
          aboutTabs={CIBDAI_ABOUT_TABS}
        />
      )}

      {view === "assessment" && (
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              {tool.subtitle}
            </span>
            <h2 className="mt-1 font-serif text-2xl font-bold text-foreground">
              {tool.title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              각 항목에서 가장 가까운 보기를 선택해 주세요.
            </p>
          </div>

          {/* CIBDAI ↔ CCECAI 전환 */}
          <button
            type="button"
            onClick={() => handleSwitchTool(slug === "cibdai" ? "ccecai" : "cibdai")}
            className="self-start rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-primary transition hover:border-primary/40"
          >
            {slug === "cibdai"
              ? "혈액검사 결과가 있습니다 → CCECAI"
              : "기본 평가로 돌아가기 → CIBDAI"}
          </button>

          <AssessmentForm
            items={tool.items}
            answers={answers}
            onChange={handleAnswer}
          />

          {/* 메모 + 식별 정보 (선택) */}
          <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
            <div className="mb-4">
              <span className="font-serif text-base font-bold text-foreground">
                의료진에게 전할 말 (선택)
              </span>
              <p className="mt-1 text-xs text-muted-foreground">
                최근에 새로 시작한 약, 사료 변경, 특이 증상이 있다면 적어 주세요.
              </p>
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder=""
            />

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground">
                  강아지 이름 (선택)
                </span>
                <input
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="예) 두부"
                  className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-muted-foreground">
                  기록 코드 (선택)
                </span>
                <input
                  value={petCode}
                  onChange={(e) => setPetCode(e.target.value)}
                  placeholder="예) 1234 (생일 등 기억하기 쉬운 숫자)"
                  className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </label>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              입력하신 이름과 숫자는 기록을 간단히 구분하기 위한 용도이며, 비밀번호가 아닙니다.
            </p>
          </div>

          {/* 제출 */}
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!answered}
              className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-bold text-background transition hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              결과 확인하기
              <span aria-hidden>→</span>
            </button>
            {!answered && (
              <span className="text-xs text-muted-foreground">
                {tool.items.length - Object.keys(answers).length}개 문항이 남아 있습니다
              </span>
            )}
          </div>
        </div>
      )}

      {view === "result" && (
        <CibdaiResult
          tool={tool}
          answers={answers}
          petName={petName}
          petCode={petCode}
          savedRecord={savedRecord}
          onRestart={handleRestart}
          onOpenAbout={openAbout}
        />
      )}

      <AboutModal
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        tabs={CIBDAI_ABOUT_TABS}
        initialTabId={aboutTabId}
      />
    </div>
  );
}
