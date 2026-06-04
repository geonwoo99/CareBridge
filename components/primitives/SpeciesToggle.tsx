// components/primitives/SpeciesToggle.tsx
// ─────────────────────────────────────────────────────────────
// 강아지/고양이에 따라 다른 내용을 보여줄 때 씁니다.
// 페이지 최상단에서 일괄적으로 종을 선택하고, 본문의 모든 카드와 지침이 동기화됩니다.
// ─────────────────────────────────────────────────────────────

"use client";

import { createContext, useContext, useState } from "react";

export type Species = "dog" | "cat" | "common";

type SpeciesContextType = {
  species: Species;
  setSpecies: (s: Species) => void;
  supportedSpecies: Species[];
  hasPageToggle: boolean;
};

const SpeciesContext = createContext<SpeciesContextType>({
  species: "dog",
  setSpecies: () => {},
  supportedSpecies: ["dog", "cat"],
  hasPageToggle: false,
});

export function SpeciesProvider({
  defaultSpecies = "dog",
  supportedSpecies = ["dog", "cat"],
  children,
}: {
  defaultSpecies?: Species;
  supportedSpecies?: Species[];
  children: React.ReactNode;
}) {
  const [species, setSpecies] = useState<Species>(defaultSpecies);

  return (
    <SpeciesContext.Provider
      value={{
        species,
        setSpecies,
        supportedSpecies,
        hasPageToggle: true, // 페이지 상단에 일괄 토글이 있음을 활성화
      }}
    >
      {children}
    </SpeciesContext.Provider>
  );
}

export function useSpecies() {
  return useContext(SpeciesContext);
}

// 가이드 상단에 위치하여 일괄 변경을 제공하는 토글 컴포넌트
export function PageSpeciesToggle() {
  const { species, setSpecies, supportedSpecies } = useSpecies();

  if (supportedSpecies.length <= 1) {
    return null;
  }

  return (
    <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-5 print:hidden">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-lg font-bold text-primary">🐾 맞춤형 가이드 선택</p>
          <p className="text-xs text-muted-foreground mt-1 leading-normal">
            선택한 동물에 맞추어 본문의 모든 식생활 지침, 인슐린 차트, 인쇄 양식 등이 한 번에 변경됩니다.
          </p>
        </div>
        <div className="inline-flex rounded-lg border bg-background p-0.5 shadow-sm self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setSpecies("dog")}
            className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-semibold transition active:scale-95 ${
              species === "dog"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>🐶</span> 강아지 가이드
          </button>
          <button
            type="button"
            onClick={() => setSpecies("cat")}
            className={`flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-semibold transition active:scale-95 ${
              species === "cat"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>🐱</span> 고양이 가이드
          </button>
        </div>
      </div>
    </div>
  );
}

// 개별 콘텐츠 래퍼 컴포넌트
// 페이지 레벨 토글이 있는 경우 불필요한 이중 버튼을 그리지 않고 컨테이너 역할만 합니다.
export function SpeciesToggle({
  defaultSpecies = "dog",
  children,
}: {
  defaultSpecies?: Species;
  children: React.ReactNode;
}) {
  const context = useSpecies();
  const [localSpecies, setLocalSpecies] = useState<Species>(defaultSpecies);

  // 페이지 상단에 전역 토글이 있으면 전역 상태를 사용하고 자체 토글 버튼을 생략합니다.
  if (context.hasPageToggle) {
    return <div className="my-6">{children}</div>;
  }

  // 폴백: 페이지 토글이 없는 독립형 사용 시 기존처럼 작동
  return (
    <div className="my-6 rounded-xl border border-border/80 bg-muted/20 p-4 shadow-sm">
      <div className="mb-3 inline-flex rounded-lg border bg-background p-0.5 text-sm print:hidden">
        <button
          type="button"
          onClick={() => setLocalSpecies("dog")}
          className={`rounded px-3 py-1 ${localSpecies === "dog" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
        >
          🐶 강아지
        </button>
        <button
          type="button"
          onClick={() => setLocalSpecies("cat")}
          className={`rounded px-3 py-1 ${localSpecies === "cat" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
        >
          🐱 고양이
        </button>
      </div>
      <SpeciesContext.Provider
        value={{
          species: localSpecies,
          setSpecies: setLocalSpecies,
          supportedSpecies: ["dog", "cat"],
          hasPageToggle: false,
        }}
      >
        {children}
      </SpeciesContext.Provider>
    </div>
  );
}

// 화면: 선택된 종만 표시 / 인쇄: 항상 표시(print:block)
export function Dog({ children }: { children: React.ReactNode }) {
  const { species } = useSpecies();
  return (
    <div className={species === "dog" ? "block" : "hidden print:block"}>
      <p className="mb-2 text-sm font-bold text-primary print:block">🐶 강아지 지침</p>
      <div className="pl-2 border-l-2 border-primary/20">{children}</div>
    </div>
  );
}

export function Cat({ children }: { children: React.ReactNode }) {
  const { species } = useSpecies();
  return (
    <div className={species === "cat" ? "block" : "hidden print:block"}>
      <p className="mb-2 text-sm font-bold text-primary print:block">🐱 고양이 지침</p>
      <div className="pl-2 border-l-2 border-primary/20">{children}</div>
    </div>
  );
}
