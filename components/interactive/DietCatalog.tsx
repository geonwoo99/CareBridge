// components/interactive/DietCatalog.tsx
// ─────────────────────────────────────────────────────────────
// 사료 카탈로그 목록 화면.
// 검색·필터·정렬·페이지네이션·비교 체크박스를 담당.
// 상세 뷰나 비교 뷰로의 전환은 부모(DietCatalogApp)에 위임.
// ─────────────────────────────────────────────────────────────

"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/dietMath";
import {
  feedTypeLabel,
  rxCategoryLabel,
  speciesLabel,
} from "@/content/data/diet/labels";

type SortKey = "name" | "brand" | "kcal" | "protein";

interface Props {
  products: Product[];
  compareIds: string[];
  onToggleCompare: (id: string) => void;
  onOpenDetail: (id: string) => void;
  pageSize?: number;
}

export function DietCatalog({
  products,
  compareIds,
  onToggleCompare,
  onOpenDetail,
  pageSize = 24,
}: Props) {
  const [page, setPage] = useState(1);
  const [species, setSpecies] = useState<string>("all");
  const [brand, setBrand] = useState<string>("all");
  const [feedType, setFeedType] = useState<string>("all");
  const [rx, setRx] = useState<string>("all");
  const [q, setQ] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortKey>("name");

  // 필터 옵션 계산 (한 번만)
  const { allBrands, allFeedTypes, allRx } = useMemo(() => {
    const bs = new Set<string>();
    const fs = new Set<string>();
    const rs = new Set<string>();
    for (const p of products) {
      bs.add(p.brand);
      fs.add(p.feed_type);
      p.rx_categories.forEach((t) => rs.add(t));
    }
    return {
      allBrands: [...bs].sort((a, b) => a.localeCompare(b, "ko")),
      allFeedTypes: [...fs],
      allRx: [...rs].sort(),
    };
  }, [products]);

  const filtered = useMemo(() => {
    let list = products;
    if (species !== "all")
      list = list.filter((p) => p.species === species || p.species === "both");
    if (brand !== "all") list = list.filter((p) => p.brand === brand);
    if (feedType !== "all") list = list.filter((p) => p.feed_type === feedType);
    if (rx !== "all") list = list.filter((p) => p.rx_categories.includes(rx));
    if (q.trim()) {
      const query = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          (p.ingredients_text || "").toLowerCase().includes(query)
      );
    }
    list = [...list];
    if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name, "ko"));
    else if (sortBy === "brand")
      list.sort(
        (a, b) =>
          a.brand.localeCompare(b.brand, "ko") ||
          a.name.localeCompare(b.name, "ko")
      );
    else if (sortBy === "kcal")
      list.sort((a, b) => (b.kcal_per_100g || 0) - (a.kcal_per_100g || 0));
    else if (sortBy === "protein")
      list.sort(
        (a, b) => (b.crude_protein_percent || 0) - (a.crude_protein_percent || 0)
      );
    return list;
  }, [products, species, brand, feedType, rx, q, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  const hasFilters =
    species !== "all" ||
    brand !== "all" ||
    feedType !== "all" ||
    rx !== "all" ||
    q.trim() !== "";

  function reset() {
    setSpecies("all");
    setBrand("all");
    setFeedType("all");
    setRx("all");
    setQ("");
    setPage(1);
  }

  return (
    <div className="not-prose">
      {/* 필터 바 */}
      <div className="sticky top-0 z-10 mb-4 rounded-xl border border-border bg-background p-3 shadow-sm">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_auto]">
          <label className="relative">
            <span className="sr-only">검색</span>
            <svg
              className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              placeholder="제품명·브랜드·원재료로 검색"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-border bg-muted/40 py-2 pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <select
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          >
            <option value="all">모든 브랜드 ({allBrands.length})</option>
            {allBrands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          >
            <option value="name">이름순</option>
            <option value="brand">브랜드순</option>
            <option value="kcal">칼로리 높은순</option>
            <option value="protein">단백 높은순</option>
          </select>
        </div>

        <FilterTagRow
          value={species}
          setValue={(v) => {
            setSpecies(v);
            setPage(1);
          }}
          options={[
            { value: "all", label: "전체 종" },
            { value: "canine", label: "🐕 강아지" },
            { value: "feline", label: "🐈 고양이" },
          ]}
          className="mt-2"
        />
        <FilterTagRow
          value={feedType}
          setValue={(v) => {
            setFeedType(v);
            setPage(1);
          }}
          options={[
            { value: "all", label: "전체 유형" },
            ...allFeedTypes.map((t) => ({ value: t, label: feedTypeLabel(t) })),
          ]}
          className="mt-1.5"
        />
        <FilterTagRow
          value={rx}
          setValue={(v) => {
            setRx(v);
            setPage(1);
          }}
          options={[
            { value: "all", label: "모든 처방" },
            ...allRx.map((t) => ({ value: t, label: rxCategoryLabel(t) })),
          ]}
          className="mt-1.5"
        />
      </div>

      {/* 결과 메타 */}
      <div className="mb-3 flex items-center justify-between px-1 text-xs text-muted-foreground">
        <span>
          <strong className="text-foreground">
            {filtered.length.toLocaleString()}개
          </strong>{" "}
          제품 · {currentPage}/{totalPages} 페이지
        </span>
        {hasFilters && (
          <button
            type="button"
            onClick={reset}
            className="font-semibold text-primary hover:underline"
          >
            필터 초기화
          </button>
        )}
      </div>

      {/* 카드 그리드 */}
      {pageItems.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">
          <div className="mb-2 text-4xl">🔍</div>
          <div>조건에 맞는 제품이 없어요.</div>
          <div className="mt-1 text-sm">
            필터를 초기화하거나 다른 검색어를 시도해 보세요.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
          {pageItems.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              selected={compareIds.includes(p.id)}
              onToggle={() => onToggleCompare(p.id)}
              onOpen={() => onOpenDetail(p.id)}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          current={currentPage}
          total={totalPages}
          onChange={setPage}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────

function FilterTagRow({
  value,
  setValue,
  options,
  className = "",
}: {
  value: string;
  setValue: (v: string) => void;
  options: Array<{ value: string; label: string }>;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => setValue(o.value)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/40"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function ProductCard({
  product: p,
  selected,
  onToggle,
  onOpen,
}: {
  product: Product;
  selected: boolean;
  onToggle: () => void;
  onOpen: () => void;
}) {
  return (
    <div
      className={`relative rounded-xl border bg-background p-3.5 shadow-sm transition ${
        selected
          ? "border-primary ring-2 ring-primary/20"
          : "border-border"
      }`}
    >
      <label
        onClick={(e) => e.stopPropagation()}
        className={`absolute right-2 top-2 z-10 flex cursor-pointer items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-semibold backdrop-blur-sm transition ${
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-background/95 text-muted-foreground"
        }`}
      >
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="m-0 h-3 w-3 cursor-pointer accent-primary"
        />
        <span>비교</span>
      </label>

      <button
        type="button"
        onClick={onOpen}
        className="block w-full cursor-pointer text-left"
      >
        <div className="mb-2.5 flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg bg-muted text-3xl">
          {p.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.photo_url}
              alt={p.name}
              loading="lazy"
              className="h-full w-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <span>🍽️</span>
          )}
        </div>
        <div className="text-[11px] text-muted-foreground">{p.brand}</div>
        <div className="mt-0.5 font-serif text-sm font-bold leading-snug text-foreground">
          {p.name}
        </div>
        <div className="mt-1 text-[11px] text-muted-foreground">
          <SpeciesBadge species={p.species} />
          <span> · {feedTypeLabel(p.feed_type)}</span>
          {p.kcal_per_100g && (
            <span> · {Math.round(p.kcal_per_100g)} kcal/100g</span>
          )}
        </div>
        {p.rx_categories.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {p.rx_categories.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary"
              >
                {rxCategoryLabel(t)}
              </span>
            ))}
            {p.rx_categories.length > 3 && (
              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                +{p.rx_categories.length - 3}
              </span>
            )}
          </div>
        )}
      </button>
    </div>
  );
}

