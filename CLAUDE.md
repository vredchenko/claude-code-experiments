# Claude Code Experiments

This repository contains experiments and configurations for Claude Code -driven
development, to play around with and re-use in other projects.

## Dependencies

- bun.js (with TypeScript support out of the box)
- Claude Code command line agent
- docker and docker compose
- assumes amd64 and Linux-like (deb) environment with bash support

## Available Agents

### Grimface Agent

- **Location**: `.claude/agents/grimface_agent.md`
- **Purpose**: Skeptical critical thinking agent for challenging assumptions and
  stress-testing ideas
- **Use Cases**:
  - Reality checks before major decisions
  - Proposal reviews to find weaknesses
  - Combating groupthink
  - Assumption audits

### Foundation Agent

- **Location**: `.claude/agents/foundation_agent.md`
- **Purpose**: Verification-first thinking partner that ensures genuine
  competence before automation
- **Philosophy**: "Earn the privilege to use automation" - master foundational
  skills before automating
- **Use Cases**:
  - Building solid understanding before automating tasks
  - Preventing "illusion of competence" from AI-generated solutions
  - Establishing verification culture in teams
  - Learning new technologies with depth, not just surface fluency
  - Ensuring maintainable code through understanding
  - Training team members in verification-first thinking
- **Key Features**:
  - Guides through manual understanding before automation
  - Establishes verification processes for AI outputs
  - Prevents rubber-stamping of AI-generated code
  - Builds debugging and maintenance capabilities
  - Focuses on cognitive engagement over speed

## AI Security Agents

### ATLAS Threat Modeling Agent

- **Location**: `.claude/agents/ai-security/atlas-threat-modeling-agent.md`
- **Purpose**: AI security expert for threat modeling using MITRE ATLAS
  framework
- **Specialization**: Systematic analysis of AI/ML systems for vulnerabilities
- **Use Cases**:
  - Comprehensive threat modeling of AI systems
  - ATLAS framework application (14 tactics, 56 techniques)
  - Attack surface mapping and risk assessment
  - Defense strategy prioritization
  - AI security audits and compliance
- **Key Features**:
  - Deep ATLAS framework knowledge
  - Analyzes all ML lifecycle phases
  - Provides actionable security recommendations
  - Risk-based prioritization
  - Integration with MITRE ATT&CK

### AI Red Team Agent

- **Location**: `.claude/agents/ai-security/ai-red-team-agent.md`
- **Purpose**: Offensive AI security expert for adversarial testing
- **Specialization**: Demonstrating vulnerabilities through active testing
- **Authorization**: **REQUIRED** - Never proceeds without explicit written
  permission
- **Use Cases**:
  - Adversarial testing of ML models
  - Prompt injection and jailbreaking (LLMs)
  - Model extraction demonstrations
  - Data poisoning attack simulations
  - Security validation through offensive techniques
- **Key Features**:
  - ATLAS attack technique implementation
  - Domain-specific attacks (LLM, computer vision, traditional ML)
  - Attack lifecycle management (recon → exploitation → reporting)
  - Comprehensive red team reporting
  - Ethical and legal boundary enforcement

### AI Defense Strategy Agent

- **Location**: `.claude/agents/ai-security/ai-defense-strategy-agent.md`
- **Purpose**: Defensive AI security expert for building secure ML systems
- **Specialization**: Defense-in-depth strategies for AI systems
- **Philosophy**: "Prevention, detection, response - you need all three"
- **Use Cases**:
  - Designing secure ML architectures
  - Implementing ATLAS mitigations
  - Adversarial robustness techniques
  - Security monitoring and incident response
  - Compliance and governance
- **Key Features**:
  - Layered defense strategies
  - ATLAS mitigation mapping
  - Adversarial training and robust ML techniques
  - LLM-specific defenses (prompt injection, data extraction)
  - Incident response procedures

## Available Skills

### Verification-First Workflow Skill

- **Location**: `.claude/skills/verification-first/SKILL.md`
- **Purpose**: Structured workflow implementing the "earn the privilege to use
  automation" philosophy
- **Philosophy**: Based on research showing 40% of AI outputs are accepted
  without scrutiny
- **Workflow Phases**:
  1. **Understanding Assessment** - Evaluate current knowledge and readiness
  2. **Manual Process Walkthrough** - Guide through explaining manual approach
  3. **Verification Strategy Design** - Create verification checklist together
  4. **Guided Automation** - Build automation with understanding and
     transparency
  5. **Verification & Understanding Check** - Verify both function and
     comprehension
