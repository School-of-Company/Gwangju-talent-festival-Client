#!/bin/bash
# 테스트 자동 실행 훅
# PostToolUse (Write) 후 테스트 파일이 작성되면 자동 실행

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // ""' 2>/dev/null)

# __tests__/ 폴더의 .test.ts(x) 파일인지 확인
if [[ "$FILE" != */__tests__/*.test.ts ]] && [[ "$FILE" != */__tests__/*.test.tsx ]]; then
  exit 0
fi

PROJECT_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)"
if [[ -z "$PROJECT_ROOT" ]]; then
  exit 0
fi

echo "🧪 테스트 파일 감지 — 자동 실행: $FILE"
echo ""

cd "$PROJECT_ROOT" && npm run test:run "$FILE" 2>&1
EXIT_CODE=$?

if [[ $EXIT_CODE -eq 0 ]]; then
  echo ""
  echo "✅ 모든 테스트 통과"
else
  echo ""
  echo "❌ 테스트 실패 (exit $EXIT_CODE) — 수정 후 재실행 필요"
fi

exit 0
