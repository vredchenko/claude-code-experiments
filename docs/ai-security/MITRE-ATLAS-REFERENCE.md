# MITRE ATLAS Reference Guide

## Overview

**MITRE ATLAS** (Adversarial Threat Landscape for Artificial-Intelligence Systems)
is a globally accessible, living knowledge base of adversary tactics and
techniques based on real-world attack observations and realistic demonstrations
from AI red teams and security groups.

**First Released**: June 2021
**Current Version**: Active development with 2025 updates
**Official Site**: https://atlas.mitre.org

### Purpose

While MITRE ATT&CK focuses on threats to traditional IT systems, ATLAS
identifies vulnerabilities specific to AI and machine learning systems,
including:

- Adversarial inputs and evasion attacks
- Model theft and extraction
- Data poisoning
- Prompt injection and manipulation
- Model backdoors

### Framework Statistics

- **14 Tactics**: High-level adversarial goals
- **56 Techniques**: Specific methods to achieve tactical goals
- **Real-world Case Studies**: Documented attacks causing up to $77M in damages
- **Integration**: Complements MITRE ATT&CK framework

## The 14 ATLAS Tactics

### 1. Reconnaissance (TA0043)

Gathering information about ML systems to plan future attacks.

**Key Techniques**:
- Discover ML model ontology
- Discover ML artifacts
- Identify ML system dependencies
- Search for publicly available artifacts
- Acquire public ML artifacts

**Attacker Goals**:
- Understand model architecture
- Identify training data sources
- Map system components
- Find exposed endpoints

### 2. Resource Development (TA0042)

Establishing resources to support operations, including training adversarial
models.

**Key Techniques**:
- Develop adversarial ML model capabilities
- Obtain capabilities through adversarial ML attacks
- Acquire ML artifacts
- Stage ML artifacts
- Publish poisoned datasets

**Attacker Goals**:
- Build attack infrastructure
- Create poisoned training data
- Develop adversarial examples
- Prepare for deployment

### 3. Initial Access (TA0044)

Gaining initial foothold in the target ML system or its environment.

**Key Techniques**:
- Supply chain compromise
- Exploit public-facing application
- Valid accounts
- Phishing

**Attacker Goals**:
- Gain entry to ML pipeline
- Access training infrastructure
- Compromise data sources
- Infiltrate model deployment

### 4. ML Model Access (TA0045)

**ATLAS-Specific**: Gaining access to machine learning models.

**Key Techniques**:
- ML artifact compromise
- Inference API access
- Physical environment manipulation
- Adversarial ML service

**Attacker Goals**:
- Query model for predictions
- Extract model internals
- Manipulate model behavior
- Access model weights

**Critical Insight**: This tactic is unique to AI systems and represents the
bridge between traditional system access and ML-specific attacks.

### 5. Execution (TA0041)

Running malicious code within ML systems or artifacts.

**Key Techniques**:
- Command and scripting interpreter
- User execution
- Exploit ML model serving
- Poisoned ML model execution

**Attacker Goals**:
- Execute backdoored models
- Run malicious training scripts
- Deploy compromised inference code
- Trigger adversarial behaviors

### 6. Persistence (TA0040)

Maintaining access over time within ML systems.

**Key Techniques**:
- Backdoor ML model
- Poisoned dataset persistence
- Valid accounts
- ML artifact modification

**Attacker Goals**:
- Embed backdoors in models
- Ensure poisoned data remains
- Maintain access credentials
- Create persistent vulnerabilities

### 7. Privilege Escalation (TA0038)

Gaining higher-level permissions in ML systems.

**Key Techniques**:
- Valid accounts
- Exploit ML infrastructure
- Abuse elevation control mechanisms

**Attacker Goals**:
- Access training infrastructure
- Modify production models
- Control data pipelines
- Administrative access

### 8. Defense Evasion (TA0037)

Avoiding detection during ML attacks.

