# Changelog

## [1.0.8] - 2026-04-20

### 티스토리 렌더링 수정
- **Google Fonts 로딩 방식 변경** — `<link rel="stylesheet">` → `@import url(...)` (`<style>` 블록 첫 줄)
  - 티스토리가 포스트 본문의 `<link>` 태그를 무시해 폰트가 적용되지 않던 문제 해결
- **margin/padding `!important` 추가** — `p`, `ul`, `ol`, `li`, `.lead`, `.meta`
  - 티스토리 자체 CSS가 `p { margin: 0 }`, `ul/ol { margin: 0; padding: 0 }` 으로 리셋해 단락 간 개행이 사라지던 문제 해결
- **악센트 컬러 기본값 퍼플 제거** — `commands/blog-post.md`의 `--ac: #7c6af5` 삭제, 주제별 선택 가이드로 교체

---

## [1.0.7] - 2026-04-20

### 성능 개선
- **Impeccable 파이프라인 제거** — 포스팅 생성 후 자동 실행되던 `/typeset → /arrange → /normalize → /polish` 4단계 제거
  - 실행 시간: ~5시간 → ~10분
  - 포스팅당 비용: ~$11 → ~$0.80 (약 93% 절감)
  - 불필요한 권한 요청 제거

### HTML 스펙 개선
- DM Sans `weight 600` 추가 로드 — h3 browser bold synthesis 방지
- h2 `line-height: 1.3` 명시 (기존: body 1.9 상속으로 heading이 너무 느슨했음)
- 버튼 (`bp-toggle`, `copy-btn`) transition 및 hover 상태 추가
- `focus-visible` 아웃라인 추가 (키보드 접근성)
- `prefers-reduced-motion` 미디어쿼리 추가
- 테이블 td `font-variant-numeric: tabular-nums` 추가
- 버튼 `aria-label`, `font-family: inherit` 추가

### 권한 설정 정리
- 불필요한 A/B 테스트용 mkdir 권한 제거 (`baseline/`, `improved/`)
- `Glob`, `Grep` 권한 추가

---

## [1.0.6] - 2026-04-02

### 변경
- blog-post 스킬 디자인 품질 규칙 강화
- 컴포넌트 남용 방지 규칙 추가 (`aside-note`, `highlight-box` 제거)
- 테이블 `.table-wrap` 필수화, 모바일 미디어쿼리 필수화

---

## [1.0.5] - 2026-03-30

### 변경
- SEO 전략 심화 (에이전트 토론 단계 추가)
- WebSearch vs WebFetch 판단 기준 명시
- 분석가 에이전트 모델 haiku → sonnet 업그레이드

---

## [1.0.4] - 2026-03-27

### 변경
- 에이전트 프로세스 전면 개편
- 초안 파일 핸드오프 패턴 도입 (`.draft/` 임시 폴더)
- slug 일관성 보장 (에이전트 1에서 정의, 메인 에이전트에서 그대로 사용)

---

## [1.0.3] - 2026-03-25

### 변경
- 티스토리 CSS 충돌 방지 패턴 확정 (`.bp-wrap` 스코프 + `!important`)
- 다크/라이트 토글 버튼 추가

---

## [1.0.2] - 2026-03-24

### 변경
- HTML 디자인 명세 초기 버전
- npm 배포 구조 정립

---

## [1.0.1] - 2026-03-24

### 변경
- `make-post --version` 플래그 지원

---

## [1.0.0] - 2026-03-24

### 최초 릴리스
- `/blog-post [주제]` 커맨드로 SEO 최적화 블로그 포스팅 자동 생성
- 분석가 → 작가 → 편집장 3단계 에이전트 파이프라인
- 마크다운 + 티스토리 HTML 동시 출력
