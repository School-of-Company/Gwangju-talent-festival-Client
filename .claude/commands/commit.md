Analyze staged changes and create a commit: $ARGUMENTS

## Commit Convention

```
<type>: <subject>
```

| Type | Usage |
|------|-------|
| `feat` | Add new feature |
| `fix` | Bug fix |
| `test` | Add or modify tests |
| `chore` | Build config, dependencies |
| `refactor` | Code improvement without behavior change |
| `style` | Formatting, whitespace — no logic change |
| `docs` | Documentation |
| `design` | UI design change |
| `comment` | Update comments |
| `init` | Project initialization |
| `rename` | Rename or move files / folders |
| `remove` | Delete files or folders |
| `perf` | Performance improvement |

- Subject written in Korean is acceptable
- No period at end of subject line

## Commit Granularity Rules

- Keep commits as small as possible — one commit = one unit of change
- Always split into separate commits when change areas differ:
  - Feature code / test code / config files → separate commits
  - Different domains (e.g. `user` + `team` files) → separate commits
- If grouping is unavoidable, only bundle files of the same nature

## Instructions

0. **Run `git rev-parse --abbrev-ref HEAD` first. If the current branch is `main` or `develop`, STOP immediately and tell the user to switch to a feature branch. Never commit or push on these branches.**

1. Run `git diff --staged` and `git status` to understand what changed
2. Determine the appropriate type based on the nature of the change
3. Write a concise subject focused on "what and why"
4. If files span different areas, propose splitting into multiple commits
5. Confirm with the user before executing the commit

## Examples

```
feat: add validation to sign-in form
fix: prevent infinite redirect on token expiry
test: add unit tests for handleSigninFormSubmit
chore: update vitest coverage config
refactor: extract setLocationSearch as a helper function
```
