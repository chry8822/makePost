# blog-post

SEO 최적화 블로그 포스팅을 멀티 에이전트 방식으로 생성한다.
티스토리 HTML + 마크다운 두 형식으로 저장한다.

실제 콘텐츠 제작 프로세스로 동작한다:
PD가 방향을 잡고 → 기획자가 구조를 설계하고 → 작가가 집필하고 → 편집장이 최종 결재한다.

## 실행 전 준비
blog-output/ 폴더가 없으면 프로젝트 루트에 생성한다.

---

## STEP 1 — [PD] 프로젝트 분석 + 글 방향 설정

모든 에이전트의 작업 기준이 되는 브리핑을 만든다.
이 단계에서 방향이 잘못 잡히면 이후 모든 작업이 틀어지므로 가장 신중하게 수행한다.

**분석 순서 (반드시 이 순서):**

1. **핵심 가치 먼저 정의** — 코드보다 먼저
   - 이 프로젝트는 무엇을 왜 만들었는가?
   - 어떤 문제를 해결하는가?
   - 독자가 이 글을 읽고 얻어가야 할 것은?

2. **프로젝트 구조 파악**
   - 디렉토리 트리 확인 (depth 2~3)
   - package.json / pubspec.yaml 등 의존성 파일
   - README가 있으면 읽기

3. **핵심 구현 선별** — 핵심 가치와 직결된 것만
   - 핵심 가치를 구현한 코드/로직
   - 독창적이거나 설명할 가치가 있는 구현
   - 10~20줄 이내 코드 스니펫 2~3개

4. **차별 포인트 탐색** (선택)
   - 다른 방식 대신 이 방식을 택한 이유
   - 겪은 어려움이나 트레이드오프 (있으면 활용, 없으면 건너뜀)
   - 커밋 메시지에서 단서 확인 가능하면 확인

5. **글의 카테고리 + 타겟 독자 확정**
   - 글 유형: 개발기 / 튜토리얼 / 개념 설명 / 비교 분석 중 선택
   - 타겟: 주니어 / 시니어 / 비개발자 중 선택
   - 독자가 이미 알고 있을 것 vs 설명해야 할 것

6. **구글 SEO 키워드 방향**
   - 메인 키워드 1개: 독자가 구글에 검색할 실제 쿼리
   - 서브 키워드 3개: 관련 검색어

출력 형식:
```
[PD 브리핑]
■ 핵심 가치: (1문장 — 이 글 전체의 기준)
■ 글 유형: (개발기 / 튜토리얼 / 개념 설명 / 비교 분석)
■ 타겟 독자: (구체적으로)
■ 핵심 구현 (파일명 + 1줄 설명):
  1.
  2.
■ 차별 포인트: (있으면 기술, 없으면 "없음")
■ 메인 키워드:
■ 서브 키워드:
■ 기획자에게 전달할 방향:
  - 이 글에서 반드시 다뤄야 할 것:
  - 다루지 말아야 할 것 (핵심에서 벗어나는 것):
```

---

## STEP 2 — [기획자] 콘텐츠 구조 설계

PD 브리핑을 기반으로 글의 뼈대를 만든다.
고정 섹션 없음 — 이 프로젝트와 글 유형에 맞는 구조를 새로 설계한다.

**설계 기준:**
- 각 섹션은 PD 브리핑의 핵심 가치와 직결되어야 함
- PD가 "다루지 말 것"으로 지정한 내용은 구조에서 제외
- 도입부: 독자의 문제/질문을 즉시 제시 (배경 설명 나열 금지)
- 마무리: 핵심 요약 + 독자의 다음 행동 안내

**구글 SEO 제목 후보 3개:**
- 검색 의도를 직접 담은 명사형 키워드 포함
- 40~60자 (구글 SERP 잘림 없이 노출되는 길이)
- How-to / 가이드 / 방법 형식 권장
- 클릭베이트 금지 ("삽질", "N가지", "알아보겠습니다" 등 제외)
- 예시: "npx 한 줄로 팀 전체 Claude Code 환경 세팅하는 법"

출력 형식:
```
[기획자 설계안]
■ 제목 후보:
  1. (40~60자, 메인 키워드 포함)
  2.
  3.
■ 글 구조:
  ## (섹션명) — (이 섹션의 역할 1줄)
  ## (섹션명) — ...
■ 예상 읽기 시간:
■ 코드 스니펫 배치:
  - (섹션명): (어떤 코드, 파일명)
```

---

## STEP 3 — [작가] 초안 집필

PD 브리핑 + 기획자 설계안을 기반으로 집필한다.
기획자가 설계한 구조를 그대로 따른다. 임의로 섹션을 추가하거나 변경하지 않는다.

