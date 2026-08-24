import Link from "next/link";
import { siteConfig } from "@/lib/site.config";

interface GuideListProps {
  title: string;
  description: string;
  guides: any[];
  targetAudience: "owner" | "vet";
}

export function GuideList({ title, description, guides, targetAudience }: GuideListProps) {
  // targetAudience에 맞는 가이드만 필터링
  const filteredGuides = guides.filter(g => g.targetAudience === targetAudience);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {description}
        </p>
      </section>

      {/* 대화형 건강 도구 섹션 (보호자용) */}
      {targetAudience === "owner" && (
        <div className="mb-10 space-y-4">
          <h2 className="text-xl font-bold border-b pb-2">🛠️ 맞춤형 건강 도구 & 평가표</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              href="/assessments/cibdai"
              className="group block rounded-xl border border-primary/20 bg-primary/5 p-4 hover:border-primary transition shadow-sm"
            >
              <div className="text-2xl mb-2">📋</div>
              <h3 className="font-bold text-foreground group-hover:text-primary transition text-sm">
                CIBDAI 장 건강 체크
              </h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                만성 장염·소화기 증상 점수 산출 및 추적
              </p>
            </Link>

            <Link
              href="/tools/diet-catalog"
              className="group block rounded-xl border border-primary/20 bg-primary/5 p-4 hover:border-primary transition shadow-sm"
            >
              <div className="text-2xl mb-2">🥫</div>
              <h3 className="font-bold text-foreground group-hover:text-primary transition text-sm">
                사료 카탈로그 & 비교
              </h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                1,000개 제품 영양소(DM/1,000kcal) 비교
              </p>
            </Link>

            <Link
              href="/tools/export-quarantine"
              className="group block rounded-xl border border-primary/20 bg-primary/5 p-4 hover:border-primary transition shadow-sm"
            >
              <div className="text-2xl mb-2">✈️</div>
              <h3 className="font-bold text-foreground group-hover:text-primary transition text-sm">
                해외 출국 검역 준비
              </h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                29개국 요구사항 및 출국 가능일 계산
              </p>
            </Link>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <h2 className="text-xl font-bold border-b pb-2">가이드 목록</h2>
        {filteredGuides.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">등록된 가이드가 아직 없습니다.</p>
        ) : (
          <div className="grid gap-4">
            {filteredGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group block rounded-lg border p-5 hover:border-foreground transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {guide.category === "care_guide" ? "📖 Care Guide" : 
                       guide.category === "assessment" ? "📊 Assessment" :
                       guide.category === "calculator" ? "🧮 Calculator" :
                       guide.category === "protocol" ? "진료 프로토콜" :
                       guide.category === "drug_dose" ? "약물 용량" :
                       guide.category === "differential" ? "감별진단" : guide.category}
                    </span>
                    <h3 className="mt-1 text-lg font-bold group-hover:underline">
                      {guide.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {guide.summary}
                    </p>
                  </div>
                  {guide.draft && (
                    <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 shrink-0">
                      임시저장 (draft)
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
