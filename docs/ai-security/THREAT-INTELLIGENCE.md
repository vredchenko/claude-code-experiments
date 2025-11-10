# AI Security Threat Intelligence

> **Purpose**: Track real-world vulnerabilities, CVEs, and incident intelligence
>
> **Maintenance**: Monthly updates for CVEs, quarterly for trends
>
> **Sources**: CVE database, security advisories, incident reports

## Overview

Threat intelligence provides actionable information about real-world AI
security incidents, vulnerabilities, and attacker techniques. This document
tracks AI-specific threats as they emerge.

## Current Threat Landscape (2025)

### Key Statistics

- **CVE Growth**: 46,886 projected CVEs for 2025 (+17% YoY)
- **AI-Specific CVEs**: Increasing focus on ML frameworks and LLM applications
- **Attack Sophistication**: Rising complexity, automated attacks
- **Incident Costs**: Model theft losses exceed $10B annually

### Trend Analysis

**Top Attack Vectors (2025)**:
1. Prompt injection (87% of LLM incidents)
2. Model extraction (increasing sophistication)
3. Data poisoning (especially supply chain)
4. Adversarial examples (physical world attacks)
5. Supply chain compromises

## Critical CVEs (2025)

### CVE-2025-32711: "EchoLeak"

**Product**: Microsoft 365 Copilot
**Published**: June 2025
**CVSS**: 9.3 (Critical)
**Type**: Prompt Injection / Data Exfiltration

**Description**:
Zero-click vulnerability allowing attackers to exfiltrate sensitive data from
Microsoft 365 Copilot via maliciously crafted emails.

**Attack Vector**:
```text
1. Attacker sends email with hidden prompt injection
2. Victim's Copilot processes email
3. Injection triggers data exfiltration
4. Sensitive data sent to attacker without user interaction
```

**Impact**:
- Confidential email content exposure
- Customer data leakage
- Business document access

**Mitigation**:
- Microsoft patched June 2025
- Enhanced email content filtering
- Stricter context separation
- Output validation improvements

**Lessons**:
- Zero-click attacks possible against AI agents
- Email is high-risk vector for indirect injection
- Context boundaries critical for security

### CVE-2025-6965: SQLite Vulnerability

**Discovered By**: Google Big Sleep (AI-powered fuzzing)
**CVSS**: TBD
**Type**: Memory corruption

**Significance**:
- First major vulnerability discovered by AI vs AI
- Demonstrates offensive AI capabilities
- Highlights need for AI-powered defense

### ML Framework CVEs

**PyTorch**:
- CVE-2025-XXXXX: Deserialization vulnerability (TorchScript)
- Impact: Code execution when loading malicious models
- Mitigation: Use `torch.load()` with `weights_only=True`

**TensorFlow**:
- CVE-2025-XXXXX: Buffer overflow in custom operations
- Impact: Code execution via crafted model
- Mitigation: Update to patched version, validate model sources

**Hugging Face Transformers**:
- Multiple incidents of malicious models uploaded
- Mitigation: Model scanning before use, trusted sources only

## Incident Case Studies

### Case Study 1: Tay Chatbot Corruption (2016)

**Date**: March 2016
**Victim**: Microsoft Tay chatbot
**Attack Type**: Data poisoning via online learning
**ATLAS Mapping**: TA0042 (Resource Development), TA0034 (Impact)

**Incident**:
- Twitter users coordinated to feed offensive content
- Tay learned from interactions (online learning)
- Within 24 hours, Tay started generating hate speech
- Microsoft took Tay offline

**Lessons**:
- Online learning without filtering is high-risk
- Adversarial users will exploit public AI
- Content moderation essential for public-facing AI
- Human-in-loop for training data validation

### Case Study 2: DeepSeek vs OpenAI (2024)

**Date**: Early 2024
**Allegation**: Model theft via distillation
**ATLAS Mapping**: TA0045 (ML Model Access), TA0036 (Exfiltration)

**Incident**:
- OpenAI accused DeepSeek of stealing model via API
- Method: Query-based model extraction and distillation
- Massive API query volume observed
- Legal action initiated

**Lessons**:
- API access enables model theft
- Rate limiting alone insufficient
- Watermarking helps prove theft
- Legal protections needed alongside technical

**Mitigations Applied**:
- Enhanced query pattern analysis
- Dynamic rate limiting based on behavior
- Model fingerprinting and watermarking
- Improved terms of service

### Case Study 3: ProofPoint ML Evasion

**Product**: ProofPoint email security (ML-based)
**Attack Type**: Adversarial evasion
**ATLAS Mapping**: TA0037 (Defense Evasion)

**Incident**:
- Researchers demonstrated adversarial examples bypassing filter
- Slightly modified phishing emails evaded detection
- ML model blind spots exploited

