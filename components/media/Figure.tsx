// components/media/Figure.tsx
// ─────────────────────────────────────────────────────────────
// 글 안에 사진을 넣는 컴포넌트입니다.
// next/image 기반이라 자동으로 최적화·지연로딩됩니다.
//
// 위치(align)와 크기(size)는 "정해진 옵션"으로만 지정합니다.
// → 글마다 제각각이 되지 않게 막아, 사진 100개가 들어가도 룩이 통일됩니다.
//   (임의의 px·인라인 스타일을 쓰지 않는 것이 규칙입니다 — rules/20)
// ─────────────────────────────────────────────────────────────

import Image from "next/image";

type FigureProps = {
  src: string;
  alt: string; // ★ 필수: 화면낭독기·접근성용 이미지 설명
  size?: "small" | "medium" | "full"; // 크기(정해진 3단계)
  align?: "left" | "center" | "right"; // 정렬
  caption?: string; // 사진 아래 설명(선택)
  width?: number; // 원본 비율 계산용(선택, 기본 1200)
  height?: number;
};

// 크기 옵션을 토큰처럼 한 곳에서 관리(여기만 고치면 모든 사진에 반영)
const sizeClass: Record<NonNullable<FigureProps["size"]>, string> = {
  small: "max-w-xs",
  medium: "max-w-md",
  full: "max-w-full",
};

const alignClass: Record<NonNullable<FigureProps["align"]>, string> = {
  left: "mr-auto",
  center: "mx-auto",
  right: "ml-auto",
};

export function Figure({
  src,
  alt,
  size = "full",
  align = "center",
  caption,
  width = 1200,
  height = 800,
}: FigureProps) {
  return (
    <figure className={`my-6 ${sizeClass[size]} ${alignClass[align]}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full rounded-lg"
        sizes="(max-width: 768px) 100vw, 768px"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
