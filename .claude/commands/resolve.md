Read all open PR review comments and post a reply to each thread: $ARGUMENTS

## Instructions

1. Accept a PR number as argument, or auto-detect from the current branch
   ```bash
   gh pr view --json number,comments,reviewThreads
   ```

2. Fetch all open review comments
   ```bash
   gh api repos/{owner}/{repo}/pulls/{pr}/comments
   ```

3. Classify each comment into one of:
   - **Done**: feedback already reflected in the code
   - **Pending**: fix required — describe the approach
   - **Skipped**: out of scope or disagreed — explain clearly with an alternative if available

4. Post a reply to each comment thread
   ```bash
   gh api repos/{owner}/{repo}/pulls/comments/{comment_id}/replies \
     -X POST -f body="<reply body>"
   ```

## Reply Guidelines

- **Done**: describe what was changed + include the commit hash
  - e.g. `Added clearAllCookies() helper and called it in beforeEach. (f812496)`
- **Pending**: explain the planned fix and expected timing
- **Skipped**: state the reason clearly; offer an alternative if applicable

## Usage

```
/resolve 174
/resolve https://github.com/School-of-Company/Gwangju-talent-festival-Client/pull/174
```