**집필 조건:**
- 분량: 3,000자 이상
- 톤: 1인칭, 솔직한 개발자 블로그 톤 (AI 문체 금지)
- 코드 스니펫: 실제 프로젝트 파일에서 인용 (임의 예시 코드 금지)
- 뻔한 서론 절대 금지 ("안녕하세요 오늘은 ~에 대해 알아보겠습니다")
- H1 제목에 메인 키워드 포함
- H2/H3 소제목이 검색 의도를 반영
- 이미지 삽입 위치: [이미지: 설명] 형식으로 표시

출력 형식:
```
[작가 초안 완성]
(전체 본문)
```

---

## STEP 4 — [편집장] 1차 검토

PD 브리핑의 핵심 가치를 기준으로 초안을 검토한다.
칭찬 생략, 문제점과 수정 지시만 출력한다.

**검토 기준:**
- 각 섹션이 PD 브리핑의 핵심 가치와 직결되는가? (벗어난 섹션 구체적으로 지목)
- PD가 "다루지 말 것"으로 지정한 내용이 들어가 있는가?
- 핵심 구현 설명이 "왜 이렇게 했는가"까지 다루는가? (표면적 설명만 있으면 지적)
- 실제 프로젝트 코드가 인용됐는가? (임의 예시 코드면 지적)
- 도입부가 독자의 문제를 즉시 제시하는가?
- 다른 블로그에도 있는 일반론으로 채워진 섹션이 있는가?
- 메인 키워드가 제목/첫 단락/소제목에 자연스럽게 포함됐는가?
- AI가 쓴 것 같은 문체가 있는가? (해당 문장 직접 인용해서 지적)
- 분량이 3,000자 이상인가?

출력 형식:
```
[편집장 1차 검토]
🔴 필수 수정:
-
🟡 권장 개선:
-
```

---

## STEP 5 — [작가] 수정

편집장 피드백을 반영해 수정한다.
수정한 항목 목록 먼저 출력 후 전체 글 다시 출력한다.

```
[작가 수정 완료]
수정 항목:
-
(전체 본문)
```

---

## STEP 6 — [편집장] 최종 결재

수정본을 최종 검토하고 제목을 확정한다.
이 단계를 통과해야 사용자 선택으로 넘어간다.

**제목 최종 평가 기준 (구글 SEO):**
- 독자가 구글에서 실제로 검색할 키워드가 포함됐는가?
- 40~60자 이내인가?
- 클릭베이트 없이 글의 내용을 정확히 예고하는가?
- How-to / 방법 / 가이드 형식이 적합한가?

출력 형식:
```
[편집장 최종 결재]
■ 본문 상태: 승인 / 수정 필요
  (수정 필요 시 구체적 지시 → 작가 재수정 후 다시 결재)

■ 제목 평가:
  후보 1: ○○○ → (구글 SEO 관점 평가)
  후보 2: ○○○ → (구글 SEO 관점 평가)
  후보 3: ○○○ → (구글 SEO 관점 평가)
  추천 제목:
  추천 이유: (검색 의도 + 키워드 관점으로)
```

본문 상태가 "수정 필요"면 작가에게 돌려보내고, "승인"이면 STEP 7로 진행한다.

---

## STEP 7 — 사용자 최종 선택

편집장 승인 후 사용자에게 제시한다. 선택 전까지 파일 저장하지 않는다.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 편집장 승인 완료. 최종 선택해주세요.

[제목 선택]
1. (후보 1)
2. (후보 2)
3. (후보 3)
→ 번호로 선택하거나 직접 입력

[추가 수정 사항]
없으면 "없음" 입력

[저장 형식]
A. 마크다운 + HTML 둘 다 (기본)
B. 마크다운만
C. HTML만
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## STEP 8 — 최종본 생성 및 저장

사용자 선택 반영 후 최종본을 저장한다.

파일명 규칙:
- 선택된 제목에서 핵심어 추출 → 영문 슬러그 변환
- 날짜 prefix 포함
- 예: 2026-03-24-claude-code-react-hooks-optimization

저장 경로:
blog-output/
├── 2026-03-24-{slug}.md
└── 2026-03-24-{slug}.html

마크다운 파일 상단 frontmatter:
---
title: (최종 제목)
date: (작성일)
keywords: (메인키워드, 서브키워드1, 서브키워드2, 서브키워드3)
description: (메타 디스크립션 160자 이내)
tags: (티스토리 태그 5개)
---

HTML 파일 조건:

**출력 구조 — 파일 첫 줄은 반드시 `<link ...>`. `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` 절대 금지.**

```
<link href="...Google Fonts...">
<style>...</style>
<div class="bp-wrap">...</div>
<script>...</script>
```

