// lib/storage.ts
// ─────────────────────────────────────────────────────────────
// 평가 점수 저장 추상화 (규칙 50-content-schema.md).
// - 1단계(현재): localStorage에 저장. 식별코드(이름+간단 숫자)로 구분.
// - 2단계(향후): 이 인터페이스를 Supabase 어댑터로 교체.
//   컴포넌트·콘텐츠는 이 인터페이스만 호출하므로 UI/데이터 코드는 안 바꿔도 됨.
//
// ⚠️ 식별코드는 비밀번호가 아닙니다(보안 기능 아님).
//    민감 의료정보는 저장하지 않습니다.
// ─────────────────────────────────────────────────────────────

export interface AssessmentRecord {
  /** UUID / crypto.randomUUID */
  id: string;
  /** 평가 도구 slug (예: "cibdai", "ccecai") */
  toolSlug: string;
  /** 평가 완료 시각 (ISO) */
  takenAt: string;
  /** 식별용 별명(예: 강아지 이름) */
  petName?: string;
  /** 식별용 간단 숫자(예: 생일 4자리) */
  petCode?: string;
  /** 총점 */
  totalScore: number;
  /** 만점 */
  maxScore: number;
  /** 심각도 라벨(예: "중증") */
  severityLabel: string;
  /** 문항별 응답 {itemId: score} */
  answers: Record<string, number>;
  /** 자유 메모 */
  note?: string;
}

const NS = "carebridge:assessments:v1";

/** 모든 기록 읽기 */
export function loadAll(): AssessmentRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(NS);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

/** 특정 아이(이름+코드) + 도구의 기록 */
export function loadForPet(
  toolSlug: string,
  petName?: string,
  petCode?: string
): AssessmentRecord[] {
  return loadAll()
    .filter(
      (r) =>
        r.toolSlug === toolSlug &&
        (petName ? r.petName === petName : true) &&
        (petCode ? r.petCode === petCode : true)
    )
    .sort((a, b) => a.takenAt.localeCompare(b.takenAt));
}

/** 새 기록 저장 */
export function saveRecord(rec: Omit<AssessmentRecord, "id" | "takenAt"> & { takenAt?: string }): AssessmentRecord {
  const stored: AssessmentRecord = {
    ...rec,
    id: cryptoRandomId(),
    takenAt: rec.takenAt ?? new Date().toISOString(),
  };
  if (typeof window === "undefined") return stored;
  const all = loadAll();
  all.push(stored);
  try {
    window.localStorage.setItem(NS, JSON.stringify(all));
  } catch {
    /* 저장 실패는 조용히 넘김 — 사용자 흐름 방해하지 않음 */
  }
  return stored;
}

function cryptoRandomId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return (crypto as Crypto).randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
