---
name: blog-post
description: SEO 최적화 블로그 포스팅 자동 생성. /blog-post 커맨드로 실행. 분석가→작가→편집장 에이전트가 순서대로 실행되며 마크다운과 티스토리용 HTML을 동시 출력한다.
---

# blog-post 스킬

## 실행 방법

/blog-post [주제]
예시: /blog-post Claude Code Skills로 팀 AI 환경 한번에 세팅하기

주제 없이 `/blog-post`만 입력하면 주제를 질문한다.

---

## 에이전트 구성

### 에이전트 1 — 분석가 (모델: claude-sonnet-4-6)

역할: 웹서치 기반 주제 분석 및 글 설계

**Step 1 — 웹서치**

아래 3가지를 검색한다. 검색어는 한국어와 영어를 혼용한다.

1. **최신 정보 수집**: `[주제] 2024 OR 2025` 형태로 검색
2. **경쟁 글 파악**: `[주제] 블로그 개발자` 또는 `[주제] tutorial` 검색
3. **독자 질문 파악**: `[주제] 질문` 또는 `[주제] 문제 해결` 검색

**WebSearch vs WebFetch 판단 기준**

WebSearch 스니펫으로 충분한 경우 — WebFetch 금지:
- 기존 글들의 구성 파악
- 최신 버전/릴리즈 여부 (스니펫에 버전 번호가 보이면 충분)
- 독자 질문 패턴 파악

WebFetch가 필요한 경우 — 스니펫 확인 후 판단:
- 스니펫에 "breaking changes", "deprecated", "pricing update" 신호가 있는데 구체적 내용이 필요할 때
- 공식 문서(changelog, API reference, pricing)에서 정확한 수치·문법이 필요할 때
- 스니펫이 잘려서 글의 정확성에 직결되는 내용이 보이지 않을 때
- **최대 2페이지**

검색 결과에서 추출할 것: **이 글을 정확하게 쓰기 위해 알아야 할 사실**

주제에 따라 다르다. 기술 도구라면 버전·가격·deprecated 항목, 개념·방법론이라면 업계 흐름·반례·논쟁 지점이 해당될 수 있다. 관련 없으면 "해당 없음"으로 넘긴다.

**Step 2 — 글 설계**

Step 1 결과를 바탕으로 아래 형식으로 `blog-output/.draft/analysis.md`에 저장한다:

```md
## 메타
- slug: [영문 소문자 + 하이픈. 예: github-actions-cicd-pipeline]
- 읽기 시간: [N분]
- 타겟 독자: [정의] / pain point: [1줄]

## Thesis Statement
[이 글이 주장하는 핵심 1문장]

## 차별화 앵글
[기존 글들과 다른 이 글만의 관점 1줄]

## SEO 키워드
- [키워드] (정보형/비교형/방법형)
...5개

## 웹서치 팩트
[확인된 사실 목록. 없으면 "해당 없음"]

## 글 구조
### [섹션 제목]
핵심 메시지: [1줄]
...
```

### 에이전트 2 — 작가 (모델: claude-sonnet-4-6)

역할: 실제 본문 작성

- `blog-output/.draft/analysis.md`를 Read로 읽어 구조 설계안, thesis statement, 웹서치 팩트를 확인한다
- 웹서치 팩트 섹션의 내용을 본문에 반드시 반영한다. "해당 없음"이면 모델 지식 기반으로 작성
- 작성 중 특정 사실이 불확실하면 WebSearch로 직접 확인 가능 (2회 이내)
- **톤**: 실제 경험이 있는 개발자가 동료에게 설명하는 말투. "~합니다체" 아닌 "~다체" 또는 구어체 혼용 가능
- 코드 예시는 실제 동작하는 코드로 작성 (언어 명시 필수)
- **절대 금지 표현**: "이를 통해", "결론적으로", "중요한 것은", "핵심은 바로", "효율적으로 활용", "한 단계 더 나아가", "정리하자면", "무엇보다도 중요한"
- **수치 규칙**: 직접 측정했거나 공식 문서에 있는 수치만 사용. 근거 없는 수치 절대 금지
- **가짜 레퍼런스 금지**: 존재하지 않는 URL, 통계 출처, 사례 기업명 임의 생성 금지
- 각 섹션은 상황·문제·질문 중 하나로 자연스럽게 시작

