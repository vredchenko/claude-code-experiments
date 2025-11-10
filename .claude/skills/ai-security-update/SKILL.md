# AI Security Documentation Update Skill

## Overview

This skill provides a systematic workflow for checking upstream AI security
sources and updating the internalized documentation to stay current with the
rapidly evolving threat landscape.

## Purpose

Use this skill when you need to:

- Check for updates to MITRE ATLAS framework
- Update OWASP LLM Top 10 when new versions release
- Incorporate new CVEs and vulnerabilities
- Refresh compliance frameworks (NIST, ISO, EU AI Act changes)
- Update threat intelligence with recent incidents
- Propagate changes to agents and skills

## Philosophy

**"Living documentation requires active maintenance."**

AI security evolves rapidly. This skill embodies:
- **Proactive monitoring**: Regular checks for updates
- **Systematic comparison**: Identify what changed
- **Comprehensive propagation**: Update all affected components
- **Version tracking**: Document what changed and when

## Update Frequency

### Recommended Schedule

**Monthly** (High Priority):
- CVE tracking and threat intelligence
- Critical security advisories
- New attack techniques in the wild

**Quarterly** (Standard):
- MITRE ATLAS framework changes
- OWASP LLM Top 10 updates
- Industry research papers
- Emerging threat landscape

**Annually** (Planned):
- NIST AI RMF updates
- ISO standard revisions
- Major compliance framework changes

**As-Needed** (Reactive):
- Major security incidents
- Zero-day vulnerabilities
- Regulatory changes (EU AI Act enforcement)

## Workflow Phases

### Phase 1: Check for Updates

**Objective**: Determine what has changed in upstream sources

**Activities**:

1. **MITRE ATLAS Monitoring**:
   ```bash
   # Primary sources to check
   - https://atlas.mitre.org/matrices/ATLAS
   - https://github.com/mitre-atlas/atlas-data
   - ATLAS announcements and blog
   ```

   **What to check**:
   - Number of tactics (currently 14)
   - Number of techniques (currently 56)
   - New case studies
   - Updated mitigations
   - Deprecated techniques

   **Using WebFetch**:
   ```
   Fetch: https://atlas.mitre.org/matrices/ATLAS
   Prompt: "List all tactics and count techniques. Identify any new tactics,
   techniques, or case studies added since the last check. Note version
   number or last update date."
   ```

2. **OWASP Monitoring**:
   ```bash
   # Check for updates
   - https://genai.owasp.org/llmrisk/
   - OWASP AI Exchange: https://owaspai.org/
   ```

   **What to check**:
   - LLM Top 10 version (currently 2025)
   - Changes to risk rankings
   - New attack vectors
   - Updated mitigations

3. **CVE and Vulnerability Tracking**:
   ```bash
   # Check CVE databases
   - https://nvd.nist.gov (search: AI, LLM, ML, PyTorch, TensorFlow)
   - Vendor security advisories
   - AI security mailing lists
   ```

   **What to check**:
   - New AI-related CVEs (monthly)
   - Critical vulnerabilities (CVSS > 7.0)
   - Framework vulnerabilities (PyTorch, TensorFlow, etc.)
   - LLM application vulnerabilities

4. **Compliance Framework Monitoring**:
   ```bash
   # Regulatory and standards updates
   - NIST AI: https://www.nist.gov/artificial-intelligence
   - EU AI Act: Official Journal of the European Union
   - ISO updates: https://www.iso.org/
   ```

   **What to check**:
   - EU AI Act implementation deadlines
   - NIST AI RMF updates or new profiles
   - ISO 42001 amendments

5. **Research and Threat Intelligence**:
   ```bash
   # Academic and industry sources
   - ArXiv: adversarial machine learning
   - NeurIPS, ICML, IEEE S&P proceedings
   - Security vendor threat reports
   - AI Incident Database: https://incidentdatabase.ai/
   ```

   **What to check**:
   - Novel attack techniques
   - New defense mechanisms
   - Real-world incidents
   - Emerging threats (agentic AI, federated learning)

**Deliverable**: Update assessment report

