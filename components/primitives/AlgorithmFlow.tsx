import React from 'react';

interface FlowStep {
  step: string;
  action: string;
  details?: string;
}

interface AlgorithmFlowProps {
  title?: string;
  steps: FlowStep[];
}

export function AlgorithmFlow({ title, steps }: AlgorithmFlowProps) {
  return (
    <div className="my-8">
      {title && <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>}
      <div className="flex flex-col gap-0">
        {steps.map((s, idx) => (
          <div key={idx} className="flex items-stretch relative">
            <div className="flex flex-col items-center">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold border border-blue-200 z-10 mt-1">
                {s.step}
              </div>
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="w-0.5 bg-gray-200 flex-1 my-1"></div>
              )}
            </div>
            <div className="ml-4 flex-1 mb-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="font-semibold text-gray-900">{s.action}</div>
                {s.details && <div className="text-gray-600 text-sm mt-1 leading-relaxed">{s.details}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
