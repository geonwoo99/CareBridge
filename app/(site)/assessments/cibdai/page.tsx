// app/(site)/assessments/cibdai/page.tsx
// ─────────────────────────────────────────────────────────────
// CIBDAI · CCECAI 평가 도구 페이지.
// 콘텐츠형(MDX)이 아니라 도구형이므로 React 페이지로 구현 (규칙 10).
// 실제 도구 UI는 <CibdaiAssessment /> 컴포넌트가 전담합니다.
// ─────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { CibdaiAssessment } from "@/components/interactive/CibdaiAssessment";
import { ContactCard } from "@/components/primitives/ContactCard";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "강아지 장 건강 체크 · CIBDAI / CCECAI 평가표",
  description:
    "만성 소화기 증상을 앓는 강아지의 상태를 객관적인 점수로 정리해 드립니다. 결과는 브라우저에 저장되어 다음 평가와 비교할 수 있습니다.",
};

export default function CibdaiPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      <CibdaiAssessment />

      {/* 하단 병원 연락처 — site.config.contact 값이 있을 때만 렌더링 */}
      <ContactCard
        title={`${siteConfig.brand} · 진료 예약과 상담`}
        description="평가 결과와 함께 진료를 원하시면 언제든 연락 주세요."
        cta="궁금한 점은 편하게 연락주세요"
      />

      {/* 근거 문구 (규칙 40) */}
      <p className="mt-8 text-center text-[11px] leading-relaxed text-muted-foreground">
        본 평가표는 ACVIM 2026 Consensus Statement를 기반으로 한 보호자용 도구이며, 의학적 진단을 대체하지 않습니다.
      </p>
    </main>
  );
}