**Example Assessment**:
```markdown
## AI Security Documentation Update Assessment

**Date**: 2026-02-15
**Checked By**: [Your name]
**Next Review**: 2026-05-15 (quarterly)

### MITRE ATLAS
- ✅ No changes (still 14 tactics, 56 techniques)
- 📝 New case study: "GPT-5 Jailbreak Incident (Jan 2026)"
- 🔄 Updated mitigation for AML.T0051 (Prompt Injection)

### OWASP LLM Top 10
- ✅ Still version 2025
- 📝 Updated LLM01 guidance (new defense techniques)

### CVEs (Last 30 days)
- 🚨 CVE-2026-12345: PyTorch RCE (CVSS 9.8) - CRITICAL
- 🚨 CVE-2026-12346: Hugging Face Transformers XSS (CVSS 7.2)
- ℹ️ 15 other AI-related CVEs (CVSS < 7.0)

### Compliance
- 📅 EU AI Act: High-risk systems deadline approaching (Aug 2027)
- ✅ NIST: No updates
- ✅ ISO: No amendments

### Threat Intelligence
- 📰 Major incident: "DeepMind Model Theft" (Feb 2026)
- 📈 Prompt injection attacks up 45% (Q1 2026)
- 🆕 New tool: Garak v2.0 with multi-modal testing

### Emerging Threats
- 🔬 Research: "Quantum-Resistant ML Watermarking" (ArXiv)
- 🤖 Agentic AI attacks in the wild (3 documented incidents)

### Recommendations
1. CRITICAL: Add CVE-2026-12345 to THREAT-INTELLIGENCE.md
2. HIGH: Add DeepMind case study to MITRE-ATLAS-REFERENCE.md
3. MEDIUM: Update OWASP-LLM-SECURITY.md with new LLM01 defenses
4. LOW: Add quantum watermarking to EMERGING-THREATS.md
```

### Phase 2: Prioritize Updates

**Objective**: Determine what to update and in what order

**Priority Levels**:

**P0 - Critical (Immediate)**:
- Critical CVEs (CVSS 9.0+)
- Active exploitation in the wild
- Major security incidents affecting many users
- Breaking regulatory changes

**P1 - High (Within 1 week)**:
- New ATLAS tactics or techniques
- OWASP Top 10 major revisions
- High-severity CVEs (CVSS 7.0-8.9)
- Significant research breakthroughs

**P2 - Medium (Within 1 month)**:
- Case study additions
- Mitigation updates
- Tool version updates
- Minor framework changes

**P3 - Low (Next quarterly review)**:
- Editorial improvements
- Additional references
- Formatting updates
- Non-critical research additions

**Decision Matrix**:
```markdown
## Update Prioritization

| Change | Impact | Effort | Priority | Deadline |
|--------|--------|--------|----------|----------|
| CVE-2026-12345 | Critical | Low | P0 | Immediate |
| DeepMind incident | High | Medium | P1 | 1 week |
| OWASP LLM01 update | Medium | Low | P1 | 1 week |
| Quantum research | Low | Low | P3 | Q2 review |
```

### Phase 3: Update Documentation

**Objective**: Incorporate changes into appropriate documents

**Update Process**:

#### 3.1 Update MITRE-ATLAS-REFERENCE.md

**When**: ATLAS framework changes, new case studies, mitigation updates

**Process**:
1. Read current `docs/ai-security/MITRE-ATLAS-REFERENCE.md`
2. Identify sections to update
3. Use Edit tool to make changes
4. Update version history at bottom

**Example Update**:
```markdown
### Case Study 6: GPT-5 Jailbreak Incident (2026)

**Attack Type**: Multi-turn prompt injection with context manipulation
**ATLAS Tactics**: TA0047 (ML Attack Staging), TA0034 (Impact)
**CVSS**: N/A (Not a CVE, but high impact)

**Incident**:
- Researchers demonstrated systematic jailbreak of GPT-5
- Used chain-of-thought manipulation across 12 turns
- Bypassed all safety filters
- OpenAI patched within 48 hours

**Lessons**:
- Multi-turn attacks harder to defend
- Context window size increases attack surface
- Need stateful safety filters
- Rapid response critical

**Mitigations Applied**:
- Enhanced multi-turn monitoring
- Context-aware safety checks
- Conversation state analysis
- User intent modeling
```

**Don't forget**:
```markdown
## Version History

- **v1.0 (June 2021)**: Initial release
- **v2.0 (2023)**: LLM expansion
- **v3.0 (2025)**: Multi-modal attacks
- **v3.1 (Feb 2026)**: Added GPT-5 case study, updated prompt injection mitigations
```

#### 3.2 Update OWASP-LLM-SECURITY.md

**When**: OWASP updates, new defenses, tool updates

