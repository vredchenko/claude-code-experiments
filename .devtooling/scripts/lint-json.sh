#!/bin/bash
set -e

IGNORE_FILE=".devtooling/configs/.jsonlintignore"
TEMP_FILE=$(mktemp)

# Read ignore patterns and build find command exclusions
FIND_EXCLUDES=""
if [ -f "$IGNORE_FILE" ]; then
  while IFS= read -r pattern; do
    # Skip comments and empty lines
    if [[ "$pattern" =~ ^[[:space:]]*# ]] || [[ -z "$pattern" ]] || [[ "$pattern" =~ ^[[:space:]]*$ ]]; then
      continue
    fi
    # Convert glob patterns to find exclusions
    FIND_EXCLUDES="$FIND_EXCLUDES -not -path \"./$pattern\""
  done < "$IGNORE_FILE"
fi

# Find JSON files excluding ignore patterns
FIND_CMD="find . -name \"*.json\" $FIND_EXCLUDES"
eval "$FIND_CMD" > "$TEMP_FILE"

# Lint each file
while IFS= read -r file; do
  echo "Checking JSON: $file"
  bun x jsonlint "$file" > /dev/null || {
    echo "JSON validation failed for $file"
    rm -f "$TEMP_FILE"
    exit 1
  }
done < "$TEMP_FILE"

rm -f "$TEMP_FILE"
echo "All JSON files valid"