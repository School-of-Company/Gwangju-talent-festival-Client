#!/bin/bash
# 오픈 스케줄 검증 훅 (Schedule Guard)
# 배포 전이나 PR 시점에 실행하여 시간 기반 게이트가 올바르게 작동하는지 확인합니다.

echo "🔍 [Schedule Guard] 오픈 스케줄 및 게이트 활성화 상태를 점검합니다..."
echo "----------------------------------------------------------------"

# 1. 미들웨어 및 위젯 내 주석 처리된 게이트 탐지
echo "📌 1. 활성화 대기 중인 게이트(주석 처리된 코드) 확인:"
DISABLED_GATES=$(grep -rE "//.*(주석 해제|now <|now >|now >=|new Date\(\))" src/middleware.ts src/widgets/main/ 2>/dev/null || true)

if [ -n "$DISABLED_GATES" ]; then
  echo "⚠️  주의: 다음 파일들에 비활성화된 게이트 로직이 발견되었습니다:"
  echo "$DISABLED_GATES"
else
  echo "✅ 모든 주요 게이트가 활성화되어 있습니다."
fi

echo ""

# 2. 하드코딩된 날짜 상수 확인 (shared/config/dateConfig.ts)
echo "📌 2. 주요 오픈 날짜 설정 확인:"
grep -E "new Date\(" src/shared/config/dateConfig.ts | while read -r line; do
  echo "  - $line"
done

echo ""

# 3. 컴포넌트 내 new Date() 직접 사용 금지 규칙 점검
echo "📌 3. 컴포넌트 내 new Date() 직접 사용 점검 (No new Date() in Components):"
# shared/config, shared/utils, __tests__를 제외한 src 폴더 내 컴포넌트 파일들 검색
NEW_DATE_VIOLATIONS=$(grep -r "new Date()" src/ --exclude-dir={config,utils,__tests__} --include="*.tsx")

if [ -n "$NEW_DATE_VIOLATIONS" ]; then
  echo "⚠️  알림: 다음 컴포넌트에서 new Date()를 직접 사용 중입니다. (Mocking 권장)"
  echo "$NEW_DATE_VIOLATIONS"
else
  echo "✅ 컴포넌트 내 직접적인 new Date() 사용이 발견되지 않았습니다."
fi

echo ""

# 4. 관련 테스트 코드 실행 여부 확인
echo "📌 4. 스케줄 관련 테스트 파일 존재 여부:"
while IFS= read -r test_file; do
  echo "✅ $test_file 파일이 존재합니다."
  DISABLED_TESTS=$(grep -nE "//.*(it\(|describe\()" "$test_file" 2>/dev/null || true)
  if [ -n "$DISABLED_TESTS" ]; then
    echo "   ⚠️  주의: 테스트 코드 내에 주석 처리된 케이스가 있습니다."
  fi
done < <(find src -path "*/__tests__/*.test.ts" -o -path "*/__tests__/*.test.tsx" 2>/dev/null)

echo "----------------------------------------------------------------"
echo "💡 점검 완료. 오픈 기간에 맞춰 게이트를 활성화(주석 해제)했는지 확인하세요."
