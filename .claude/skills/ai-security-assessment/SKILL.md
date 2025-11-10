# AI Security Assessment Skill

## Overview

This skill provides a comprehensive, structured workflow for assessing the
security posture of AI/ML systems using the MITRE ATLAS framework. It guides
you through systematic security evaluation, from initial system understanding
through threat modeling, defense design, and validation.

## Purpose

Use this skill when you need to:

- Conduct comprehensive security assessments of AI/ML systems
- Identify vulnerabilities using ATLAS framework
- Design defense strategies against AI-specific threats
- Validate security controls
- Prepare for AI security audits
- Establish baseline security for new AI projects

## Philosophy

This skill embodies the principle of **"Defense in Depth for AI Systems"**:

- **Understand before securing**: Deep system knowledge enables better security
- **Layered defenses**: Multiple overlapping security controls
- **Threat-driven**: Based on real-world attack techniques (ATLAS)
- **Continuous validation**: Security is ongoing, not one-time
- **Risk-based prioritization**: Focus on high-impact vulnerabilities

## Workflow Phases

### Phase 1: System Discovery and Understanding

**Objective**: Gain comprehensive understanding of the AI/ML system

**Activities**:

1. **System Architecture Mapping**:
   - Identify all ML models in scope
   - Map the ML pipeline (data → training → deployment → monitoring)
   - Document infrastructure (cloud platforms, frameworks, tools)
   - Identify external dependencies (APIs, data sources, third-party models)

2. **Asset Identification**:
   - **Models**: Types, architectures, purposes
   - **Data**: Training data, user data, outputs
   - **Infrastructure**: Compute, storage, networks
   - **Intellectual Property**: Proprietary algorithms, model weights

3. **Business Context**:
   - Understand system criticality and business value
   - Identify compliance requirements (GDPR, HIPAA, etc.)
   - Assess risk tolerance
   - Understand acceptable security/performance trade-offs

**Questions to Answer**:

- What type of ML system is this? (LLM, computer vision, classification, etc.)
- What is the ML lifecycle? (Where does data come from? How are models
  trained/deployed?)
- What are the critical assets to protect?
- What are the business consequences of security failures?
- Who has access to what components?
- What existing security controls are in place?

**Deliverable**: System architecture document with asset inventory

**Tools and Techniques**:

- Architecture diagrams (ML pipeline visualization)
- Data flow diagrams
- Access control matrix
- Asset valuation assessment
- Stakeholder interviews

**Example Questions**:

```
- "Can you describe how your model is trained? Where does training data come from?"
- "Who has access to the production model? API keys? Training infrastructure?"
- "What happens if the model is stolen or makes wrong predictions?"
- "What security controls are currently implemented?"
```

### Phase 2: ATLAS Threat Modeling

**Objective**: Systematically identify threats using MITRE ATLAS framework

**Activities**:

1. **Attack Surface Mapping**:
   - Entry points (APIs, web interfaces, data inputs)
   - Exposed information (documentation, model outputs, error messages)
   - Access paths (network, physical, social engineering)

2. **ATLAS Tactics Analysis**:
   For each of the 14 ATLAS tactics, identify applicable threats:

   - **Reconnaissance**: What can attackers learn?
   - **Resource Development**: Can attackers poison datasets or develop attack
     tools?
   - **Initial Access**: How can attackers gain access?
   - **ML Model Access**: Can attackers query or extract the model?
   - **Execution**: Can malicious code run in the ML pipeline?
   - **Persistence**: Can attackers maintain long-term access?
   - **Privilege Escalation**: Can limited access become admin access?
   - **Defense Evasion**: Can adversarial examples bypass the model?
   - **Credential Access**: Are credentials exposed or stealable?
   - **Discovery**: Can attackers reverse-engineer the model?
   - **Collection**: What data can be extracted?
   - **ML Attack Staging**: Can adversarial attacks be prepared?
   - **Exfiltration**: Can the model or data be stolen?
   - **Impact**: What damage can be done?

3. **Attack Path Scenarios**:
   - Map realistic attack chains (combining multiple tactics)
   - Identify critical attack paths
   - Assess likelihood and impact of each scenario

4. **Risk Prioritization**:
   - Calculate risk = Likelihood × Impact
   - Prioritize threats by risk level
   - Consider detection difficulty and response capability

**Deliverable**: Comprehensive threat model with prioritized risks