- **Use Cases**:
  - Starting complex automation projects
  - Learning new technologies deeply
  - Training team members
  - Before production deployments
  - Debugging mysterious issues by returning to fundamentals
- **Integration**: Works best with Foundation agent for complete verification
  culture

### Playwright Skill

- **Location**: `.claude/skills/playwright-skill/SKILL.md`
- **Purpose**: Complete browser automation with Playwright
- **Features**: Auto-detects dev servers, writes test scripts, handles
  responsive testing

## AI Security Skills

### AI Security Assessment Skill

- **Location**: `.claude/skills/ai-security-assessment/SKILL.md`
- **Purpose**: Comprehensive workflow for assessing AI/ML system security using
  MITRE ATLAS
- **Philosophy**: "Defense in depth for AI systems" - layered security controls
- **Workflow Phases**:
  1. **System Discovery** - Understand ML architecture and assets
  2. **ATLAS Threat Modeling** - Systematically identify threats across 14
     tactics
  3. **Defense Strategy Design** - Create layered defenses mapped to threats
  4. **Implementation Guidance** - Practical tools, code examples,
     configurations
  5. **Validation and Testing** - Verify security controls effectiveness
  6. **Continuous Monitoring** - Maintain and improve security posture
- **Use Cases**:
  - Pre-deployment security assessments
  - Security audits and compliance
  - Establishing baseline security for new AI projects
  - Post-incident security improvements
  - Regular security reviews
- **Integration**: Works with all three AI security agents for comprehensive
  assessment
- **Deliverables**: Threat model, defense strategy, implementation guide,
  validation report

### Adversarial Testing Skill

- **Location**: `.claude/skills/adversarial-testing/SKILL.md`
- **Purpose**: Hands-on workflow for adversarial testing of ML models
- **Philosophy**: "Test like an attacker, think like a defender"
- **Workflow Phases**:
  1. **Testing Setup** - Environment, authorization, baseline metrics
  2. **White-Box Testing** - FGSM, PGD, C&W attacks with gradient access
  3. **Black-Box Testing** - Query-based attacks, transfer attacks
  4. **Domain-Specific Testing** - LLM prompt injection, computer vision
     patches, model extraction
  5. **Defense Validation** - Test adversarial training, preprocessing, detection
  6. **Reporting** - Comprehensive results with actionable recommendations
- **Use Cases**:
  - Model robustness testing
  - Defense validation
  - Building adversarial training datasets
  - Security demonstrations to stakeholders
  - Pre-deployment validation
- **Tools**: Adversarial Robustness Toolbox (ART), Foolbox, TextAttack
- **Metrics**: Robustness scores, attack success rates, perturbation analysis
- **Authorization**: Required for all offensive testing

## Setup

### Quick Start

```bash
# Clone and setup
git clone <repo-url>
cd claude-code-experiments
bun run start  # Auto-creates configs from templates and starts services
```

The setup script will:

- Create `.env` from `.env.template` (if missing)
- Create `mcp-servers-config.json` from template (if missing)
- Install dependencies
- Start Docker services
- Run health checks

### Manual Configuration

If you need to manually create config files:

```bash
# Copy environment template
cp .env.template .env

# Copy MCP servers template
cp mcp-servers-config.template.json mcp-servers-config.json

# Edit as needed
$EDITOR .env
$EDITOR mcp-servers-config.json
```

## MCP Servers

### Available MCP Servers

This project includes several MCP (Model Context Protocol) servers:

#### GitLab Integration

- **gitlab-api**: Direct GitLab REST API integration (`mcp/gitlab-api/index.ts`)
- **gitlab-cli**: Uses `glab` CLI commands (`mcp/gitlab-cli/index.ts`)

#### Storage & Database

- **minio-backend**: MinIO object storage operations
  (`mcp/minio-backend/index.ts`)
- **redis-backend**: Redis cache operations (`mcp/redis-backend/index.ts`)
- **surrealdb-backend**: SurrealDB multi-model database operations via official
  SurrealMCP sidecar (`mcp/surrealdb-backend/index.ts`)
  - **Architecture**: TypeScript wrapper → Official SurrealMCP Docker container
    → SurrealDB Docker container
  - **Official Tools**: Uses `surrealdb/surrealmcp:latest` for comprehensive
    database operations
  - **Database**: Self-hosted SurrealDB Community Edition
    (`surrealdb/surrealdb:latest`)

#### Code Search & Repository Management

