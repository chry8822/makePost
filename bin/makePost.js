#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const pkg = require('../package.json');

if (process.argv[2] === '--version' || process.argv[2] === '-v') {
  console.log(pkg.version);
  process.exit(0);
}

const srcFile = path.join(__dirname, '..', 'commands', 'blog-post.md');
const destDir = path.join(process.env.HOME || process.env.USERPROFILE, '.claude', 'commands');
const destFile = path.join(destDir, 'blog-post.md');

function askOverwrite(callback) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('blog-post.md 가 이미 존재합니다. 덮어쓸까요? (y/n): ', (answer) => {
    rl.close();
    callback(answer.trim().toLowerCase() === 'y');
  });
}

function install() {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (fs.existsSync(destFile)) {
    askOverwrite((confirmed) => {
      if (!confirmed) {
        console.log('설치를 취소했습니다.');
        process.exit(0);
      }
      copyAndDone();
    });
  } else {
    copyAndDone();
  }
}

function copyAndDone() {
  fs.copyFileSync(srcFile, destFile);
  console.log('');
  console.log('✅ makePost 설치 완료! Claude Code에서 /blog-post 로 실행하세요.');
  console.log('');
  console.log('설치 경로:', destFile);
}

install();
