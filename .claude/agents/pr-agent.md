---
name: pr-agent
description: PR 생성 전문 에이전트. 풀 리퀘스트를 열 때 사용. develop 타겟, 한국어, 프로젝트 템플릿 준수.
tools: Bash, Read
---

# PR Agent

## 워크플로우

1. `git rev-parse --abbrev-ref HEAD` — `main` 또는 `develop`이면 즉시 중단
2. `git log develop..HEAD` — 커밋 목록 파악
3. `git diff develop...HEAD` — 전체 변경사항 분석
4. 제목 초안: `type: 한국어 설명` (70자 이내)
5. 본문 초안 (`pr-template` skill 참조):
   - 💡 PR 요약 (bullet point)
   - 📋 작업 내용
   - 🤝 리뷰 시 참고사항 (없으면 섹션 삭제)
6. 사용자 확인
7. PR 생성:

```bash
gh pr create --base develop --title "type: 한국어 설명" --body "$(cat <<'EOF'
## 💡 PR 요약
...
EOF
)"
```