**티스토리 CSS 충돌 방지 원칙:**
- 모든 CSS는 `.bp-wrap` 하위 스코프로 한정 (전역 선택자 금지)
- `position: fixed` 금지 → 토글 버튼은 `position: sticky; float: right`
- 티스토리 자체 CSS에 덮이는 속성은 `!important` 필수:
  - `p`, `h1~h6`, `li`, `strong` → `color !important`
  - `.code-block`, `.code-block pre` → `background !important`
  - `.code-block code`, `p code`, `li code` → `color !important`, `background !important`

**CSS 변수 및 기본 스타일 (.bp-wrap 스코프):**
```css
.bp-wrap {
  --bg: #0d0d0d; --bg2: #161616; --bg-code: #141414;
  --tx: #f0f0f0; --tx2: #a0a0a0; --tm: #606060;
  --ac: #7c6af5; --ac-s: rgba(124,106,245,0.12);
  --bd: #2a2a2a; --cb: #2e2e2e;
  background: var(--bg); color: var(--tx);
  font-family: 'DM Sans', 'Noto Sans KR', sans-serif;
  font-size: 17px; line-height: 1.9;
  max-width: 720px; margin: 0 auto; padding: 2rem 1.5rem;
  animation: bp-fade 0.4s ease-out;
}
.bp-wrap[data-theme="light"] {
  --bg: #fafaf8; --bg2: #f3f3f0; --bg-code: #f0f0ec;
  --tx: #1a1a1a; --tx2: #555550; --tm: #999990;
  --bd: #e0e0d8; --cb: #d8d8d0;
}
```

**폰트:** 제목 `Instrument Serif`, 본문 `DM Sans`, 코드 `JetBrains Mono`
```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**코드블록 패턴 (복사 버튼 — 큰따옴표 하나, 내부 JS는 작은따옴표):**
```html
<div class="code-block">
  <div class="code-label">bash</div>
  <button class="copy-btn" onclick="this.textContent='복사됨';setTimeout(()=>this.textContent='복사',800);navigator.clipboard.writeText(this.closest('.code-block').querySelector('code').textContent)">복사</button>
  <pre><code>코드 내용</code></pre>
</div>
```

**다크/라이트 토글 — `.bp-wrap` 기준으로 동작:**
```html
<button class="bp-toggle" onclick="const w=this.closest('.bp-wrap');const isLight=w.getAttribute('data-theme')==='light';isLight?w.removeAttribute('data-theme'):w.setAttribute('data-theme','light');this.textContent=isLight?'☾':'☀';localStorage.setItem('bp-theme',isLight?'dark':'light')">☾</button>
```

**초기화 스크립트 (파일 맨 끝):**
```html
<script>
(function(){
  const saved=localStorage.getItem('bp-theme');
  const preferLight=window.matchMedia('(prefers-color-scheme: light)').matches;
  const wrap=document.querySelector('.bp-wrap');
  const btn=document.querySelector('.bp-toggle');
  if(!wrap)return;
  if(saved==='light'||(!saved&&preferLight)){wrap.setAttribute('data-theme','light');if(btn)btn.textContent='☀';}
})();
</script>
```

**절대 금지:**
- `<!DOCTYPE>`, `<html>`, `<head>`, `<body>` 태그
- 전역 선택자 (`p {}`, `h1 {}` 등 `.bp-wrap` 없이 단독 사용)
- `position: fixed`
- `!important` 누락 (`p`, `h1~h6`, `li`, `pre`, `code` 색상/배경)
- Inter, Roboto, Arial, system-ui 폰트
- 그라디언트 배경, `box-shadow` 2개 이상

저장 완료 후 출력:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ 저장 완료

📄 blog-output/{slug}.md
🌐 blog-output/{slug}.html

📌 티스토리 업로드 방법:
1. .html 파일 열기
2. 전체 복사
3. 티스토리 글쓰기 → HTML 편집기 붙여넣기

🔍 메타 디스크립션:
(160자 이내 텍스트)

🏷️ 추천 태그:
(5개)

🎨 대표 이미지 생성 프롬프트 (Gemini):
아래 규칙으로 이 글의 핵심 내용을 반영한 프롬프트를 영문으로 생성한다.

규칙:
- AI가 만든 느낌이 나지 않도록 사실적인 사진 스타일 또는 깔끔한 일러스트 스타일로 유도
- "developer", "coding", "laptop" 같은 진부한 소재 금지
- 이 글의 핵심 개념/문제/해결책을 시각적 은유로 표현
- 구체적인 색감, 구도, 분위기 지정 (abstract, moody, bright 등)
- 항상 다른 결과가 나오도록 이 글 고유의 맥락을 프롬프트에 직접 녹임

출력 형식:
```
[Gemini 이미지 프롬프트]
(영문 프롬프트 3~5문장)
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
