// components/interactive/PostSurgeryBlocks.tsx
// ─────────────────────────────────────────────────────────────
// post-surgery.mdx 전용 프리셋 래퍼 모음.
// content/data/post-surgery.ts의 값을 각 컴포넌트에 주입해,
// MDX에서 인자 없이 바로 쓸 수 있게 합니다(하드코딩 방지).
// ─────────────────────────────────────────────────────────────

"use client";

import { RecoveryTracker } from "@/components/primitives/RecoveryTracker";
import { ExpandableCards } from "@/components/primitives/ExpandableCards";
import {
  POST_SURGERY_STAGES,
  POST_SURGERY_QNA,
  POST_SURGERY_RED_FLAGS,
} from "@/content/data/post-surgery";

export function PostSurgeryTracker() {
  return (
    <RecoveryTracker
      stages={POST_SURGERY_STAGES}
      dateLabel="수술일"
      badgeText="Recovery Tracker"
      title="수술일을 입력하면 회복 일차에 맞춘 안내를 보여드려요"
      storageKey="post-surgery"
    />
  );
}

export function PostSurgeryQnA() {
  return <ExpandableCards items={POST_SURGERY_QNA} />;
}

export function PostSurgeryRedFlags() {
  // 배열을 ExpandableCards 형식으로 변환하지 않고,
  // 단순 리스트로 렌더링하는 게 응급 신호에 더 적합.
  return (
    <ul className="my-4 space-y-2">
      {POST_SURGERY_RED_FLAGS.map((label, i) => (
        <li key={i}>{label}</li>
      ))}
    </ul>
  );
}
