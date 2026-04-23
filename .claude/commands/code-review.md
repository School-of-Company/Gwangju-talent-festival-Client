Review the current branch changes against develop: $ARGUMENTS

## Rules

- **All review output must be written in Korean**

## Instructions

1. Run `git diff develop...HEAD` to get the full diff
2. Read the changed files directly to understand context
3. Review against the criteria below
4. Output findings organized by category

## Review Criteria

### 필수 확인
- **버그 가능성**: null/undefined 처리, 비동기 에러 처리, 엣지 케이스
- **보안**: XSS, 오픈 리다이렉트, 민감 정보 노출, 인증/인가 누락
- **타입 안전성**: `any` 사용, 잘못된 타입 단언

### 코드 품질
- **FSD 규칙 준수**: 레이어 의존성 방향 `app` → `views` → `widgets` → `entities` → `shared`, 역방향 참조 금지
- **불필요한 복잡도**: 과도한 추상화, 사용되지 않는 코드
- **중복**: 반복되는 로직

### 테스트
- 새 로직에 테스트가 있는지
- 테스트가 구현 세부사항이 아닌 동작을 검증하는지

## Output Format

```
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

- 이슈가 없으면 해당 섹션 생략
- 문제가 전혀 없으면 "이슈 없음" 명시
- 각 항목에 파일 경로와 라인 번호 포함