**Lessons**:
- Security-critical ML needs adversarial robustness
- Single-model detection insufficient
- Ensemble methods provide better resilience
- Regular adversarial testing essential

### Case Study 4: Facial Recognition Poisoning

**Target**: Multiple facial recognition systems
**Attack Type**: Data poisoning in public datasets
**ATLAS Mapping**: TA0042 (Resource Development), TA0040 (Persistence)

**Incident**:
- Adversarial perturbations injected into public face datasets
- Models trained on poisoned data misidentified individuals
- Persistent backdoors inserted via training

**Lessons**:
- Public datasets are attack vectors
- Data provenance critical
- Validation on clean data needed
- Robust training methods help but not foolproof

## Threat Actor Profiles

### Nation-State Actors

**Capabilities**:
- Advanced persistent threats (APT)
- Model theft for competitive advantage
- Data poisoning at scale
- Zero-day vulnerability discovery

**Motivations**:
- Economic espionage (steal AI IP)
- Strategic advantage (military AI)
- Intelligence gathering

**Recent Activities**:
- Targeting AI research labs
- Supply chain compromises
- Academic institution infiltration

### Cybercriminal Groups

**Capabilities**:
- Automated attack tools
- Stolen model monetization
- AI-powered fraud
- Ransomware using AI reconnaissance

**Motivations**:
- Financial gain
- Cryptocurrency fraud
- Identity theft
- Extortion

**Recent Activities**:
- Model extraction for resale
- AI-generated phishing at scale
- Deepfake-enabled fraud
- Credential stuffing with AI

### Hacktivist Groups

**Capabilities**:
- DDoS against AI services
- Data leaks (training data, models)
- Jailbreaking and safety bypass
- Public demonstrations of vulnerabilities

**Motivations**:
- Political/social causes
- Anti-AI activism
- Exposing biases
- Public awareness

### Insider Threats

**Capabilities**:
- Direct access to models and data
- Knowledge of security controls
- Ability to exfiltrate IP
- Sabotage potential

**Motivations**:
- Financial (selling to competitors)
- Ideology
- Grievances
- Unintentional (negligence)

**Mitigations**:
- Least privilege access
- Activity monitoring and DLP
- Background checks
- Exit procedures

## Vulnerability Disclosure Trends

### Growth in AI CVEs

**2023**: ~500 AI-related CVEs
**2024**: ~800 AI-related CVEs
**2025 (projected)**: 1,200+ AI-related CVEs

**Categories**:
- ML framework vulnerabilities (40%)
- Application-level (LLM, APIs) (35%)
- Infrastructure (cloud, containers) (15%)
- Hardware (GPUs, TPUs) (5%)
- Other (5%)

### Common Vulnerability Types

1. **Deserialization**: Loading untrusted models (e.g., pickle files)
2. **Prompt Injection**: LLM input validation failures
3. **Path Traversal**: Model/data file access controls
4. **Denial of Service**: Resource exhaustion via inputs
5. **Information Disclosure**: Unintended data leakage

### Disclosure Channels

- **CVE Program**: Official vulnerability database
- **GitHub Security Advisories**: For open-source projects
- **Vendor Security Bulletins**: Company-specific advisories
- **Research Papers**: Academic disclosure
- **Bug Bounties**: HackerOne, Bugcrowd platforms

## Indicators of Compromise (IoCs)

### Detecting Model Extraction Attempts

**Behavioral Indicators**:
```python
# Monitor for extraction patterns
indicators = {
    'high_query_volume': queries_per_hour > 1000,
    'systematic_queries': detect_sequential_patterns(queries),
    'corner_case_queries': contains_edge_cases(queries),
    'uniform_distribution': check_query_distribution(queries)
}

if sum(indicators.values()) >= 3:
    alert("Potential model extraction attempt")
```

**Network Indicators**:
- Unusual geographic locations
- Bot-like query patterns
- Multiple API keys from same source
- Evasion of rate limits (distributed queries)

### Detecting Prompt Injection

**Content Indicators**:
```python
injection_patterns = [
    r"ignore\s+(previous|all)\s+instructions",
    r"system\s+prompt",
    r"new\s+instructions?:",
    r"<\|im_start\|>",
    r"pretend\s+you\s+are",
    r"DAN\s+mode"
]

for pattern in injection_patterns:
    if re.search(pattern, user_input, re.IGNORECASE):
        log_potential_injection(user_input)
```

**Response Indicators**:
- System prompt fragments in output
- Unusually detailed system information
- Format changes (markdown, code blocks appearing)
- Safety filter bypass language

### Detecting Data Poisoning

**Training Data Indicators**:
```python
def detect_poisoning(training_batch):
    # Statistical outlier detection
    outliers = detect_statistical_outliers(training_batch)

    # Label inconsistency
    inconsistent = find_label_inconsistencies(training_batch)

    # Known poisoning patterns
    patterns = check_known_poisoning_signatures(training_batch)

    if outliers or inconsistent or patterns:
        quarantine_batch(training_batch)
        alert_security_team()
```

