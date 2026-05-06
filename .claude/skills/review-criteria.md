# Review Criteria

코드 리뷰 체크리스트와 출력 포맷.

## 체크리스트

### 🚨 필수 확인
- **버그 가능성**: null/undefined 처리, 비동기 에러 처리, 엣지 케이스
- **보안**: XSS, 오픈 리다이렉트, 민감 정보 노출, 인증/인가 누락
- **타입 안전성**: `any` 사용 여부, 잘못된 타입 단언

### 🏗️ FSD 아키텍처
- 레이어 의존성 방향: `app → views → widgets → entities → shared`
- 역방향 참조 금지
- 동일 레이어 cross-slice import 금지
- TanStack Query 훅 위치: `model/` 폴더 (not `hooks/`)
- auth API는 native fetch, 나머지는 axios

### 💡 코드 품질
- 과도한 추상화, 사용되지 않는 코드
- 반복 로직 (DRY)
- `console.log` 잔재
- 인라인 스타일 사용 여부 (Tailwind only)
- 하드코딩된 URL/키

### 🧪 테스트
- 새 로직에 테스트가 있는지
- 테스트가 동작(behavior)을 검증하는지 (구현 세부사항 금지)
- `vi.clearAllMocks()`가 `beforeEach`에 있는지
- 테스트 설명이 한국어인지

## 출력 포맷

```markdown
## 코드 리뷰

### 🚨 필수 수정
- [파일명:라인] 문제점 및 제안

### 💡 권장 개선
- [파일명:라인] 문제점 및 제안

### 🔍 확인 사항 (선택)
- [파일명:라인] 의견

### ✅ 잘된 점
- ...
```

- 이슈 없는 섹션은 생략
- 문제 없으면 "이슈 없음" 명시
- 모든 항목에 파일 경로와 라인 번호 포함
- **출력은 한국어**
