# Test Patterns

Vitest + React Testing Library 패턴 참조.

## 스택

- **Framework**: Vitest + React Testing Library
- **Coverage**: `@vitest/coverage-istanbul`
- **Setup**: `vitest.setup.ts` (auto-applies `@testing-library/jest-dom`)
- **Path alias**: `@/` → `src/`
- **globals**: false — 명시적 import 필수

## 파일 위치

```
src/entities/user/api/getUser.ts
→ src/entities/user/api/__tests__/getUser.test.ts
```

## 필수 임포트

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
```

## 기본 구조

```ts
describe("모듈명", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("정상 동작 — 한국어 설명", () => { ... })
  it("에러 상황 — 한국어 설명", () => { ... })
})
```

## API 목킹

```ts
vi.mock("@/entities/user/api/getUser")
vi.mocked(getUser).mockResolvedValue({ id: 1 })
vi.mocked(getUser).mockRejectedValue(new Error("서버 오류"))
```

## 외부 라이브러리 목킹

```ts
vi.mock("sonner")
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}))
```

## React 컴포넌트

```ts
const user = userEvent.setup()
render(<LoginForm />)
await user.type(screen.getByLabelText("이메일"), "test@example.com")
await user.click(screen.getByRole("button", { name: "로그인" }))
expect(mockSignin).toHaveBeenCalledWith({ email: "test@example.com" })
```

## Next.js middleware

```ts
import { NextRequest } from "next/server"
const req = new NextRequest(new URL("/dashboard", "http://localhost"), {
  headers: { Cookie: "accessToken=abc; refreshToken=xyz" },
})
```

## 날짜 의존 로직

```ts
beforeEach(() => { vi.setSystemTime(new Date("2026-05-06")) })
afterEach(() => { vi.useRealTimers() })
```

## 쿠키 (jsdom)

```ts
function clearAllCookies() {
  document.cookie.split(";").forEach(c => {
    const name = c.split("=")[0].trim()
    if (name) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  })
}
beforeEach(() => { clearAllCookies() })
```

## 테스트 범위

**해야 하는 것**: Happy path, 에러 상태, 엣지 케이스, 사용자 인터랙션

**하지 않는 것**: 구현 세부사항, 서드파티 내부, 단순 pass-through 코드

## 실행 명령

```bash
npm run test:run src/path/__tests__/file.test.ts  # 단일 파일
npm run test:run                                   # 전체
npm run test:coverage                              # 커버리지
```
