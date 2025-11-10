#!/bin/bash
# AI Security Documentation Update Checker
# Purpose: Assist with checking upstream sources for updates
# Usage: ./scripts/check-ai-security-updates.sh

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}AI Security Documentation Update Check${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo "Location: $(pwd)"
echo ""

# Function to print section headers
print_section() {
    echo ""
    echo -e "${GREEN}=== $1 ===${NC}"
}

# Function to print action items
print_action() {
    echo -e "${YELLOW}→${NC} $1"
}

# Function to print URLs
print_url() {
    echo -e "${BLUE}  $1${NC}"
}

# Check if we're in the right directory
if [ ! -d "docs/ai-security" ]; then
    echo -e "${RED}Error: docs/ai-security directory not found${NC}"
    echo "Please run this script from the repository root"
    exit 1
fi

print_section "MITRE ATLAS Framework"
print_url "https://atlas.mitre.org/matrices/ATLAS"
print_url "https://github.com/mitre-atlas/atlas-data"
echo ""
echo "Current documentation:"
echo "  File: docs/ai-security/MITRE-ATLAS-REFERENCE.md"
if [ -f "docs/ai-security/MITRE-ATLAS-REFERENCE.md" ]; then
    ATLAS_VERSION=$(grep -m 1 "Document Version" docs/ai-security/MITRE-ATLAS-REFERENCE.md | cut -d':' -f2 | xargs || echo "Unknown")
    ATLAS_DATE=$(grep -m 1 "Last Updated" docs/ai-security/MITRE-ATLAS-REFERENCE.md | cut -d':' -f2 | xargs || echo "Unknown")
    echo "  Version: $ATLAS_VERSION"
    echo "  Last Updated: $ATLAS_DATE"
fi
print_action "Check for: New tactics (currently 14), techniques (currently 56), case studies"

print_section "OWASP LLM Security"
print_url "https://genai.owasp.org/llmrisk/"
print_url "https://owaspai.org/"
echo ""
echo "Current documentation:"
echo "  File: docs/ai-security/OWASP-LLM-SECURITY.md"
if [ -f "docs/ai-security/OWASP-LLM-SECURITY.md" ]; then
    OWASP_VERSION=$(grep -m 1 "Based On" docs/ai-security/OWASP-LLM-SECURITY.md | grep -o "20[0-9][0-9]" || echo "Unknown")
    echo "  Version: OWASP LLM Top 10 ($OWASP_VERSION)"
fi
print_action "Check for: LLM Top 10 updates, new risks, updated mitigations"

print_section "CVE Database (Last 30 days)"
print_url "https://nvd.nist.gov"
echo ""
echo "Search keywords:"
echo "  - AI, LLM, ML"
echo "  - PyTorch, TensorFlow, JAX"
echo "  - Anthropic, OpenAI, Hugging Face"
echo "  - Prompt injection, model extraction"
print_action "Filter: CVSS Score >= 7.0 (High/Critical only)"
print_action "Update: docs/ai-security/THREAT-INTELLIGENCE.md"

print_section "Compliance Frameworks"
print_url "https://www.nist.gov/itl/ai-risk-management-framework"
print_url "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
echo ""
echo "Current documentation:"
echo "  File: docs/ai-security/COMPLIANCE-FRAMEWORKS.md"
print_action "Check NIST AI RMF for new profiles or updates"
print_action "Check EU AI Act implementation timeline"
print_action "Check ISO 42001 for amendments"

print_section "Emerging Threats & Research"
print_url "https://arxiv.org (search: adversarial machine learning, LLM security)"
echo ""
echo "Conferences to monitor:"
echo "  - NeurIPS (Neural Information Processing Systems)"
echo "  - ICML (International Conference on Machine Learning)"
echo "  - IEEE S&P (Security and Privacy)"
echo "  - USENIX Security"
print_action "Check for: Novel attacks, defense breakthroughs, agentic AI security"
print_action "Update: docs/ai-security/EMERGING-THREATS.md"

print_section "Tool Updates"
echo "Tools to check:"
echo "  - PyRIT: https://github.com/Azure/PyRIT"
echo "  - Promptfoo: https://www.promptfoo.dev/"
echo "  - Garak: https://github.com/leondz/garak"
echo "  - ART: https://github.com/Trusted-AI/adversarial-robustness-toolbox"
print_action "Check for: New versions, features, bug fixes"

print_section "Threat Intelligence Sources"
echo "Vendor security advisories:"
echo "  - OpenAI: https://openai.com/security"
echo "  - Anthropic: https://www.anthropic.com/security"
echo "  - Google: https://ai.google/safety-security/"
echo "  - Microsoft: https://msrc.microsoft.com/"
print_action "Check for: Security bulletins, incident reports"

print_section "Next Steps"
echo ""
echo "To perform the update:"
echo ""
echo "1. Manual Check (Use Claude with WebFetch/WebSearch):"
echo "   Ask Claude to check each source above and report changes"
echo ""
echo "2. Or use the AI Security Update Skill:"
echo "   - Open Claude Code"
echo "   - Invoke the 'ai-security-update' skill"
echo "   - Follow the 6-phase workflow"
echo ""
echo "3. Or use the helper command:"
echo "   echo 'Check all AI security sources for updates' | claude"
echo ""
echo "Update workflow reference:"
echo "  .claude/skills/ai-security-update/SKILL.md"
echo ""

print_section "Quick Status"
echo ""

# Count files in ai-security docs
DOC_COUNT=$(ls -1 docs/ai-security/*.md 2>/dev/null | wc -l)
echo "Documentation files: $DOC_COUNT"

# Get last git commit to ai-security
LAST_COMMIT=$(git log -1 --format="%h - %s (%ar)" -- docs/ai-security/ 2>/dev/null || echo "No git history")
echo "Last update: $LAST_COMMIT"

# Recommended next check date (30 days from now)
if command -v date >/dev/null 2>&1; then
    if [[ "$OSTYPE" == "darwin"* ]]; then
        NEXT_CHECK=$(date -v+30d '+%Y-%m-%d')
    else
        NEXT_CHECK=$(date -d '+30 days' '+%Y-%m-%d')
    fi
    echo "Next check recommended: $NEXT_CHECK (monthly)"
fi

echo ""
echo -e "${GREEN}Update check complete!${NC}"
echo ""
