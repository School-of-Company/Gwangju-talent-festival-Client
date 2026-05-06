# 광탈페 클라이언트

광주 고등학교 학생회 주관 오디션 플랫폼 (3회). 신청·심사·좌석 예매·슬로건 제출 통합.

## 스택

TypeScript · Next.js 15 (App Router) · React 19 · Tailwind CSS · TanStack Query v5 · Zod · Vitest + RTL · Axios (auth는 native fetch)

## 명령어

```bash
npm run dev           # 개발 서버
npm run build         # 빌드
npm run lint          # ESLint
npm run test:run      # 테스트 (1회)
npm run test:coverage # 커버리지
```

## 폴더 구조

```
src/
├── app/         # 페이지, 레이아웃, API 라우트
├── views/       # 페이지 단위 UI 조합
├── widgets/     # 독립 UI 블록
├── entities/    # 도메인 모델 (user, ticket, team, judge, seat, slogan)
└── shared/      # 공통 API, hooks, lib, ui, utils
```

`@/` → `src/` · 레이어: `app → views → widgets → entities → shared`

## 핵심 규칙

→ 상세 규칙: `.claude/rules/` · 패턴: `.claude/skills/`

**절대 금지**
- `any` 타입 · `console.log` · 인라인 스타일 · URL/키 하드코딩
- FSD 역방향 import · TanStack Query를 `hooks/`에 배치
- auth API에 axios (signin/signup/verify/refresh → native fetch)
- `main` · `develop`에 직접 커밋/푸시

**Git**
- 커밋: `<type>: <한국어 주제>` · 마침표 없음 · 영역별 분리
- 브랜치: `develop` 기준 생성 · PR base: `develop` · 내용 한국어
- CI 통과 후 머지

**테스트**
- `__tests__/` 폴더 · vitest 명시적 import · 설명 한국어
- `vi.clearAllMocks()` in every `beforeEach`
