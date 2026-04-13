# Gwangju Talent Festival Client - Project Context

## Project Overview

Integrated web platform for **光탈페 (Gwangju Talent Festival)**, a student-led audition program operated by the Gwangju High School Student Council.
The site handles all procedures in one place — audition registration, judging, seat reservation, slogan submission — and serves as the official promotional site for the 3rd festival.

- **Language**: TypeScript
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Architecture**: FSD (Feature-Sliced Design)
- **Styling**: Tailwind CSS
- **Server State**: TanStack Query v5
- **HTTP Client**: Axios (auth APIs use native `fetch`)
- **Validation**: Zod
- **Notification**: Sonner (toast)
- **Analytics**: nextjs-google-analytics
- **Test**: Vitest + React Testing Library + `@vitest/coverage-istanbul`
- **CI**: GitHub Actions + `davelosert/vitest-coverage-report-action@v2`

## Commands

```bash
npm run dev           # Start development server
npm run build         # Production build
npm run lint          # Run ESLint
npm run test          # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:coverage # Run tests with coverage report
```

## Folder Structure

```
src/
├── app/            # Next.js App Router — pages, layouts, API routes
│   └── api/        # Route handlers (catch-all proxy + specific handlers)
├── views/          # Page-level UI composition
│   └── [feature]/
│       ├── api/    # API functions for this view
│       └── model/  # TanStack Query hooks + type definitions
├── widgets/        # Independent UI blocks (forms, sections)
├── entities/       # Domain models — user, ticket, team, judge, seat, slogan
│   └── [domain]/
│       ├── api/    # API functions
│       └── model/  # Query hooks + types
├── shared/
│   ├── api/        # Cross-feature API functions
│   ├── config/     # authConfig, voteHashMapping, etc.
│   ├── hooks/      # Cross-feature utility hooks
│   ├── lib/        # axios.ts, redis.ts, ga.tsx
│   ├── ui/         # Shared UI primitives (exported via index.ts)
│   └── utils/      # Pure utility functions
└── middleware.ts
```

- Path alias: `@/` → `src/`
- Layer dependency: `app` → `views` → `widgets` → `entities` → `shared`
- Reverse imports are strictly forbidden
- Test files: `__tests__/` directory next to the source (`foo.ts` → `__tests__/foo.test.ts`)

## Coding Conventions

### FSD Layer Rules

Layer dependency direction is strictly enforced:

```
app → views → widgets → entities → shared
```

- Each layer may only import from layers **below** it
- Cross-slice imports within the same layer are forbidden
  - e.g. `entities/user` cannot import from `entities/team`
- `shared` cannot import from any other layer
- TanStack Query hooks belong in `model/` — never in `hooks/`

### Naming

- Components: `PascalCase.tsx`, default export
- Utilities / hooks: `camelCase.ts`
- Constants: `UPPER_SNAKE_CASE`
- Types / Interfaces: `PascalCase` — both `interface` and `type` are acceptable for component props
- API functions: verb + noun — `get*`, `post*`, `cancel*`, `open*`, `close*`, `save*`
- Query hooks: `use` prefix inside `model/` folder — e.g. `useGetRank.ts`
- API URL: lowercase + kebab-case, singular (`/team`, `/seat/myself`)

### API Pattern

Most APIs use the shared axios instance. **Auth-related APIs (signin, signup, verify, refresh) use native `fetch` instead.**

```ts
// src/shared/lib/axios.ts — use this instance for all non-auth requests
import instance from "@/shared/lib/axios"

// Regular API (axios)
export const getRank = async () => {
  const res = await instance.get("/api/team/ranking")
  return res.data
}

// Auth API (native fetch)
export const signin = async (data: SignInRequest): Promise<SignInResponse> => {
  const response = await fetch("/api/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  if (!response.ok) throw new Error(result.message || "로그인에 실패했습니다.")
  return result
}
```

### TanStack Query Pattern

Query hooks live in `model/` folders inside each feature. Do not put them in `hooks/`.

```ts
// src/views/rank/model/useGetRank.ts
import { useQuery } from "@tanstack/react-query"
import { getRank } from "../api/getRank"

export const useGetRank = () => {
  return useQuery<Rank[]>({
    queryKey: ["rank"],
    queryFn: getRank,
  })
}

// With conditional fetching
export const useGetVote = (team: string) => {
  return useQuery<Response>({
    queryKey: ["vote", team],
    queryFn: () => getVote(team),
    enabled: team !== "",
  })
}
```

