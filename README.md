# makePost

Claude Code 전역 슬래시 커맨드 — SEO 최적화 블로그 포스팅 자동 생성기

## 실제 생성 예시

아래 포스팅은 `blog-post` 스킬로 생성된 실제 티스토리 글이다.


| 제목                                                                                                                                                                                                                                                                                                  | 날짜         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| [Claude Code 50만 줄 소스코드 유출 — npm 소스맵 실수가 불러온 전말](https://covelope.tistory.com/entry/Claude-Code-50%EB%A7%8C-%EC%A4%84-%EC%86%8C%EC%8A%A4%EC%BD%94%EB%93%9C-%EC%9C%A0%EC%B6%9C-%E2%80%94-npm-%EC%86%8C%EC%8A%A4%EB%A7%B5-%EC%8B%A4%EC%88%98%EA%B0%80-%EB%B6%88%EB%9F%AC%EC%98%A8-%EC%A0%84%EB%A7%90) | 2026.04.02 |


> PD → 기획자 → 에이전트 토론 → 작가 → 편집장 순서로 실행되며, SEO 전략 수립부터 제목 확정, 티스토리 HTML 변환까지 자동 처리했다.



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