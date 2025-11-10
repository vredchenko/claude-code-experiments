# AI Security Compliance Frameworks

> **Purpose**: Guide to regulatory and standards compliance for AI/ML systems
>
> **Coverage**: NIST AI RMF, ISO/IEC 42001, EU AI Act, and related standards
>
> **Maintenance**: Updated quarterly and when regulations change

## Overview

As AI systems become integral to critical operations, regulatory frameworks and
standards have emerged to ensure security, safety, and trustworthiness. This
document provides practical guidance for complying with major AI security
frameworks.

### Why Compliance Matters

1. **Legal Requirements**: EU AI Act, sector-specific regulations
2. **Risk Management**: Structured approach to AI security
3. **Customer Trust**: Demonstrable security posture
4. **Insurance/Liability**: May be required for coverage
5. **Competitive Advantage**: Certification as differentiator

### Framework Relationships

```text
                    [AI System]
                         ↓
      ┌──────────────────┼──────────────────┐
      ↓                  ↓                  ↓
   [NIST AI RMF]    [ISO 42001]      [EU AI Act]
   Risk Mgmt        Certification    Legal Compliance
      ↓                  ↓                  ↓
      └──────────────────┼──────────────────┘
                         ↓
            [MITRE ATLAS + OWASP]
            Technical Implementation
```

## NIST AI Risk Management Framework (AI RMF)

### Overview

**Release**: January 2023 **Status**: Voluntary guidance (US), increasingly
adopted globally **Authority**: National Institute of Standards and Technology
(NIST) **URL**: <https://www.nist.gov/itl/ai-risk-management-framework>

**Companion**: NIST AI 100-2e2025 - Adversarial Machine Learning Taxonomy
(formal definitions for attacks/mitigations)

### Core Functions

The AI RMF organizes AI risk management into four functions:

#### 1. GOVERN

**Objective**: Establish organizational culture and policies for AI risk mgmt

**Key Activities**:

- Create AI governance structure
- Assign roles and responsibilities
- Establish risk tolerance
- Define accountability mechanisms
- Ensure regulatory compliance

**Security Controls**:

- AI Security Policy documentation
- Risk appetite statement
- Incident response procedures
- Third-party risk management
- Audit and oversight processes

**Implementation**:

```markdown
## AI Governance Charter

### Roles

- **AI Security Officer**: Overall risk management
- **ML Engineers**: Technical implementation
- **Legal/Compliance**: Regulatory adherence
- **Ethics Board**: Societal impact review

### Risk Tolerance

- **Critical Systems**: Zero tolerance for safety failures
- **Customer-Facing**: Low tolerance for bias/discrimination
- **Internal Tools**: Moderate risk acceptable with monitoring

### Review Cadence

- Quarterly risk assessments
- Annual framework reviews
- Post-incident evaluations
```

#### 2. MAP

**Objective**: Understand AI system context and potential risks

**Key Activities**:

- Document AI system purpose and capabilities
- Identify stakeholders and impacts
- Catalog data sources and dependencies
- Map attack surface
- Assess societal and individual risks

**Security Activities**:

- **Threat Modeling**: Apply MITRE ATLAS framework
- **Attack Surface Analysis**: APIs, models, data pipelines
- **Dependency Mapping**: Supply chain risks
- **Impact Assessment**: Consequences of security failures

**Integration with ATLAS**:

```text
NIST MAP Phase → ATLAS Threat Modeling

1. Identify AI assets → What to protect
2. Map attack surface → Entry points for ATLAS tactics
3. Document dependencies → Supply chain threats (TA0042, TA0044)
4. Assess impacts → Consequences of ATLAS attacks
```

#### 3. MEASURE

**Objective**: Evaluate and benchmark AI risks and trustworthiness

**Key Activities**:

- Establish risk metrics
- Test for vulnerabilities
- Measure robustness
- Assess bias and fairness
- Validate transparency claims

