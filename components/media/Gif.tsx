// components/media/Gif.tsx
// ─────────────────────────────────────────────────────────────
// 짧은 움짤(움직이는 이미지)을 넣는 컴포넌트입니다.
//
// ★ 중요: 진짜 .gif 파일은 용량이 매우 큽니다. 성능을 위해
//   가능하면 .mp4 또는 .webm으로 변환해 src에 넣어주세요.
//   (이 컴포넌트는 그런 짧은 영상을 자동재생·무한반복·무음으로 틀어
//    'gif처럼' 보이게 합니다.)
//   .gif 파일을 그대로 쓸 수도 있지만 권장하지 않습니다.
// ─────────────────────────────────────────────────────────────

type GifProps = {
  src: string;
  alt: string; // 설명(접근성)
  width?: number;
  caption?: string;
};

export function Gif({ src, alt, width, caption }: GifProps) {
  const isVideo = /\.(mp4|webm)$/i.test(src);

  return (
    <figure
      className="my-6 mx-auto"
      style={width ? { maxWidth: `${width}px` } : undefined}
    >
      {isVideo ? (
        // mp4/webm이면 gif처럼 자동재생·무한반복·무음으로 재생(권장)
        <video
          className="w-full rounded-lg"
          autoPlay
          loop
          muted
          playsInline
          aria-label={alt}
        >
          <source src={src} />
        </video>
      ) : (
        // 진짜 gif 파일인 경우(비권장)
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="w-full rounded-lg" />
      )}
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
