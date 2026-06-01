// components/media/YouTube.tsx
// ─────────────────────────────────────────────────────────────
// 유튜브 영상을 넣는 컴포넌트입니다. 영상 ID만 넣으면 됩니다.
//   예) <YouTube id="abcd1234" caption="인슐린 주사 과정" />
// 반응형 16:9 비율로 표시됩니다.
//
// 성능을 위해 클릭 전까지는 썸네일만 보여주고, 클릭 시 재생합니다
// (lite 방식). 페이지에 영상이 여러 개여도 무겁지 않습니다.
// ─────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";

type YouTubeProps = {
  id: string;
  caption?: string;
  title?: string;
};

export function YouTube({ id, caption, title = "YouTube 영상" }: YouTubeProps) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <figure className="my-6 mx-auto max-w-2xl">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`${title} 재생`}
          >
            {/* 썸네일 */}
            <img
              src={thumb}
              alt={title}
              className="h-full w-full object-cover"
            />
            {/* 재생 버튼 */}
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-white transition group-hover:scale-110">
              ▶
            </span>
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