**Security Metrics**:

**Adversarial Robustness**:

```python
# Measure model robustness
def measure_robustness(model, test_data):
    metrics = {
        'clean_accuracy': evaluate(model, test_data),
        'fgsm_accuracy': evaluate_under_attack(model, test_data, FGSM()),
        'pgd_accuracy': evaluate_under_attack(model, test_data, PGD()),
        'robustness_score': calculate_robustness_score(model)
    }
    return metrics
```

**Privacy Leakage**:

```python
# Measure privacy risks
def measure_privacy_leakage(model, test_data):
    membership_inference_risk = run_membership_attack(model)
    model_inversion_risk = run_inversion_attack(model)
    training_data_extraction = test_data_extraction(model)

    return {
        'membership_risk': membership_inference_risk,
        'inversion_risk': model_inversion_risk,
        'extraction_risk': training_data_extraction
    }
```

**Security Testing Results**:

- Penetration test findings
- Red team exercise outcomes
- Vulnerability scan results
- Compliance audit scores

#### 4. MANAGE

**Objective**: Prioritize and respond to AI risks

**Key Activities**:

- Prioritize risks by severity
- Implement risk treatments
- Monitor continuously
- Respond to incidents
- Document lessons learned

**Risk Treatment Options**:

1. **Avoid**: Don't deploy high-risk AI if unmanageable
2. **Mitigate**: Implement controls (ATLAS mitigations)
3. **Transfer**: Insurance, contractual protections
4. **Accept**: Document residual risk acceptance

**Security Response**:

```markdown
## AI Security Incident Response

### Detection

- Automated monitoring (accuracy drops, anomalies)
- Security alerts (prompt injection attempts)
- User reports

### Response

1. **Contain**: Rate limit, roll back model if needed
2. **Investigate**: Root cause analysis using ATLAS taxonomy
3. **Remediate**: Fix vulnerability, update defenses
4. **Communicate**: Notify stakeholders per policy
5. **Learn**: Update risk register, improve controls

### Post-Incident

- Conduct retrospective
- Update threat model
- Enhance monitoring
- Share threat intelligence (responsibly)
```

### NIST AI RMF Profiles

**Definition**: Specific implementations of AI RMF for contexts

**Recent Development** (April 2025): NIST hosted workshop to integrate
Cybersecurity Framework with AI RMF

**Creating Profiles**:

```markdown
## AI RMF Profile: Healthcare Diagnostic AI

### Context

- Use Case: Medical image analysis
- Risk Level: High (patient safety impact)
- Regulations: HIPAA, FDA, EU AI Act (high-risk)

### Govern

- Medical AI governance board established
- FDA pre-market approval required
- HIPAA compliance officer oversight

### Map

- Threat model: ATLAS-based + medical device threats
- Data: PHI requiring encryption, access controls
- Dependencies: Cloud provider SOC 2, medical imaging devices

### Measure

- Diagnostic accuracy: >95% required
- Robustness: Adversarial accuracy >85%
- Privacy: HIPAA compliance verified, differential privacy applied
- Bias: Tested across demographics, < 5% accuracy variance

### Manage

- Quarterly security audits
- Continuous monitoring of accuracy
- Incident response: 1-hour detection, 4-hour containment
- Annual red team exercises
```

### Integration with Security Frameworks

**NIST AI RMF + MITRE ATLAS**:

- MAP → Threat modeling with ATLAS tactics
- MEASURE → Test against ATLAS techniques
- MANAGE → Implement ATLAS mitigations

**NIST AI RMF + OWASP**:

- MAP → Include OWASP LLM Top 10 in risk identification
- MEASURE → Test for OWASP risks
- MANAGE → Deploy OWASP controls

## ISO/IEC 42001:2023 - AI Management Systems

### Overview

**Release**: December 2023 **Status**: International standard, certifiable
**Authority**: ISO/IEC Joint Technical Committee **Certification**: Anthropic
first certified (January 2025) **URL**: ISO Store (purchase required)

