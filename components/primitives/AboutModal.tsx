// components/primitives/AboutModal.tsx
// ─────────────────────────────────────────────────────────────
// 평가 도구 안내 모달 — 여러 탭으로 나누어 배경/근거를 설명합니다.
// 탭 데이터를 props로 받아 어떤 도구에도 붙일 수 있는 범용 컴포넌트.
// ─────────────────────────────────────────────────────────────

"use client";

import { useEffect, useState } from "react";

export interface AboutTabData {
  id: string;
  label: string;
  sections: {
    heading: string;
    body: string;
    list?: string[];
  }[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  tabs: AboutTabData[];
  /** 처음 열 때 활성화할 탭 id */
  initialTabId?: string;
}

export function AboutModal({
  open,
  onClose,
  title = "이 평가에 대해",
  tabs,
  initialTabId,
}: Props) {
  const [activeId, setActiveId] = useState<string>(
    initialTabId ?? tabs[0]?.id ?? ""
  );

  useEffect(() => {
    if (open && initialTabId) setActiveId(initialTabId);
  }, [open, initialTabId]);

  // ESC 닫기
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    // 배경 스크롤 잠금
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4 py-8 print:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2
            id="about-modal-title"
            className="font-serif text-xl font-bold text-foreground m-0"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-muted-foreground transition hover:bg-muted"
            aria-label="닫기"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 탭 */}
        <div
          role="tablist"
          className="flex gap-1 border-b border-border bg-muted/50 px-4 py-2"
        >
          {tabs.map((t) => {
            const active = t.id === activeTab.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setActiveId(t.id)}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* 내용 */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {activeTab.sections.map((s, i) => (
            <section key={i} className="mb-6 last:mb-0">
              {s.heading && (
                <h3 className="font-serif text-base font-bold text-foreground mt-0 mb-2">
                  {s.heading}
                </h3>
              )}
              {s.body && (
                <p className="text-sm leading-relaxed text-foreground/85 m-0">
                  {s.body}
                </p>
              )}
              {s.list && s.list.length > 0 && (
                <ul className="mt-3 space-y-1.5 pl-0 list-none">
                  {s.list.map((li, j) => (
                    <li
                      key={j}
                      className="relative pl-5 text-sm leading-relaxed text-foreground/85"
                    >
                      <span
                        className="absolute left-1 top-2 h-1.5 w-1.5 rounded-full bg-primary"
                        aria-hidden
                      />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
