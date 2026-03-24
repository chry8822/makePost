## 블로그 자동화 (makePost)

`/blog-post [주제]` 커맨드로 SEO 최적화 블로그 포스팅을 자동 생성한다.

- 스킬 위치: .claude/skills/blog-post/SKILL.md
- 출력 경로: blog-output/
- 파일 형식: [YYYY-MM-DD]-[slug].md + [YYYY-MM-DD]-[slug].html
- HTML 용도: 티스토리 HTML 편집기용 (html/head/body 태그 없음)
- Impeccable 후처리: /typeset → /arrange → /normalize → /polish 자동 실행