**출력**: 완성 마크다운 초안을 `blog-output/.draft/draft.md`에 저장

### 에이전트 3 — 편집장 (모델: claude-sonnet-4-6)

역할: 품질 검토 및 수정

- `blog-output/.draft/analysis.md`와 `blog-output/.draft/draft.md`를 Read로 읽는다
- **먼저 확인**: analysis.md의 thesis statement를 읽고 초안이 그 주장을 일관되게 뒷받침하는지 점검
- **콘텐츠 품질 점검:**
  - 도입부가 3문장 이내로 핵심을 전달하는가
  - 근거 없는 수치(%, 배수)가 있는가 → 삭제 또는 "체감상" 등으로 교체
  - 존재하지 않는 URL·사례·출처가 있는가 → 즉시 삭제
  - AI 클리셰 표현이 있는가 → "이를 통해", "결론적으로", "핵심은 바로" 등 삭제 또는 교체
  - 동어반복 요약이 3회 이상 나오는가 → 마무리 요약 삭제
  - 코드블록에 언어 명시가 되어 있는가
  - SEO 키워드가 자연스럽게 본문에 포함되어 있는가
  - 소제목이 검색 의도를 반영하는가
  - 마무리 섹션에 핵심 요약 + 다음 단계 안내가 있는가
- **디자인 점검:**
  - [디자인] `<pre>` 블록으로 서사·시나리오·Before/After를 처리한 곳이 없는가
  - [디자인] 같은 컴포넌트가 3개 이상 연속으로 나열된 곳이 없는가
  - [디자인] `strong` 태그에 color 스타일이 적용되지 않았는가
  - [디자인] 악센트 컬러가 퍼플·바이올렛·제네릭 블루 계열이 아닌가

**출력**: 수정 사항 반영 후 최종본을 `blog-output/.draft/final.md`에 저장

### 메인 에이전트 — 통합 및 파일 저장 (모델: claude-sonnet-4-6)

역할: 에이전트 순차 실행 및 최종 파일 생성

**실행 순서**

1. 에이전트 1 실행 → `blog-output/.draft/analysis.md` 생성 확인
2. 에이전트 2 실행 → `blog-output/.draft/draft.md` 생성 확인
3. 에이전트 3 실행 → `blog-output/.draft/final.md` 생성 확인
4. `blog-output/.draft/analysis.md` Read → slug, SEO 키워드, 읽기 시간 추출
5. `blog-output/.draft/final.md` Read → 최종 마크다운 내용 추출

**파일 생성**

6. frontmatter 추가 후 마크다운 저장:
   - 파일명: `blog-output/[YYYY-MM-DD]-[slug].md` (slug는 analysis.md에서 읽은 값 그대로 사용)

```
---
title: [제목]
date: [오늘 날짜 YYYY-MM-DD]
keywords: [SEO 키워드 쉼표 구분]
description: [150자 이내 메타 설명]
tags: [태그 배열]
---
```

7. 아래 HTML 디자인 명세에 따라 티스토리용 HTML 생성
   - 파일명: `blog-output/[YYYY-MM-DD]-[slug].html`

8. `blog-output/.draft/` 폴더 삭제

9. 완료 후 출력:
    - 생성된 파일 경로 2개
    - SEO 키워드 목록
    - 예상 읽기 시간

---

## HTML 디자인 명세

### 티스토리 대응 원칙 (최우선)

티스토리는 자체 CSS가 있어서 전역 선택자와 충돌한다.
아래 규칙을 반드시 따른다:

**절대 금지:**
- `body { }`, `p { }`, `code { }`, `h1 { }` 등 전역 선택자 사용
- `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>` 태그 출력 — 티스토리 편집기에 붙여넣는 용도이므로 본문 마크업만 출력
- `position: fixed` (티스토리 레이아웃 깨짐)

**대신:**
- 모든 CSS를 `.bp-wrap` 클래스 하위로 스코프 한정
- 다크/라이트 토글 버튼은 `position: sticky; top: 1rem; float: right`
- `<style>` 블록은 `.bp-wrap *` 기준으로 작성

**티스토리 CSS 충돌 방지 — `!important` 필수 적용 대상:**

티스토리는 `p`, `h1~h6`, `li`, `pre`, `code` 등에 자체 색상/배경을 직접 선택자로 적용한다.
`.bp-wrap`의 `color`는 상속되지 않으므로 아래 속성은 반드시 `!important`를 붙인다:

