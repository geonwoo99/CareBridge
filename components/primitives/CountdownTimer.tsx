// components/primitives/CountdownTimer.tsx
// ─────────────────────────────────────────────────────────────
// 카운트다운 타이머 — 시작/일시정지/리셋 지원.
// 지속 시간(초)과 라벨을 props로 받아 어떤 대기 안내에서든 재사용.
// (규칙: 20-design-tokens.md — 색은 토큰만)
// ─────────────────────────────────────────────────────────────

"use client";

import { useEffect, useMemo, useState } from "react";

interface Props {
  /** 총 대기 시간(초). 기본 600초(10분) */
  durationSec?: number;
  /** 위 라벨 (예: "10분 소독 타이머") */
  title?: string;
  /** 아래 캡션 (예: "소독제를 분사한 뒤, 정확히 10분간 그대로 두어야 효과가 있습니다.") */
  caption?: string;
}

export function CountdownTimer({
  durationSec = 600,
  title,
  caption,
}: Props) {
  const [remaining, setRemaining] = useState(durationSec);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setRunning(false);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const mmss = useMemo(() => {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }, [remaining]);

  const progress = useMemo(
    () => 1 - remaining / durationSec,
    [remaining, durationSec]
  );

  function start() {
    if (finished) reset();
    setRunning(true);
  }
  function pause() { setRunning(false); }
  function reset() {
    setRunning(false);
    setRemaining(durationSec);
    setFinished(false);
  }

  const status = finished
    ? "완료 · 닦아내도 됩니다"
    : running
    ? "카운트다운 중"
    : remaining < durationSec
    ? "일시정지"
    : "대기 중";

  return (
    <div className="not-prose rounded-2xl border border-border bg-background p-6 shadow-sm print:hidden">
      {title && (
        <div className="mb-3 font-serif text-base font-bold text-foreground">
          {title}
        </div>
      )}
      {caption && (
        <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
          {caption}
        </p>
      )}

      <div className="flex items-center gap-6">
        {/* 원형 진행 표시 */}
        <TimerRing progress={progress} finished={finished} label={mmss} />

        <div className="flex-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            {status}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {!running ? (
              <button
                type="button"
                onClick={start}
                className="inline-flex items-center gap-1.5 rounded-lg bg-warning px-4 py-2 text-sm font-bold text-warning-foreground transition hover:brightness-95"
              >
                {finished ? "다시 시작" : remaining < durationSec ? "이어서" : "시작"}
              </button>
            ) : (
              <button
                type="button"
                onClick={pause}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-bold text-foreground transition hover:border-primary/40"
              >
                일시정지
              </button>
            )}
            <button
              type="button"
              onClick={reset}
              disabled={remaining === durationSec && !finished}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-40"
            >
              리셋
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimerRing({
  progress,
  finished,
  label,
}: {
  progress: number;
  finished: boolean;
  label: string;
}) {
  const size = 120;
  const sw = 10;
  const r = (size - sw) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.min(1, Math.max(0, progress)));

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth={sw}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={finished ? "hsl(var(--primary))" : "hsl(var(--warning))"}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 500ms linear" }}
      />
      <text
        x={size / 2}
        y={size / 2 + 6}
        textAnchor="middle"
        fontFamily="serif"
        fontSize={26}
        fontWeight={800}
        fill="hsl(var(--foreground))"
      >
        {label}
      </text>
    </svg>
  );
}
