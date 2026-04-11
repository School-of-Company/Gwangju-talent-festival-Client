Draft and create a pull request based on the current branch: $ARGUMENTS

## Rules

- **All PR content must be written in Korean** (title, summary, work details, review notes)
- **Base branch**: always `develop` (direct PR to `main` is forbidden)
- **Must follow the project PR template** defined in `.github/PULL_REQUEST_TEMPLATE.md`
- Merge only after CI passes

## Instructions

0. **Run `git rev-parse --abbrev-ref HEAD` first. If the current branch is `main` or `develop`, STOP and tell the user to switch to a feature branch before creating a PR.**

1. Run `git log develop..HEAD` to get the commit list
2. Run `git diff develop...HEAD` to understand all changes
3. Draft the PR title and body following the template below
4. Confirm with the user, then run `gh pr create --base develop`

## PR Title Format

```
type: 한국어로 간결하게 (70자 이내)
```

## PR Body Template (must follow exactly)

```markdown
## 💡 PR 요약

> 해당 PR의 변경사항, 해당 이슈 등에 대한 간략한 설명을 작성해주세요.

- {변경사항을 bullet point로 작성}

## 📋 작업 내용

> 해당 PR에서 작업한 내용을 자세히 설명해주세요.

{구체적인 작업 내용 작성}

## 🤝 리뷰 시 참고사항

> 리뷰어분들이 리뷰를 할 때 참고하면 좋을 사항이나 질문사항을 작성해주세요.

{참고사항이 없으면 이 섹션 삭제}
```

## Title Examples

```
feat: 로그인 폼 유효성 검사 추가
fix: 토큰 만료 시 무한 리다이렉트 수정
test: auth 관련 단위 테스트 추가
chore: GitHub Actions CI 설정 추가
```
