#!/bin/bash
# 브랜치 보호 훅
# PreToolUse (Bash) 전 main/develop에 커밋/푸시 시도 차단

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // ""' 2>/dev/null)

# git commit 또는 git push 명령인지 확인
if ! echo "$COMMAND" | grep -qE "^git (commit|push)"; then
  exit 0
fi

BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

if [[ "$BRANCH" == "main" || "$BRANCH" == "develop" ]]; then
  echo "🚫 보호 브랜치 감지: '$BRANCH'"
  echo ""
  echo "main과 develop에 직접 커밋/푸시는 금지되어 있습니다."
  echo "feature 브랜치를 생성하세요:"
  echo "  git checkout -b feat/<name> origin/develop"
  exit 2
fi

exit 0