- **sourcegraph**: Advanced code search and repository exploration
  (`mcp/sourcegraph/index.ts`)
  - **Operations**: Search code, repositories, symbols, and fetch file content
  - **Features**: Supports regex patterns, language filters, boolean operators
  - **Requirements**: Optional Sourcegraph access token for private instances
  - **Self-hosted**: Supports custom Sourcegraph instances

#### Bookmark Management

- **karakeep-cli**: Karakeep bookmark manager CLI integration
  (`mcp/karakeep-cli/index.ts`)
  - **Operations**: Create, read, update, delete bookmarks, lists, and tags
  - **Requirements**: Karakeep CLI tool (`karakeep`) and valid API credentials
  - **Self-hosted**: Supports custom Karakeep instances

### MCP Commands

```bash
# Setup all services and MCP servers (auto-creates configs from templates)
bun run start

# Manual setup of MCP config (if needed)
cp mcp-servers-config.template.json mcp-servers-config.json

# Run individual MCP servers
bun run mcp:gitlab-api
bun run mcp:gitlab-cli
bun run mcp:minio
bun run mcp:redis
bun run mcp:surrealdb
bun run mcp:orlop-cli
bun run mcp:karakeep

# Check MCP server configuration
cat mcp-servers-config.json

# Debug and test MCP servers with Inspector
bun run dev:inspector

# Test MCP server connections (if you have tools)
# All servers auto-start via mcp-servers-config.json
```

## Development Commands

### General Commands

```bash
# Check project structure
find . -name "*.md" -o -name "*.json" -o -name "*.yml" -o -name "*.yaml" | head -20

# Search for configuration files
find . -name ".claude" -type d

# List all agents
ls -la .claude/agents/

# List MCP servers
ls -la mcp/
```

### Agent Testing

```bash
# Test agent configuration
cat .claude/agents/grimface_agent.md | head -20
```

### MCP Development & Debugging

```bash
# Start MCP Inspector (web UI at http://localhost:6274)
bun run dev:inspector

# Run individual MCP servers for testing
bun run dev:mcp:gitlab-cli
bun run dev:mcp:gitlab-api
bun run dev:mcp:minio
bun run dev:mcp:redis
bun run dev:mcp:surrealdb
bun run dev:mcp:orlop-cli
bun run dev:mcp:karakeep
```

## AI Security Knowledge Base

### MITRE ATLAS Reference Documentation

