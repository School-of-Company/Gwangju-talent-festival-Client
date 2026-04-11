Create a new branch from develop and switch to it: $ARGUMENTS

## Branch Naming Convention

```
<type>/<name>
```

| Type | Usage |
|------|-------|
| `feat/<name>` | New feature |
| `fix/<name>` | Bug fix |
| `test/<name>` | Test code |
| `chore/<name>` | Config, dependencies |
| `refactor/<name>` | Code improvement |
| `perf/<name>` | Performance improvement |
| `design/<name>` | UI design change |
| `docs/<name>` | Documentation |

- `<name>`: lowercase + kebab-case (e.g. `feat/signin-validation`)
- Keep it short and descriptive

## Instructions

1. Check the current branch:
   ```bash
   git rev-parse --abbrev-ref HEAD
   ```

2. Fetch the latest `develop`:
   ```bash
   git fetch origin develop
   ```

3. Create and switch to the new branch from `develop`:
   ```bash
   git checkout -b <type>/<name> origin/develop
   ```

4. Confirm the branch was created and is now active.

## Examples

```
/create-branch feat/signup-form
/create-branch fix/token-refresh
/create-branch test/auth-unit-tests
/create-branch chore/vitest-config
```
