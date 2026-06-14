// velite.config.ts
// ─────────────────────────────────────────────────────────────
// 이 파일은 모든 교육자료(글)가 지켜야 할 "형식 계약"입니다.
// Velite가 빌드할 때 content/ 폴더의 모든 글을 이 스키마로 검사하고,
// 형식에 안 맞으면(예: 출처 누락) 빌드를 실패시켜 잘못된 글이
// 배포되는 것을 구조적으로 막습니다.
//
// 또한 글의 타입(TypeScript)을 자동 생성해, 코드에서 안전하게 씁니다.
// ─────────────────────────────────────────────────────────────

import { defineConfig, defineCollection, s } from "velite";
import { remarkKoreanStrong } from "./lib/remark-korean-strong";

const guides = defineCollection({
  name: "Guide",
  pattern: "guides/**/*.mdx", // content/guides/ 아래 모든 mdx
  schema: s.object({
    // ── 제목 (한/영 병기) ──
    title: s.string(),
    titleEn: s.string().optional(),

    // ── URL 조각. 한 번 정하면 절대 바꾸지 않음(QR/공유 링크가 깨짐) ──
    slug: s.slug("guides"),

    // ── 유형: 콘텐츠형/평가/계산기 중 하나로 강제 ──
    category: s.enum(["assessment", "care_guide", "calculator"]),

    // ── 대상 종 ──
    species: s.array(s.enum(["dog", "cat", "common"])).default([]),

    // ── 요약(인덱스 카드/검색용). 160자 제한 ──
    summary: s.string().max(160),

    // ── 근거 출처: 프로토타입 단계에서는 선택. 정식 발행 전 채울 것 ──
    sources: s.array(
      s.object({
        label: s.string(),
        href: s.string().optional(),
      })
    ).default([]),

    // ── 대표 이미지(선택). 자동으로 크기/blur 정보 추출 ──
    cover: s.image().optional(),

    // ── 검수 추적 필드 (프로토타입 단계에서는 선택) ──
    updated: s.isodate(),                // 마지막 수정일
    reviewedBy: s.string().optional(),   // 검수자(수의사)
    nextReview: s.isodate().optional(),  // 다음 검토 예정일 (review-check가 사용)
    guidelineVersion: s.string().optional(), // 근거 가이드라인 버전 (예: "WSAVA 2024")

    // ── 미발행 여부. true면 배포에서 자동 제외 ──
    draft: s.boolean().default(false),

    // ── 본문(MDX) ──
    body: s.mdx(),
  })
    // slug 기반으로 사이트 내 경로를 자동 생성해 붙여줍니다.
    .transform((data) => ({
      ...data,
      url: `/guides/${data.slug}`,
    })),
});

export default defineConfig({
  root: "content",
  collections: { guides },
  mdx: {
    // 한글 조사나 특수기호가 붙었을 때 **굵은 글씨**가 무시되는 문제를 전역으로 해결합니다.
    remarkPlugins: [remarkKoreanStrong],
  },
});