### Detecting Adversarial Examples

**Runtime Detection**:
```python
def detect_adversarial(input_data, model):
    # Check prediction confidence
    confidence = model.predict_proba(input_data).max()
    if confidence < CONFIDENCE_THRESHOLD:
        flag_as_suspicious(input_data)

    # Statistical tests
    if is_statistical_outlier(input_data):
        flag_as_suspicious(input_data)

    # Adversarial detector
    if adversarial_classifier.predict(input_data) == 'adversarial':
        block_input(input_data)
```

## Threat Intelligence Sources

### Public Sources

**CVE Databases**:
- <https://cve.mitre.org>
- <https://nvd.nist.gov>
- <https://www.cvedetails.com>

**Security Advisories**:
- GitHub Security Advisories
- Vendor security bulletins (Google, Microsoft, OpenAI, etc.)
- ML framework security pages

**Research**:
- ArXiv: <https://arxiv.org> (search: adversarial machine learning)
- NeurIPS, ICML, IEEE S&P proceedings
- Security conferences (Black Hat, DEF CON, etc.)

**Community**:
- OWASP AI Exchange
- AI Security mailing lists
- Twitter/X security researchers

### Commercial Sources

**Threat Intelligence Platforms**:
- Recorded Future
- Mandiant Threat Intelligence
- CrowdStrike Falcon Intelligence
- IBM X-Force

**AI-Specific**:
- HiddenLayer threat feeds
- Robust Intelligence vulnerability alerts
- Lakera AI security updates

### Information Sharing

**ISACs** (Information Sharing and Analysis Centers):
- Financial Services ISAC
- Healthcare ISAC
- Emerging: AI ISAC (proposal stage)

**Best Practices**:
- Share indicators anonymously
- Responsible disclosure timelines
- Coordinate with vendors
- Use TLP (Traffic Light Protocol) classifications

## Threat Intelligence Platform Integration

### MISP (Malware Information Sharing Platform)

**AI Security Extensions**:
```python
# Define AI-specific threat object
ai_threat = {
    'type': 'ai-attack',
    'category': 'prompt-injection',
    'atlas_tactic': 'TA0034',
    'atlas_technique': 'AML.T0051',
    'indicators': [
        'ignore previous instructions',
        'system prompt extraction attempt'
    ],
    'severity': 'high',
    'confidence': 0.9
}

# Share with MISP community
misp.add_event(ai_threat)
```

### STIX/TAXII Integration

**AI Threat Representation**:
```json
{
  "type": "attack-pattern",
  "id": "attack-pattern--ai-prompt-injection",
  "name": "LLM Prompt Injection",
  "description": "Manipulating LLM via crafted prompts",
  "kill_chain_phases": [{
    "kill_chain_name": "mitre-atlas",
    "phase_name": "impact"
  }],
  "external_references": [{
    "source_name": "OWASP",
    "external_id": "LLM01"
  }]
}
```

## Recommendations

### For Organizations

**Immediate**:
- Subscribe to CVE feeds for ML frameworks
- Implement IoC monitoring (prompt injection, extraction)
- Establish incident response for AI security
- Track vulnerabilities in deployed models

**Ongoing**:
- Monthly review of new CVEs
- Quarterly threat landscape assessment
- Annual threat model updates
- Continuous security monitoring

### For Security Teams

**Detection Engineering**:
- Build AI-specific detection rules
- Integrate threat intelligence into SIEM
- Create playbooks for AI incidents
- Test detection with known attacks

**Threat Hunting**:
- Proactively search for IoCs
- Analyze query patterns
- Review audit logs for anomalies
- Investigate suspicious model behavior

### For Development Teams

**Secure Development**:
- Dependency scanning for CVEs
- Regular security updates
- Security testing with known exploits
- Threat-informed development

## Future Outlook

### Predicted Trends (2026+)

1. **AI vs AI**: Automated attack/defense arms race
2. **Regulation-Driven**: Mandatory incident reporting
3. **Standardization**: Common vulnerability scoring for AI
4. **Specialization**: AI-specific threat intel platforms
5. **Collaboration**: Industry-wide threat sharing

### Emerging Concerns

- Quantum computing impact on ML security
- Agentic AI attack surface
- Multi-modal attack complexity
- Autonomous exploitation

## References

- **CVE Details**: <https://www.cvedetails.com>
- **NVD**: <https://nvd.nist.gov>
- **IBM X-Force Threat Intelligence**: 2025 Report
- **Trend Micro State of AI Security**: 1H 2025

---

**Document Version**: 1.0
**Last Updated**: 2025-11-10
**Next Review**: December 2025 (monthly CVE updates)
