// components/primitives/Checklist.tsx
// ─────────────────────────────────────────────────────────────
// 보호자가 집에서 하나씩 확인하는 체크리스트입니다.
// - 화면에서는 클릭해서 체크할 수 있고, 진행률(2/5)이 표시됩니다.
// - 인쇄할 때는 빈 네모칸(□)으로 나와 손으로 체크할 수 있습니다(rules/50).
//
// 항목은 글(MDX)에서 배열로 넘깁니다:
//   <Checklist items={[
//     { label: "조용한 곳에서 쉬게 했어요", hint: "자극이 적은 공간" },
//     { label: "식욕과 활력을 확인했어요" },
//   ]} />
// ─────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";

type Item = { label: string; hint?: string };

export function Checklist({ items }: { items: Item[] }) {
  const [checked, setChecked] = useState<boolean[]>(() =>
    items.map(() => false)
  );
  const doneCount = checked.filter(Boolean).length;

  function toggle(i: number) {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <div className="not-prose my-6 rounded-lg border p-4">
      {/* 진행률 — 인쇄 시에는 숨김(print:hidden) */}
      <div className="mb-3 text-sm font-semibold print:hidden">
        {doneCount} / {items.length} 완료
      </div>

      <ul className="m-0 p-0 list-none space-y-2">
        {items.map((item, i) => (
          <li key={i} className="m-0 p-0 before:hidden marker:content-none">
            <label className="flex cursor-pointer items-start gap-3">
              {/* 화면용 체크박스 */}
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => toggle(i)}
                className="mt-1 h-4 w-4 print:hidden"
              />
              {/* 인쇄용 빈 네모칸 — 화면에서는 숨김, 인쇄 시에만 표시 */}
              <span className="mt-0.5 hidden h-4 w-4 border border-black print:inline-block" aria-hidden />

              <span>
                <span className={checked[i] ? "line-through text-muted-foreground" : ""}>
                  {item.label}
                </span>
                {item.hint && (
                  <span className="block text-xs text-muted-foreground">
                    {item.hint}
                  </span>
                )}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