**Reference**: Use `/docs/ai-security/MITRE-ATLAS-REFERENCE.md` for detailed
information on all tactics and techniques

**Risk Assessment Matrix**:

```
Impact →      | Low | Medium | High | Critical
Likelihood ↓  |     |        |      |
--------------+-----+--------+------+---------
Very High     | Med | High   | Crit | Crit
High          | Med | High   | High | Crit
Medium        | Low | Med    | High | High
Low           | Low | Low    | Med  | High
Very Low      | Low | Low    | Low  | Med
```

**Example Threats for LLM Chatbot**:

```
Threat: Prompt Injection leading to data leakage
- ATLAS Tactic: Impact (TA0034)
- ATLAS Technique: Evade ML Model (AML.T0015)
- Likelihood: High (publicly known techniques)
- Impact: High (customer PII exposure)
- Risk: Critical
- Attack Chain: Recon → Craft injection → Extract data → Exfiltrate
```

### Phase 3: Defense Strategy Design

**Objective**: Design layered defenses mapped to identified threats

**Activities**:

1. **Defense-in-Depth Architecture**:
   - **Preventive controls**: Stop attacks before they succeed
   - **Detective controls**: Identify attacks in progress
   - **Responsive controls**: React to detected attacks
   - **Corrective controls**: Fix issues and prevent recurrence

2. **ATLAS Mitigation Mapping**:
   For each high-priority threat, identify specific mitigations from ATLAS

3. **Security Control Selection**:

   **Data Security**:
   - Data provenance tracking
   - Anomaly detection in training data
   - Differential privacy
   - Input validation and sanitization

   **Model Security**:
   - Adversarial training
   - Model watermarking
   - Access control and authentication
   - Query rate limiting
   - Output obfuscation

   **Infrastructure Security**:
   - Network segmentation
   - Isolated training environments
   - Secure deployment pipelines
   - Logging and monitoring

   **Application Security**:
   - Input preprocessing (for adversarial robustness)
   - Output validation and filtering
   - Ensemble methods
   - Sandboxed execution

4. **Implementation Planning**:
   - Prioritize controls (critical → high → medium → low)
   - Identify quick wins vs. long-term investments
   - Consider cost, complexity, and effectiveness
   - Plan phased rollout

**Deliverable**: Defense strategy document with implementation roadmap

**Defense Layers Template**:

```markdown
## Defense Strategy for [System Name]

### Layer 1: Preventive Controls

#### Data Security
- [ ] Implement data provenance tracking
- [ ] Deploy anomaly detection on training data
- [ ] Add differential privacy to training

#### Model Security
- [ ] Implement adversarial training
- [ ] Add model watermarking
- [ ] Enable query rate limiting

### Layer 2: Detective Controls

#### Monitoring
- [ ] Deploy model performance monitoring
- [ ] Implement input anomaly detection
- [ ] Enable query pattern analysis

### Layer 3: Responsive Controls

#### Incident Response
- [ ] Define incident response procedures
- [ ] Implement automated defensive responses
- [ ] Create model rollback procedures

### Layer 4: Corrective Controls

#### Continuous Improvement
- [ ] Regular adversarial testing (red team)
- [ ] Model retraining with cleaned data
- [ ] Security patch management
```

### Phase 4: Implementation Guidance

**Objective**: Provide practical implementation details for security controls

**Activities**:

1. **Tool and Framework Selection**:
   - Identify appropriate security tools
   - Recommend open-source and commercial solutions
   - Provide code examples and configurations

2. **Implementation Examples**:

   **Adversarial Robustness**:
   ```python
   # Example using Adversarial Robustness Toolbox (ART)
   from art.attacks.evasion import ProjectedGradientDescent
   from art.defences.trainer import AdversarialTrainer

   # Create attack for adversarial training
   attack = ProjectedGradientDescent(classifier, eps=0.1)

   # Train with adversarial examples
   trainer = AdversarialTrainer(classifier, attack)
   trainer.fit(x_train, y_train, nb_epochs=10)
   ```

   **Differential Privacy**:
   ```python
   # Example using Opacus for DP training
   from opacus import PrivacyEngine

   privacy_engine = PrivacyEngine()
   model, optimizer, data_loader = privacy_engine.make_private(
       module=model,
       optimizer=optimizer,
       data_loader=data_loader,
       noise_multiplier=1.1,
       max_grad_norm=1.0,
   )
   ```

   **Input Monitoring**:
   ```python
   # Example adversarial detection
   class AdversarialDetector:
       def __init__(self, model):
           self.model = model
           self.baseline_stats = self.compute_baseline()

       def is_adversarial(self, input_data):
           # Statistical test on prediction confidence
           confidence = self.model.predict_proba(input_data).max()
           if confidence < self.baseline_stats['min_confidence']:
               return True

           # Check input distribution
           if self.is_outlier(input_data):
               return True

           return False
   ```

