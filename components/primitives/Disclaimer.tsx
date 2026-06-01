// components/primitives/Disclaimer.tsx
// ─────────────────────────────────────────────────────────────
// 모든 교육자료 하단에 자동으로 들어가는 면책 문구입니다.
// 글마다 수동으로 쓰지 않습니다(rules/40). 문구를 바꾸려면
// site.config.ts 한 곳만 고치면 모든 글에 반영됩니다.
//
// 이 컴포넌트는 글 본문에 직접 쓰지 않고, 가이드 페이지 레이아웃에서
// 본문 끝에 자동으로 렌더링합니다.
// ─────────────────────────────────────────────────────────────

import { siteConfig } from "@/lib/site.config";

export function Disclaimer() {
  return (
    <p className="mt-10 border-t pt-4 text-xs leading-relaxed text-muted-foreground">
      {siteConfig.disclaimer}
    </p>
  );
}