### Why ISO 42001

1. **Certifiable**: Third-party audit and certification
2. **Globally Recognized**: International acceptance
3. **Comprehensive**: Covers entire AI lifecycle
4. **Aligned**: Integrates with ISO 27001, ISO 9001
5. **Risk-Based**: Emphasizes risk management

### Structure

Based on ISO high-level structure (Annex SL):

1. **Context** (Clause 4): Understanding organization and stakeholders
2. **Leadership** (Clause 5): Top management commitment
3. **Planning** (Clause 6): Risk assessment and objectives
4. **Support** (Clause 7): Resources, competence, awareness
5. **Operation** (Clause 8): AI system development and deployment
6. **Performance Evaluation** (Clause 9): Monitoring and measurement
7. **Improvement** (Clause 10): Nonconformity and continual improvement

### Key Security Requirements

#### Clause 6.1.4: Risk Assessment and Treatment

**AI-Specific Risks to Address**:

- Adversarial attacks (ATLAS taxonomy)
- Data poisoning
- Model theft/extraction
- Privacy violations
- Supply chain compromises
- Unintended harmful outputs

**Risk Treatment Plan**:

```markdown
## ISO 42001 Risk Treatment Plan

### Risk #1: Adversarial Evasion Attacks

- **Likelihood**: High (publicly known techniques)
- **Impact**: High (incorrect predictions)
- **Risk Level**: Critical
- **Treatment**: Mitigate
- **Controls**:
  - Adversarial training (ISO 42001 A.6.1.4)
  - Input preprocessing (ISO 42001 A.6.1.5)
  - Ensemble methods (ISO 42001 A.6.1.6)
  - Monitoring for anomalies (ISO 42001 A.8.1.2)
- **Responsible**: ML Security Team
- **Timeline**: Q1 2026 implementation
- **Verification**: Quarterly robustness testing
```

#### Clause 7.4: AI System Life Cycle Management

**Security Across Lifecycle**:

**Development**:

- Secure coding practices
- Dependency management
- Code review and testing
- Model validation

**Deployment**:

- Access control implementation
- Encryption (data at rest/in transit)
- Monitoring and logging
- Incident response procedures

**Operations**:

- Continuous monitoring
- Performance degradation detection
- Regular security testing
- Patch management

**Decommissioning**:

- Secure model deletion
- Data retention compliance
- Audit log preservation

#### Clause 8.1: Operational Planning and Control

**Security Controls Required**:

1. **Access Control** (A.6.1.1):

   ```yaml
   access_control:
     models:
       training: [ml_engineers, security_team]
       inference_api: [application_services]
       production_weights: [senior_ml_engineers]
     data:
       training_data: [data_scientists, data_engineers]
       production_data: [api_services]
   ```

2. **Data Protection** (A.6.1.2):
   - Encryption at rest (AES-256)
   - Encryption in transit (TLS 1.3)
   - Data anonymization/pseudonymization
   - Retention policies

3. **Model Security** (A.6.1.3):
   - Model versioning and integrity checking
   - Watermarking for IP protection
   - Rate limiting for inference
   - Model monitoring for drift/attacks

#### Clause 9: Performance Evaluation

**Security Metrics to Track**:

```python
# ISO 42001 Security Monitoring
security_metrics = {
    'adversarial_robustness': {
        'clean_accuracy': 0.94,
        'adversarial_accuracy': 0.87,
        'target': '>0.85',
        'status': 'COMPLIANT'
    },
    'privacy_protection': {
        'membership_inference_resistance': 0.52,  # ~random
        'pii_leakage_rate': 0.001,
        'target': '<0.01',
        'status': 'COMPLIANT'
    },
    'availability': {
        'uptime': 0.9995,
        'mean_latency_ms': 45,
        'p99_latency_ms': 120,
        'target': '>0.999',
        'status': 'COMPLIANT'
    },
    'security_incidents': {
        'prompt_injection_attempts': 127,
        'blocked_malicious_requests': 125,
        'successful_attacks': 2,
        'target': '<5',
        'status': 'REVIEW_REQUIRED'
    }
}
```