```css
/* 텍스트 색상 — 티스토리 p/h/li 색상에 덮이지 않도록 */
.bp-wrap p, .bp-wrap li, .bp-wrap h3 { color: var(--tx) !important; }
.bp-wrap h1, .bp-wrap h2 { color: var(--tx) !important; }

/* 코드 배경 — 티스토리 pre/code 흰색 배경에 덮이지 않도록 */
.bp-wrap .code-block { background: var(--bg-code) !important; }
.bp-wrap .code-block pre { background: var(--bg-code) !important; }
.bp-wrap .code-block code { background: transparent !important; color: var(--tx2) !important; }
.bp-wrap p code, .bp-wrap li code { background: var(--bg-code) !important; color: var(--tx2) !important; }

/* 테이블 — 티스토리 th 배경색 덮어쓰기 */
.bp-wrap .compare-table th { background: var(--bg2) !important; }
```

### 출력 구조 (항상 이 순서)

파일의 첫 줄은 반드시 `<link ...>` 태그여야 한다.
`<!DOCTYPE>`, `<html>`, `<head>`, `<body>` 로 시작하면 절대 안 된다.

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

<style>
.bp-wrap { ... }
.bp-wrap[data-theme="light"] { ... }
/* 모든 하위 선택자는 .bp-wrap 으로 시작 */
/* 색상/배경이 티스토리에 덮일 수 있는 속성은 !important 필수 */
.bp-wrap p { color: var(--tx) !important; }
.bp-wrap h2 { color: var(--tx) !important; }
</style>

<div class="bp-wrap">
  <button class="bp-toggle" onclick="...">☾</button>
  <!-- 본문 내용 -->
</div>

<script>
// 다크/라이트 토글 스크립트
</script>
```

### 악센트 컬러 규칙

악센트 컬러(`--ac`)는 주제 분위기에 맞는 단색 하나를 매번 새로 선택한다. 하드코딩하지 않는다.

**금지 계열:** 퍼플·바이올렛·제네릭 블루 (`#5~9xxx` 범위 보라/파랑)
→ AI 툴(Notion, Linear, Copilot 등)과 구별되지 않아 즉시 AI스럽게 보임

**선택 기준 (주제 분위기별):**
- 에디토리얼·따뜻한 느낌 → 앰버, 코퍼, 테라코타 계열 (예: `#c9933a`, `#c8784a`)
- 기술·냉정한 느낌 → 뮤트 그린, 세이지, 차콜 틸 계열 (예: `#5a9e72`, `#4a8fa0`)
- 피해야 할 색: 네온, 그라디언트, 파스텔

**적용 위치:** h2 border, `.kw` 텍스트, aside-note 좌측 바, 토글 hover에만 사용
**절대 금지:** `strong` 태그에 컬러 적용 — 볼드는 굵기만, 색상 변경 없음

### CSS 변수 (bp-wrap 스코프)
```css
.bp-wrap {
  --bg: #0d0d0d;        /* 다크 배경 */
  --bg2: #161616;
  --bg-code: #141414;
  --tx: #f0f0f0;
  --tx2: #a0a0a0;
  --tm: #606060;
  --ac: [주제에 맞는 단색 — 위 컬러 규칙 참고];
  --ac-s: [--ac 색의 rgba 10~12% 투명도];
  --bd: #2a2a2a;
  --cb: #2e2e2e;

  background: var(--bg);
  color: var(--tx);
  font-family: 'DM Sans', 'Noto Sans KR', sans-serif;
  font-size: 17px;
  line-height: 1.9;
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  border-radius: 8px;
}

.bp-wrap[data-theme="light"] {
  --bg: #fafaf8;
  --bg2: #f3f3f0;
  --bg-code: #f0f0ec;
  --tx: #1a1a1a;
  --tx2: #555550;
  --tm: #999990;
  --bd: #e0e0d8;
  --cb: #d8d8d0;
}
```

### 폰트

- 제목(h1, h2): `Instrument Serif`
- 본문: `DM Sans`
- 코드: `JetBrains Mono`

### 코드블록 — 색상 통일 규칙

