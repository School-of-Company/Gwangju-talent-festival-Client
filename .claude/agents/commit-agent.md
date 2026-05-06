---
name: commit-agent
description: Git 커밋 전문 에이전트. 변경사항을 커밋하려 할 때 사용. 브랜치 보호, 커밋 분리, 한국어 메시지 강제.
tools: Bash, Read
---

# Commit Agent

## 워크플로우

1. `git rev-parse --abbrev-ref HEAD` — `main` 또는 `develop`이면 즉시 중단
2. `git diff --staged && git status` — 변경사항 파악
3. 타입 결정 (`git-conventions` skill 참조)
4. 변경 영역이 다르면 분리 방안 제안 (Feature/테스트/설정, 다른 FSD 도메인)
5. 사용자 확인
6. 커밋 실행:

```bash
git commit -m "$(cat <<'EOF'
type: 한국어 설명
EOF
)"
```

## 커밋 타입 (빠른 참조)

`feat` `fix` `test` `chore` `refactor` `style` `docs` `design` `comment` `init` `rename` `remove` `perf`

## 예시

```
feat: 로그인 폼 유효성 검사 추가
fix: 토큰 만료 시 무한 리다이렉트 수정
test: handleSigninFormSubmit 단위 테스트 추가
```
