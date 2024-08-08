#!/bin/sh
if [ "$(uname)" = "Darwin" ]; then
  # macOS
  rm -rf .build-release
elif [ "$(expr substr $(uname -s) 1 5)" = "Linux" ]; then
  # Linux
  rm -rf .build-release
elif [ "$(expr substr $(uname -s) 1 10)" = "MINGW64_NT" ]; then
  # Windows (Git Bash)
  rm -rf .build-release
elif [ "$(expr substr $(uname -s) 1 10)" = "MINGW32_NT" ]; then
  # Windows (Git Bash)
  rm -rf .build-release
else
  # Windows (Command Prompt or PowerShell)
  rmdir /s /q .build-release
  exit 0
fi
