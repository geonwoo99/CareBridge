// components/primitives/ExpandableCards.tsx
// ─────────────────────────────────────────────────────────────
// 항목을 누르면 세부 내용이 부드럽게 펼쳐지는 범용 리스트 카드 컴포넌트입니다.
// 인쇄 시(print)에는 모든 카드가 강제로 펼쳐진 채 렌더링되어 출력물에
// 정보 누락이 발생하지 않도록 설계되었습니다 (print:block 대응).
// ─────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";

type ExpandableItem = {
  title: string;
  summary: string;
  detail: string;
};

export function ExpandableCards({ items }: { items: ExpandableItem[] }) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  function toggle(idx: number) {
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  }

  return (
    <div className="my-6 grid gap-4 sm:grid-cols-2">
      {items.map((item, idx) => {
        const isExpanded = !!expanded[idx];
        return (
          <div
            key={idx}
            onClick={() => toggle(idx)}
            className="flex cursor-pointer flex-col rounded-lg border border-border bg-background p-5 shadow-sm transition hover:border-primary/50"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-serif text-lg font-bold text-foreground">
                {item.title}
              </span>
              <span className="text-xs text-primary font-bold print:hidden">
                {isExpanded ? "▲ 접기" : "▼ 더보기"}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {item.summary}
            </p>
            {/* 화면: 상태에 따라 토글 / 인쇄: 항상 보임(print:block) */}
            <div
              className={`mt-3 border-t border-border pt-3 text-sm text-foreground/85 leading-relaxed ${
                isExpanded ? "block" : "hidden print:block"
              }`}
            >
              {item.detail}
            </div>
          </div>
        );
      })}
    </div>
  );
}