function SpeciesBadge({ species }: { species: Product["species"] }) {
  const cls =
    species === "canine"
      ? "bg-warning-muted text-warning-foreground"
      : species === "feline"
      ? "bg-primary/10 text-primary"
      : "bg-muted text-muted-foreground";
  return (
    <span
      className={`inline-block rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${cls}`}
    >
      {speciesLabel(species)}
    </span>
  );
}

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (n: number) => void;
}) {
  const start = Math.max(1, current - 2);
  const end = Math.min(total, current + 2);
  const nearby: number[] = [];
  for (let i = start; i <= end; i++) nearby.push(i);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-1">
      <PageBtn disabled={current === 1} onClick={() => onChange(1)}>
        « 처음
      </PageBtn>
      <PageBtn disabled={current === 1} onClick={() => onChange(current - 1)}>
        ‹
      </PageBtn>
      {start > 1 && <span className="mx-2 text-xs text-muted-foreground">…</span>}
      {nearby.map((n) => (
        <PageBtn key={n} active={n === current} onClick={() => onChange(n)}>
          {n}
        </PageBtn>
      ))}
      {end < total && <span className="mx-2 text-xs text-muted-foreground">…</span>}
      <PageBtn
        disabled={current === total}
        onClick={() => onChange(current + 1)}
      >
        ›
      </PageBtn>
      <PageBtn disabled={current === total} onClick={() => onChange(total)}>
        끝 »
      </PageBtn>
    </div>
  );
}

function PageBtn({
  children,
  onClick,
  disabled,
  active,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`min-w-9 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:border-primary/40"
      } disabled:cursor-not-allowed disabled:opacity-30`}
    >
      {children}
    </button>
  );
}
