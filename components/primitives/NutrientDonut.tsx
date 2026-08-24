// components/primitives/NutrientDonut.tsx
// ─────────────────────────────────────────────────────────────
// SVG 도넛 차트 — 영양성분 세그먼트를 시각화.
// 어떤 데이터든 label + percent + color 만 있으면 재사용 가능.
// ─────────────────────────────────────────────────────────────

"use client";

export interface DonutSegment {
  key: string;
  label: string;
  percent: number;
  color: string;
}

interface Props {
  segments: DonutSegment[];
  /** 도넛 중앙 상단에 표시할 큰 값 (예: "397 kcal"). */
  centerValue?: string;
  /** 중앙 하단에 표시할 라벨 (예: "/ 100g"). */
  centerLabel?: string;
  size?: number;
}

export function NutrientDonut({
  segments,
  centerValue,
  centerLabel,
  size = 220,
}: Props) {
  const stroke = 40;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;

  const total = segments.reduce((a, s) => a + s.percent, 0);
  let acc = 0;

  return (
    <div className="not-prose flex flex-col items-center gap-4 sm:flex-row sm:items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="영양 분석 도넛 차트"
      >
        {/* 배경 링 */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={stroke}
        />
        {/* 세그먼트 */}
        {segments.map((s, i) => {
          const frac = total > 0 ? s.percent / total : 0;
          const dashArray = `${frac * circumference} ${circumference}`;
          const dashOffset = -acc * circumference;
          acc += frac;
          return (
            <circle
              key={s.key}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          );
        })}
        {/* 중앙 값 */}
        {centerValue && (
          <text
            x={cx}
            y={cy - 4}
            textAnchor="middle"
            fontFamily="serif"
            fontSize={size * 0.14}
            fontWeight={800}
            fill="hsl(var(--foreground))"
          >
            {centerValue}
          </text>
        )}
        {centerLabel && (
          <text
            x={cx}
            y={cy + size * 0.09}
            textAnchor="middle"
            fontSize={12}
            fill="hsl(var(--muted-foreground))"
          >
            {centerLabel}
          </text>
        )}
      </svg>

      {/* 범례 */}
      <ul className="flex w-full flex-col gap-2 pl-0 list-none sm:min-w-40">
        {segments.map((s) => (
          <li
            key={s.key}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: s.color }}
                aria-hidden
              />
              <span className="font-semibold text-foreground">{s.label}</span>
            </span>
            <span className="font-mono text-sm text-muted-foreground">
              {s.percent.toFixed(2)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