**Audit Evidence**:

- Security test results
- Penetration test reports
- Incident logs and response
- Risk treatment effectiveness
- Training records

### Path to ISO 42001 Certification

**Phase 1: Gap Analysis** (1-2 months)

- Assess current AI management practices
- Identify gaps vs. ISO 42001 requirements
- Estimate effort and resources

**Phase 2: Implementation** (6-12 months)

- Document AI management system
- Implement required controls
- Train personnel
- Conduct internal audits

**Phase 3: Certification Audit** (1-2 months)

- Select certification body
- Stage 1 audit (documentation review)
- Stage 2 audit (implementation verification)
- Address nonconformities
- Receive certificate

**Ongoing: Surveillance** (Annual)

- Annual surveillance audits
- Maintain compliance
- Continual improvement

### Integration with Other Standards

**ISO 42001 + ISO 27001** (Information Security):

- Complementary controls
- Shared risk assessment approach
- Integrated management system

**ISO 42001 + ISO 9001** (Quality):

- Process approach alignment
- Quality and AI safety integration

## EU AI Act

### Overview

**Entered Force**: August 1, 2024 **Enforcement**: Staggered implementation
through 2027 **Authority**: European Commission **Scope**: Extraterritorial
(like GDPR) **Penalties**: Up to €35M or 7% global revenue

### Timeline

- **February 2, 2025**: Prohibitions and AI literacy effective
- **August 2, 2025**: GPAI model obligations effective
- **August 2, 2027**: High-risk AI system requirements fully effective

### Risk-Based Classification

#### Prohibited AI (Article 5)

Immediate ban (as of February 2025):

- Social scoring systems
- Real-time biometric identification (public spaces)
- Emotion recognition (workplace/education)
- Manipulation techniques causing harm

#### High-Risk AI (Annex III)

**Categories**:

1. Critical infrastructure (transport, utilities)
2. Education and vocational training
3. Employment and worker management
4. Essential services (credit scoring, emergency dispatch)
5. Law enforcement
6. Migration and border control
7. Justice and democratic processes

**Security Requirements for High-Risk AI**:

**Article 9: Risk Management System**:

```markdown
## EU AI Act Risk Management

### Identification

- Identify reasonably foreseeable risks (including security)
- Consider misuse scenarios
- Analyze attack vectors per MITRE ATLAS

### Evaluation

- Assess probability and severity
- Consider vulnerable populations
- Evaluate technical and operational risks

### Mitigation

- Implement appropriate safeguards
- Apply defense-in-depth
- Test mitigations effectiveness

### Documentation

- Risk assessment report
- Mitigation decisions and rationale
- Residual risk acceptance
```

**Article 10: Data Governance**:

- Training data quality requirements
- Bias detection and mitigation
- Data provenance tracking
- Privacy protection (GDPR compliance)

**Article 15: Accuracy, Robustness, Cybersecurity**:

Providers must design high-risk AI systems to achieve:

1. **Accuracy**: Appropriate level for intended purpose
2. **Robustness**: Resilience to errors, faults, anomalies
3. **Cybersecurity**: Protection against security threats

**Cybersecurity Requirements**:

```markdown
## EU AI Act Cybersecurity Compliance

### Security by Design

- Threat modeling (MITRE ATLAS recommended)
- Secure development lifecycle
- Security testing before deployment

### Adversarial Robustness

- Test against adversarial examples
- Implement defenses (adversarial training, input validation)
- Monitor for attacks in production

### Data Protection

- Encryption requirements
- Access control
- GDPR compliance

### Monitoring & Logging

- Security event logging
- Anomaly detection
- Audit trails

### Incident Response

- Security incident procedures
- Breach notification (24-72 hours)
- Corrective actions
```

