import Link from "next/link";
import { guides } from "#site/content";
import { siteConfig } from "@/lib/site.config";

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {siteConfig.tagline}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {siteConfig.brand}가 전하는 반려동물 홈케어 및 건강 수칙
        </p>
      </section>

      <div className="space-y-6">
        <h2 className="text-xl font-bold border-b pb-2">가이드 목록</h2>
        {guides.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">등록된 가이드가 아직 없습니다.</p>
        ) : (
          <div className="grid gap-4">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group block rounded-lg border p-5 hover:border-foreground transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {guide.category === "care_guide" ? "📖 Care Guide" : guide.category}
                    </span>
                    <h3 className="mt-1 text-lg font-bold group-hover:underline">
                      {guide.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {guide.summary}
                    </p>
                  </div>
                  {guide.draft && (
                    <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
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
