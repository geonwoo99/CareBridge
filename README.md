# Carebridge (케어브릿지)

반려동물(강아지, 고양이)을 위한 **보호자 맞춤형 홈케어 및 진료 가이드라인**을 제공하는 웹 서비스입니다. 수의학적 근거(WSAVA, AAHA 등 글로벌 가이드라인)를 바탕으로 신뢰할 수 있는 정보를 아름답고 읽기 쉬운 인터페이스로 전달합니다.

## 🚀 기술 스택 (Tech Stack)
- **프레임워크**: Next.js 15 (App Router)
- **콘텐츠 관리**: Velite (Type-safe MDX)
- **스타일링**: Tailwind CSS & 커스텀 디자인 토큰 시스템
- **컴포넌트**: React

## 🛠 실행 방법 (Getting Started)

프로젝트를 로컬 환경에서 실행하는 방법입니다.

```bash
# 1. 의존성 패키지 설치
npm install

# 2. 로컬 개발 서버 실행 (localhost:3000)
npm run dev
```

## 📂 프로젝트 주요 구조
- `content/guides/` : 발행되는 모든 수의학 가이드 문서(MDX)가 저장되는 곳입니다.
- `components/primitives/` : 사이트를 구성하는 자체 제작 프리미엄 UI 컴포넌트(EvidenceQuote, CompareColumns 등) 모음입니다.
- `app/` : Next.js 라우팅 및 전역 레이아웃/스타일 설정이 위치합니다.
