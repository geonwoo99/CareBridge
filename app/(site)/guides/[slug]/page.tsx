import { notFound } from "next/navigation";
import { guides } from "#site/content"; // Velite가 자동 생성하는 콘텐츠
import { MDXContent } from "@/components/MDXContent";
import { Disclaimer } from "@/components/primitives/Disclaimer";
import { PrintButton } from "@/components/primitives/PrintButton";
import { QRCodeSVG } from "qrcode.react";
import { siteConfig } from "@/lib/site.config";
import { SpeciesProvider, PageSpeciesToggle } from "@/components/primitives/SpeciesToggle";

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
  const guide = guides.find((g) => g.slug === slug && !g.draft);
  if (!guide) notFound();

  return (
    <SpeciesProvider supportedSpecies={guide.species as any}>
      <article className="mx-auto max-w-2xl px-4 py-8">
        {/* 제목 (한/영 병기) */}
        <header className="mb-8">
          {/* 영문 라벨 — 초록 포인트 */}
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {guide.titleEn}
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold leading-tight">
            {guide.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{guide.summary}</p>
        </header>

        {/* 상단 통합 종 선택 토글 */}
        <PageSpeciesToggle />

        {/* 본문 (MDX) — 여기서 Figure/Callout/Checklist 등이 렌더링됨 */}
        <div className="prose prose-neutral max-w-none prose-h2:font-serif prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h2:pl-3 prose-h2:border-l-4 prose-h2:border-primary prose-h3:font-serif prose-h3:text-lg prose-h3:font-bold prose-h3:text-primary prose-h3:mt-8 prose-h3:mb-2 prose-p:leading-relaxed prose-p:text-foreground prose-li:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-primary prose-strong:font-semibold">
          <MDXContent code={guide.body} />
        </div>

      {/* 하단 인쇄 버튼 영역 — 화면에서만 보임 */}
      <div className="mt-12 border-t pt-6 print:hidden">
        <PrintButton className="text-sm text-muted-foreground hover:text-primary transition" />
      </div>

      {/* 면책 문구 — 모든 글 끝에 자동 삽입 */}
      <Disclaimer />

      {/* 인쇄용 QR 코드 영역 — 화면에서는 숨기고 인쇄 시에만 활성화 */}
      <div className="hidden print:flex print:items-center print:gap-4 mt-6">
        <QRCodeSVG value={`${siteConfig.baseUrl}/guides/${guide.slug}`} size={96} />
        <div>
          <p className="text-sm font-semibold text-foreground">
            폰으로 스캔하면 온라인에서 볼 수 있어요
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {`${siteConfig.baseUrl}/guides/${guide.slug}`}
          </p>
        </div>
      </div>

        {/* 근거 출처 표시 */}
        <p className="mt-4 text-xs text-muted-foreground border-t pt-4">
          근거: {guide.sources.join(", ")} · 최종 검수 {guide.updated} ({guide.reviewedBy})
        </p>
      </article>
    </SpeciesProvider>
  );
}
