Write unit tests for the specified file or feature: $ARGUMENTS

## Testing Stack

- **Framework**: Vitest + React Testing Library
- **Coverage**: `@vitest/coverage-istanbul`
- **Setup file**: `vitest.setup.ts` (auto-applies `@testing-library/jest-dom`)
- **Path alias**: `@/` → `src/`
- **Run single file**: `npm run test:run src/path/to/__tests__/file.test.ts`
- **Run all**: `npm run test:run`
- **Coverage**: `npm run test:coverage`

## Instructions

1. **Read the target file first** before writing any tests. Understand what it actually does.

2. **Follow existing test patterns** — check nearby `__tests__/` files for conventions used in this codebase.

3. **Test structure**:
   - Place test file in `__tests__/` directory next to the source file
   - `foo.ts` → `__tests__/foo.test.ts`
   - Group with `describe`, name cases with `it`
   - Always import explicitly from `vitest` — `globals: false`
     ```ts
     import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
     ```

4. **Mocking**:
   - API functions: `vi.mock("@/entities/.../api/...")`
   - External libraries: `vi.mock("sonner")`, `vi.mock("next/navigation")`, etc.
   - Use `vi.mocked(fn)` for type-safe access to mocked functions
   - Call `vi.clearAllMocks()` in every `beforeEach`

5. **React components**: use `render`, `screen`, `userEvent`
   ```ts
   import { render, screen } from "@testing-library/react"
   import userEvent from "@testing-library/user-event"
   ```

6. **Next.js middleware**: create `NextRequest` directly
   ```ts
   import { NextRequest } from "next/server"
   new NextRequest(new URL("/path", "http://localhost"), {
     headers: { Cookie: "accessToken=abc; refreshToken=xyz" },
   })
   ```

7. **Date-dependent logic**: use `vi.setSystemTime` + restore in `afterEach`
   ```ts
   afterEach(() => { vi.useRealTimers() })
   ```

8. **Cookies (jsdom)**: use `document.cookie` directly
   ```ts
   function clearAllCookies() {
     document.cookie.split(";").forEach(c => {
       const name = c.split("=")[0].trim()
       if (name) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
     })
   }
   beforeEach(() => { clearAllCookies() })
   ```

9. **What to test**:
   - Happy path (normal behavior)
   - Error states (API failure, validation errors)
   - Edge cases (open redirect prevention, permission branching, etc.)
   - User interactions (UI components)

10. **What NOT to test**:
    - Implementation details (internal state, private methods)
    - Third-party library internals
    - Simple pass-through code

11. After writing, run the tests to confirm they pass:
    ```bash
    npm run test:run src/path/to/__tests__/file.test.ts
    ```
    Fix any failures before finishing.
