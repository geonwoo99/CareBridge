# ROADMAP — DVM. Geonwoo Ko 보호자 교육 사이트

이 문서는 프로젝트 전체의 할 일과 진행 상황을 추적합니다.
새 작업을 시작하거나 끝낼 때 이 파일의 체크박스를 업데이트하세요.

---

## ✅ 완료 (Done)

- [x] 기술 스택 결정 (Next.js + TypeScript + Tailwind + Velite + MDX + Vercel)
- [x] 규칙 파일 6종 작성 (.agents/rules/)
- [x] 워크플로우 3종 작성 (/new-guide, /review-check, /redesign)
- [x] 핵심 설정 파일 (site.config.ts, velite.config.ts)
- [x] 미디어 컴포넌트 4종 (Figure, Video, YouTube, Gif)
- [x] 공통 컴포넌트 (Callout, Checklist, SpeciesToggle, Disclaimer)
- [x] 카드 컴포넌트 (StatGrid, ExpandableCards)
- [x] 프로젝트 초기화 (package.json, layout, globals.css 등)
- [x] 디자인 토큰 — 초록 시그니처 + 명조 제목(Gowun Batang) + Pretendard 본문
- [x] 첫 콘텐츠 "백신 접종 후 가정 관찰" 페이지 디자인 및 수의학 검수·정식 발행 완료
  - [x] 급성 알러지 증상 내용 (ExpandableCards) 수의학적 검토 및 구조화
  - [x] WSAVA 2024 통계 기반 부작용 발생 빈도 수치 및 출처 확정
  - [x] frontmatter 검수 필드 정비 및 `draft: false` 정식 발행

---

## 🔜 진행 중 / 다음 할 일 (In Progress / Next)

- [x] 두 번째 가이드 작성 및 대화형 계산기/지침 이식 완료 (수면 중 호흡수 - SRR)
- [~] 세 번째 가이드 초안 작성 완료 (당뇨 가정 관리) [draft: true]
- [x] 네 번째 가이드 작성 및 이미지 생성·발행 완료 (눈물자국 원인과 관리)
- [~] 다섯 번째 가이드 작성 및 이미지 생성 완료 (가수분해 사료의 과학적 원리와 올바른 급여법) [draft: true]
- [ ] Vercel 배포 (도메인 연결)
- [ ] QR 코드 / 인쇄 기능 실제 동작 최종 확인

---

## 📋 나중에 (Later)

- [ ] 평가표·계산기 등 도구형(tool) 페이지 첫 구현
- [ ] 점수 저장 기능 — 1단계 브라우저 저장 → 2단계 식별코드 + Supabase
- [ ] Keystatic 연동 (비개발자 협업용 콘텐츠 편집)
- [ ] 콘텐츠 검수 자동화 (/review-check 정기 실행)
- [ ] 검색 기능 (글 50개 이상 시 pagefind 검토)
- [ ] 연락처·카카오톡 정보 site.config.ts에 입력 (소속 확정 시)

---

## 📌 메모

- 모든 의학 수치·내용은 출처 없이 임의로 만들지 않는다.
- 디자인 변경은 /redesign 으로, content/ 폴더는 건드리지 않는다.
- slug(URL)는 한 번 정하면 바꾸지 않는다.
