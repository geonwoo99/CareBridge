// components/interactive/FeedingTubeBlocks.tsx
// ─────────────────────────────────────────────────────────────
// feeding-tube.mdx 전용 프리셋 래퍼.
// content/data/feeding-tube.ts의 값을 컴포넌트에 주입해
// MDX에서 인자 없이 바로 쓸 수 있게 합니다.
// ─────────────────────────────────────────────────────────────

"use client";

import {
  FEEDING_TIPS,
  FEEDING_RED_FLAGS,
} from "@/content/data/feeding-tube";

/** TIP 01 ~ TIP 04 카드 그리드 */
export function FeedingTubeTips() {
  return (
    <div className="not-prose my-6 grid gap-4 sm:grid-cols-2">
      {FEEDING_TIPS.map((tip) => (
        <div
          key={tip.id}
          className="rounded-2xl border border-border bg-background p-5 shadow-sm"
        >
          <span className="inline-flex items-center rounded-full bg-warning-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-warning-foreground">
            {tip.number}
          </span>
          <h3 className="mt-2 font-serif text-base font-bold text-foreground m-0">
            {tip.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85 m-0">
            {tip.body}
          </p>
          <ul className="mt-3 flex flex-col gap-1.5 pl-0 list-none">
            {tip.bullets.map((b, i) => (
              <li
                key={i}
                className="relative pl-4 text-xs leading-relaxed text-muted-foreground"
              >
                <span
                  className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full bg-primary"
                  aria-hidden
                />
                {b}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** 응급 신호 3가지 카드 */
export function FeedingTubeRedFlags() {
  return (
    <div className="mt-3 grid gap-3 sm:grid-cols-3">
      {FEEDING_RED_FLAGS.map((f) => (
        <div
          key={f.id}
          className="rounded-lg border border-danger/20 bg-background p-3"
        >
          <div className="text-sm font-bold text-foreground">{f.title}</div>
          <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {f.body}
          </div>
        </div>
      ))}
    </div>
  );
}
