// components/primitives/Callout.tsx
// ─────────────────────────────────────────────────────────────
// 본문 중 강조하고 싶은 내용을 박스로 보여줍니다.
// "이 문단만 빨갛게" 같은 요청은 글에 색을 박지 말고(rules/20)
// 이 컴포넌트로 표현합니다. 종류(type)에 따라 색/아이콘이 정해집니다.
//   예) <Callout type="warning">24시간 이상 안 먹으면 연락하세요</Callout>
// ─────────────────────────────────────────────────────────────

type CalloutType = "info" | "tip" | "warning" | "danger";

const styles: Record<CalloutType, { box: string; label: string; icon: string }> = {
  info:    { box: "border-primary/30 bg-accent", label: "안내", icon: "🌿" },
  tip:     { box: "border-green-200 bg-green-50",  label: "TIP",   icon: "💡" },
  warning: { box: "border-amber-200 bg-amber-50",  label: "주의",   icon: "⚠️" },
  danger:  { box: "border-red-200 bg-red-50",      label: "응급",   icon: "🚨" },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}) {
  const s = styles[type];
  return (
    <div className={`my-5 rounded-lg border p-4 ${s.box}`}>
      <div className="mb-1 flex items-center gap-2 font-semibold">
        <span aria-hidden>{s.icon}</span>
        <span>{title ?? s.label}</span>
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