3. **Configuration and Deployment**:
   - Security configuration templates
   - Deployment checklists
   - Integration with existing systems

**Deliverable**: Implementation guide with code examples and configurations

### Phase 5: Validation and Testing

**Objective**: Verify that security controls are effective

**Activities**:

1. **Security Testing**:

   **Adversarial Testing**:
   - Test model against common attacks (FGSM, PGD, C&W)
   - Measure robustness metrics
   - Test physical attacks (if applicable)

   **Privacy Testing**:
   - Conduct membership inference attacks
   - Attempt model inversion
   - Test for training data extraction

   **Penetration Testing**:
   - Attempt model extraction
   - Test prompt injection (for LLMs)
   - Try to evade detection

2. **Control Validation**:
   - Verify each security control is functioning
   - Test alerting and monitoring systems
   - Validate incident response procedures

3. **Red Team Exercise**:
   - Simulate realistic attack scenarios
   - Test defenses under adversarial conditions
   - Identify gaps in security posture

4. **Compliance Validation**:
   - Map controls to compliance requirements
   - Document security posture
   - Prepare for audits

**Deliverable**: Validation report with test results and recommendations

**Testing Checklist**:

```markdown
## Security Validation Checklist

### Adversarial Robustness
- [ ] FGSM attack (eps=0.1): Model accuracy under attack: ___%
- [ ] PGD attack (eps=0.03, 40 iterations): Accuracy: ___%
- [ ] C&W attack: Success rate: ___%
- [ ] Adversarial detection rate: ___%

### Privacy Protection
- [ ] Membership inference attack accuracy: ___% (target: ~50% = random)
- [ ] Model inversion quality: ___
- [ ] Training data extraction attempts: [Success/Fail]

### Model Extraction Resistance
- [ ] Query-based extraction (1000 queries): Accuracy: ___%
- [ ] Query-based extraction (10000 queries): Accuracy: ___%
- [ ] Rate limiting effective: [Yes/No]

### Monitoring and Detection
- [ ] Anomalous input detection rate: ___%
- [ ] False positive rate: ___%
- [ ] Alert latency: ___ seconds
- [ ] Logging coverage: ___%

### Incident Response
- [ ] Tested rollback procedure: [Success/Fail]
- [ ] Mean time to detect (MTTD): ___ minutes
- [ ] Mean time to respond (MTTR): ___ minutes
```

### Phase 6: Continuous Monitoring and Improvement

**Objective**: Maintain and improve security posture over time

**Activities**:

1. **Continuous Monitoring**:
   - Model performance tracking
   - Input distribution monitoring
   - Query pattern analysis
   - Security event logging

2. **Threat Intelligence**:
   - Monitor new ATLAS techniques
   - Track AI security research
   - Stay informed on real-world incidents
   - Update threat models

3. **Regular Assessments**:
   - Quarterly security reviews
   - Annual penetration testing
   - Red team exercises
   - Compliance audits

4. **Security Updates**:
   - Patch vulnerabilities
   - Update models with security improvements
   - Refine monitoring and detection
   - Improve incident response

**Deliverable**: Ongoing security operations plan

**Monitoring Dashboard Metrics**:

```
Key Security Metrics:
- Model accuracy trend (detect degradation)
- Adversarial input detection rate
- Query rate per user (detect extraction)
- False positive/negative rates
- Incident count and severity
- Time to detect/respond
- Security control coverage
```

## When to Use This Skill

**Start of AI Project**:
- Establish security baseline
- Design secure architecture
- Build security into ML pipeline

**Before Production Deployment**:
- Comprehensive security assessment
- Validate security controls
- Prepare for potential threats

**After Security Incident**:
- Assess damage and root cause
- Improve defenses
- Prevent recurrence

**Regular Security Audits**:
- Quarterly or annual reviews
- Compliance requirements
- Continuous improvement

