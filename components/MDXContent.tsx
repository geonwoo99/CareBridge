// components/MDXContent.tsx
// ─────────────────────────────────────────────────────────────
// Velite가 컴파일한 MDX 본문을, 우리가 등록한 컴포넌트들과 함께
// 화면에 그려주는 작은 헬퍼입니다.
// 여기서 mdxComponents를 연결하므로, 글에서 <Figure> <Callout> 등을
// import 없이 쓸 수 있게 됩니다.
// ─────────────────────────────────────────────────────────────

import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "@/components/mdx-components";

export function MDXContent({ code }: { code: string }) {
  // Velite는 본문을 실행 가능한 함수 코드 문자열로 컴파일합니다.
  const fn = new Function(code);
  const Component = fn({ ...runtime }).default;
  return <Component components={mdxComponents} />;
}
