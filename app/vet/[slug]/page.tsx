import { notFound } from "next/navigation";
import { vetGuides } from "#site/content";
import { MDXContent } from "@/components/MDXContent";
import { PrintButton } from "@/components/primitives/PrintButton";

export function generateStaticParams() {
  return vetGuides
    .filter((g) => !g.draft)
    .map((g) => ({ slug: g.slug }));
}

export default async function VetGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const guide = vetGuides.find((g) => g.slug === slug && !g.draft);
  if (!guide) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      {/* Header */}
      <header className="mb-8 border-b pb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-2 py-0.5 bg-blue-100 text-blue-800 rounded uppercase">
            {guide.category === "protocol" ? "진료 프로토콜" : 
             guide.category === "drug_dose" ? "약물 용량" : 
             guide.category === "calculator" ? "계산기" : 
             guide.category === "differential" ? "감별진단" : guide.category}
          </span>
          {guide.difficulty === "advanced" && (
            <span className="text-xs font-semibold px-2 py-0.5 bg-red-100 text-red-800 rounded">
              Advanced
            </span>
          )}
        </div>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold leading-tight text-gray-900">
          {guide.title}
        </h1>
        {guide.titleEn && (
          <p className="mt-1 text-sm text-gray-500 font-medium tracking-wide">
            {guide.titleEn}
          </p>
        )}
        <p className="mt-4 text-lg text-gray-700 font-medium bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 leading-relaxed">
          {guide.keyTakeaway || guide.summary}
        </p>
      </header>

      {/* Body */}
      <div className="prose prose-neutral max-w-none prose-h2:font-serif prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200 prose-h3:font-serif prose-h3:text-xl prose-h3:font-bold prose-h3:text-blue-700 prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-p:text-gray-800 prose-li:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-bold">
        <MDXContent code={guide.body} />
      </div>

      {/* Footer / Actions */}
      <div className="mt-12 border-t pt-6 print:hidden flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          최종 업데이트: {guide.updated.slice(0, 10)} {guide.reviewedBy && `| 검수: ${guide.reviewedBy}`}
        </p>
        <PrintButton className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition bg-transparent border-none" />
      </div>

      <div className="mt-8 bg-amber-50 p-4 rounded-lg border border-amber-200">
        <h4 className="text-sm font-bold text-amber-800 mb-1">임상 면책 조항 (Clinical Disclaimer)</h4>
        <p className="text-xs text-amber-700 leading-relaxed">
          본 가이드는 수의사를 위한 임상 참고용 자료입니다. 제공된 약물 용량 및 프로토콜은 일반적인 지침일 뿐이며, 개별 환자의 상태, 병력, 품종 특이성에 따라 달라질 수 있습니다. 본 정보의 활용에 따른 모든 임상적 판단 및 결과에 대한 책임은 주치의(수의사)에게 있습니다. 최신 약전 및 문헌을 교차 검증하시기 바랍니다.
        </p>
      </div>
    </article>
  );
}
