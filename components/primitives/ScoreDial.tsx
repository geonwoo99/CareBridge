// components/primitives/ScoreDial.tsx
// ─────────────────────────────────────────────────────────────
// 원형 점수 다이얼 — 점수/만점을 반원 프로그레스로 시각화.
// 어떤 평가 도구에서도 재사용 가능하도록 값과 색만 props로 받습니다.
// (규칙: 20-design-tokens.md — 색은 CSS 변수/유틸만 사용)
// ─────────────────────────────────────────────────────────────

"use client";

interface Props {
  score: number;
  maxScore: number;
  severityLabel?: string;
  /** 표시할 caption(예: "심각도" or "총점") */
  caption?: string;
  size?: number;
}

export function ScoreDial({
  score,
  maxScore,
  severityLabel,
  caption = "총점",
  size = 200,
}: Props) {
  const ratio = maxScore > 0 ? Math.min(1, Math.max(0, score / maxScore)) : 0;
  const strokeWidth = 14;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - ratio);

  return (
    <div className="not-prose flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`점수 ${score} / ${maxScore}`}
      >
        {/* 배경 링 */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />
        {/* 진행 링 */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: "stroke-dashoffset 400ms ease" }}
        />
        {/* 중앙 텍스트 */}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fontFamily="serif"
          fontSize={size * 0.28}
          fontWeight={800}
          fill="hsl(var(--foreground))"
        >
          {score}
        </text>
        <text
          x={cx}
          y={cy + size * 0.14}
          textAnchor="middle"
          fontSize={12}
          fill="hsl(var(--muted-foreground))"
        >
          / {maxScore}점
        </text>
      </svg>
      {severityLabel && (
        <div className="mt-1 text-xs font-bold uppercase tracking-wider text-primary">
          {severityLabel}
        </div>
      )}
      {caption && (
        <div className="text-[11px] text-muted-foreground">{caption}</div>
      )}
    </div>
  );
}
