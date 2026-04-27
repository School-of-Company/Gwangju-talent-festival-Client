Read all open PR review comments and post a reply to each thread: $ARGUMENTS

## Rules

- **All replies must be written in Korean**
- Be concise and clear — include the commit hash when referencing a fix

## Instructions

1. Accept a PR number as argument, or auto-detect from the current branch
   ```bash
   gh pr view --json number,comments,reviewThreads
   ```

2. Fetch all open review comments
   ```bash
   gh api repos/:owner/:repo/pulls/{pr}/comments
   ```

3. Classify each comment into one of:
   - **반영 완료**: 이미 코드에 반영된 피드백
   - **반영 예정**: 수정이 필요한 피드백
   - **스킵**: 범위 밖이거나 동의하지 않는 피드백

4. Post a reply to each comment thread
   ```bash
   gh api repos/:owner/:repo/pulls/comments/{comment_id}/replies \
     -X POST -f body="<한국어 답글>"
   ```

## Reply Guidelines

- **반영 완료**: 어떻게 수정했는지 + 커밋 해시 포함
  - 예: "`clearAllCookies()` 헬퍼를 추가하고 `beforeEach`에서 호출하도록 수정했습니다. (f812496)"
- **반영 예정**: 수정 방향과 이유 설명
  - 예: "다음 커밋에서 `setLocationSearch()` 헬퍼로 추출하겠습니다."
- **스킵**: 이유를 명확하게, 대안이 있으면 함께 제시
  - 예: "해당 부분은 Next.js 빌드 산출물 수준으로 판단해 테스트 범위에서 제외했습니다."

## Usage

```
/resolve 174
/resolve https://github.com/School-of-Company/Gwangju-talent-festival-Client/pull/174
```
