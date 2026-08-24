// app/(site)/tools/diet-catalog/page.tsx
// ─────────────────────────────────────────────────────────────
// 사료 카탈로그 · 비교 도구 페이지.
// 콘텐츠형(MDX)이 아니라 도구형이므로 React 페이지로 구현 (규칙 10).
//
// 3가지 뷰를 통합 제공:
//   1. 카탈로그 목록 (검색·필터·페이지네이션)
//   2. 제품 상세 (as-fed/DM/1000kcal 변환 + 도넛)
//   3. 여러 제품 나란히 비교 (최대 4개, 최고/최저 자동 하이라이트)
//
// 데이터는 content/data/diet/products.ts에서 스냅샷을 사용합니다.
// 프로덕션에서는 Supabase 실시간 조회로 교체 권장.
// ─────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { DIET_PRODUCTS } from "@/content/data/diet/products";
import { DietCatalogApp } from "@/components/interactive/DietCatalogApp";
import { ContactCard } from "@/components/primitives/ContactCard";

export const metadata: Metadata = {
  title: "사료 카탈로그 · 나란히 비교",
  description:
    "1,000여 개 사료 제품을 성분 기준으로 검색·비교합니다. 라벨 그대로(as-fed), 건물(DM), 1,000kcal 기준을 자유롭게 전환할 수 있어요.",
};

export default function DietCatalogPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 pb-32 sm:py-12">
      <header className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>보호자용 도구</span>
          <span className="h-1 w-1 rounded-full bg-primary" aria-hidden />
          <span>사료 카탈로그 · 비교</span>
        </div>
        <h1 className="mt-3 font-serif text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
          <span className="text-primary">
            {DIET_PRODUCTS.length.toLocaleString()}개
          </span>{" "}
          사료, 성분으로 나란히 비교
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          카드의 체크박스로 <strong className="text-foreground">최대 4개까지</strong>{" "}
          골라 나란히 비교할 수 있어요. 습식과 건식은 수분 함량이 달라
          겉으로 본 라벨값만으로는 비교가 어렵지만, 건물(DM) 기준으로 바꾸면
          같은 조건에서 성분을 견줘볼 수 있습니다.
        </p>
      </header>

      <DietCatalogApp products={DIET_PRODUCTS} />

      <ContactCard
        title="아이에게 맞는 식이 선택은 진료로 함께 정해요"
        description="처방식이 필요한 상태·양·이유식 전환 시기 등은 담당 수의사와 상의해 주세요."
        cta="궁금한 점은 편하게 연락주세요"
      />

      <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground">
        표시 값은 제조사 공개 정보 기반 추정이며 실제와 다를 수 있어요. 본 도구는 진료를 대체하지 않습니다.
      </p>
    </main>
  );
}
