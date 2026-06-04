import React from 'react';

export interface CompareColumnItem {
  term: React.ReactNode;
  desc: React.ReactNode;
}

export interface CompareColumnProps {
  icon?: React.ReactNode;
  label: string;
  title: string;
  caption?: string;
  items: CompareColumnItem[];
}

export interface CompareColumnsProps {
  left: CompareColumnProps;
  right: CompareColumnProps;
}

export function CompareColumns({ left, right }: CompareColumnsProps) {
  return (
    <div className="not-prose my-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {/* Left Column (Positive / 권장) — 옅은 초록 톤 */}
      <div className="rounded-xl border border-primary/30 bg-primary/[0.06] p-5 md:p-6">
        <div className="mb-4 pb-4 border-b border-primary/15">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider">
            {left.icon && <span aria-hidden="true">{left.icon}</span>}
            <span>{left.label}</span>
          </div>
          <h3 className="mt-3 text-lg font-bold text-foreground leading-tight">
            {left.title}
          </h3>
          {left.caption && (
            <p className="mt-1 text-sm text-muted-foreground">{left.caption}</p>
          )}
        </div>

        <ul className="m-0 p-0 list-none divide-y divide-primary/10">
          {left.items.map((item, idx) => (
            <li
              key={idx}
              className="m-0 p-0 py-3 first:pt-0 last:pb-0 before:hidden marker:content-none"
            >
              <strong className="block text-foreground/90 font-bold">
                {item.term}
              </strong>
              <span className="block text-sm text-muted-foreground mt-0.5 leading-relaxed">
                {item.desc}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Column (Caution / 주의·피할 것) — warning 토큰 사용 */}
      <div className="rounded-xl border border-warning/40 bg-warning-muted p-5 md:p-6">
        <div className="mb-4 pb-4 border-b border-warning/25">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warning/15 text-warning-foreground text-xs font-bold uppercase tracking-wider">
            {right.icon && <span aria-hidden="true">{right.icon}</span>}
            <span>{right.label}</span>
          </div>
          <h3 className="mt-3 text-lg font-bold text-foreground leading-tight">
            {right.title}
          </h3>
          {right.caption && (
            <p className="mt-1 text-sm text-muted-foreground">{right.caption}</p>
          )}
        </div>

        <ul className="m-0 p-0 list-none divide-y divide-warning/15">
          {right.items.map((item, idx) => (
            <li
              key={idx}
              className="m-0 p-0 py-3 first:pt-0 last:pb-0 before:hidden marker:content-none"
            >
              <strong className="block text-foreground/90 font-bold">
                {item.term}
              </strong>
              <span className="block text-sm text-muted-foreground mt-0.5 leading-relaxed">
                {item.desc}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
