// components/interactive/DietCatalogApp.tsx
// ─────────────────────────────────────────────────────────────
// 사료 카탈로그 최상위 컨테이너.
// 3-뷰 상태(list/detail/compare) 관리 + 비교 리스트 관리.
// 각 뷰의 세부 UI는 DietCatalog, ProductDetail, DietCompareView가 담당.
// ─────────────────────────────────────────────────────────────

"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/dietMath";
import { DietCatalog } from "./DietCatalog";
import { DietCompareBar } from "./DietCompareBar";
import { DietCompareView } from "./DietCompareView";
import { ProductDetail } from "./ProductDetail";

interface Props {
  products: Product[];
  /** 최대 동시 비교 개수. 기본 4. */
  maxCompare?: number;
}

type View = { name: "list" } | { name: "detail"; id: string } | { name: "compare" };

export function DietCatalogApp({ products, maxCompare = 4 }: Props) {
  const [view, setView] = useState<View>({ name: "list" });
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const compareProducts = useMemo(
    () =>
      compareIds
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => !!p),
    [compareIds, products]
  );

  function toggleCompare(id: string) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= maxCompare) return prev; // full — ignore
      return [...prev, id];
    });
  }

  function removeCompare(id: string) {
    setCompareIds((prev) => prev.filter((x) => x !== id));
    // If we were in compare view and now less than 2 left, go back to list
    if (view.name === "compare" && compareIds.length - 1 < 2) {
      setView({ name: "list" });
    }
  }

  function clearCompare() {
    setCompareIds([]);
    if (view.name === "compare") setView({ name: "list" });
  }

  function openCompare() {
    if (compareIds.length >= 2) setView({ name: "compare" });
  }

  return (
    <>
      {view.name === "list" && (
        <DietCatalog
          products={products}
          compareIds={compareIds}
          onToggleCompare={toggleCompare}
          onOpenDetail={(id) => setView({ name: "detail", id })}
        />
      )}

      {view.name === "detail" && (
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={() => setView({ name: "list" })}
            className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            ← 목록으로
          </button>
          {(() => {
            const p = products.find((x) => x.id === view.id);
            if (!p)
              return (
                <p className="text-muted-foreground">
                  제품을 찾을 수 없어요.
                </p>
              );
            return <ProductDetail product={p} />;
          })()}
        </div>
      )}

      {view.name === "compare" && (
        <DietCompareView
          products={compareProducts}
          onBack={() => setView({ name: "list" })}
          onRemove={removeCompare}
        />
      )}

      <DietCompareBar
        products={compareProducts}
        maxCount={maxCompare}
        onRemove={removeCompare}
        onClear={clearCompare}
        onCompare={openCompare}
      />
    </>
  );
}
