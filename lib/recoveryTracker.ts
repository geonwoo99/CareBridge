// lib/recoveryTracker.ts
// ─────────────────────────────────────────────────────────────
// 회복 트래커 로직 — 수술(또는 치료 시작)일로부터 며칠이 지났는지,
// 어느 회복 단계에 있는지를 계산하는 순수 함수 모듈.
//
// 데이터(단계 정의·색·기간)는 content/data/*.ts 또는 컴포넌트 props로 주입.
// (규칙: .agents/rules/10-content-vs-code.md)
// ─────────────────────────────────────────────────────────────

export interface RecoveryStage {
  id: string;
  label: string;      // "당일", "초기 회복" 등
  /** 해당 단계의 시작 일차(0 = 수술 당일). */
  fromDay: number;
  /** 해당 단계의 끝 일차(포함). null이면 이후 계속 */
  toDay: number | null;
  description?: string;
}

/** 두 날짜 사이의 일수 차이(자정 기준). 오늘 = 0일차. */
export function daysBetween(fromISO: string, todayISO: string): number | null {
  if (!fromISO) return null;
  const from = new Date(fromISO + "T00:00:00");
  const today = new Date(todayISO + "T00:00:00");
  if (isNaN(from.getTime()) || isNaN(today.getTime())) return null;
  const ms = today.getTime() - from.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

/** 오늘 날짜를 YYYY-MM-DD로 반환 (로컬 타임존). */
export function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/** 일차 → 해당 단계 찾기. */
export function findStage(
  day: number | null,
  stages: RecoveryStage[]
): RecoveryStage | null {
  if (day == null) return null;
  return (
    stages.find(
      (s) =>
        day >= s.fromDay && (s.toDay == null || day <= s.toDay)
    ) ?? null
  );
}
