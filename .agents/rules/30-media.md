---
activation: Always On
---

# 미디어(사진·영상·GIF) 사용 규약

## 제공 컴포넌트 (MDX에서 import 없이 사용)
- `<Figure>` — 사진. next/image 기반. props: `src`, `alt`(필수), `size`("small"|"medium"|"full"), `align`("left"|"center"|"right"), `caption`(선택)
- `<Video>` — 자체 호스팅 영상(mp4/webm). props: `src`, `width`, `muted`, `loop`, `autoplay`, `caption`
- `<YouTube>` — 유튜브 임베드. props: `id`(영상 ID), `caption`. 반응형 16:9.
- `<Gif>` — 움짤. 성능을 위해 가능하면 내부적으로 webp/mp4로 처리.

## 규칙
1. **모든 이미지/영상에 의미 있는 `alt` 또는 `caption`을 반드시 넣는다.** (접근성·화면낭독기 대응) alt 누락 금지.
2. 위치·크기는 컴포넌트의 정해진 props로만 제어한다. 임의 인라인 스타일 금지.
3. 미디어 파일은 글별로 `public/media/{slug}/` 폴더에 정리한다. 파일명은 소문자·하이픈.
4. 영상은 자체 업로드(`<Video>`)와 유튜브(`<YouTube>`)를 상황에 맞게 선택한다. 소리 없이 반복할 짧은 시연은 `<Video muted loop>` 권장.
5. 미디어가 매우 커지면(향후) 외부 스토리지로 옮기되 컴포넌트 인터페이스(`src`)는 유지해 콘텐츠를 안 고치게 한다.

## MDX 사용 예시
인슐린은 피부를 살짝 들어 텐트를 만든 뒤 주사합니다.

<Figure src="/media/diabetes/tent.jpg" alt="피부를 들어 텐트를 만든 모습" size="medium" align="center" caption="피부를 들어 올려 만든 '텐트' 공간" />

<YouTube id="abcd1234" caption="인슐린 주사 전체 과정" />
