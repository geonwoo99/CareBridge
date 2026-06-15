import Link from "next/link";
import { vetGuides } from "#site/content";

export default function VetHome() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <section className="mb-12 border-b border-blue-200 pb-8 text-center sm:text-left">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-blue-900">
          인턴 수의사 임상 가이드
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          바쁜 임상 현장에서 빠르게 참고할 수 있는 수의사용 실전 프로토콜 및 가이드라인입니다.
        </p>
      </section>

      <div className="space-y-6">
        <h2 className="text-xl font-bold border-b pb-2 text-blue-800">가이드 목록</h2>
        {vetGuides.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">등록된 가이드가 아직 없습니다.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {vetGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/vet/${guide.slug}`}
                className="group block rounded-lg border border-gray-200 p-5 hover:border-blue-400 hover:shadow-md transition bg-white"
              >
                <div className="flex flex-col h-full justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
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
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {guide.summary}
                    </p>
                  </div>
                  {guide.draft && (
                    <span className="self-start rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
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
