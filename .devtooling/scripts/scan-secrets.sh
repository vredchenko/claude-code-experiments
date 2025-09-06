#!/bin/bash

# Secret scanning script using gitleaks
# Usage: ./scan-secrets.sh

echo "🔍 Scanning for secrets with gitleaks..."

# Get the script directory to find gitleaks
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
GITLEAKS_BIN="${PROJECT_ROOT}/node_modules/.bin/gitleaks"

# Check if gitleaks is installed
if [ ! -x "$GITLEAKS_BIN" ]; then
    echo "❌ Gitleaks not found. Installing..."
    "${SCRIPT_DIR}/install-gitleaks.sh"
fi

# Run gitleaks detect
cd "$PROJECT_ROOT"
$GITLEAKS_BIN detect \
    --config .devtooling/configs/.gitleaks.toml \
    --source . \
    --verbose

exit_code=$?

if [ $exit_code -eq 0 ]; then
    echo "✅ No secrets detected!"
else
    echo "⚠️  Potential secrets found. Review the output above."
fi

echo "🔒 Secret scan complete"
exit $exit_code