**Article 72-73: Post-Market Monitoring & Incident Reporting**:

**Monitoring Requirements**:

- Collect and analyze data on AI performance
- Identify emerging risks
- Track security incidents

**Incident Reporting** (Article 73):

```markdown
## Serious Incident Report

### Triggers

- Death or serious injury
- Serious disruption of critical infrastructure
- Fundamental rights violations
- Serious security breaches

### Timeline

- **Immediate**: Internal notification (<1 hour)
- **Short**: Market surveillance authority notification (15 days)
- **Follow-up**: Detailed report with root cause

### Contents

- Incident description
- Affected systems/individuals
- Root cause analysis
- Remediation actions
- Preventive measures
```

#### General-Purpose AI (GPAI) Models

**Effective**: August 2, 2025

**Transparency Obligations** (Article 53):

- Technical documentation
- Publicly accessible summary
- Copyright compliance

**Systemic Risk Models** (Article 55):

High-capability models with "systemic risk" must:

- Report system to European Commission
- Model evaluation and testing
- Adversarial testing
- Security incident tracking and reporting
- Cybersecurity safeguards

**Example GPAI Compliance**:

```markdown
## GPT-4 Class Model Compliance

### Classification: Systemic Risk GPAI

### Obligations

1. ✅ Technical documentation prepared
2. ✅ Public summary published
3. ✅ Copyright compliance process established
4. ✅ Registered with EC AI Office
5. ✅ Adversarial testing conducted (quarterly)
6. ✅ Security incident reporting system active
7. ✅ Model evaluation report (annually)

### Security Testing

- Red team exercises: Quarterly
- Adversarial robustness: FGSM, PGD, jailbreaks
- Security incidents: 0 critical, 3 high in Q4 2025
- Mitigations: Prompt filtering enhanced, rate limiting adjusted
```

### EU AI Act Compliance Checklist

**For High-Risk AI Systems**:

- [ ] **Classification**: Confirmed as high-risk per Annex III
- [ ] **Risk Management**: System established (Article 9)
- [ ] **Data Governance**: Quality, bias, provenance (Article 10)
- [ ] **Technical Documentation**: Complete and current (Article 11)
- [ ] **Record-Keeping**: Automatic logging implemented (Article 12)
- [ ] **Transparency**: User information provided (Article 13)
- [ ] **Human Oversight**: Mechanisms in place (Article 14)
- [ ] **Accuracy/Robustness/Security**: Validated (Article 15)
- [ ] **Quality Management**: System established (Article 17)
- [ ] **Conformity Assessment**: Completed before deployment
- [ ] **CE Marking**: Affixed if applicable
- [ ] **Post-Market Monitoring**: Active (Article 72)
- [ ] **Incident Reporting**: Process established (Article 73)

**For GPAI Models**:

- [ ] **Technical Documentation**: Prepared per Annex XI
- [ ] **Public Summary**: Published
- [ ] **Copyright Compliance**: Process documented
- [ ] **If Systemic Risk**:
  - [ ] Reported to European Commission
  - [ ] Evaluation and testing conducted
  - [ ] Adversarial testing completed
  - [ ] Security incident reporting active
  - [ ] Cybersecurity safeguards implemented

### Integration with Security Frameworks

**EU AI Act + MITRE ATLAS**:

- Article 15 (Cybersecurity) → Implement ATLAS mitigations
- Article 72 (Monitoring) → Detect ATLAS attack patterns
- Article 73 (Incidents) → Report using ATLAS taxonomy

**EU AI Act + ISO 42001**:

- ISO 42001 certification helps demonstrate EU AI Act compliance
- Risk management alignment
- Many overlapping requirements

## Other Relevant Standards

### ISO/IEC 23894: AI Risk Management