**Process**:
1. Check which risk(s) changed (LLM01-LLM10)
2. Update mitigation sections
3. Add new code examples if provided
4. Update tool versions

**Example**:
```markdown
### LLM01: Prompt Injection

[Existing content...]

**New Defense Technique** (Feb 2026):

4. **Stateful Safety Monitoring**:
   ```python
   class StatefulSafetyFilter:
       def __init__(self):
           self.conversation_state = ConversationState()

       def check_safety(self, turn_num, message, history):
           # Analyze entire conversation context
           context_risk = self.analyze_context(history)

           # Check current message
           message_risk = self.analyze_message(message)

           # Multi-turn pattern detection
           pattern_risk = self.detect_attack_patterns(history + [message])

           combined_risk = max(context_risk, message_risk, pattern_risk)

           if combined_risk > THRESHOLD:
               return False, "Potential multi-turn attack detected"
           return True, "Safe"
   ```
```

#### 3.3 Update THREAT-INTELLIGENCE.md

**When**: New CVEs, incidents, IoCs

**Process**:
1. Add new CVEs to relevant sections
2. Add incident case studies
3. Update statistics and trends
4. Refresh IoCs

**Example**:
```markdown
### CVE-2026-12345: PyTorch Remote Code Execution

**Published**: February 1, 2026
**CVSS**: 9.8 (Critical)
**Type**: Deserialization vulnerability

**Description**:
Remote code execution via malicious PyTorch model files (.pt, .pth).
Affects PyTorch versions < 2.5.2.

**Attack Vector**:
```python
# Attacker creates malicious model
malicious_model = craft_malicious_pytorch_model(payload="reverse_shell")

# Victim loads model
model = torch.load("malicious_model.pt")  # RCE triggered
```

**Impact**:
- Full system compromise
- Model supply chain attacks
- Training pipeline compromise

**Mitigation**:
```python
# Use weights_only parameter (PyTorch 2.5.2+)
model = torch.load("model.pt", weights_only=True)

# Or use safetensors format
from safetensors.torch import load_file
model = load_file("model.safetensors")
```

**Patched Versions**: PyTorch >= 2.5.2
**References**: CVE-2026-12345, PyTorch Security Advisory
```

#### 3.4 Update COMPLIANCE-FRAMEWORKS.md

**When**: Regulatory changes, deadline updates

**Process**:
1. Update timelines
2. Revise requirements
3. Add new penalties or enforcement actions

#### 3.5 Update EMERGING-THREATS.md

**When**: New research, novel attacks, future trends

**Process**:
1. Add new threat categories
2. Update existing sections with new techniques
3. Cite recent research

### Phase 4: Propagate to Agents and Skills

**Objective**: Ensure agents and skills reference updated information

**Components to Check**:

1. **ATLAS Threat Modeling Agent**
   (`.claude/agents/ai-security/atlas-threat-modeling-agent.md`):
   - References to ATLAS tactics/techniques
   - Case study examples
   - Detection strategies

2. **AI Red Team Agent**
   (`.claude/agents/ai-security/ai-red-team-agent.md`):
   - Attack technique updates
   - Tool version references
   - Example attack code

3. **AI Defense Strategy Agent**
   (`.claude/agents/ai-security/ai-defense-strategy-agent.md`):
   - Mitigation strategies
   - Code examples
   - Tool recommendations

4. **AI Security Assessment Skill**
   (`.claude/skills/ai-security-assessment/SKILL.md`):
   - Testing procedures
   - Tool versions
   - Workflow updates

5. **Adversarial Testing Skill**
   (`.claude/skills/adversarial-testing/SKILL.md`):
   - Attack implementations
   - Tool usage
   - Metrics

**Propagation Checklist**:
```markdown
## Propagation Checklist: CVE-2026-12345

### Documentation Updated
- [x] THREAT-INTELLIGENCE.md (added CVE)
- [x] OWASP-LLM-SECURITY.md (added to LLM03 Supply Chain)

### Agents to Update
- [x] AI Defense Strategy Agent: Add PyTorch safe loading example
- [x] AI Red Team Agent: Add supply chain attack vector
- [ ] ATLAS Threat Modeling Agent: No changes needed (already covered)

### Skills to Update
- [x] AI Security Assessment Skill: Add PyTorch CVE to Phase 1 checklist
- [x] Adversarial Testing Skill: Add supply chain test case
- [ ] Other skills: No impact

### Testing
- [x] Verified all cross-references work
- [x] Checked for broken links
- [x] Validated code examples
```