- **Location**: `docs/ai-security/MITRE-ATLAS-REFERENCE.md`
- **Source**: Based on MITRE ATLAS Matrices
  (<https://atlas.mitre.org/matrices/ATLAS>)
- **Purpose**: Comprehensive internalized ATLAS framework documentation
- **Contents**:
  - Complete overview of MITRE ATLAS framework
  - All 14 tactics with detailed descriptions
  - All 56 techniques with implementation details
  - Key attack types (data poisoning, model extraction, prompt injection,
    adversarial examples, backdoors)
  - AI lifecycle threat mapping
  - Real-world case studies (Tay chatbot, OpenAI vs DeepSeek, etc.)
  - Detection strategies and mitigation techniques
  - Integration with MITRE ATT&CK, OWASP, and NIST frameworks
  - Tools and resources for AI security
  - Future threat trends (2025+)
- **Usage**: Primary reference for all AI security agents and skills
- **Maintenance**: Living document - should be reviewed quarterly and updated
  when ATLAS framework changes. See document for detailed update process.

### Complementary AI Security Documentation

Building on the ATLAS foundation, additional specialized documentation provides
depth in specific areas:

#### OWASP LLM Security (`docs/ai-security/OWASP-LLM-SECURITY.md`)
- **OWASP LLM Top 10 (2025)**: Application-layer LLM risks
- **Prompt Injection Defenses**: Comprehensive defense catalog
- **Testing Tools**: Promptfoo, Garak, Microsoft PyRIT
- **Integration**: Maps to ATLAS tactics and techniques
- **Focus**: Practical LLM application security

#### Compliance Frameworks (`docs/ai-security/COMPLIANCE-FRAMEWORKS.md`)
- **NIST AI RMF**: Risk management framework with security controls
- **ISO/IEC 42001**: Certifiable AI management systems
- **EU AI Act**: Regulatory compliance and security requirements
- **Integration**: Shows how ATLAS fits into compliance
- **Focus**: Legal/regulatory requirements, governance

#### Red Team Methodologies (`docs/ai-security/RED-TEAM-METHODOLOGIES.md`)
- **OpenAI Approach**: External and automated red teaming
- **Microsoft PyRIT**: Production red teaming framework
- **Industry Best Practices**: Systematic offensive testing
- **Attack Techniques**: Detailed prompt injection, evasion methods
- **Focus**: Operational red team processes

#### Emerging Threats (`docs/ai-security/EMERGING-THREATS.md`)
- **Agentic AI Security**: MAESTRO framework for autonomous agents
- **Federated Learning**: Byzantine attacks, privacy threats
- **Multi-Modal Attacks**: Vision-language exploitation
- **Quantum ML**: Future threat landscape
- **Focus**: Cutting-edge threats not yet in ATLAS

#### Threat Intelligence (`docs/ai-security/THREAT-INTELLIGENCE.md`)
- **CVE Tracking**: Real-world AI vulnerabilities
- **Incident Case Studies**: Documented attacks and lessons
- **Threat Actors**: Nation-state, cybercriminal profiles
- **IoCs**: Indicators of compromise for AI attacks
- **Focus**: Current threat landscape, actionable intelligence

### Using AI Security Capabilities

**Quick Start**:

```bash
# Read the ATLAS reference documentation
cat docs/ai-security/MITRE-ATLAS-REFERENCE.md

# Explore AI security agents
ls -la .claude/agents/ai-security/

# Explore AI security skills
ls -la .claude/skills/ai-security-assessment/
ls -la .claude/skills/adversarial-testing/
```

**Example Workflows**:

1. **Comprehensive AI Security Assessment**:
   - Start: MITRE-ATLAS-REFERENCE.md (threat taxonomy)
   - Apply: AI Security Assessment Skill
   - Check: COMPLIANCE-FRAMEWORKS.md (regulatory requirements)
   - Validate: Use RED-TEAM-METHODOLOGIES.md for testing

2. **LLM Application Security**:
   - Review: OWASP-LLM-SECURITY.md (Top 10 risks)
   - Defend: Implement prompt injection defenses
   - Test: Use Promptfoo or Garak tools
   - Monitor: THREAT-INTELLIGENCE.md for new CVEs

3. **Red Team Exercise**:
   - Plan: RED-TEAM-METHODOLOGIES.md (OpenAI/Microsoft approaches)
   - Execute: AI Red Team Agent with PyRIT
   - Report: Map findings to ATLAS and OWASP
   - Remediate: AI Defense Strategy Agent

4. **Regulatory Compliance**:
   - Assess: COMPLIANCE-FRAMEWORKS.md (NIST, ISO, EU AI Act)
   - Model Threats: ATLAS Threat Modeling Agent
   - Implement: Controls mapped to requirements
   - Audit: Validate with Adversarial Testing Skill

5. **Emerging Threat Preparation**:
   - Research: EMERGING-THREATS.md (agentic AI, federated learning)
   - Design: Defenses for future threats
   - Monitor: THREAT-INTELLIGENCE.md for real-world incidents
   - Update: Quarterly reviews of threat landscape

## Project Structure

```text
claude-code-experiments/
   CLAUDE.md              # This file
   README.md              # Project documentation
   LICENSE                # License information
   .claude/
       agents/
           grimface_agent.md  # Skeptical thinking agent
```

## Notes

- This is an experimental repository for testing Claude Code features
- New AI security capabilities based on MITRE ATLAS framework provide
  comprehensive threat modeling, offensive testing, and defensive strategies
- The grimface agent is designed to provide intellectual challenges and critical
  thinking
- Use grimface agent for stress-testing ideas and proposals before
  implementation
- AI security agents and skills enable end-to-end security assessment of ML
  systems

## Usage Tips

1. **Invoke grimface** when you need critical analysis of ideas
2. **Use before decisions** to identify potential flaws
3. **Deploy against consensus** when everyone agrees too easily
4. **Activate for reviews** to find weaknesses proactively

� **Warning**: The grimface agent is designed to be intellectually uncomfortable
and will challenge weak reasoning without sugar-coating feedback.

## Important Instruction Reminders

Do what has been asked; nothing more, nothing less. NEVER create files unless
they're absolutely necessary for achieving your goal. ALWAYS prefer editing an
existing file to creating a new one. NEVER proactively create documentation
files (\*.md) or README files. Only create documentation files if explicitly
requested by the User. NEVER add "🤖 Generated with [Claude Code]" attribution
to git commits - Claude Code is already credited with a badge at the top of the
README.
