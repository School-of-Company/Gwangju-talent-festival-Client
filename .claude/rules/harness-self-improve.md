# 하네스 자가 개선 규칙

## 개선 트리거

다음 3가지 중 하나라도 해당되면 즉시 개선한다:

1. **반복 위반**: 같은 종류의 규칙 위반을 2회 이상 직접 수정하게 됨
2. **누락 워크플로우**: 에이전트 지시사항이 불완전해 스스로 채워야 했음
3. **새 패턴**: 코드베이스에서 자주 보이는 패턴이 어디에도 문서화되어 있지 않음

## 개선 프로세스

Observe → Evaluate → Edit → Log → Notify

1. **Observe**: 패턴/공백 발견
2. **Evaluate**: "이게 없어서 다음에도 실수하거나 헷갈릴까?" → Yes면 진행
3. **Edit**: 해당 .claude/ 파일 직접 수정
4. **Log**: .claude/HARNESS_CHANGELOG.md에 항목 추가
5. **Notify**: 사용자에게 알리고 커밋 진행

## 개선 대상 파일

| 파일 | 언제 수정 |
|------|-----------|
| .claude/rules/fsd-architecture.md | FSD 규칙에 새 케이스 추가 |
| .claude/rules/coding-standards.md | 금지 패턴 또는 네이밍 규칙 추가 |
| .claude/rules/git-workflow.md | 브랜치/커밋 전략 보완 |
| .claude/hooks/fsd-check.sh | 기존 검사가 잡지 못하는 케이스 추가 |
| .claude/agents/*.md | 에이전트 워크플로우 단계 보완 |
| .claude/skills/*.md | 새 패턴/레시피 문서화 |

## 수정하지 않는 것 (사용자 명시 요청 시에만)

- .claude/settings.json — 권한 목록 (보안 관련)
- .claude/hooks/branch-guard.sh — 보호 로직 및 exit code 동작

## 커밋 포맷

chore: 하네스 [대상] 보완 - [이유 한 줄]

예시:
- chore: 하네스 fsd-check 보완 - views→app 크로스슬라이스 감지 누락
- chore: 하네스 coding-standards 보완 - useEffect 의존성 배열 규칙 추가
