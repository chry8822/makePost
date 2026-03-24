# makePost

Claude Code 전역 슬래시 커맨드 — SEO 최적화 블로그 포스팅 자동 생성기

## 설치 방법

### npm 방식 (권장)

```bash
npx make-post
```

또는 전역 설치 후 실행:

```bash
npm install -g make-post
make-post
```

### curl 방식 (npm 없이 설치)

```bash
curl -fsSL https://raw.githubusercontent.com/chry8822/makePost/main/install.sh | bash
```

## 사용법

설치 후 Claude Code 에서 아래 명령어를 입력한다:

```
/blog-post
```

분석가 → 작가 → 편집장 에이전트가 순서대로 실행되며, 최종 제목과 저장 형식을 선택하면 파일이 저장된다.

## 출력 파일

```
blog-output/
├── 2026-03-24-{slug}.md    # 마크다운 (frontmatter 포함)
└── 2026-03-24-{slug}.html  # 티스토리 HTML 편집기용
```

## 업데이트 방법

### npm 방식

```bash
npx make-post
```

npx는 항상 최신 버전을 받아 실행하므로 별도 업데이트 불필요.

전역 설치한 경우:

```bash
npm update -g make-post
make-post
```

### curl 방식

```bash
curl -fsSL https://raw.githubusercontent.com/chry8822/makePost/main/install.sh | bash
```

동일 명령어를 다시 실행하면 덮어쓰기 여부를 확인 후 업데이트된다.
