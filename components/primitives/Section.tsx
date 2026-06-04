import React from 'react';

interface SectionProps {
  number: string;
  title: string;
  id: string;
  children: React.ReactNode;
}

export function Section({ number, title, id, children }: SectionProps) {
  return (
    <section id={id} className="mt-12 mb-8 scroll-mt-24 group">
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
          {number}
        </div>
        <h2 className="text-2xl font-serif font-bold text-foreground !m-0 !pb-0 border-none flex-1">
          {title}
        </h2>
      </div>
      <div className="mt-4">
        {children}
      </div>
    </section>
  );
}