### Component Pattern

```ts
// Props: prefer interface
interface ButtonProps {
  label: string
  onClick: () => void
  className?: string
}

// Default export
export default function Button({ label, onClick, className }: ButtonProps) {
  return (
    <button onClick={onClick} className={cn("...", className)}>
      {label}
    </button>
  )
}
```

### Environment Variables

```ts
// ✅ Use env vars for all external URLs and keys
const BASE_URL = process.env.NEXT_PUBLIC_API_URL
const SCHOOL_KEY = process.env.NEXT_PUBLIC_SCHOOL_KEY

// ❌ Never hardcode
const BASE_URL = "https://api.stateinfra.kr"
```

### Testing

- Always import explicitly from `vitest` — `globals: false`
  ```ts
  import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
  ```
- Write test descriptions in Korean
  ```ts
  it("전화번호 형식이 잘못되면 API를 호출하지 않는다", ...)
  ```
- Group with `describe`, individual cases with `it`
- Call `vi.clearAllMocks()` in every `beforeEach`

## Never Do

- Do not use `any` type
- Do not leave `console.log` in production code
- Do not use inline styles — use Tailwind classes only
- Do not hardcode URLs or API keys — use environment variables
- Do not use `eslint-disable` without a clear reason
- Do not import from a higher FSD layer into a lower one (e.g. `shared` importing from `entities`)
- Do not put TanStack Query hooks in `hooks/` — they belong in `model/`
- Do not use axios for auth APIs (signin, signup, verify, refresh) — use native `fetch`
- **NEVER commit or push directly to `main` or `develop`** — always work on a feature branch and open a PR

## Branch Strategy

```
main ← develop ← feat/<name>
                ← fix/<name>
                ← test/<name>
                ← chore/<name>
                ← ...
```

- All feature branches must be created from `develop`
- Feature branches merge into `develop` via PR
- `develop` merges into `main` via PR (release)
- **Direct commits or pushes to `main` or `develop` are strictly forbidden**

| Branch | Purpose |
|--------|---------|
| `main` | Production deployment |
| `develop` | Integration base — all PRs target here |
| `feat/<name>` | New feature |
| `fix/<name>` | Bug fix |
| `test/<name>` | Test code |
| `chore/<name>` | Config, dependencies |
| `refactor/<name>` | Code improvement |
| `perf/<name>` | Performance improvement |
| `design/<name>` | UI design change |
| `docs/<name>` | Documentation |

## Git Conventions

```
<type>: <subject>
```

| Type | Usage |
|------|-------|
| `feat` | Add new feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Formatting, whitespace — no logic change |
| `refactor` | Code improvement without behavior change |
| `test` | Add or modify tests |
| `chore` | Build config, package manager, etc. |
| `design` | UI design change |
| `comment` | Update comments |
| `init` | Project initialization |
| `rename` | Rename or move files / folders |
| `remove` | Delete files or folders |
| `perf` | Performance improvement |

**Writing Rules:**
- Subject must be written in Korean
- No period at end of subject line

**Commit Granularity Rules:**
- Keep commits as small as possible — one commit = one unit of change
- Always split into separate commits when change areas differ:
  - Feature code / test code / config files → separate commits
  - Different domains (e.g. `user` + `team` related files) → separate commits
- If grouping is unavoidable, only bundle files of the same nature

## PR Rules

- Title: `type: 한국어 설명` (70자 이내)
- Body: must follow `.github/PULL_REQUEST_TEMPLATE.md` — **💡 PR 요약**, **📋 작업 내용**, **🤝 리뷰 시 참고사항** 섹션 포함
- Base branch: always `develop`
- Merge only after CI passes

## Slash Commands

| Command | Description |
|---------|-------------|
| `/create-branch <type>/<name>` | Create a new branch from develop |
| `/write-test <file>` | Write unit tests for the specified file |
| `/commit` | Analyze changes and create a commit |
| `/pr` | Draft and create a pull request |
| `/code-review` | Review current branch changes |
| `/resolve <PR number>` | Reply to all open PR review comments |
| `/perf <file>` | Improve performance of the specified target |

## New Feature Checklist

- [ ] Create page / view component
- [ ] Create widget (form, section)
- [ ] Add entity API function (axios or fetch depending on type)
- [ ] Add TanStack Query hook in `model/` folder
- [ ] Add Zod schema + types
- [ ] Add error handling
- [ ] Write unit tests
