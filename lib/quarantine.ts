// lib/quarantine.ts
// ─────────────────────────────────────────────────────────────
// 해외 출국 검역 도구 로직 — 순수 함수 모듈.
// 국가별 요구사항과 날짜를 받아 준비 단계·최소 출발 가능일을 계산합니다.
// 데이터(국가 목록·요구사항)는 content/data/quarantine/에서 관리.
// (규칙: .agents/rules/10-content-vs-code.md)
//
// 원본 데이터: 오늘동물병원 export_destinations · export_feasibility (QIA 2024 기반).
// 이 프로젝트에서는 UI만 재구성하고, 실제 사용 시 백엔드에서
// 실시간 계산된 값을 받아쓰는 것을 권장합니다.
// ─────────────────────────────────────────────────────────────

/** 서비스 레벨. */
export type ServiceLevel = "full" | "advisory_only";

/** 지역 그룹핑. */
export type Region =
  | "유럽"
  | "미주"
  | "동아시아"
  | "동남아·남아시아"
  | "중동"
  | "기타"
  | "오세아니아";

/** 국가별 요구사항 (원본 스키마와 동일). */
export interface DestinationRequirements {
  requires_rabies_vacc?: boolean;
  rabies_min_doses?: number | null;
  rabies_dose_interval_days?: number | null;
  rabies_recommended?: boolean;
  requires_titer?: boolean;
  titer_min_iu?: number | null;
  titer_wait_days?: number | null;
  requires_import_permit?: boolean;
  quarantine_on_arrival?: boolean;
  quarantine_days?: number | null;
  quarantine_type?: string | null;
  min_age_months?: number | null;
  requires_other_vacc?: boolean;
  requires_parasite?: boolean;
  requires_neuter?: boolean;
}

/** 검역 준비 단계 하나. */
export interface QuarantineStep {
  /** 예상 날짜 (ISO YYYY-MM-DD 또는 null) */
  date: string | null;
  step: string;
  note?: string | null;
  done?: boolean;
  at?: string | null;
}

/** 국가 마스터 + 준비 템플릿. */
export interface Destination {
  code: string;
  country_name_ko: string;
  country_name_en: string;
  region: Region | string;
  service_level: ServiceLevel;
  sort_order: number;
  iso2?: string | null;
  /** 국가 마스터의 요약 요구사항 플래그 (레거시 필드) */
  requires_titer?: boolean;
  titer_wait_days?: number | null;
  requires_import_permit?: boolean;
  quarantine_on_arrival?: boolean;
  quarantine_days?: number | null;
  min_age_months?: number | null;
  health_cert_model?: string | null;
  /** 임상 노트 (검역본부·수의사가 정리한 특이사항). */
  notes?: string | null;
  requires_other_vacc?: boolean;
  requires_parasite?: boolean;
  requires_neuter?: boolean;
  /** feasibility 함수가 채워주는 정규화된 요구사항. */
  requirements: DestinationRequirements;
  /** 오늘 시작한다고 가정했을 때의 기본 준비 단계. */
  default_steps: QuarantineStep[];
  /** 오늘 시작 시 최소 출발 가능일. */
  earliest_departure_from_today?: string | null;
  /** 근거 (예: "QIA 2024"). */
  source?: string | null;
  source_verified?: boolean;
  /** 수입 허가 안내 (있는 국가만). */
  import_permit_note?: string | null;
}

// ─────────────────────────────────────────────────────────────
// 날짜 유틸
// ─────────────────────────────────────────────────────────────

/** 오늘 YYYY-MM-DD (로컬 타임존). */
export function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** ISO 날짜 문자열에 일수 더하기. */
export function addDaysISO(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}

/** 두 ISO 날짜의 차이 (일). fromISO 기준 toISO까지. 양수=미래. */
export function daysBetweenISO(fromISO: string, toISO: string): number | null {
  if (!fromISO || !toISO) return null;
  const a = new Date(fromISO + "T00:00:00Z").getTime();
  const b = new Date(toISO + "T00:00:00Z").getTime();
  if (isNaN(a) || isNaN(b)) return null;
  return Math.floor((b - a) / 86400000);
}

/** 사용자 친화 날짜 포맷 (예: "2026년 9월 23일 (수)"). */
export function formatKoreanDate(iso: string): string {
  if (!iso) return "";
  const dt = new Date(iso + "T00:00:00");
  if (isNaN(dt.getTime())) return iso;
  const y = dt.getFullYear();
  const m = dt.getMonth() + 1;
  const d = dt.getDate();
  const dow = ["일", "월", "화", "수", "목", "금", "토"][dt.getDay()];
  return `${y}년 ${m}월 ${d}일 (${dow})`;
}

// ─────────────────────────────────────────────────────────────
// 조회 헬퍼
// ─────────────────────────────────────────────────────────────