**When Introducing New Models/Features**:
- Assess new attack surface
- Update threat model
- Validate defenses

## Success Criteria

You've successfully completed the assessment when:

- ✅ Complete understanding of AI system architecture and assets
- ✅ Comprehensive threat model covering all ATLAS tactics
- ✅ Prioritized list of risks with mitigation strategies
- ✅ Implemented layered security controls
- ✅ Validated defenses through testing
- ✅ Established continuous monitoring
- ✅ Documented security posture for stakeholders
- ✅ Created incident response procedures

## Skill Output

The skill produces:

1. **System Architecture Document**: Comprehensive system understanding
2. **Threat Model**: ATLAS-based threat analysis with risk prioritization
3. **Defense Strategy**: Layered security controls mapped to threats
4. **Implementation Guide**: Code examples, configurations, tool recommendations
5. **Validation Report**: Test results and security posture assessment
6. **Monitoring Plan**: Continuous security operations
7. **Executive Summary**: High-level findings and recommendations for leadership

## Integration with Agents

This skill works best with:

- **ATLAS Threat Modeling Agent**: For detailed threat analysis
- **AI Defense Strategy Agent**: For defense design and implementation
- **AI Red Team Agent**: For validation and testing
- **Foundation Agent**: For understanding before securing

## Example Usage

**Scenario**: Security assessment for a new LLM-powered customer support chatbot

**Workflow**:

1. **Phase 1 - Discovery**:
   - Document: GPT-4 via API, customer conversation history, CRM integration
   - Assets: Customer PII, conversation logs, API keys, business logic
   - Context: High sensitivity (PII), regulatory requirements (GDPR)

2. **Phase 2 - Threat Modeling**:
   - High risk: Prompt injection → data leakage
   - High risk: Training data extraction (customer conversations)
   - Medium risk: Jailbreaking → harmful content generation
   - Medium risk: API abuse → cost escalation

3. **Phase 3 - Defense Design**:
   - Preventive: Input sanitization, output filtering, rate limiting
   - Detective: Prompt injection detection, anomaly monitoring
   - Responsive: Automated blocking, fallback to safe responses
   - Corrective: Regular fine-tuning, security updates

4. **Phase 4 - Implementation**:
   - Deploy input/output filters
   - Implement monitoring dashboard
   - Configure rate limiting and access control
   - Set up alerting and incident response

5. **Phase 5 - Validation**:
   - Test prompt injection vectors
   - Attempt data extraction
   - Try jailbreaking techniques
   - Validate monitoring and alerting

6. **Phase 6 - Continuous Monitoring**:
   - Daily dashboard review
   - Weekly security metrics report
   - Monthly threat intelligence update
   - Quarterly red team exercise

**Outcome**: Secure LLM chatbot with comprehensive defenses, validated through
testing, and continuously monitored.

## Tools and Resources

### Security Testing Tools

- **Adversarial Robustness Toolbox (ART)**: Comprehensive ML security library
- **Foolbox**: Adversarial attack framework
- **TextAttack**: NLP adversarial testing
- **Garak**: LLM vulnerability scanner
- **PromptInject**: Prompt injection testing

### Monitoring and Observability

- **MLflow**: ML lifecycle tracking
- **Weights & Biases**: Experiment and model monitoring
- **WhyLabs**: ML observability and monitoring
- **Custom dashboards**: Grafana, Kibana for security metrics

### Privacy Tools

- **Opacus**: Differential privacy for PyTorch
- **TensorFlow Privacy**: DP for TensorFlow
- **Privacy Meter**: Privacy leakage measurement

### Documentation Templates

Available in skill directory:
- `threat-model-template.md`
- `defense-strategy-template.md`
- `validation-checklist.md`
- `monitoring-dashboard-config.yaml`

## Knowledge Base

**Required Reading**:
- `/docs/ai-security/MITRE-ATLAS-REFERENCE.md`: Complete ATLAS framework

**Recommended Resources**:
- OWASP Top 10 for LLMs
- NIST AI Risk Management Framework
- Adversarial ML Threat Matrix (MITRE)

## Version History

- **v1.0 (2025-11-10)**: Initial release

---

**Skill Type**: Workflow/Process
**Domain**: AI Security, MITRE ATLAS
**Expertise Level**: Intermediate to Advanced
**Time Commitment**: 2-4 weeks for comprehensive assessment (depends on system
complexity)
