# FSD Architecture Rules

## 레이어 의존성 방향

```
app → views → widgets → entities → shared
```

각 레이어는 **아래 레이어만** import 가능.

## 금지 패턴

| 레이어 | 금지 import |
|--------|------------|
| `shared` | `entities`, `widgets`, `views`, `app` |
| `entities` | `widgets`, `views`, `app` |
| `widgets` | `views`, `app` |
| `views` | `app` |

## Cross-slice Import 금지

동일 레이어 내 슬라이스 간 import 불가.

```ts
// ❌ 금지
// src/entities/user/api/getUser.ts
import { getTeam } from "@/entities/team/api/getTeam"

// ✅ 허용
// src/widgets/form/ui/LoginForm.tsx
import { getUser } from "@/entities/user/api/getUser"
```

## TanStack Query 훅 위치

```
✅ src/views/rank/model/useGetRank.ts
✅ src/entities/user/model/useGetUser.ts
❌ src/shared/hooks/useGetRank.ts   (shared에 query 훅 금지)
❌ src/entities/user/hooks/useGetUser.ts  (hooks/ 폴더에 query 금지)
```

## API 패턴

```ts
// 일반 API (axios)
import instance from "@/shared/lib/axios"
export const getRank = async () => (await instance.get("/api/team/ranking")).data

// Auth API (native fetch만 — signin, signup, verify, refresh)
export const signin = async (data: SignInRequest) => {
  const response = await fetch("/api/signin", { method: "POST", body: JSON.stringify(data) })
  if (!response.ok) throw new Error((await response.json()).message)
  return response.json()
}
```

## 위반 탐지 명령

```bash
# shared가 상위 레이어 import하는지
grep -r 'from "@/entities' src/shared/
grep -r 'from "@/widgets' src/shared/
grep -r 'from "@/views' src/shared/

# entities가 상위 레이어 import하는지
grep -r 'from "@/widgets' src/entities/
grep -r 'from "@/views' src/entities/
```
