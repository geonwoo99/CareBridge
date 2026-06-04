"use client";

import React, { useEffect, useState } from 'react';

export interface TocItem {
  number: string;
  title: string;
  anchor: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  title?: string;
}

export function TableOfContents({ items, title = '목차' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setActiveId(items[0]?.anchor || '');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -60% 0px' }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.anchor);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav suppressHydrationWarning className="not-prose bg-background rounded-2xl p-6 border border-border my-8 shadow-sm print:border-gray-300 print:shadow-none print:bg-transparent">
      <h3 className="text-sm font-semibold text-muted-foreground mb-3 pb-3 border-b border-border print:text-black">
        {title}
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 m-0 p-0 list-none">
        {items.map((item, idx) => {
          const isActive = isMounted && activeId === item.anchor;
          return (
            <li
              key={idx}
              className="m-0 p-0 list-none before:hidden marker:content-none"
            >
              <a
                href={`#${item.anchor}`}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md border-l-[3px] transition-colors no-underline print:text-black ${
                  isActive
                    ? 'border-primary bg-accent text-foreground font-semibold'
                    : 'border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveId(item.anchor);
                  document.getElementById(item.anchor)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span
                  className={`text-xs shrink-0 tabular-nums ${
                    isActive ? 'text-primary font-bold' : 'text-muted-foreground/60 font-medium'
                  }`}
                >
                  {item.number}
                </span>
                <span className="text-sm leading-snug">{item.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
