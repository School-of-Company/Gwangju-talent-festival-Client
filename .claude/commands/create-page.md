Create an App Router page for the given route: $ARGUMENTS

## Rules

- Pages are Server Components by default — do not add `"use client"` unless necessary
- Always include `generateMetadata` for SEO
- Always create `loading.tsx` and `error.tsx` alongside `page.tsx`
- If the page fetches data, use TanStack Query with server-side prefetch + hydration pattern
- API functions go in `src/views/<page>/api/`
- Query hooks go in `src/views/<page>/model/`
- Page UI composition goes in `src/views/<page>/ui/` or directly in the view

## File Structure to Create

```
src/
├── app/<route>/
│   ├── page.tsx       # Server Component entry
│   ├── loading.tsx    # Suspense fallback
│   └── error.tsx      # Error boundary
└── views/<route>/
    ├── api/
    │   └── get<Page>.ts
    └── model/
        └── useGet<Page>.ts
```

## page.tsx Template

```tsx
// src/app/<route>/page.tsx
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "페이지 제목 | 光탈페",
  description: "페이지 설명",
}

export default async function <Page>Page() {
  return (
    <main>
      {/* view component */}
    </main>
  )
}
```

## page.tsx Template (with data fetching)

```tsx
// src/app/<route>/page.tsx
import { Metadata } from "next"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { get<Page> } from "@/views/<route>/api/get<Page>"

export const metadata: Metadata = {
  title: "페이지 제목 | 光탈페",
  description: "페이지 설명",
}

export default async function <Page>Page() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })

  await queryClient.prefetchQuery({
    queryKey: ["<page>"],
    queryFn: get<Page>,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        {/* view component */}
      </main>
    </HydrationBoundary>
  )
}
```

## loading.tsx Template

```tsx
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <span className="text-gray-400">로딩 중...</span>
    </div>
  )
}
```

## error.tsx Template

```tsx
"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p className="text-gray-600">{error.message || "오류가 발생했습니다."}</p>
      <button onClick={reset} className="text-blue-500 underline">
        다시 시도
      </button>
    </div>
  )
}
```

## Steps

1. Confirm the route path and whether data fetching is needed
2. Create `app/<route>/page.tsx`, `loading.tsx`, `error.tsx`
3. If data fetching needed, also create `views/<route>/api/` and `views/<route>/model/`
4. List all created files with their paths
