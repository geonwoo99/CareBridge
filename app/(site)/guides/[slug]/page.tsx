import { notFound } from "next/navigation";
import { guides } from "#site/content";
import GuideClientPage from "./client-page";
import client from "@/tina/__generated__/client";

// 빌드 시 모든 글의 페이지를 미리 생성(빠르고 안정적)
export function generateStaticParams() {
  return guides
    .filter((g) => !g.draft) // 미발행(draft) 글은 제외
    .map((g) => ({ slug: g.slug }));
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // 1. Velite 데이터 (안전한 본문 렌더링용)
  const veliteGuide = guides.find((g) => g.slug === slug && !g.draft);
  if (!veliteGuide) notFound();

  // 2. TinaCMS 데이터 (실시간 시각 편집용)
  let tinaRes;
  try {
    // TinaCMS의 데이터 페칭 (client.queries.guide)
    tinaRes = await client.queries.guide({ relativePath: `${slug}.mdx` });
  } catch (error) {
    // Tina 데이터를 찾을 수 없을 때 폴백
    console.error("TinaCMS Fetch Error:", error);
    notFound();
  }

  return (
    <GuideClientPage 
      data={tinaRes.data}
      variables={tinaRes.variables}
      query={tinaRes.query}
      veliteGuide={{
        body: veliteGuide.body,
        sources: veliteGuide.sources,
        updated: veliteGuide.updated,
        reviewedBy: veliteGuide.reviewedBy,
      }}
    />
  );
}

