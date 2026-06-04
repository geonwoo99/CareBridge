import React from 'react';

export interface TaggedListItem {
  label: React.ReactNode;
  tag: string;
  href?: string;
}

interface TaggedListProps {
  items: TaggedListItem[];
}

export function TaggedList({ items }: TaggedListProps) {
  return (
    <ul className="not-prose flex flex-col my-6 m-0 p-0 list-none border-t border-border divide-y divide-border">
      {items.map((item, idx) => {
        const inner = (
          <>
            <div className="text-foreground font-medium">
              {item.label}
            </div>
            <div className="bg-accent text-primary text-sm font-semibold px-3 py-1 rounded-full shrink-0">
              {item.tag}
            </div>
          </>
        );

        return (
          <li key={idx} className="m-0 p-0 list-none before:hidden marker:content-none">
            {item.href ? (
              <a href={item.href} className="flex items-center justify-between gap-4 p-4 hover:bg-muted/50 transition-colors no-underline">
                {inner}
              </a>
            ) : (
              <div className="flex items-center justify-between gap-4 p-4">
                {inner}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