### Phase 5: Version Control and Commit

**Objective**: Document changes and commit to repository

**Commit Process**:

1. **Review All Changes**:
   ```bash
   git status
   git diff docs/ai-security/
   git diff .claude/agents/ai-security/
   git diff .claude/skills/
   ```

2. **Stage Changes**:
   ```bash
   git add docs/ai-security/
   git add .claude/agents/ai-security/
   git add .claude/skills/
   git add CLAUDE.md  # If updated
   ```

3. **Commit with Descriptive Message**:
   ```bash
   git commit -m "docs(ai-security): Monthly update (Feb 2026)

   Updates based on upstream source monitoring and threat intelligence.

   MITRE ATLAS:
   - Add GPT-5 jailbreak case study
   - Update prompt injection mitigation (AML.T0051)

   CVEs:
   - Add CVE-2026-12345: PyTorch RCE (CVSS 9.8, CRITICAL)
   - Add CVE-2026-12346: HuggingFace XSS (CVSS 7.2)

   Incidents:
   - Add DeepMind model theft case study (Feb 2026)

   OWASP:
   - Update LLM01 with stateful safety monitoring technique

   Tools:
   - Update Garak to v2.0
   - Add PyTorch safe loading examples

   Propagated Changes:
   - AI Defense Strategy Agent: PyTorch security updates
   - AI Red Team Agent: Supply chain attack vectors
   - Adversarial Testing Skill: New test cases

   Version: MITRE-ATLAS-REFERENCE v3.1
   "
   ```

4. **Push Changes**:
   ```bash
   git push
   ```

### Phase 6: Validation and Testing

**Objective**: Ensure updates are correct and complete

**Validation Steps**:

1. **Link Checking**:
   ```bash
   # Check all external links still work
   # (Use link checker tool or manual spot checks)
   ```

2. **Cross-Reference Validation**:
   - Verify ATLAS → OWASP mappings still correct
   - Check compliance framework references
   - Validate tool version numbers

3. **Code Example Testing**:
   ```bash
   # If updated Python code examples, test them
   python -c "
   import torch
   # Test safe loading example
   model = torch.load('test.pt', weights_only=True)
   "
   ```

4. **Agent Reference Check**:
   - Read each updated agent
   - Verify they reference correct documentation
   - Check no broken internal links

5. **Changelog Review**:
   - Document versions incremented
   - Update dates current
   - Maintenance notes accurate

**Deliverable**: Validated, updated documentation

## Automation Helpers

### Update Check Script

Create a helper script to check for updates:

**File**: `scripts/check-ai-security-updates.sh`

```bash
#!/bin/bash
# Check for AI security documentation updates

echo "=== AI Security Documentation Update Check ==="
echo "Date: $(date)"
echo ""

echo "Checking MITRE ATLAS..."
echo "Source: https://atlas.mitre.org/matrices/ATLAS"
echo "Action: Use WebFetch/WebSearch to check for updates"
echo ""

echo "Checking OWASP..."
echo "Source: https://genai.owasp.org/llmrisk/"
echo "Action: Use WebFetch/WebSearch to check for updates"
echo ""

echo "Checking CVEs (last 30 days)..."
echo "Sources:"
echo "  - https://nvd.nist.gov (keyword: AI, LLM, ML)"
echo "  - Vendor security bulletins"
echo "Action: Use WebSearch for recent CVEs"
echo ""

echo "Checking Compliance Frameworks..."
echo "Sources:"
echo "  - NIST: https://www.nist.gov/artificial-intelligence"
echo "  - EU AI Act updates"
echo "  - ISO announcements"
echo ""

echo "=== Next Steps ==="
echo "1. Use Claude to run WebFetch/WebSearch on above sources"
echo "2. Compare with current documentation"
echo "3. Follow AI Security Update Skill workflow"
echo "4. Commit changes with detailed message"
```

### Monitoring Sources Checklist

**File**: `docs/ai-security/UPDATE-SOURCES.md`

