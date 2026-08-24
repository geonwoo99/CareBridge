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

    // ── 타겟 오디언스 (보호자용 / 수의사용 분리) ──
    targetAudience: s.enum(["owner", "vet"]).default("owner"),

    // ── URL 조각 ──
    slug: s.slug("global"),

    // ── 유형: 통합 카테고리 ──
    category: s.enum(["assessment", "care_guide", "calculator", "protocol", "drug_dose", "differential"]),

    // ── 대상 종 ──
    species: s.array(s.enum(["dog", "cat", "common"])).default([]),

    // ── 요약 ──
    summary: s.string().max(160),

    // ── 근거 출처 ──
    sources: s.array(
      s.object({
        label: s.string(),
        href: s.string().optional(),
      })
    ).default([]),

    // ── 대표 이미지 ──
    cover: s.image().optional(),

    // ── 수의사용 추가 필드 ──
    difficulty: s.enum(["basic", "advanced"]).optional(),
    keyTakeaway: s.string().optional(),

    // ── 검수 추적 필드 ──
    updated: s.isodate(),
    reviewedBy: s.string().optional(),
    nextReview: s.isodate().optional(),
    guidelineVersion: s.string().optional(),

    // ── 미발행 여부 ──
    draft: s.boolean().default(false),

    // ── 본문(MDX) ──
    body: s.mdx(),
  })
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