**Key Techniques**:
- Adversarial perturbations
- Obfuscate adversarial data
- Exploit ML model blind spots
- Mimicry attacks
- Transfer learning exploits

**Attacker Goals**:
- Evade anomaly detection
- Bypass ML-based security
- Hide malicious inputs
- Avoid triggering alarms

**Critical Insight**: ML systems can be both targets and tools for defense
evasion.

### 9. Credential Access (TA0039)

Stealing credentials for ML system access.

**Key Techniques**:
- Unsecured credentials
- Brute force
- Credential dumping from ML systems

**Attacker Goals**:
- Access training platforms
- Steal API keys
- Compromise model repositories
- Hijack service accounts

### 10. Discovery (TA0046)

Learning about ML system internals and capabilities.

**Key Techniques**:
- Model inversion attacks
- Membership inference
- System information discovery
- Network service scanning

**Attacker Goals**:
- Reverse engineer models
- Identify training data
- Map architecture
- Understand defenses

### 11. Collection (TA0035)

Gathering information from ML systems.

**Key Techniques**:
- Data from ML models
- Data from information repositories
- Screen capture
- Data staged

**Attacker Goals**:
- Extract training data
- Collect model predictions
- Harvest sensitive outputs
- Steal intellectual property

### 12. ML Attack Staging (TA0047)

**ATLAS-Specific**: Preparing ML-specific attacks.

**Key Techniques**:
- Craft adversarial examples
- Generate adversarial perturbations
- Optimize adversarial triggers
- Prepare poisoned data

**Attacker Goals**:
- Create evasion inputs
- Prepare backdoor triggers
- Optimize attack effectiveness
- Stage for deployment

**Critical Insight**: This tactic represents the unique preparation phase for
ML-specific attacks that don't exist in traditional cybersecurity.

### 13. Exfiltration (TA0036)

Stealing ML models, data, or intellectual property.

**Key Techniques**:
- Model extraction
- Training data exfiltration
- Exfiltration over API
- Automated exfiltration

**Attacker Goals**:
- Steal model weights
- Extract training algorithms
- Copy proprietary data
- Replicate ML capabilities

**Real-World Impact**: Model theft has resulted in losses exceeding $77M in
documented cases.

### 14. Impact (TA0034)

Disrupting, degrading, or destroying ML system capabilities.

**Key Techniques**:
- Model poisoning
- Denial of ML service
- Erode ML model integrity
- ML model inversion
- Trigger backdoor behavior

**Attacker Goals**:
- Degrade model accuracy
- Cause misclassifications
- Manipulate predictions
- Destroy trust in system

## Key Attack Techniques

### Data Poisoning

**Category**: Resource Development, Persistence, Impact
**Description**: Injecting malicious data into training sets to corrupt model
behavior.

**Variants**:
- **Label flipping**: Changing labels in training data
- **Feature poisoning**: Manipulating input features
- **Backdoor poisoning**: Inserting trigger patterns
- **Availability poisoning**: Degrading model performance

**Real-World Examples**:
- Tay chatbot corruption (2016)
- Facial recognition poisoning attacks
- Email spam filter evasion

**Mitigations**:
- Data provenance tracking
- Anomaly detection in training data
- Robust training algorithms
- Data sanitization pipelines

### Model Extraction/Theft

**Category**: Collection, Exfiltration
**Description**: Stealing ML models through query-based attacks or direct
access.

**Techniques**:
- **Query-based extraction**: Using prediction APIs to reconstruct models
- **Model distillation**: Training surrogate models on target outputs
- **Direct theft**: Accessing model files or weights
- **Side-channel attacks**: Inferring model structure from timing/power

**Case Study**: OpenAI vs. DeepSeek (2024) - Allegations of model distillation
theft resulting in multi-million dollar losses.

**Mitigations**:
- Query rate limiting
- Prediction obfuscation
- Model watermarking
- Access control and monitoring

