# Git Conventions

커밋 타입, 브랜치 네이밍, 실행 포맷 참조.

## 커밋 타입

| Type | 사용 |
|------|------|
| `feat` | 새 기능 |
| `fix` | 버그 수정 |
| `docs` | 문서 |
| `style` | 포매팅, 공백 — 로직 변경 없음 |
| `refactor` | 동작 변경 없는 코드 개선 |
| `test` | 테스트 추가/수정 |
| `chore` | 빌드 설정, 패키지 |
| `design` | UI 디자인 변경 |
| `comment` | 주석 업데이트 |
| `init` | 프로젝트 초기화 |
| `rename` | 파일/폴더 이름/이동 |
| `remove` | 파일/폴더 삭제 |
| `perf` | 성능 개선 |

## 브랜치 타입

| Type | 사용 |
|------|------|
| `feat/<name>` | 새 기능 |
| `fix/<name>` | 버그 수정 |
| `test/<name>` | 테스트 코드 |
| `chore/<name>` | 설정, 의존성 |
| `refactor/<name>` | 코드 개선 |
| `perf/<name>` | 성능 개선 |
| `design/<name>` | UI 디자인 변경 |
| `docs/<name>` | 문서 |

`<name>`: lowercase + kebab-case (예: `feat/signin-validation`)

## 커밋 실행 포맷

```bash
git commit -m "$(cat <<'EOF'
type: 한국어 설명
EOF
)"
```

## 커밋 예시

```
feat: 로그인 폼 유효성 검사 추가
fix: 토큰 만료 시 무한 리다이렉트 수정
test: handleSigninFormSubmit 단위 테스트 추가
chore: vitest coverage 설정 변경
refactor: setLocationSearch 헬퍼 함수로 추출
perf: SigninForm memo 적용으로 불필요한 리렌더링 제거
design: 메인 배너 모바일 레이아웃 수정
```

## 브랜치 생성 명령

```bash
git fetch origin develop
git checkout -b feat/<name> origin/develop
```
