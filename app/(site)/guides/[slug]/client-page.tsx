"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { MDXContent } from "@/components/MDXContent";
import { Disclaimer } from "@/components/primitives/Disclaimer";
import { PrintButton } from "@/components/primitives/PrintButton";
import { SourceNotice } from "@/components/primitives/SourceNotice";
import { QRCodeSVG } from "qrcode.react";
import { siteConfig } from "@/lib/site.config";
import { SpeciesProvider, PageSpeciesToggle } from "@/components/primitives/SpeciesToggle";
import type { GuideQuery } from "@/tina/__generated__/types";

interface GuideClientPageProps {
  data: GuideQuery;
  variables: { relativePath: string };
  query: string;
  veliteGuide: {
    body: string;
    sources: any[];
    updated?: string;
    reviewedBy?: string;
  };
}

export default function GuideClientPage({
  data,
  variables,
  query,
  veliteGuide,
}: GuideClientPageProps) {
  // useTina hook connects this page to the TinaCMS editor sidebar for real-time visual editing
  const { data: tinaData } = useTina({
    query,
    variables,
    data,
  });

  const guide = tinaData.guide;

  // 본문(MDX)에 종별 분기 컴포넌트(SpeciesToggle)가 없으면 내용이 동일한 것으로 간주하여
  // 상단 종 선택 토글을 노출하지 않도록 supportedSpecies를 비워줍니다.
  const hasSpeciesSpecificContent = veliteGuide.body.includes("SpeciesToggle");
  const supportedSpecies = hasSpeciesSpecificContent ? (guide.species as any) : [];

  return (
    <SpeciesProvider supportedSpecies={supportedSpecies}>
      <article className="mx-auto max-w-2xl px-4 py-8">
        {guide.targetAudience === "vet" && (
          <div className="mb-6 rounded-lg bg-warning-muted border border-warning p-4 text-warning-foreground text-sm font-semibold flex items-center gap-2">
            ⚠️ 이 자료는 수의 임상 종사자를 위한 것입니다. 보호자의 자의적 처치는 위험할 수 있습니다.
          </div>
        )}
        {/* 제목 (한/영 병기) */}
        <header className="mb-8">
          {/* 영문 라벨 — 초록 포인트 (있을 때만 표시) */}
          {guide.titleEn && (
            <p
              className="text-sm font-semibold uppercase tracking-widest text-primary"
              data-tina-field={tinaField(guide, "titleEn")}
            >
              {guide.titleEn}
            </p>
          )}
          <h1
            className="mt-2 font-serif text-4xl font-bold leading-tight"
            data-tina-field={tinaField(guide, "title")}
          >
            {guide.title}
          </h1>
          <p
            className="mt-3 text-lg text-muted-foreground"
            data-tina-field={tinaField(guide, "summary")}
          >
            {guide.summary}
          </p>
        </header>

        {/* 상단 통합 종 선택 토글 */}
        <PageSpeciesToggle />

        {/* 상단 출처·면책 안내 — 모든 글에 자동 삽입 */}
        <div data-tina-field={tinaField(guide, "sources")}>
          <SourceNotice
            sources={guide.sources || veliteGuide.sources}
            notes={[...siteConfig.disclaimerNotes]}
          />
        </div>

        {/* 본문 (MDX) — 여기서 Figure/Callout/Checklist 등이 렌더링됨 */}
        {/* 본문은 Velite 컴파일러 데이터를 사용하여 커스텀 컴포넌트 안전 보장 (하이브리드 방식) */}
        <div
          className="prose prose-neutral max-w-none prose-h2:font-serif prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h2:pl-3 prose-h2:border-l-4 prose-h2:border-primary prose-h3:font-serif prose-h3:text-lg prose-h3:font-bold prose-h3:text-primary prose-h3:mt-8 prose-h3:mb-2 prose-p:leading-relaxed prose-p:text-foreground prose-li:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-primary prose-strong:font-semibold"
          data-tina-field={tinaField(guide, "body")}
        >
          <MDXContent code={veliteGuide.body} />
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
          {(guide.sources?.length ?? 0) > 0 && <>근거: {guide.sources?.map((s: any) => s.label).join(", ")} · </>}
          최종 검수 {veliteGuide.updated}{veliteGuide.reviewedBy && <> ({veliteGuide.reviewedBy})</>}
        </p>
      </article>
    </SpeciesProvider>
  );
}