### Prompt Injection

**Category**: Initial Access, Execution, Impact
**Description**: Manipulating inputs to LLMs to bypass safety controls or
extract sensitive data.

**Variants**:
- **Direct injection**: Malicious prompts in user input
- **Indirect injection**: Poisoned data sources (web pages, documents)
- **Jailbreaking**: Bypassing safety guardrails
- **Privilege escalation**: Gaining unauthorized system access

**Modern Threats** (2025):
- Multi-modal injection (images, audio, video)
- Chain-of-thought manipulation
- Tool-use exploitation
- Agent hijacking

**Mitigations**:
- Input sanitization and validation
- Output monitoring
- Privilege separation
- Safety layers and filters

### Adversarial Examples

**Category**: Defense Evasion, ML Attack Staging, Impact
**Description**: Crafted inputs designed to cause misclassification or
unexpected behavior.

**Types**:
- **White-box**: Full model access for optimization
- **Black-box**: Query-based adversarial generation
- **Physical**: Real-world adversarial objects
- **Universal**: Perturbations effective across inputs

**Attack Methods**:
- Fast Gradient Sign Method (FGSM)
- Projected Gradient Descent (PGD)
- Carlini & Wagner (C&W) attacks
- DeepFool
- One-pixel attacks

**Mitigations**:
- Adversarial training
- Input preprocessing
- Ensemble methods
- Certified defenses

### Model Backdoors

**Category**: Persistence, Impact
**Description**: Hidden functionality triggered by specific inputs.

**Characteristics**:
- Normal behavior on clean inputs
- Malicious behavior on triggered inputs
- Survives training and fine-tuning
- Difficult to detect

**Insertion Methods**:
- Training data poisoning
- Direct model manipulation
- Fine-tuning attacks
- Supply chain compromise

**Mitigations**:
- Model auditing and testing
- Activation analysis
- Neural cleanse techniques
- Secure model provenance

## AI Lifecycle Threat Mapping

### Phase 1: Data Collection & Preparation

**Threats**:
- Data poisoning at source
- Supply chain compromise
- Privacy violations (training data extraction)
- Biased data injection

**ATLAS Tactics**: Resource Development, Initial Access

### Phase 2: Model Training

**Threats**:
- Backdoor insertion
- Hyperparameter manipulation
- Training infrastructure compromise
- Overfitting exploitation

**ATLAS Tactics**: Execution, Persistence, Privilege Escalation

### Phase 3: Model Evaluation & Validation

**Threats**:
- Adversarial example evasion
- Test set poisoning
- Evaluation metric manipulation
- Red teaming bypass

**ATLAS Tactics**: Defense Evasion, Discovery

### Phase 4: Deployment & Serving

**Threats**:
- Model extraction
- Inference manipulation
- API abuse
- Prompt injection

**ATLAS Tactics**: ML Model Access, Collection, Exfiltration

### Phase 5: Monitoring & Maintenance

**Threats**:
- Concept drift exploitation
- Continuous poisoning
- Model degradation
- Backdoor triggering

**ATLAS Tactics**: Persistence, Impact

## Integration with Other Frameworks

### MITRE ATT&CK Integration

ATLAS complements ATT&CK by adding ML-specific tactics and techniques:

**Shared Tactics**:
- Initial Access
- Execution
- Persistence
- Privilege Escalation
- Defense Evasion
- Credential Access
- Discovery
- Collection
- Exfiltration
- Impact

**ATLAS-Specific Tactics**:
- ML Model Access (TA0045)
- ML Attack Staging (TA0047)

**Mapping**: Traditional ATT&CK techniques can be used to compromise ML
infrastructure, while ATLAS techniques exploit ML-specific vulnerabilities.

### OWASP Top 10 for LLMs (2025)

**Complementary Focus**:
- OWASP: Application-level LLM vulnerabilities
- ATLAS: Full ML system threat landscape

