#!/bin/bash
set -e

IGNORE_FILE=".devtooling/configs/.yamllintignore"
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

# Find YAML files excluding ignore patterns
FIND_CMD="find . \( -name \"*.yml\" -o -name \"*.yaml\" \) $FIND_EXCLUDES"
eval "$FIND_CMD" > "$TEMP_FILE"

# Check if any files found
if [ ! -s "$TEMP_FILE" ]; then
  echo "No YAML files to lint"
  rm -f "$TEMP_FILE"
  exit 0
fi

# Create file list for yamllint
FILES=$(cat "$TEMP_FILE" | tr '\n' ' ')
rm -f "$TEMP_FILE"

# Run yamllint on the files
yamllint $FILES