# Skill: API Function Pattern

Reference for writing API functions consistently in this project.

## Rule: axios vs fetch

| API type | Client |
|----------|--------|
| All regular APIs | axios instance (`@/shared/lib/axios`) |
| Auth APIs (signin, signup, verify, refresh) | native `fetch` |

## Axios API Template

```ts
// src/views/<feature>/api/get<Resource>.ts
import instance from "@/shared/lib/axios"

export const get<Resource> = async (): Promise<<ResponseType>> => {
  const res = await instance.get("/api/<endpoint>")
  return res.data
}

export const post<Resource> = async (data: <RequestType>) => {
  const res = await instance.post("/api/<endpoint>", data)
  return res.data
}
```

## Auth API Template (native fetch)

```ts
// src/entities/user/api/signin.ts
export const signin = async (data: SignInRequest): Promise<SignInResponse> => {
  const response = await fetch("/api/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  if (!response.ok) throw new Error(result.message || "요청에 실패했습니다.")
  return result
}
```

## TanStack Query Hook Template

```ts
// src/views/<feature>/model/use<Resource>.ts
import { useQuery } from "@tanstack/react-query"
import { get<Resource> } from "../api/get<Resource>"

export const use<Resource> = () => {
  return useQuery<ResponseType>({
    queryKey: ["<resource>"],
    queryFn: get<Resource>,
  })
}
```

## Naming Conventions

- GET → `get<Resource>` (e.g. `getRank`, `getTeams`, `getSchool`)
- POST → `post<Resource>` (e.g. `postVote`, `postSlogan`)
- PATCH/toggle → `open<Resource>`, `close<Resource>` (e.g. `openVote`, `closeVote`)
- DELETE → `cancel<Resource>` (e.g. `cancelSeatBooking`)
- SAVE → `save<Resource>` (e.g. `saveScore`)
