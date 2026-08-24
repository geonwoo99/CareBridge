// components/interactive/QuarantineRequirements.tsx
// ─────────────────────────────────────────────────────────────
// 선택된 국가의 검역 요구사항을 카드 그리드로 표시.
// 데이터 스키마는 lib/quarantine.ts, 데이터는 content/data/quarantine/에서.
// ─────────────────────────────────────────────────────────────

"use client";

import type { Destination } from "@/lib/quarantine";

interface Props {
  destination: Destination;
}

export function QuarantineRequirements({ destination: d }: Props) {
  const r = d.requirements;

  // 요구사항을 카드 데이터로 변환
  type Card = {
    icon: string;
    label: string;
    value: string;
    desc?: string;
    tone: "primary" | "warning" | "muted";
  };

  const cards: Card[] = [];

  // 광견병 접종
  if (r.requires_rabies_vacc) {
    const doses = r.rabies_min_doses ?? 1;
    const interval = r.rabies_dose_interval_days;
    cards.push({
      icon: "💉",
      label: "광견병 접종",
      value: doses > 1 ? `${doses}회 필요` : "1회 이상",
      desc: interval
        ? `${doses}회 접종, 간격 ${interval}일 이상`
        : "유효한 접종 이력 필요",
      tone: "primary",
    });
  }

  // 항체가 검사
  if (r.requires_titer) {
    const iu = r.titer_min_iu;
    const wait = r.titer_wait_days;
    cards.push({
      icon: "🩸",
      label: "광견병 항체검사",
      value: iu ? `≥ ${iu} IU/ml` : "필수",
      desc: wait
        ? `채혈 후 ${wait}일 대기`
        : "지정 실험실 채혈",
      tone: "warning",
    });
  }

  // 최소 월령
  if (r.min_age_months != null) {
    cards.push({
      icon: "📅",
      label: "최소 월령",
      value: `${r.min_age_months}개월`,
      desc: "출국 시점 기준",
      tone: "muted",
    });
  }

  // 격리
  if (r.quarantine_on_arrival) {
    cards.push({
      icon: "🏥",
      label: "도착 후 격리",
      value: r.quarantine_days ? `${r.quarantine_days}일` : "필요",
      desc: r.quarantine_type ?? undefined,
      tone: "warning",
    });
  }

  // 수입 허가
  if (r.requires_import_permit) {
    cards.push({
      icon: "📄",
      label: "수입 허가서",
      value: "필요",
      desc: d.import_permit_note ?? "사전 신청 필요",
      tone: "warning",
    });
  }

  // 추가 백신
  if (r.requires_other_vacc) {
    cards.push({
      icon: "💊",
      label: "추가 백신",
      value: "필요",
      desc: "광견병 외 추가 접종",
      tone: "muted",
    });
  }

  // 기생충 검사
  if (r.requires_parasite) {
    cards.push({
      icon: "🔬",
      label: "기생충 검사",
      value: "필요",
      desc: "출국 전 진행",
      tone: "muted",
    });
  }

  // 중성화
  if (r.requires_neuter) {
    cards.push({
      icon: "✂️",
      label: "중성화",
      value: "필요",
      desc: "출국 전 완료",
      tone: "muted",
    });
  }

  const toneClass: Record<Card["tone"], string> = {
    primary: "border-primary/30 bg-accent",
    warning: "border-warning/30 bg-warning-muted",
    muted: "border-border bg-muted/40",
  };

  return (
    <div className="not-prose">
      {cards.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted/40 p-6 text-center text-sm text-muted-foreground">
          특별한 요구사항이 없어요. 기본 서류만으로 출국 가능합니다.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <div
              key={i}
              className={`flex flex-col rounded-xl border p-4 ${toneClass[c.tone]}`}
            >
              <div className="flex items-baseline gap-2">
                <span className="text-xl" aria-hidden>
                  {c.icon}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {c.label}
                </span>
              </div>
              <span className="mt-1 font-serif text-lg font-bold text-foreground">
                {c.value}
              </span>
              {c.desc && (
                <span className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {c.desc}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 특이사항 노트 */}
      {d.notes && (
        <div className="mt-4 rounded-xl border border-border bg-background p-4">
          <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-primary">
            📌 특이사항
          </div>
          <p className="m-0 text-sm leading-relaxed text-foreground/85">
            {d.notes}
          </p>
        </div>
      )}

      {/* 근거 */}
      {d.source && (
        <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>근거:</span>
          <span className="font-semibold">{d.source}</span>
          {d.source_verified && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
              검증됨
            </span>
          )}
        </div>
      )}
    </div>
  );
}