블록 코드와 인라인 코드 모두 동일한 색상 기준을 따른다.
```css
/* 블록 코드 */
.bp-wrap .code-block {
  background: var(--bg-code);
  border: 1px solid var(--cb);
  border-radius: 8px;
  overflow: hidden;
  margin: 1.5rem 0;
}
.bp-wrap .code-label {
  padding: 5px 12px;
  background: var(--bg2);
  border-bottom: 1px solid var(--cb);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--tm);
}
.bp-wrap .code-block pre {
  margin: 0;
  padding: 1rem 1.2rem;
  overflow-x: auto;
}
.bp-wrap .code-block code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--tx2);   /* 블록 코드 텍스트: secondary */
  line-height: 1.65;
  display: block;
}

/* 인라인 코드 — 블록과 동일 기준 */
.bp-wrap p code,
.bp-wrap li code {
  font-family: 'JetBrains Mono', monospace;
  background: var(--bg-code);
  border: 1px solid var(--cb);
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 0.88em;
  color: var(--tx2);   /* 블록 코드와 동일하게 secondary */
}
```

### 복사 버튼 — 따옴표 규칙

onclick 속성은 반드시 큰따옴표 하나로만 감싼다.
내부 JS 문자열은 작은따옴표 사용.
```html
<!-- 올바른 형태 -->
<button class="copy-btn" onclick="this.textContent='복사됨';setTimeout(()=>this.textContent='복사',800);navigator.clipboard.writeText(this.closest('.code-block').querySelector('code').textContent)">복사</button>

<!-- 절대 금지 — 따옴표 2개 -->
<button onclick="..."">복사</button>
```

### 복사 버튼 위치
```css
.bp-wrap .copy-btn {
  position: absolute;
  top: 6px;
  right: 8px;
  background: var(--bg2);
  border: 1px solid var(--cb);
  color: var(--tm);
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-family: inherit;
  cursor: pointer;
  min-width: 44px;
  text-align: center;
  transition: border-color 0.15s ease, color 0.15s ease;
}
.bp-wrap .copy-btn:hover { border-color: var(--ac); color: var(--ac); }
.bp-wrap .code-block {
  position: relative;  /* copy-btn absolute 기준점 */
}
```

### 다크/라이트 토글 스크립트
```html
<button class="bp-toggle" onclick="
  const w = this.closest('.bp-wrap');
  const isLight = w.getAttribute('data-theme') === 'light';
  isLight ? w.removeAttribute('data-theme') : w.setAttribute('data-theme', 'light');
  this.textContent = isLight ? '☾' : '☀';
  localStorage.setItem('bp-theme', isLight ? 'dark' : 'light');
">☾</button>

<script>
(function() {
  const saved = localStorage.getItem('bp-theme');
  const preferLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const wrap = document.querySelector('.bp-wrap');
  const btn = document.querySelector('.bp-toggle');
  if (!wrap) return;
  if (saved === 'light' || (!saved && preferLight)) {
    wrap.setAttribute('data-theme', 'light');
    if (btn) btn.textContent = '☀';
  }
})();
</script>
```

### 토글 버튼 스타일
```css
.bp-wrap .bp-toggle {
  float: right;
  position: sticky;
  top: 1rem;
  background: var(--bg2);
  border: 1px solid var(--bd);
  border-radius: 6px;
  padding: 5px 12px;
  cursor: pointer;
  font-size: 13px;
  font-family: inherit;
  color: var(--tm);
  margin-bottom: 1rem;
  z-index: 10;
  transition: border-color 0.15s ease, color 0.15s ease;
}
.bp-wrap .bp-toggle:hover { border-color: var(--ac); color: var(--ac); }
.bp-wrap .bp-toggle:focus-visible,
.bp-wrap .copy-btn:focus-visible {
  outline: 2px solid var(--ac);
  outline-offset: 2px;
}
```

### 페이지 로드 애니메이션
```css
.bp-wrap {
  animation: bp-fade 0.4s ease-out;
}
@keyframes bp-fade {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .bp-wrap { animation: none; }
  .bp-wrap .bp-toggle, .bp-wrap .copy-btn { transition: none; }
}
```

### 비교 테이블

테이블은 반드시 `.table-wrap`으로 감싼다. 모바일에서 가로 스크롤이 생기더라도 부모 레이아웃이 깨지지 않도록.

```html
<div class="table-wrap">
  <table class="compare-table">
    <tr><th>항목</th><th>A</th><th>B</th></tr>
    <tr><td>...</td><td>...</td><td>...</td></tr>
  </table>
</div>
```