/** 국가 목록을 지역별로 그룹핑. */
export function groupByRegion(
  destinations: Destination[]
): Array<{ region: string; items: Destination[] }> {
  const map = new Map<string, Destination[]>();
  for (const d of destinations) {
    const key = d.region;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(d);
  }
  // sort_order 로 정렬된 순서 유지
  const ordered: Array<{ region: string; items: Destination[] }> = [];
  const seenRegions = new Set<string>();
  for (const d of destinations) {
    if (seenRegions.has(d.region)) continue;
    seenRegions.add(d.region);
    ordered.push({ region: d.region, items: map.get(d.region)! });
  }
  return ordered;
}

/** 코드로 국가 찾기. */
export function findDestination(
  destinations: Destination[],
  code: string
): Destination | null {
  return destinations.find((d) => d.code === code) ?? null;
}

// ─────────────────────────────────────────────────────────────
// Feasibility (사용자가 출발 예정일을 입력했을 때)
// ─────────────────────────────────────────────────────────────

export type FeasibilityVerdict = "feasible" | "tight" | "infeasible" | "unknown";

export interface Feasibility {
  verdict: FeasibilityVerdict;
  /** 필요한 최소 리드타임(일). null이면 계산 불가(advisory_only 등). */
  requiredLeadDays: number | null;
  /** 실제 출발일까지 남은 일수. */
  actualDays: number | null;
  /** 최소 출발 가능일(오늘 시작 기준). */
  earliestFromToday: string | null;
  /** 사람이 읽는 한국어 메시지. */
  message: string;
}

/**
 * 준비 시작(오늘) 기준 최소 리드타임을 default_steps에서 산출.
 * 마지막 스텝의 date - 첫 스텝의 date.
 */
export function computeLeadDays(dest: Destination): number | null {
  const steps = dest.default_steps;
  if (!steps || steps.length === 0) return null;
  const first = steps[0]?.date;
  const last = steps[steps.length - 1]?.date;
  if (!first || !last) return null;
  return daysBetweenISO(first, last);
}

/**
 * 출발 예정일 대비 준비가 충분한지 판정.
 * 원본 사이트의 feasibility 로직을 근사한 것 — 실제 서류 발급은 병원 백엔드에 의존.
 */
export function checkFeasibility(
  dest: Destination,
  targetDateISO: string | null
): Feasibility {
  if (dest.service_level === "advisory_only") {
    return {
      verdict: "unknown",
      requiredLeadDays: null,
      actualDays: null,
      earliestFromToday: null,
      message: "이 나라는 요구사항이 복잡해 별도 안내가 필요해요. 병원과 상의해 주세요.",
    };
  }

  const leadDays = computeLeadDays(dest);
  const earliestFromToday = dest.earliest_departure_from_today ?? null;

  if (!targetDateISO) {
    return {
      verdict: "unknown",
      requiredLeadDays: leadDays,
      actualDays: null,
      earliestFromToday,
      message: earliestFromToday
        ? `오늘 시작하면 ${formatKoreanDate(earliestFromToday)}부터 출국 가능해요.`
        : "출발 예정일을 입력하시면 가능 여부를 알려드려요.",
    };
  }

  const actualDays = daysBetweenISO(todayISO(), targetDateISO);
  if (actualDays == null) {
    return {
      verdict: "unknown",
      requiredLeadDays: leadDays,
      actualDays: null,
      earliestFromToday,
      message: "출발 예정일이 올바르지 않아요.",
    };
  }

  if (leadDays == null) {
    return {
      verdict: "unknown",
      requiredLeadDays: null,
      actualDays,
      earliestFromToday,
      message: "이 나라의 리드타임을 계산할 수 없어요. 병원과 상의해 주세요.",
    };
  }

  if (actualDays < leadDays) {
    const gap = leadDays - actualDays;
    return {
      verdict: "infeasible",
      requiredLeadDays: leadDays,
      actualDays,
      earliestFromToday,
      message: `현재 일정으로는 어려워요. ${gap}일이 부족해, ${earliestFromToday ? formatKoreanDate(earliestFromToday) : `${leadDays}일 뒤`} 이후로 조정하시는 것을 권장드려요.`,
    };
  }

  if (actualDays - leadDays <= 7) {
    return {
      verdict: "tight",
      requiredLeadDays: leadDays,
      actualDays,
      earliestFromToday,
      message: `가능은 하지만 여유가 별로 없어요 (여유 ${actualDays - leadDays}일). 검사 일정을 놓치지 않도록 미리 챙겨 주세요.`,
    };
  }

  return {
    verdict: "feasible",
    requiredLeadDays: leadDays,
    actualDays,
    earliestFromToday,
    message: `준비 기간이 충분해요 (여유 ${actualDays - leadDays}일). 아래 일정대로 챙겨 주시면 됩니다.`,
  };
}
