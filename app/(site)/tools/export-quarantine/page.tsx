// app/(site)/tools/export-quarantine/page.tsx
// ─────────────────────────────────────────────────────────────
// 해외 출국 검역 준비 안내 도구.
// 콘텐츠형(MDX)이 아니라 도구형이므로 React 페이지로 구현 (규칙 10).
// Phase 1: 국가 선택 + 요구사항 + 타임라인 (준비 일정 확인 목적).
// Phase 2(추후): 반려동물·보호자 정보 입력 → 서류 제출.
// ─────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { QuarantineWizard } from "@/components/interactive/QuarantineWizard";
import { ContactCard } from "@/components/primitives/ContactCard";

export const metadata: Metadata = {
  title: "해외 출국 검역 준비 · 국가별 요구사항 확인",
  description:
    "반려동물 해외 출국 전 필요한 검사·서류·리드타임을 국가별로 확인해 드립니다. 준비 일정을 자동으로 계산해 드려요.",
};

export default function ExportQuarantinePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <header className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">
          🌐 보호자용 도구 · 출국 검역
        </span>
        <h1 className="mt-4 font-serif text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
          우리 아이와 떠나는 길,<br />
          <span className="text-primary">검역 준비</span>부터 함께 챙겨드려요
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          해외로 출국하기 전, 국가별로 필요한 검사와 서류가 달라요. 목적지를 알려주시면 준비 기간과 일정을 자동으로 계산해 드립니다. 원하는 출발일도 함께 알려 주시면 가능 여부를 미리 확인해 볼 수 있어요.
        </p>
      </header>

      <QuarantineWizard />

      <ContactCard
        title="서류 발급이나 실제 준비는 병원에서 함께 도와드릴게요"
        description="일정 조정, 필요한 검사, 서류 작성까지 편하게 문의해 주세요."
        cta="궁금한 점은 편하게 연락주세요"
      />

      <p className="mt-8 text-center text-[11px] leading-relaxed text-muted-foreground">
        본 도구는 QIA(농림축산검역본부) 및 각국 공식 요구사항을 기반으로 한 보호자용 안내이며, 최종 서류 발급은 진료를 통해 결정됩니다. 국가별 규정은 수시로 변경될 수 있어 출국 4~6주 전 다시 확인해 주세요.
      </p>
    </main>
  );
}
