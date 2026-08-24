// components/interactive/CibdaiLanding.tsx
// ─────────────────────────────────────────────────────────────
// CIBDAI/CCECAI 평가 도구의 랜딩 화면.
// 사용자가 두 도구 중 하나를 선택하고 "평가 시작하기"를 누르면
// 부모 컴포넌트에 선택된 slug를 전달합니다.
// ─────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";
import { CIBDAI_TOOL, CCECAI_TOOL } from "@/content/data/cibdai";
import type { AboutTabData } from "@/components/primitives/AboutModal";

interface Props {
  onStart: (slug: "cibdai" | "ccecai") => void;
  onOpenAbout: (initialTabId?: string) => void;
  aboutTabs: AboutTabData[];
}

export function CibdaiLanding({ onStart, onOpenAbout, aboutTabs }: Props) {
  const [selected, setSelected] = useState<"cibdai" | "ccecai">("cibdai");

  const tools = [
    { tool: CIBDAI_TOOL, badge: "기본 · 추천", hint: "집에서 관찰만으로 답할 수 있어요. 활기·식욕·구토·변상태·배변횟수·체중 6가지를 평가합니다. 총 0–18점" },
    { tool: CCECAI_TOOL, badge: "혈액 검사 결과가 있을 때", hint: "CIBDAI에 알부민·복수·가려움 3가지를 더해 보다 정밀하게 평가합니다. 총 0–27점" },
  ];

  return (
    <div className="not-prose flex flex-col gap-8">
      {/* 브랜드 배지 + 제목 */}
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">
          <span aria-hidden>🌿</span> 오늘 동물병원 · 보호자용 평가표
        </span>
        <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight tracking-tight text-foreground">
          우리 강아지의{" "}
          <span className="relative inline-block">
            <span className="relative z-10">장 건강</span>
            <span
              className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-accent"
              aria-hidden
            />
          </span>
          ,<br />
          오늘은 어땠나요?
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          만성 소화기 증상을 앓는 아이의 상태를 객관적인 점수로 정리해 드립니다. 답변에는 약{" "}
          <strong className="text-foreground">2분</strong> 정도 소요됩니다. 결과는 진료 기록으로 저장되며, 다음 평가와 비교하여 치료가 잘 되고 있는지 한눈에 확인하실 수 있습니다.
        </p>
      </div>

      {/* 도구 선택 카드 */}
      <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
        <div className="mb-4 flex items-baseline justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-foreground">평가 방식 선택</span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              CHOOSE ONE
            </span>
          </div>
          <button
            type="button"
            onClick={() => onOpenAbout("scoring")}
            className="text-xs font-semibold text-primary hover:underline"
          >
            CIBDAI · CCECAI 차이가 무엇인가요?
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {tools.map(({ tool, badge, hint }) => {
            const isSelected = selected === tool.slug;
            return (
              <button
                key={tool.slug}
                type="button"
                onClick={() => setSelected(tool.slug as "cibdai" | "ccecai")}
                aria-pressed={isSelected}
                className={`flex flex-col rounded-xl border p-5 text-left transition ${
                  isSelected
                    ? "border-primary bg-accent shadow-sm"
                    : "border-border bg-muted/30 hover:border-primary/40"
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {badge}
                </span>
                <span
                  className={`mt-1 font-serif text-lg font-bold ${
                    isSelected ? "text-primary" : "text-foreground"
                  }`}
                >
                  {tool.title}
                </span>
                <span className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {hint}
                </span>
              </button>
            );
          })}
        </div>

        {/* 안내 체크리스트 */}
        <ul className="mt-6 flex flex-col gap-2 text-sm text-foreground/80">
          {[
            "각 항목은 지난 일주일의 모습을 떠올리며 답해 주세요.",
            "완료 즉시 결과가 브라우저에 저장되어 다음 평가와 비교됩니다.",
            "완료 후 진료팀과 결과를 공유하실 수 있습니다.",
          ].map((li, i) => (
            <li key={i} className="flex items-start gap-2">
              <span
                className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                aria-hidden
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              </span>
              <span>{li}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          type="button"
          onClick={() => onStart(selected)}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-bold text-background transition hover:bg-foreground/90"
        >
          평가 시작하기
          <span aria-hidden>→</span>
        </button>
      </div>

      {/* 안내 카드 3개 (모달 열기 트리거) */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { id: "diagnosis", label: "진단", tag: "알아보기", desc: "만성 장병증(CIE)이 어떻게 진단되는지" },
          { id: "treatment", label: "치료", tag: "알아보기", desc: "식이 시험부터 면역 조절까지 단계별로" },
          { id: "scoring", label: "모니터링", tag: "알아보기", desc: "점수 변화로 치료 반응을 평가하는 법" },
        ].map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onOpenAbout(c.id)}
            className="rounded-xl border border-border bg-background p-4 text-left shadow-sm transition hover:border-primary/40"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {c.tag}
            </span>
            <div className="mt-1 font-serif text-base font-bold text-foreground">
              {c.label}
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {c.desc}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
