# Performance Patterns

성능 최적화 유형과 이 프로젝트의 공통 패턴.

## 최적화 유형

- 불필요한 리렌더링 제거 (React.memo, useMemo, useCallback)
- TanStack Query 캐시 최적화 (`staleTime`, `gcTime`, `enabled`)
- 코드 스플리팅 / lazy loading (dynamic import)
- 번들 크기 감소 (미사용 의존성 제거, dynamic import)
- 이미지 최적화 (Next.js `<Image>`, 크기, 포맷)
- 불필요한 API 호출 제거
- Server Component 전환 (`"use client"` 제거)

## 공통 코드 패턴

```ts
// 불필요한 리렌더링 방지
const Component = memo(function Component({ ... }) { ... })

// TanStack Query 캐시 최적화
useQuery({
  queryKey: ["school", name],
  queryFn: () => getSchool(name),
  staleTime: 1000 * 60 * 60 * 24,
  gcTime: 1000 * 60 * 60 * 24,
})

// 무거운 컴포넌트 lazy load
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <Spinner />,
})

// Server Component 전환 — "use client" 제거 후 props로 데이터 전달
```

## 커밋 예시

```
perf: SigninForm memo 적용으로 불필요한 리렌더링 제거
perf: useGetSchool staleTime 24시간으로 설정
perf: HeavyComponent dynamic import로 코드 분리
perf: 미사용 의존성 제거로 번들 크기 감소
perf: RankList Server Component로 전환
```

## 검증

- 최적화 전후 동작이 동일한지 확인
- `npm run test:run` 으로 기존 테스트 통과 확인
- 추측 최적화 금지 — 병목 확인 후 적용
