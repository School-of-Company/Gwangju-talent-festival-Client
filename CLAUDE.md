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

## 규칙

@.claude/rules/fsd-architecture.md
@.claude/rules/git-workflow.md
@.claude/rules/coding-standards.md
