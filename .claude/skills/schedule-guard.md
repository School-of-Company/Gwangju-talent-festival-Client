# Schedule Guard Skill

오픈 시간이 중요한 프로젝트에서 기능이 정해진 시간에 정확히 열리고 닫히는지 검증하고 실수를 방지하기 위한 가이드입니다.

## 1. 전 계층 게이트 확인 (Full-Stack Gating)

오픈 전 접근을 막기 위해 모든 레이어에서 스케줄을 확인해야 합니다.
- **Middleware (Routing)**: `src/middleware.ts`에서 경로 진입을 차단합니다. (최우선 방어)
- **UI (Components)**: 버튼 숨김, 기간 안내 메시지 표시 등을 수행합니다. `src/widgets/main/` 등에서 `now`와 설정된 날짜를 비교합니다.
- **API (Action)**: (필요 시) 서버사이드 API 핸들러에서 직접 시간을 체크하여 부정한 접근을 차단합니다.

## 2. 시간 객체 관리 규칙 (No `new Date()` in Components)

컴포넌트 내에서 `new Date()`를 직접 호출하면 테스트 시 시스템 시간을 Mocking하기 어렵거나 예기치 않은 동작을 유발할 수 있습니다.
- **규칙**: 컴포넌트 내에서 직접 `new Date()`를 사용하지 않고, 서버 타임을 가져오거나 통합된 시간 유틸리티를 사용합니다.
- **테스트**: `vitest`의 `vi.setSystemTime`을 사용하여 다양한 시점(오픈 전, 정각, 종료 후)을 반드시 검증합니다.

## 3. 주석 처리된 게이트 관리 (Uncomment before Release)

개발/테스트 편의를 위해 임시로 주석 처리한 게이트 로직은 배포 전 반드시 활성화해야 합니다.
- `// TODO: 테스트 완료 후 주석 해제` 패턴을 사용하여 검색 가능하게 만듭니다.
- `/.claude/hooks/schedule-check.sh`를 실행하여 누락된 게이트가 없는지 확인합니다.

## 4. 환경 변수 활용

날짜 설정은 가급적 `src/shared/config/dateConfig.ts`에서 환경 변수를 통해 주입받도록 구성합니다.
- `NEXT_PUBLIC_SLOGAN_START_DATE` 등

## 5. 시간 여행 테스트 예시

```ts
import { describe, it, expect, vi, afterEach } from "vitest";
import { middleware } from "../middleware";

describe("오픈 스케줄 검증", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("오픈 전에는 /slogan 접근 시 리다이렉트되어야 한다", () => {
    vi.setSystemTime(new Date("2026-05-17T23:59:59"));
    // ... 검증 로직
  });
});
```
