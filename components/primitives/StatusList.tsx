import React from 'react';

export type StatusListType = "success" | "danger" | "warning" | "info";

export interface StatusListItem {
  title: string;
  description?: string;
}

export interface StatusListProps {
  type?: StatusListType;
  badgeText: string;
  title: string;
  description?: string;
  items: StatusListItem[];
}

const styles: Record<StatusListType, { wrapper: string, badgeBg: string, badgeText: string, iconColor: string, Icon: React.ElementType }> = {
  success: {
    wrapper: "border-primary/20",
    badgeBg: "bg-accent",
    badgeText: "text-primary",
    iconColor: "text-primary",
    Icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
  },
  danger: {
    wrapper: "border-danger/20",
    badgeBg: "bg-danger-muted",
    badgeText: "text-danger-foreground",
    iconColor: "text-danger",
    Icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
  warning: {
    wrapper: "border-warning/20",
    badgeBg: "bg-warning-muted",
    badgeText: "text-warning-foreground",
    iconColor: "text-warning",
    Icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  info: {
    wrapper: "border-primary/30",
    badgeBg: "bg-accent",
    badgeText: "text-primary",
    iconColor: "text-primary",
    Icon: (props) => (
      <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
      </svg>
    ),
  },
};

export function StatusList({ type = "success", badgeText, title, description, items }: StatusListProps) {
  const s = styles[type];
  const { Icon } = s;

  return (
    <div className={`not-prose my-8 rounded-xl border bg-card p-6 shadow-sm ${s.wrapper}`}>
      {/* 뱃지 영역 */}
      <div className="mb-4 flex items-start">
        <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${s.badgeBg} ${s.badgeText}`}>
          <Icon className="h-3.5 w-3.5" />
          {badgeText}
        </div>
      </div>

      {/* 헤더 영역 (제목 & 설명) */}
      <div className="mb-6">
        <h3 className="font-serif text-xl font-bold text-foreground m-0 leading-tight">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground m-0 leading-relaxed">{description}</p>
        )}
      </div>

      {/* 구분선 */}
      <hr className="my-6 border-t border-dashed border-border" />

      {/* 리스트 영역 */}
      <ul className="m-0 flex flex-col gap-5 p-0 list-none before:hidden marker:content-none">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-4 p-0 m-0 list-none before:hidden marker:content-none">
            <div className={`mt-0.5 shrink-0 ${s.iconColor}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-foreground m-0 leading-snug">{item.title}</p>
              {item.description && (
                <p className="mt-1 text-sm text-muted-foreground m-0 leading-relaxed">{item.description}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
