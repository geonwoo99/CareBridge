// components/primitives/StatGrid.tsx
// ─────────────────────────────────────────────────────────────
// 수치나 단계별 규칙을 시각적 카드 격자로 보여주는 범용 컴포넌트입니다.
// 모바일에서는 1열, 데스크톱에서는 n열로 반응형 정렬됩니다.
// 큰 텍스트(value)는 제목 서체(명조)로 크게 보여주고 위아래에 정보를 둡니다.
// ─────────────────────────────────────────────────────────────

type StatItem = {
  label: string;
  value: string;
  desc: string;
};

export function StatGrid({ items }: { items: StatItem[] }) {
  return (
    <div className="my-8 grid gap-4 sm:grid-cols-3">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex flex-col rounded-lg border border-border bg-background p-5 text-center shadow-sm transition hover:border-primary/50"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {item.label}
          </span>
          <span className="my-2 font-serif text-3xl font-bold text-primary">
            {item.value}
          </span>
          <span className="text-sm text-foreground/85 leading-relaxed">
            {item.desc}
          </span>
        </div>
      ))}
    </div>
  );
}