Similar to NIST AI RMF, international scope

### ISO/IEC 27001: Information Security

General InfoSec standard, applicable to AI systems

**AI-Relevant Controls**:

- Access control (A.9)
- Cryptography (A.10)
- Operations security (A.12)
- Secure development (A.14)
- Supplier relationships (A.15)

### Cloud Security Alliance (CSA) AI Controls Matrix

**Release**: June 2025 **Content**: 242 controls across 18 domains **Purpose**:
Cloud-specific AI security controls

**Domains Include**:

- AI Model Security
- Data Governance for AI
- AI Supply Chain Security
- Cloud AI Infrastructure
- AI Privacy Controls

## Compliance Best Practices

### 1. Integrated Compliance Approach

Don't treat frameworks as separate:

```text
[AI System Development]
        ↓
    [Threat Model]
    (MITRE ATLAS)
        ↓
    [Risk Assessment]
    (NIST AI RMF, ISO 42001)
        ↓
    [Control Selection]
    (OWASP, ISO 27001, EU AI Act)
        ↓
    [Implementation]
        ↓
    [Testing & Validation]
    (Security testing, audits)
        ↓
    [Certification]
    (ISO 42001, conformity assessment)
        ↓
    [Continuous Monitoring]
    (All frameworks)
```

### 2. Documentation Strategy

Maintain single source of truth:

```text
docs/
├── risk-assessment.md (NIST MAP, ISO 42001 Clause 6)
├── threat-model.md (ATLAS-based, EU AI Act Article 9)
├── security-controls.md (OWASP + ATLAS mitigations)
├── test-results/ (MEASURE, ISO 42001 Clause 9)
├── incident-logs/ (EU AI Act Article 73)
└── audit-evidence/ (All frameworks)
```

### 3. Cross-Framework Mapping

Create mapping document:

| Requirement         | NIST AI RMF | ISO 42001 | EU AI Act | MITRE ATLAS    | OWASP    |
| ------------------- | ----------- | --------- | --------- | -------------- | -------- |
| Threat Model        | MAP         | 6.1.4     | Art 9     | All tactics    | LLM01-10 |
| Adversarial Testing | MEASURE     | 9.1       | Art 15    | All techniques | Testing  |
| Incident Response   | MANAGE      | 8.5       | Art 73    | Impact tactics | LLM10    |
| Access Control      | GOVERN      | 7.4       | Art 15    | TA0039         | LLM06    |

### 4. Continuous Compliance

**Quarterly Activities**:

- Review regulatory updates
- Update risk assessments
- Test security controls
- Conduct internal audits
- Update documentation

**Annual Activities**:

- External audits (ISO 42001)
- Comprehensive security assessment
- Framework alignment review
- Training and awareness programs

### 5. Leverage Tools

**Compliance Management**:

- GRC (Governance, Risk, Compliance) platforms
- Automated evidence collection
- Control mapping tools
- Audit management systems

**Security Testing**:

- Promptfoo (OWASP alignment)
- ART (ATLAS techniques)
- Custom compliance test suites

## References

### Standards Organizations

- **NIST**: <https://www.nist.gov/artificial-intelligence>
- **ISO**: <https://www.iso.org/> (ISO 42001 purchase required)
- **OWASP**: <https://owaspai.org/>
- **CSA**: Cloud Security Alliance AI Controls Matrix

### Regulatory

- **EU AI Act**:
  <https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai>
- **European Parliament**:
  <https://www.europarl.europa.eu/topics/en/article/20230601STO93804/eu-ai-act-first-regulation-on-artificial-intelligence>

### Guidance

- **NIST AI RMF Playbook**:
  <https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook>
- **ISO 42001 Implementation Guide**: Available from ISO
- **EU AI Act Compliance Guides**: Multiple consulting firms

---

**Document Version**: 1.0 **Last Updated**: 2025-11-10 **Next Review**: February
2026 (quarterly)
