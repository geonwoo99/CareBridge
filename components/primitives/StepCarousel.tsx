// components/primitives/StepCarousel.tsx
// ─────────────────────────────────────────────────────────────
// 순서 있는 스텝을 좌우 화살표로 넘기는 캐러셀.
// 사용법 안내(1/N ~ N/N) 같은 순차적 시각화에 재사용 가능한 범용 컴포넌트.
// ─────────────────────────────────────────────────────────────

"use client";

import { useState, type ReactNode } from "react";

export interface CarouselStep {
  n: number;
  title: string;
  /** 본문. 마크다운의 **볼드**를 지원 */
  body: string;
  /** 이미지 소스 경로 (예: /media/inhaler/step-1.png). 없으면 placeholder 표시 */
  image?: string;
  imageAlt?: string;
}

interface Props {
  steps: CarouselStep[];
  /** 하단 공통 팁(전 스텝에 걸쳐 노출) */
  footerTip?: string;
  /** 캐러셀 우측 상단에 추가 렌더링할 요소 (예: 종 토글) */
  headerRight?: ReactNode;
}

/** **bold** 를 <strong> 으로 변환 */
function renderBold(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="text-foreground">
        {p.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

export function StepCarousel({ steps, footerTip, headerRight }: Props) {
  const [idx, setIdx] = useState(0);
  const step = steps[idx];
  const isLast = idx === steps.length - 1;
  const isFirst = idx === 0;

  return (
    <div className="not-prose my-6 rounded-2xl border border-border bg-background p-6 shadow-sm">
      {headerRight && (
        <div className="mb-4 flex justify-end">{headerRight}</div>
      )}

      <div className="grid gap-6 sm:grid-cols-[220px_1fr] sm:items-center">
        {/* 이미지 영역 */}
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
          {step.image ? (
            // 실제 환경에서는 next/image의 <Figure> 사용을 권장하지만,
            // 이 컴포넌트는 순수 이미지 표시만 담당합니다.
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={step.image}
              alt={step.imageAlt ?? step.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-center text-xs leading-relaxed text-muted-foreground">
              <div>
                <div className="text-3xl">🖼️</div>
                <div className="mt-2">
                  일러스트 자리
                  <br />
                  <code className="text-[10px]">
                    public/media/…/step-{step.n}.png
                  </code>
                </div>
              </div>
            </div>
          )}
          <div className="absolute bottom-2 left-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
            {step.n}
          </div>
        </div>

        {/* 텍스트 영역 */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            STEP {step.n} / {steps.length}
          </div>
          <h3 className="mt-2 font-serif text-xl font-bold text-foreground m-0">
            {step.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-foreground/85 m-0">
            {renderBold(step.body)}
          </p>
        </div>
      </div>

      {/* 컨트롤 */}
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={isFirst}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-40"
        >
          이전
        </button>
        <div className="flex gap-2" aria-hidden>
          {steps.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === idx ? "w-6 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIdx((i) => (isLast ? 0 : Math.min(steps.length - 1, i + 1)))}
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-bold text-background transition hover:opacity-90"
        >
          {isLast ? "처음부터" : "다음"}
        </button>
      </div>

      {footerTip && (
        <div className="mt-4 rounded-lg border border-warning/30 bg-warning-muted p-3 text-xs leading-relaxed text-warning-foreground">
          {renderBold(footerTip)}
        </div>
      )}
    </div>
  );
}
