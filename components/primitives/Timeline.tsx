import React from 'react';

export interface TimelineItem {
  period: string;
  title: React.ReactNode;
  body: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="not-prose flex flex-col my-8 relative border-l border-border ml-4 md:ml-44 space-y-8">
      {items.map((item, idx) => (
        <div key={idx} className="relative group pl-6 md:pl-8">
          {/* Timeline Node Dot */}
          <div className="absolute left-[-8px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary flex items-center justify-center transition-all group-hover:scale-115 duration-200">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>

          {/* Period Label */}
          <div className="md:absolute md:right-full md:mr-8 md:top-1 md:w-36 md:text-right text-sm font-bold text-primary mb-1 md:mb-0 transition-colors group-hover:text-primary-dark">
            {item.period}
          </div>

          {/* Step Content */}
          <div className="flex flex-col">
            <h4 className="text-base font-semibold text-foreground leading-snug transition-colors group-hover:text-primary">
              {item.title}
            </h4>
            {item.body && (
              <div className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {item.body}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
