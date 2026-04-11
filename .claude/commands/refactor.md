Refactor the specified file or feature without changing behavior: $ARGUMENTS

## Rules

- **Behavior must not change** — refactoring only improves structure, readability, or maintainability
- All commit messages must be written in Korean
- Keep commits as small as possible — one logical change per commit
- Branch must follow: `refactor/<name>` created from `develop`

## What Counts as Refactoring

- Extracting duplicated logic into a shared utility or hook
- Renaming variables, functions, or files for clarity
- Splitting large components or functions into smaller units
- Reorganizing folder structure to better fit FSD layers
- Removing dead code or unused imports
- Simplifying complex conditional logic

## What Does NOT Count

- Adding new features (use `feat`)
- Fixing bugs (use `fix`)
- Changing UI styles (use `design`)
- Improving performance (use `perf`)

## Instructions

0. **Run `git rev-parse --abbrev-ref HEAD` first. If the current branch is `main` or `develop`, STOP and tell the user to create a `refactor/<name>` branch first.**

1. Read the target file(s) to fully understand the current implementation
2. Identify what can be improved without changing behavior
3. Apply changes incrementally — verify behavior is preserved after each step
4. Check FSD layer rules are not violated after refactoring:
   - Layer dependency: `app` → `views` → `widgets` → `entities` → `shared`
   - No reverse imports
5. Run existing tests to confirm nothing broke:
   ```bash
   npm run test:run
   ```
6. Propose commits grouped by logical change

## Commit Examples

```
refactor: setLocationSearch 헬퍼 함수로 추출
refactor: 중복된 쿠키 초기화 로직 clearAllCookies로 통합
refactor: useGetRank 훅 model/ 폴더로 이동
refactor: SigninForm 컴포넌트 분리
```