```css
.bp-wrap .table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 1.5rem 0;
}
.bp-wrap .compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  min-width: 360px;
}
.bp-wrap .compare-table th {
  background: var(--bg2) !important;
  padding: 8px 12px;
  text-align: left;
  color: var(--tx2) !important;
  font-weight: 500;
  border-bottom: 1px solid var(--cb);
  font-size: 13px;
}
.bp-wrap .compare-table td {
  padding: 8px 12px;
  color: var(--tx) !important;
  border-bottom: 1px solid var(--bd);
  vertical-align: top;
  font-variant-numeric: tabular-nums;
}
.bp-wrap .compare-table tr:last-child td { border-bottom: none; }
```

### 모바일 대응

미디어쿼리를 반드시 포함한다. 티스토리 모바일에서도 `.bp-wrap` 스코프 안에서 동작한다.

```css
@media (max-width: 480px) {
  .bp-wrap {
    font-size: 15px;
    padding: 1.5rem 1rem;
  }
  .bp-wrap h1 { font-size: 1.6rem; }
}
```

### h1 서브타이틀

제목이 길어서 두 줄로 나눠야 할 때 인라인 스타일 대신 `.subtitle` 클래스를 사용한다.

```html
<h1>GitHub Actions로 CI/CD 파이프라인 구축하기</h1>
<p class="subtitle">복붙 가능한 실전 가이드</p>
```

```css
.bp-wrap .subtitle {
  font-size: 0.9rem;
  color: var(--tm) !important;
  margin: -0.5rem 0 1.5rem;
}
```

### 텍스트 강조 컴포넌트

```css
/* 도입부 요약 블록 */
.bp-wrap .lead {
  font-size: 1.05rem;
  color: var(--tx2) !important;
  border-left: 3px solid var(--ac);
  padding-left: 1rem;
  margin: 0 0 2rem;
  line-height: 1.85;
}

/* 핵심 수치·기술명 인라인 강조 */
.bp-wrap .kw {
  color: var(--ac);
  font-weight: 500;
}
```

사용 규칙:
- `.lead` — h1 바로 아래 도입 요약 1개. 글 전체에서 1번만 사용
- `.kw` — 수치(`200K 토큰`), 핵심 기술명(`npm ci`) 등 짧은 강조에만. 문장 전체에 쓰지 않는다

### 컴포넌트 사용 원칙

본문은 **산문 우선**이다. 컴포넌트는 텍스트만으로 전달이 어려울 때만 쓴다.

| 컴포넌트 | 최대 사용 횟수 | 사용 조건 |
|---|---|---|
| `code-block` | 제한 없음 | 실제 코드·구조 다이어그램 |
| 비교 테이블 | 1개 | 수치 차이가 극명한 경우만 |

**산문으로 처리해야 하는 것:**
- Before/After 서사 비교 → `<pre>` 절대 금지, 문단으로 서술
- 시나리오·사례 설명 → 카드가 아닌 단락 흐름으로
- 강조가 필요한 텍스트 → `<strong>` (색상 없음), 또는 `.kw` (핵심 수치·기술명에만)

### 절대 금지

- `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>` 태그 — 파일 첫 줄은 반드시 `<link ...>`
- 전역 선택자 (`body`, `p`, `h1` 등 `.bp-wrap` 없이 단독 사용)
- `position: fixed`
- 색상/배경 속성에서 `!important` 누락 (`p`, `h1~h6`, `li`, `pre`, `code` 대상)
- Inter, Roboto, Arial, system-ui 폰트
- 그라디언트 배경
- `box-shadow` 2개 이상
- onclick 따옴표 2개 오타
- 인라인 코드와 블록 코드 색상 기준 불일치
- `strong` 태그에 색상 적용 — 굵기만, 색상 변경 없음
- 퍼플·바이올렛·제네릭 블루 악센트 컬러
- `<pre>` 블록으로 대화·시나리오·Before/After 서사 처리
- 같은 컴포넌트 연속 3개 이상 나열
- 인라인 `style` 속성 사용 — CSS 변수나 색상이 `!important` 없이 인라인에 들어가면 티스토리에 덮임. 클래스로 처리할 것
- 테이블을 `.table-wrap` 없이 직접 사용 — 모바일에서 레이아웃 파괴
- `@media (max-width: 480px)` 생략 — 모바일 대응 미디어쿼리는 필수
