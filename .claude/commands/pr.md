Draft and create a pull request based on the current branch: $ARGUMENTS

## PR Rules

- **Base branch**: `develop` (direct PR to `main` is forbidden)
- **Title**: `[type] Brief description` format, under 70 chars
- **Body**: Summary + Test plan sections are required
- Merge only after CI passes

## Instructions

0. **Run `git rev-parse --abbrev-ref HEAD` first. If the current branch is `main` or `develop`, STOP and tell the user to switch to a feature branch before creating a PR.**

1. Run `git log develop..HEAD` to get the commit list
2. Run `git diff develop...HEAD` to understand all changes
3. Draft the PR title and body
4. Confirm with the user, then run `gh pr create`

## PR Body Template

```markdown
## Summary
- (key changes as bullet points)

## Test plan
- [ ] (test item 1)
- [ ] (test item 2)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

## Title Examples

```
[feat] add validation to sign-in form
[fix] prevent infinite redirect on token expiry
[test] add auth unit tests
[chore] add GitHub Actions CI configuration
```
