Review the current branch changes against develop: $ARGUMENTS

## Instructions

1. Run `git diff develop...HEAD` to get the full diff
2. Read the changed files directly to understand context
3. Review against the criteria below
4. Output findings organized by category

## Review Criteria

### Must Check
- **Bug risk**: null/undefined handling, async error handling, edge cases
- **Security**: XSS, open redirect, sensitive data exposure, missing auth checks
- **Type safety**: `any` usage, unsafe type assertions

### Code Quality
- **FSD compliance**: layer dependency direction must be `app` → `views` → `widgets` → `entities` → `shared`; reverse imports are forbidden
- **Unnecessary complexity**: over-abstraction, dead code
- **Duplication**: repeated logic that should be extracted

### Tests
- New logic should have corresponding tests
- Tests should verify behavior, not implementation details

## Output Format

```
## Code Review

### Must Fix
- [file:line] issue and suggestion

### Recommended
- [file:line] issue and suggestion

### Optional
- [file:line] comment or opinion

### Good Parts
- ...
```

- If no issues found, explicitly state "No issues"
- Always include file path and line number for each item
