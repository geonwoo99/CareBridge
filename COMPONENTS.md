# UI 컴포넌트 목록 (COMPONENTS)

이 프로젝트에서 자체적으로 제공하는 커스텀 UI 컴포넌트들의 목록과 사용법입니다.

## `StatusList`
- **용도**: 약물 복용, 준비사항 등 특정 상태에 따른 지침 목록을 강조할 때 사용합니다. 좌측 상단 배지와 아이콘 리스트를 제공합니다.
- **주요 props**: 
  - `type`: `"success"` | `"warning"` | `"danger"`
  - `badgeText`: 배지에 들어갈 텍스트 (예: `"평소처럼 복용"`)
  - `title`: 카드 메인 제목
  - `description`: (선택) 카드 부가 설명
  - `items`: `{ title: string, description?: string }` 배열
- **한 줄 예시**:
  ```tsx
  <StatusList type="success" badgeText="복용" title="계속 먹는 약" items={[{ title: "갑상선 약" }]} />
  ```

## `SourceNotice`
- **용도**: 가이드 글 본문 상단에 출처와 면책 안내를 표시합니다. 페이지 레이아웃(`page.tsx`)에서 자동 삽입되므로 MDX 본문에 직접 쓸 필요는 없습니다.
- **주요 props**:
  - `badge`: (선택, 기본 `"알려드립니다"`) 상단 배지 텍스트
  - `sources`: (선택) `{ label: string, href?: string }[]` — 출처 목록. `href`가 있으면 링크 표시.
  - `notes`: `string[]` — 면책 안내 문구 배열 (항상 표시)
- **한 줄 예시**:
  ```tsx
  <SourceNotice sources={[{ label: "WSAVA 2024", href: "https://..." }]} notes={["교육 목적"]} />
  ```
