#!/bin/bash
# FSD 레이어 위반 감지 훅
# PostToolUse (Write, Edit) 후 TypeScript 파일의 FSD import 규칙 검사

INPUT=$(cat)
FILE=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('file_path',''))" 2>/dev/null)

# TypeScript 파일이 아니거나 src/ 외부면 종료
if [[ "$FILE" != */src/*.ts ]] && [[ "$FILE" != */src/*.tsx ]]; then
  exit 0
fi

PROJECT_ROOT="$(git rev-parse --show-toplevel 2>/dev/null)"
if [[ -z "$PROJECT_ROOT" ]]; then
  exit 0
fi

VIOLATIONS=""

# shared가 상위 레이어 import 탐지
if [[ "$FILE" == */src/shared/* ]]; then
  for layer in entities widgets views app; do
    MATCHES=$(grep -n "from \"@/$layer" "$FILE" 2>/dev/null)
    if [[ -n "$MATCHES" ]]; then
      VIOLATIONS+="[FSD 위반] shared → $layer import 금지:\n$MATCHES\n"
    fi
  done
fi

# entities가 상위 레이어 import 탐지
if [[ "$FILE" == */src/entities/* ]]; then
  for layer in widgets views app; do
    MATCHES=$(grep -n "from \"@/$layer" "$FILE" 2>/dev/null)
    if [[ -n "$MATCHES" ]]; then
      VIOLATIONS+="[FSD 위반] entities → $layer import 금지:\n$MATCHES\n"
    fi
  done
  # cross-slice 탐지 (entities 내 다른 슬라이스)
  CURRENT_SLICE=$(echo "$FILE" | sed -n 's|.*/src/entities/\([^/]*\)/.*|\1|p')
  if [[ -n "$CURRENT_SLICE" ]]; then
    MATCHES=$(grep -n "from \"@/entities" "$FILE" 2>/dev/null | grep -v "from \"@/entities/$CURRENT_SLICE")
    if [[ -n "$MATCHES" ]]; then
      VIOLATIONS+="[FSD 위반] entities cross-slice import 금지 ($CURRENT_SLICE → 다른 슬라이스):\n$MATCHES\n"
    fi
  fi
fi

# widgets가 상위 레이어 import 탐지
if [[ "$FILE" == */src/widgets/* ]]; then
  for layer in views app; do
    MATCHES=$(grep -n "from \"@/$layer" "$FILE" 2>/dev/null)
    if [[ -n "$MATCHES" ]]; then
      VIOLATIONS+="[FSD 위반] widgets → $layer import 금지:\n$MATCHES\n"
    fi
  done
fi

# TanStack Query 훅이 hooks/ 폴더에 있는지 탐지
if [[ "$FILE" == */hooks/* ]] && grep -q "useQuery\|useMutation\|useInfiniteQuery" "$FILE" 2>/dev/null; then
  VIOLATIONS+="[FSD 위반] TanStack Query 훅은 model/ 폴더에 위치해야 합니다. hooks/에 query 훅 금지\n"
fi

if [[ -n "$VIOLATIONS" ]]; then
  echo -e "⚠️  FSD 레이어 위반 감지 — $FILE\n$VIOLATIONS"
fi

exit 0
