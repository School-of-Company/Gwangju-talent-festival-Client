Write unit tests for the specified file or feature: $ARGUMENTS

## Project Testing Context

- **Framework**: Vitest + React Testing Library
- **Coverage**: `@vitest/coverage-istanbul`
- **Setup file**: `vitest.setup.ts` (`@testing-library/jest-dom` 자동 적용)
- **Path alias**: `@/` maps to `src/`
- **Run tests**: `npm run test:run src/path/to/file.test.ts`
- **Run all**: `npm run test:run`
- **Coverage**: `npm run test:coverage`

## Instructions

1. **Read the target file first** before writing any tests. Understand what it actually does.

2. **Follow existing test patterns** — check nearby `__tests__/` files for conventions used in this codebase.

3. **Test structure**:
   - Place test file in `__tests__/` directory next to the source file
   - `foo.ts` → `__tests__/foo.test.ts`
   - Group with `describe`, name cases with `it`
   - Import `describe`, `it`, `expect`, `vi`, `beforeEach`, `afterEach` from `vitest` (globals: false)

4. **Mocking**:
   - API 함수: `vi.mock("@/entities/.../api/...")`
   - 외부 라이브러리: `vi.mock("sonner")`, `vi.mock("next/navigation")` 등
   - `vi.mocked(fn)`으로 타입 안전하게 사용
   - 각 테스트 전 `vi.clearAllMocks()` 호출

5. **React components**: `render`, `screen`, `userEvent` from `@testing-library/react`
   ```ts
   import { render, screen } from "@testing-library/react";
   import userEvent from "@testing-library/user-event";
   ```

6. **Next.js middleware**: `NextRequest`를 직접 생성해서 테스트
   ```ts
   import { NextRequest } from "next/server";
   new NextRequest(new URL("/path", "http://localhost"), {
     headers: { Cookie: "accessToken=abc; refreshToken=xyz" },
   });
   ```

7. **Date-dependent logic**: `vi.setSystemTime(new Date(...))` + `vi.useRealTimers()`

8. **cookies (jsdom)**: `document.cookie`로 직접 설정/초기화
   ```ts
   beforeEach(() => {
     document.cookie.split(";").forEach(c => {
       const name = c.split("=")[0].trim();
       if (name) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
     });
   });
   ```

9. **What to test**:
   - Happy path (정상 동작)
   - Error states (API 실패, 유효성 오류)
   - Edge cases (오픈 리다이렉트 방지, 권한 분기 등)
   - User interactions (UI 컴포넌트)

10. **What NOT to test**:
    - 구현 세부사항 (내부 상태, private 메서드)
    - 서드파티 라이브러리 내부 동작
    - 단순 pass-through 코드

11. After writing, run the tests to confirm they pass:
    ```bash
    npm run test:run src/path/to/__tests__/file.test.ts
    ```
    Fix any failures before finishing.
