// components/interactive/SRRCalculator.tsx
// ─────────────────────────────────────────────────────────────
// 보호자가 잠든 반려동물의 호흡수를 15초(또는 10초) 동안 탭하여
// 1분당 호흡수(SRR)를 자동으로 계산하고 진단해주는 인터랙티브 도구입니다.
// ─────────────────────────────────────────────────────────────

"use client";

import { useState, useEffect } from "react";

type Mode = 15 | 10;

export function SRRCalculator() {
  const [mode, setMode] = useState<Mode>(15);
  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(mode);
  const [count, setCount] = useState(0);

  const multiplier = mode === 15 ? 4 : 6;
  const calculatedSRR = count * multiplier;

  // 타이머 실행 루프
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);

  function start() {
    setCount(0);
    setSecondsLeft(mode);
    setIsActive(true);
  }

  function handleTap() {
    if (isActive) {
      setCount((prev) => prev + 1);
    }
  }

  // 모드 전환 시 초기화
  function changeMode(m: Mode) {
    setMode(m);
    setIsActive(false);
    setSecondsLeft(m);
    setCount(0);
  }

  return (
    <div className="my-6 rounded-lg border border-border bg-background p-6 shadow-sm print:hidden">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-primary font-serif">🕒 실시간 호흡수 계산기</span>
        {/* 측정 모드 토글 */}
        <div className="inline-flex rounded-lg border p-0.5 text-xs">
          <button
            type="button"
            onClick={() => changeMode(15)}
            className={`rounded px-2.5 py-1 ${mode === 15 ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground"}`}
          >
            15초 측정 (×4)
          </button>
          <button
            type="button"
            onClick={() => changeMode(10)}
            className={`rounded px-2.5 py-1 ${mode === 10 ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground"}`}
          >
            10초 측정 (×6)
          </button>
        </div>
      </div>

      <div className="grid gap-4 text-center sm:grid-cols-2">
        {/* 측정 콘트롤 영역 */}
        <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/40 p-4">
          <span className="text-xs text-muted-foreground">남은 시간</span>
          <span className="my-1 font-serif text-3xl font-extrabold text-foreground">
            {secondsLeft}초
          </span>

          {isActive ? (
            <button
              type="button"
              onClick={handleTap}
              className="mt-3 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition active:scale-95 animate-pulse"
            >
              <div className="text-center">
                <span className="block text-xl font-bold">{count}회</span>
                <span className="text-[10px] opacity-80">숨쉴때마다 클릭</span>
              </div>
            </button>
          ) : (
            <button
              type="button"
              onClick={start}
              className="mt-3 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow transition hover:bg-primary/95 active:scale-95"
            >
              측정 시작하기
            </button>
          )}
        </div>

        {/* 결과값 및 안전 지표 영역 */}
        <div className="flex flex-col items-center justify-center rounded-lg border bg-muted/40 p-4">
          <span className="text-xs text-muted-foreground">자동 계산된 결과</span>
          <div className="my-2">
            <span className="font-serif text-4xl font-extrabold text-primary">
              {calculatedSRR}
            </span>
            <span className="text-sm text-muted-foreground ml-1">회/분 (SRR)</span>
          </div>

          {/* 정상/주의 상태 배지 */}
          {secondsLeft === 0 && count > 0 ? (
            calculatedSRR >= 30 ? (
              <span className="rounded bg-red-100 px-3 py-1 text-xs font-bold text-red-800 animate-bounce">
                🚨 주의: 30회 이상 (폐수종 위험)
              </span>
            ) : (
              <span className="rounded bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                🌿 정상: 30회 미만 (안정)
              </span>
            )
          ) : (
            <span className="text-xs text-muted-foreground">
              {isActive ? "가슴의 움직임에 맞춰 버튼을 계속 눌러주세요" : "측정을 완료하면 안전 판정이 나타납니다"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
