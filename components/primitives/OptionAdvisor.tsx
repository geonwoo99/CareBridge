// components/primitives/OptionAdvisor.tsx
// ─────────────────────────────────────────────────────────────
// 사용자가 선택한 옵션(탭)에 따라 해당 행동 지침이나 안내를
// 직관적으로 전환하여 보여주는 범용 리팩터링 컴포넌트입니다.
// 특정 수치, 병원 정보, 내용이 컴포넌트 안에 하드코딩되지 않고
// 전부 props로 주입받아 작동하는 단일 신뢰 원천 구조입니다.
// ─────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";

type OptionItem = {
  label: string;
  sublabel?: string;
  body: React.ReactNode;
};

type OptionAdvisorProps = {
  title?: string;
  items: OptionItem[];
};

export function OptionAdvisor({ title = "상태별 맞춤 행동 요령", items }: OptionAdvisorProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const activeItem = items[activeIndex];

  // 아이템 개수에 맞춘 grid column 클래스 계산 (최대 4개)
  const gridCols = items.length === 2 ? "grid-cols-2" : items.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4";

  return (
    <div className="my-6 rounded-lg border border-border bg-background p-5 shadow-sm print:hidden">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>

      {/* 동적 탭 컨트롤 */}
      <div className={`grid gap-2 mb-4 ${gridCols}`}>
        {items.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`rounded-lg border p-3 text-sm font-bold transition flex flex-col items-center justify-center gap-1 ${
                isActive
                  ? "border-primary bg-accent text-primary"
                  : "hover:bg-muted"
              }`}
            >
              <span>{item.label}</span>
              {item.sublabel && (
                <span className="text-[10px] font-normal text-muted-foreground">
                  {item.sublabel}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 안내 지침 본문 */}
      <div className="rounded-lg bg-muted/30 p-4 border text-sm leading-relaxed transition-all">
        {activeItem.body}
      </div>
    </div>
  );
}
