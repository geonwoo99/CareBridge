// components/primitives/SourceNotice.tsx
// ─────────────────────────────────────────────────────────────
// 모든 가이드 글 본문 상단에 자동 삽입되는 출처·면책 안내 컴포넌트.
// sources가 있으면 출처 목록을 표시하고, 항상 disclaimerNotes를 표시합니다.
// ─────────────────────────────────────────────────────────────

export interface SourceItem {
  label: string;
  href?: string;
}

export interface SourceNoticeProps {
  badge?: string;
  sources?: SourceItem[];
  notes: string[];
}

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );
}

export function SourceNotice({ badge = "알려드립니다", sources, notes }: SourceNoticeProps) {
  return (
    <div className="not-prose my-8 rounded-xl bg-muted/40 p-5 border border-border/60">
      {/* 배지 */}
      <div className="mb-4">
        <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">
          {badge}
        </span>
      </div>

      {/* 출처 목록 (있을 때만) */}
      {sources && sources.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-foreground mb-2">
            이 글은 다음 자료를 바탕으로 작성되었습니다
          </p>
          <ul className="m-0 p-0 flex flex-col gap-1.5 list-none before:hidden marker:content-none">
            {sources.map((src, idx) => (
              <li key={idx} className="m-0 p-0 list-none before:hidden marker:content-none flex items-start gap-2 text-sm">
                <span className="text-primary mt-0.5 shrink-0">•</span>
                {src.href ? (
                  <a
                    href={src.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary hover:underline"
                  >
                    {src.label}
                  </a>
                ) : (
                  <span className="font-semibold text-primary">{src.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 구분선 (출처가 있을 때만) */}
      {sources && sources.length > 0 && (
        <hr className="my-4 border-t border-dashed border-border" />
      )}

      {/* 면책 안내 */}
      <ul className="m-0 p-0 flex flex-col gap-2 list-none before:hidden marker:content-none">
        {notes.map((note, idx) => (
          <li key={idx} className="m-0 p-0 list-none before:hidden marker:content-none flex items-start gap-2">
            <InfoIcon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <span className="text-xs text-muted-foreground leading-relaxed">{note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
