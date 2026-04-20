# makePost

Claude Code 전역 슬래시 커맨드 — SEO 최적화 블로그 포스팅 자동 생성기

## 실제 생성 예시

아래 포스팅은 `blog-post` 스킬로 생성된 실제 티스토리 글이다.

| 제목 | 날짜 |
| --- | --- |
| [Claude Code 50만 줄 소스코드 유출 — npm 소스맵 실수가 불러온 전말](https://covelope.tistory.com/entry/Claude-Code-50%EB%A7%8C-%EC%A4%84-%EC%86%8C%EC%8A%A4%EC%BD%94%EB%93%9C-%EC%9C%A0%EC%B6%9C-%E2%80%94-npm-%EC%86%8C%EC%8A%A4%EB%A7%B5-%EC%8B%A4%EC%88%98%EA%B0%80-%EB%B6%88%EB%9F%AC%EC%98%A8-%EC%A0%84%EB%A7%90) | 2026.04.02 |
| [Claude vs ChatGPT, 개발자는 2026년에 무엇을 써야 하나](https://covelope.tistory.com) | 2026.04.20 |

> 분석가 → 작가 → 편집장 에이전트가 순서대로 실행되며, 웹서치 기반 팩트 수집부터 티스토리 HTML 변환까지 자동 처리한다.

---

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

---

## 사용법

설치 후 Claude Code에서 아래 명령어를 입력한다:

```
/blog-post [주제]
```

주제 없이 입력하면 주제를 질문한다.

### 실행 흐름

```
에이전트 1 (분석가)
  └─ 웹서치 3회 → 팩트 수집 → 글 구조 설계 → analysis.md 저장

에이전트 2 (작가)
  └─ analysis.md 읽기 → 본문 작성 → draft.md 저장

에이전트 3 (편집장)
  └─ 초안 검토 → 수치/클리셰/구조 교정 → final.md 저장

메인 에이전트
  └─ MD 파일 생성 → 티스토리 HTML 생성 → .draft/ 삭제
```

---

## 출력 파일

```
blog-output/
├── 2026-04-20-{slug}.md    # 마크다운 (frontmatter 포함)
└── 2026-04-20-{slug}.html  # 티스토리 HTML 편집기 붙여넣기용
```

HTML은 `<!DOCTYPE>`, `<html>`, `<body>` 없이 본문 마크업만 출력한다. 티스토리 HTML 편집기에 그대로 붙여넣으면 된다.

---

## 비용 및 성능

| 항목 | 수치 |
| --- | --- |
| 포스팅당 비용 | ~$0.80 |
| 소요 시간 | ~10분 |
| 웹서치 | 최대 5회 (분석가 3 + 작가 2) |

---

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

---

## 버전 히스토리

전체 변경 내역은 [CHANGELOG.md](CHANGELOG.md)를 참고한다.
