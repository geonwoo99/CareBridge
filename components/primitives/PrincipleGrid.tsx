// components/primitives/PrincipleGrid.tsx
// ─────────────────────────────────────────────────────────────
// 두문자어 원칙 그리드 — 각 원칙의 앞글자를 크게, 아래에 이름과 설명을 표시.
// CCATS·SAFER·ABCDE 같은 임상 두문자어 안내에 두루 쓸 수 있습니다.
// ─────────────────────────────────────────────────────────────

"use client";

export interface Principle {
  letter: string;   // "C"
  wordEn: string;   // "Confinement"
  wordKo: string;   // "격리"
  body: string;
  tag?: string;
}

interface Props {
  principles: Principle[];
  /** 그리드 상단 타이틀(예: "CCATS — 치료의 다섯 기둥"). */
  title?: string;
}

export function PrincipleGrid({ principles, title }: Props) {
  return (
    <div className="not-prose my-6">
      {title && (
        <div className="mb-4 font-serif text-lg font-bold text-foreground">
          {title}
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {principles.map((p, i) => (
          <div
            key={i}
            className="flex flex-col rounded-2xl border border-border bg-background p-4 shadow-sm"
          >
            <div className="mb-3 flex items-baseline gap-2">
              <span className="font-serif text-4xl font-extrabold text-primary leading-none">
                {p.letter}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {p.wordEn}
              </span>
            </div>
            <div className="font-serif text-base font-bold text-foreground">
              {p.wordKo}
            </div>
            <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
              {p.body}
            </p>
            {p.tag && (
              <div className="mt-3 inline-flex w-fit items-center rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-primary">
                {p.tag}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