**Key Overlaps**:
- Prompt Injection (OWASP #1) → ATLAS Impact tactics
- Sensitive Information Disclosure (OWASP #6) → ATLAS Collection/Exfiltration
- Model Denial of Service (OWASP #4) → ATLAS Impact
- Supply Chain Vulnerabilities (OWASP #5) → ATLAS Initial Access

### NIST AI Risk Management Framework

**Complementary Focus**:
- NIST: Risk management and governance
- ATLAS: Threat landscape and attack techniques

**Integration Points**:
- NIST "Identify" → ATLAS Reconnaissance/Discovery
- NIST "Protect" → ATLAS mitigation strategies
- NIST "Detect" → ATLAS detection methods
- NIST "Respond" → ATLAS incident response
- NIST "Recover" → ATLAS resilience techniques

## Real-World Case Studies

### Case Study 1: Tay Chatbot Poisoning (2016)

**Attack Type**: Data poisoning via user interaction
**Tactics**: Resource Development, Execution, Impact
**Techniques**: Online learning exploitation, adversarial data injection
**Impact**: Reputational damage, service shutdown within 24 hours
**Lessons**: Need for input filtering, human-in-the-loop safeguards

### Case Study 2: ProofPoint Email Security Evasion

**Attack Type**: Adversarial example generation
**Tactics**: Defense Evasion, Impact
**Techniques**: ML model blind spot exploitation
**Impact**: Bypass of ML-based spam/phishing detection
**Lessons**: Adversarial robustness critical for security applications

### Case Study 3: OpenAI vs. DeepSeek Model Theft (2024)

**Attack Type**: Model distillation and extraction
**Tactics**: ML Model Access, Collection, Exfiltration
**Techniques**: API query-based model stealing
**Impact**: Intellectual property theft, competitive disadvantage
**Lessons**: API rate limiting, output obfuscation, legal protections needed

### Case Study 4: Facial Recognition Poisoning

**Attack Type**: Training data poisoning
**Tactics**: Resource Development, Persistence, Impact
**Techniques**: Adversarial perturbations in public datasets
**Impact**: Model misidentification, security bypass
**Lessons**: Data provenance, robust training methods required

### Case Study 5: GPT-based Malware Generation

**Attack Type**: LLM jailbreaking and abuse
**Tactics**: Execution, Impact
**Techniques**: Prompt injection, safety bypass
**Impact**: Automated malware/phishing generation
**Lessons**: Output monitoring, use-case restrictions, safety layers

## Detection Strategies

### Model Behavior Monitoring

**Indicators of Compromise**:
- Sudden accuracy degradation
- Unusual prediction patterns
- Increased confidence on misclassifications
- Triggered backdoor behavior
- Drift from expected distribution

**Tools**:
- Model performance dashboards
- Prediction distribution analysis
- Anomaly detection on outputs
- A/B testing frameworks

### Input Monitoring

**Detection Techniques**:
- Adversarial example detection
- Input distribution analysis
- Prompt injection pattern matching
- Multi-modal input validation

**Tools**:
- Input sanitization pipelines
- Statistical outlier detection
- Deep learning-based detectors

### Infrastructure Monitoring

**Traditional Security**:
- Network traffic analysis
- Access log monitoring
- API rate limiting
- Authentication anomalies

**ML-Specific**:
- Model file integrity checking
- Training data provenance tracking
- Hyperparameter change auditing
- Model versioning and rollback

## Mitigation Strategies

### Defensive ML Techniques

1. **Adversarial Training**: Training on adversarial examples
2. **Input Preprocessing**: Denoising, compression, transformations
3. **Ensemble Methods**: Multiple model consensus
4. **Certified Defenses**: Provable robustness guarantees
5. **Gradient Masking**: Obfuscating gradients (use with caution)

### Secure ML Pipeline

1. **Data Provenance**: Track data lineage and integrity
2. **Secure Training**: Isolated, monitored training environments
3. **Model Validation**: Comprehensive testing before deployment
4. **Access Control**: Least privilege for ML resources
5. **Continuous Monitoring**: Real-time threat detection

### Organizational Controls

1. **Red Teaming**: Regular adversarial testing
2. **Security Audits**: Third-party ML system reviews
3. **Incident Response**: ML-specific response playbooks
4. **Training Programs**: ML security awareness
5. **Threat Intelligence**: Stay current on ML attack trends

## Tools and Resources

### Open Source Tools

- **Adversarial Robustness Toolbox (ART)**: IBM's adversarial ML library
- **CleverHans**: Adversarial example generation (deprecated, see ART)
- **Foolbox**: Adversarial attacks framework
- **TextAttack**: NLP adversarial attack toolkit
- **AI Safety Bench**: LLM safety testing
- **Garak**: LLM vulnerability scanner

### Commercial Solutions

- **HiddenLayer**: ML security platform
- **Robust Intelligence**: AI security and validation
- **Mindgard**: ATLAS-based threat modeling
- **Protect AI**: ML security and governance
- **Calypso AI**: AI security and monitoring

### Monitoring Platforms

- **MLflow**: ML lifecycle tracking
- **Weights & Biases**: Experiment tracking and monitoring
- **Neptune.ai**: ML metadata store
- **WhyLabs**: ML observability platform

## Future Threat Trends (2025+)

### Emerging Threats

1. **Multi-Modal Attacks**: Exploiting vision-language models
2. **Agent Hijacking**: Compromising autonomous AI agents
3. **Federated Learning Poisoning**: Distributed training attacks
4. **Quantum ML Attacks**: Quantum computing-enabled adversarial attacks
5. **AI-Powered Social Engineering**: Using AI to enhance phishing/manipulation

### Evolving Defenses

1. **Constitutional AI**: Built-in safety through training
2. **Mechanistic Interpretability**: Understanding model internals
3. **Formal Verification**: Mathematical proofs of safety
4. **Red Team as a Service**: Continuous adversarial testing
5. **AI Security Standards**: ISO, NIST, and industry frameworks

## Getting Started with ATLAS

### For Security Teams

1. **Threat Modeling**: Map your ML systems to ATLAS tactics
2. **Risk Assessment**: Identify high-priority threats
3. **Control Implementation**: Deploy mitigations
4. **Red Teaming**: Test defenses with ATLAS techniques
5. **Continuous Improvement**: Update based on new threats

### For ML Engineers

1. **Security by Design**: Integrate security from day one
2. **Adversarial Testing**: Test models against ATLAS techniques
3. **Robust Training**: Use defensive ML methods
4. **Monitoring**: Implement comprehensive observability
5. **Incident Response**: Prepare for ML-specific incidents

### For Researchers

1. **Technique Development**: Discover new attack vectors
2. **Defense Research**: Develop novel mitigations
3. **Benchmarking**: Create evaluation frameworks
4. **Case Study Documentation**: Share real-world findings
5. **Community Contribution**: Submit to ATLAS database

## References

- **Official ATLAS Website**: https://atlas.mitre.org
- **ATLAS GitHub**: https://github.com/mitre-atlas/atlas-data
- **MITRE ATT&CK**: https://attack.mitre.org
- **OWASP Top 10 for LLMs**:
  <https://owasp.org/www-project-top-10-for-large-language-model-applications/>
- **NIST AI RMF**: https://www.nist.gov/itl/ai-risk-management-framework

## Version History

- **v1.0 (June 2021)**: Initial release with core tactics and techniques
- **v2.0 (2023)**: Expanded to cover LLMs and generative AI
- **v3.0 (2025)**: Multi-modal attacks, agent security, quantum threats

---

**Document Version**: 1.0
**Last Updated**: 2025-11-10
**Maintained By**: AI Security Research Team
