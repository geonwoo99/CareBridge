import React from 'react';

interface DosageRow {
  drug: string;
  dosage: string;
  route: string;
  notes?: string;
}

interface DosageTableProps {
  title?: string;
  rows: DosageRow[];
}

export function DosageTable({ title, rows }: DosageTableProps) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      {title && (
        <div className="bg-gray-50 px-4 py-3 font-semibold text-gray-800 border-b border-gray-200">
          {title}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-medium text-gray-500 whitespace-nowrap">약물 / 수액</th>
              <th scope="col" className="px-4 py-3 text-left font-medium text-gray-500 whitespace-nowrap">용량</th>
              <th scope="col" className="px-4 py-3 text-left font-medium text-gray-500 whitespace-nowrap">투여 경로</th>
              <th scope="col" className="px-4 py-3 text-left font-medium text-gray-500">비고</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">{row.drug}</td>
                <td className="whitespace-nowrap px-4 py-3 text-primary font-semibold">{row.dosage}</td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-700 font-mono text-xs">{row.route}</td>
                <td className="px-4 py-3 text-gray-500">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
