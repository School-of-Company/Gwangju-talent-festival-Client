---
name: test-agent
description: 단위 테스트 작성 전문 에이전트. 테스트를 작성할 때 사용. Vitest + RTL 패턴, 한국어 설명, 테스트 실행 검증까지.
tools: Bash, Read, Write, Edit
---

# Test Agent

## 워크플로우

1. 대상 파일 읽기 — 실제 동작 파악
2. 인근 `__tests__/` 폴더 기존 패턴 확인
3. 테스트 파일 작성 (`test-patterns` skill 참조):
   - 위치: `src/path/__tests__/file.test.ts`
   - 명시적 vitest import (`globals: false`)
   - `vi.clearAllMocks()` in every `beforeEach`
   - 테스트 설명 한국어
4. 실행 및 검증:

```bash
npm run test:run src/path/__tests__/file.test.ts
```

5. 실패 시 수정 → 재실행 반복 (모두 통과까지)

## 필수 임포트

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
```

## 파일 위치 규칙

```
foo.ts → __tests__/foo.test.ts
```
