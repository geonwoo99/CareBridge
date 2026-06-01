// components/media/Video.tsx
// ─────────────────────────────────────────────────────────────
// 직접 업로드한 영상(mp4/webm)을 넣는 컴포넌트입니다.
// 인슐린 주사 시연처럼 "소리 없이 반복 재생"할 짧은 영상에 적합합니다.
//   예) <Video src="/media/diabetes/inject.mp4" muted loop />
// ─────────────────────────────────────────────────────────────

type VideoProps = {
  src: string;
  caption?: string;
  width?: number; // 픽셀 폭(선택). 비우면 본문 폭에 맞춤
  muted?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  poster?: string; // 재생 전 표지 이미지(선택)
};

export function Video({
  src,
  caption,
  width,
  muted = false,
  loop = false,
  autoplay = false,
  poster,
}: VideoProps) {
  return (
    <figure
      className="my-6 mx-auto"
      style={width ? { maxWidth: `${width}px` } : undefined}
    >
      <video
        className="w-full rounded-lg"
        controls
        muted={muted}
        loop={loop}
        autoPlay={autoplay}
        playsInline
        poster={poster}
        // 인쇄 시 영상은 숨김(rules/50 인쇄 대응) — print:hidden
      >
        <source src={src} />
        브라우저가 영상을 지원하지 않습니다.
      </video>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
