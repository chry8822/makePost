#!/bin/bash

DEST_DIR="$HOME/.claude/commands"
DEST_FILE="$DEST_DIR/blog-post.md"
RAW_URL="https://raw.githubusercontent.com/chry8822/makePost/main/commands/blog-post.md"

mkdir -p "$DEST_DIR"

if [ -f "$DEST_FILE" ]; then
  read -p "blog-post.md 가 이미 존재합니다. 덮어쓸까요? (y/n): " answer
  if [ "$answer" != "y" ]; then
    echo "설치를 취소했습니다."
    exit 0
  fi
fi

curl -fsSL "$RAW_URL" -o "$DEST_FILE"

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ makePost 설치 완료! Claude Code에서 /blog-post 로 실행하세요."
  echo ""
  echo "설치 경로: $DEST_FILE"
else
  echo "❌ 다운로드 실패. 네트워크 연결을 확인하세요."
  exit 1
fi
