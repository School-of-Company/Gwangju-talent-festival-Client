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
@.claude/rules/harness-self-improve.md

## 하네스 자가 개선

작업 중 다음 상황이 발생하면 **즉시** `.claude/` 파일을 수정한다:
- 훅이 잡지 못하는 위반을 2번 이상 발견
- 에이전트 워크플로우에서 누락된 단계 확인
- 규칙 파일에 없는 패턴이 반복적으로 등장

수정 후 반드시:
1. 변경 사항 검증 (문법 및 동작 확인, .sh 파일은 `bash -n`으로 검사)
2. `.claude/HARNESS_CHANGELOG.md`에 항목 추가
3. 사용자에게 "하네스를 개선했어요 [파일]: [이유]. 커밋할게요." 알림 후 커밋
