Improve performance of the specified file or feature: $ARGUMENTS

## Rules

- All commit messages must be written in Korean
- Keep commits as small as possible — one optimization per commit
- Branch must follow: `perf/<name>` created from `develop`
- **Measure before and after** — do not optimize without evidence of a bottleneck

## What Counts as Performance Improvement

- Reducing unnecessary re-renders (React.memo, useMemo, useCallback)
- Optimizing TanStack Query cache (`staleTime`, `gcTime`, `enabled`)
- Code splitting / lazy loading components
- Reducing bundle size (removing unused dependencies, dynamic imports)
- Image optimization (Next.js `<Image>`, size, format)
- Eliminating redundant API calls
- Server Component conversion (removing unnecessary `"use client"`)

## Instructions

0. **Run `git rev-parse --abbrev-ref HEAD` first. If the current branch is `main` or `develop`, STOP and tell the user to create a `perf/<name>` branch first.**

1. Read the target file(s) and identify the performance bottleneck
2. Confirm the issue before optimizing — do not optimize speculatively
3. Apply the optimization
4. Check that behavior is unchanged after the change
5. Run existing tests to confirm nothing broke:
   ```bash
   npm run test:run
   ```
6. Propose commits grouped by optimization type

## Common Patterns in This Project

```ts
// ✅ Prevent unnecessary re-renders
const Component = memo(function Component({ ... }) { ... })

// ✅ Optimize TanStack Query cache
useQuery({
  queryKey: ["school", name],
  queryFn: () => getSchool(name),
  staleTime: 1000 * 60 * 60 * 24,
  gcTime: 1000 * 60 * 60 * 24,
})

// ✅ Lazy load heavy components
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <Spinner />,
})

// ✅ Convert to Server Component where possible (remove "use client")
```

## Commit Examples

```
perf: SigninForm memo 적용으로 불필요한 리렌더링 제거
perf: useGetSchool staleTime 24시간으로 설정
perf: HeavyComponent dynamic import로 코드 분리
perf: 미사용 의존성 제거로 번들 크기 감소
```