```markdown
# AI Security Update Sources

## Primary Sources (Check Monthly)

### MITRE ATLAS
- **URL**: https://atlas.mitre.org/matrices/ATLAS
- **GitHub**: https://github.com/mitre-atlas/atlas-data
- **What to Check**: New tactics, techniques, case studies
- **Current Version**: v3.0 (as of 2025)
- **Last Checked**: [Date]

### OWASP GenAI Security
- **URL**: https://genai.owasp.org/llmrisk/
- **AI Exchange**: https://owaspai.org/
- **What to Check**: LLM Top 10 updates, new risks
- **Current Version**: 2025
- **Last Checked**: [Date]

### CVE Databases
- **NVD**: https://nvd.nist.gov
- **Search Terms**: AI, LLM, ML, PyTorch, TensorFlow, Anthropic, OpenAI
- **What to Check**: CVSS > 7.0, AI-specific vulnerabilities
- **Last Checked**: [Date]

## Secondary Sources (Check Quarterly)

### NIST
- **AI RMF**: https://www.nist.gov/itl/ai-risk-management-framework
- **AI 100-2**: Adversarial ML taxonomy updates
- **Last Checked**: [Date]

### EU AI Act
- **Portal**: https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai
- **What to Check**: Implementation deadlines, guidance
- **Last Checked**: [Date]

### ISO
- **42001**: Check for amendments
- **Last Checked**: [Date]

### Research (ArXiv, Conferences)
- **ArXiv**: Search "adversarial machine learning"
- **Conferences**: NeurIPS, ICML, IEEE S&P, USENIX Security
- **Last Checked**: [Date]

## Vendor-Specific (As Needed)

### Tool Updates
- **PyRIT**: https://github.com/Azure/PyRIT
- **Promptfoo**: https://www.promptfoo.dev/
- **Garak**: Check releases
- **ART**: https://github.com/Trusted-AI/adversarial-robustness-toolbox

### Vendor Advisories
- **OpenAI**: Security bulletins
- **Anthropic**: Security updates
- **Google**: AI security blog
- **Microsoft**: MSRC AI advisories
```

## Success Criteria

Update is complete when:

- ✅ All upstream sources checked
- ✅ Changes identified and prioritized
- ✅ Documentation updated (all affected files)
- ✅ Changes propagated to agents and skills
- ✅ Version numbers incremented
- ✅ Commit message detailed and clear
- ✅ Changes pushed to repository
- ✅ Validation completed (links, code, references)
- ✅ Next review date set

## Common Update Patterns

### Pattern 1: New CVE

1. Add to THREAT-INTELLIGENCE.md (CVE section)
2. Update relevant risk in OWASP-LLM-SECURITY.md if applicable
3. Add mitigation to AI Defense Strategy Agent
4. Add test case to Adversarial Testing Skill if relevant
5. Commit: "docs(threat-intel): Add CVE-YYYY-XXXXX"

### Pattern 2: ATLAS Framework Update

1. Update MITRE-ATLAS-REFERENCE.md (tactics, techniques, or cases)
2. Update ATLAS Threat Modeling Agent (new techniques)
3. Update AI Security Assessment Skill (new threats to check)
4. Update cross-references in OWASP and Compliance docs
5. Commit: "docs(atlas): Update to ATLAS vX.Y"

### Pattern 3: New Attack Technique

1. Add to relevant doc (OWASP, Emerging Threats, or ATLAS)
2. Update AI Red Team Agent (attack implementation)
3. Update AI Defense Strategy Agent (mitigation)
4. Add test to Adversarial Testing Skill
5. Commit: "docs: Add [attack name] technique and defenses"

### Pattern 4: Regulatory Change

1. Update COMPLIANCE-FRAMEWORKS.md
2. Update AI Security Assessment Skill (compliance checklist)
3. Add to ATLAS Threat Modeling Agent (regulatory context)
4. Commit: "docs(compliance): Update [framework] requirements"

## Integration with Existing Maintenance

This skill integrates with the existing maintenance guidance in
MITRE-ATLAS-REFERENCE.md "Maintaining This Document" section. Use both
together for comprehensive upkeep.

## Tools and Resources

**Web Monitoring**:
- Use WebFetch tool to check URLs
- Use WebSearch for recent developments
- Manual review for detailed changes

**Git Tools**:
- `git diff` for reviewing changes
- `git log` for tracking update history
- `git blame` for attribution

**Documentation Tools**:
- Markdown linters for formatting
- Link checkers for validation
- Version control for history

## Version History

- **v1.0 (2025-11-10)**: Initial skill creation

---

**Skill Type**: Maintenance/Process
**Domain**: AI Security Documentation
**Expertise Level**: Intermediate
**Time Commitment**: 2-4 hours monthly, 1 day quarterly
