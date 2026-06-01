// components/primitives/PrintButton.tsx
// ─────────────────────────────────────────────────────────────
// "인쇄 / PDF로 저장" 버튼입니다. 누르면 브라우저 인쇄창이 열립니다.
// (클래스네임 주입을 통해 단순 텍스트 링크 형태로 변형 가능하게 변경)
// ─────────────────────────────────────────────────────────────

"use client";

type PrintButtonProps = {
  className?: string;
};

export function PrintButton({ className }: PrintButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className ?? "rounded-lg border px-3 py-1.5 text-sm hover:bg-muted print:hidden"}
    >
      🖨️ 인쇄 / PDF로 저장
    </button>
  );
}
