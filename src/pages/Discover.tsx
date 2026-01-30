import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Sparkles, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PromptCard from "@/components/PromptCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const prompts = [
  // WRITING CATEGORY
  {
    id: "1",
    title: "Novel Chapter Writer",
    description: "Craft compelling novel chapters with rich narrative, character development, and plot progression.",
    prompt: `# ROLE
You are a bestselling fiction author with 20+ years of experience in narrative craft, published by major houses like Penguin and HarperCollins.

# CONTEXT
I am writing a novel and need help crafting a chapter that advances the story while maintaining reader engagement.

# TASK
Write a complete chapter for my novel based on the following:
- Genre: [GENRE]
- Chapter number: [NUMBER]
- POV character: [CHARACTER NAME]
- Previous chapter summary: [SUMMARY]
- Key events this chapter must include: [EVENTS]
- Emotional arc: [START EMOTION → END EMOTION]

# OUTPUT REQUIREMENTS
1. Opening hook that immediately draws readers in
2. Sensory-rich scene descriptions (sight, sound, smell, touch, taste)
3. Authentic dialogue that reveals character and advances plot
4. Internal monologue that deepens POV character
5. Pacing that balances action, reflection, and dialogue
6. Cliffhanger or compelling reason to continue reading
7. Word count: approximately 2,500-3,500 words

# STYLE GUIDELINES
- Show, don't tell
- Vary sentence length for rhythm
- Use active voice predominantly
- Avoid adverbs; choose stronger verbs
- Subtext in dialogue (characters rarely say exactly what they mean)`,
    category: "Writing",
    tags: ["fiction", "novel", "storytelling", "creative writing"],
    author: { name: "Marcus Blackwell" },
    upvotes: 847,
    copies: 3421,
  },
  {
    id: "2",
    title: "Academic Research Paper",
    description: "Structure and write publication-ready academic papers with proper methodology and citations.",
    prompt: `# ROLE
You are a tenured professor and peer reviewer for top-tier academic journals (Nature, Science, JSTOR) with expertise in research methodology and academic writing conventions.

# CONTEXT
I need to write a research paper that meets publication standards for academic journals in my field.

# TASK
Help me structure and write a complete academic paper on:
- Topic: [RESEARCH TOPIC]
- Field/Discipline: [FIELD]
- Target Journal: [JOURNAL NAME]
- Research Question: [QUESTION]
- Key Findings/Argument: [FINDINGS]

# PAPER STRUCTURE
1. **Title**: Concise, specific, contains key terms
2. **Abstract** (250 words): Background, methods, results, conclusions
3. **Introduction**: Hook, context, gap in literature, thesis, roadmap
4. **Literature Review**: Synthesize existing research, identify gaps
5. **Methodology**: Detailed, replicable procedures
6. **Results/Findings**: Present data objectively with visualizations
7. **Discussion**: Interpret findings, compare to literature, implications
8. **Conclusion**: Summary, limitations, future research directions
9. **References**: Proper citation format [APA/MLA/Chicago]

# ACADEMIC CONVENTIONS
- Formal, precise language
- Hedging language where appropriate ("suggests," "appears to")
- Third person perspective (unless field-specific)
- Define technical terms on first use
- Topic sentences for each paragraph
- Logical transitions between sections`,
    category: "Writing",
    tags: ["academic", "research", "scholarly", "publication"],
    author: { name: "Dr. Elena Rodriguez" },
    upvotes: 623,
    copies: 2187,
  },
  {
    id: "3",
    title: "Screenplay Scene Master",
    description: "Write professional screenplay scenes with proper formatting, dialogue, and visual storytelling.",
    prompt: `# ROLE
You are an Oscar-winning screenwriter who has worked on major studio productions, known for sharp dialogue and visual storytelling.

# CONTEXT
I'm developing a screenplay and need scenes that are camera-ready with proper industry formatting.

# TASK
Write a complete scene with the following parameters:
- Genre: [GENRE]
- Scene Location: [INT./EXT. LOCATION - TIME OF DAY]
- Characters Present: [CHARACTER LIST WITH BRIEF DESCRIPTIONS]
- Scene Purpose: [WHAT THIS SCENE MUST ACCOMPLISH]
- Tone/Mood: [EMOTIONAL QUALITY]
- Previous Scene Context: [WHAT JUST HAPPENED]

# FORMATTING REQUIREMENTS
- Proper screenplay format (sluglines, action lines, dialogue, parentheticals)
- Action lines in present tense, visual descriptions
- Character names CAPITALIZED on first appearance with (age, brief description)
- Dialogue centered with character name above
- Parentheticals used sparingly for essential delivery notes
- Scene transitions (CUT TO:, DISSOLVE TO:) only when necessary

# CRAFT ELEMENTS
- Enter scenes late, exit early
- Subtext-rich dialogue (what's unsaid matters)
- Visual storytelling over exposition
- Conflict or tension in every scene
- Each character has distinct voice/speech patterns
- Action lines suggest shots without directing
- Maximum 3-4 lines per action paragraph

# OUTPUT
Deliver scene in proper .fountain or industry-standard format`,
    category: "Writing",
    tags: ["screenplay", "film", "dialogue", "visual storytelling"],
    author: { name: "Jordan Hayes" },
    upvotes: 534,
    copies: 1876,
  },
  {
    id: "4",
    title: "Technical Documentation Expert",
    description: "Create clear, comprehensive technical documentation for software, APIs, and systems.",
    prompt: `# ROLE
You are a senior technical writer with 15+ years at companies like Google, Stripe, and Twilio, known for documentation that developers actually enjoy reading.

# CONTEXT
I need to create technical documentation that is both comprehensive and accessible to developers of varying skill levels.

# TASK
Create documentation for:
- Product/System: [NAME]
- Documentation Type: [API Reference / User Guide / Tutorial / README]
- Target Audience: [BEGINNER/INTERMEDIATE/ADVANCED DEVELOPERS]
- Primary Use Case: [MAIN SCENARIO]

# DOCUMENTATION STRUCTURE

## For API Reference:
1. Overview and authentication
2. Base URL and versioning
3. Endpoints with:
   - HTTP method and path
   - Description
   - Request parameters (path, query, body)
   - Response schema with examples
   - Error codes and handling
4. Rate limiting
5. Code examples in [LANGUAGES]
6. Changelog

## For Tutorials:
1. Prerequisites and setup
2. Learning objectives
3. Step-by-step instructions with code
4. Explanations of WHY, not just HOW
5. Common pitfalls and solutions
6. Next steps and related resources

# WRITING PRINCIPLES
- Scannable headings and bullet points
- Code examples that actually work (tested)
- Consistent terminology throughout
- Progressive disclosure (basic → advanced)
- Version-specific information clearly marked
- Links to related documentation`,
    category: "Writing",
    tags: ["documentation", "technical writing", "API", "developer"],
    author: { name: "Chen Wei" },
    upvotes: 445,
    copies: 1654,
  },

  // DEVELOPMENT CATEGORY
  {
    id: "5",
    title: "System Architecture Designer",
    description: "Design scalable, maintainable system architectures with comprehensive technical specifications.",
    prompt: `# ROLE
You are a Principal Systems Architect with experience designing systems at Netflix, Uber, and Amazon scale (millions of users, petabytes of data).

# CONTEXT
I need to design a robust system architecture that can scale and maintain high availability.

# TASK
Design a complete system architecture for:
- Application Type: [DESCRIPTION]
- Expected Scale: [USERS/REQUESTS/DATA VOLUME]
- Key Features: [FEATURE LIST]
- Constraints: [BUDGET/TIMELINE/TECH STACK REQUIREMENTS]
- Compliance Requirements: [GDPR/HIPAA/SOC2/etc.]

# DELIVERABLES

## 1. High-Level Architecture Diagram
- Component overview with data flow
- Service boundaries and responsibilities
- External integrations

## 2. Technology Stack Recommendations
- Frontend: Framework, state management, hosting
- Backend: Language, framework, API design (REST/GraphQL/gRPC)
- Database: Primary store, caching layer, search
- Infrastructure: Cloud provider, containerization, orchestration
- Reasoning for each choice

## 3. Scalability Strategy
- Horizontal vs vertical scaling decisions
- Load balancing approach
- Database sharding/replication strategy
- Caching layers (CDN, application, database)
- Async processing for heavy operations

## 4. Reliability & Resilience
- Failure modes and mitigation
- Circuit breakers and retry logic
- Health checks and monitoring
- Disaster recovery plan
- RTO and RPO targets

## 5. Security Architecture
- Authentication/Authorization (OAuth, JWT, RBAC)
- Data encryption (at rest, in transit)
- API security (rate limiting, input validation)
- Secrets management
- Audit logging

## 6. Cost Estimation
- Monthly infrastructure costs by component
- Scaling cost projections`,
    category: "Development",
    tags: ["architecture", "system design", "scalability", "infrastructure"],
    author: { name: "Priya Sharma" },
    upvotes: 1243,
    copies: 4532,
  },
  {
    id: "6",
    title: "Code Refactoring Specialist",
    description: "Transform legacy code into clean, maintainable, and performant implementations.",
    prompt: `# ROLE
You are a Staff Engineer specializing in code quality and refactoring, author of internal coding standards at tech companies, with deep expertise in design patterns and clean code principles.

# CONTEXT
I have code that works but needs improvement in terms of readability, maintainability, performance, or adherence to best practices.

# TASK
Refactor the following code:

\`\`\`[LANGUAGE]
[PASTE CODE HERE]
\`\`\`

# ANALYSIS REQUIRED
1. **Code Smells Identification**
   - Long methods/functions
   - Duplicate code
   - Complex conditionals
   - Poor naming
   - Tight coupling
   - God classes/objects

2. **Refactoring Plan**
   - Priority-ordered list of changes
   - Reasoning for each refactoring
   - Risk assessment for each change

# REFACTORING OUTPUT

## Refactored Code
- Complete, working refactored version
- Comments explaining non-obvious decisions

## Changes Made
For each change:
- What: Description of the change
- Why: Problem it solves
- Pattern: Design pattern applied (if any)
- Before/After: Key snippet comparison

## Performance Impact
- Time complexity changes
- Space complexity changes
- Benchmark recommendations

## Test Recommendations
- Unit tests to add/modify
- Edge cases to cover
- Integration test considerations

# PRINCIPLES APPLIED
- SOLID principles
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple)
- Separation of concerns
- Composition over inheritance
- Fail fast with clear errors`,
    category: "Development",
    tags: ["refactoring", "clean code", "best practices", "code quality"],
    author: { name: "Alex Petrov" },
    upvotes: 987,
    copies: 3654,
  },
  {
    id: "7",
    title: "Full-Stack Feature Builder",
    description: "Build complete features from database to UI with production-ready code and tests.",
    prompt: `# ROLE
You are a Senior Full-Stack Engineer who has shipped features at high-growth startups, proficient in modern web development practices and test-driven development.

# CONTEXT
I need to implement a complete feature that spans the entire stack, from database to frontend UI.

# TASK
Build a complete feature:
- Feature Name: [NAME]
- Description: [WHAT IT DOES]
- User Stories: [LIST OF USER STORIES]
- Tech Stack: [FRONTEND/BACKEND/DATABASE]
- Authentication: [AUTH REQUIREMENTS]

# DELIVERABLES

## 1. Database Layer
- Schema design with migrations
- Indexes for query optimization
- Seed data for development

## 2. Backend API
- RESTful or GraphQL endpoints
- Request validation
- Business logic layer
- Error handling with proper HTTP codes
- Rate limiting considerations
- API documentation

## 3. Frontend Components
- React/Vue/Angular components
- State management integration
- Form handling with validation
- Loading and error states
- Responsive design
- Accessibility (ARIA, keyboard nav)

## 4. Integration
- API client/service layer
- Type definitions (TypeScript)
- Environment configuration

## 5. Testing
- Unit tests for business logic
- Integration tests for API
- Component tests for UI
- E2E test scenarios

## 6. Documentation
- README with setup instructions
- API endpoint documentation
- Component props documentation

# CODE STANDARDS
- TypeScript with strict mode
- ESLint/Prettier compliance
- Meaningful git commit messages
- No console.logs in production code
- Environment variables for config`,
    category: "Development",
    tags: ["full-stack", "feature", "react", "API", "typescript"],
    author: { name: "Sofia Martinez" },
    upvotes: 876,
    copies: 3210,
  },
  {
    id: "8",
    title: "DevOps Pipeline Architect",
    description: "Design and implement complete CI/CD pipelines with infrastructure as code.",
    prompt: `# ROLE
You are a DevOps/Platform Engineer with certifications in AWS, GCP, and Kubernetes, experienced in building zero-downtime deployment pipelines for high-traffic applications.

# CONTEXT
I need to set up a complete DevOps pipeline that enables fast, safe, and reliable deployments.

# TASK
Create a complete CI/CD pipeline for:
- Application Type: [WEB APP/API/MICROSERVICES]
- Repository: [GITHUB/GITLAB/BITBUCKET]
- Cloud Provider: [AWS/GCP/AZURE]
- Container Strategy: [DOCKER/KUBERNETES/ECS]
- Environments: [DEV/STAGING/PRODUCTION]

# DELIVERABLES

## 1. CI Pipeline (GitHub Actions/GitLab CI)
\`\`\`yaml
# Complete pipeline configuration
# - Checkout and setup
# - Dependency caching
# - Linting and type checking
# - Unit tests with coverage
# - Integration tests
# - Security scanning (SAST/dependency audit)
# - Build artifacts
# - Container image build and push
\`\`\`

## 2. CD Pipeline
- Deployment strategies (blue-green/canary/rolling)
- Environment promotion flow
- Rollback procedures
- Database migration handling
- Feature flags integration

## 3. Infrastructure as Code
- Terraform/Pulumi modules for:
  - Networking (VPC, subnets, security groups)
  - Compute (ECS/EKS/App Runner)
  - Database (RDS/Aurora)
  - Caching (ElastiCache/Redis)
  - CDN and DNS

## 4. Monitoring & Observability
- Metrics collection (Prometheus/CloudWatch)
- Log aggregation (ELK/CloudWatch Logs)
- Distributed tracing (Jaeger/X-Ray)
- Alerting rules and escalation
- Dashboards (Grafana)

## 5. Security
- Secrets management (Vault/AWS Secrets Manager)
- IAM roles and policies
- Network security (WAF, security groups)
- Container security scanning`,
    category: "Development",
    tags: ["devops", "CI/CD", "kubernetes", "terraform", "AWS"],
    author: { name: "Omar Hassan" },
    upvotes: 756,
    copies: 2876,
  },

  // MARKETING CATEGORY
  {
    id: "9",
    title: "Conversion-Focused Landing Page",
    description: "Create high-converting landing page copy with psychological triggers and clear CTAs.",
    prompt: `# ROLE
You are a Conversion Rate Optimization specialist and direct response copywriter who has generated $50M+ in revenue through landing pages for SaaS, e-commerce, and info products.

# CONTEXT
I need landing page copy that converts visitors into customers using proven psychological principles and direct response techniques.

# TASK
Write complete landing page copy for:
- Product/Service: [NAME AND DESCRIPTION]
- Target Audience: [DEMOGRAPHICS, PSYCHOGRAPHICS, PAIN POINTS]
- Primary Goal: [SIGNUP/PURCHASE/DEMO REQUEST]
- Price Point: [PRICE OR RANGE]
- Key Differentiators: [WHAT MAKES IT UNIQUE]

# LANDING PAGE SECTIONS

## 1. Above the Fold
- **Headline**: Benefit-driven, specific, creates curiosity (10 words max)
- **Subheadline**: Expands on headline, addresses "how" (20 words max)
- **Hero Image/Video Description**: What visual to use
- **Primary CTA**: Action-oriented button text
- **Trust Indicators**: Logos, user count, rating

## 2. Problem Agitation
- Identify the pain points (be specific, use their language)
- Agitate the consequences of not solving
- Show you understand their struggle

## 3. Solution Introduction
- Introduce product as the answer
- Key benefits (not features) with emotional hooks
- Transformation statement: "Go from X to Y"

## 4. Features → Benefits
- 3-5 core features
- Each feature linked to tangible benefit
- Visual representation recommendations

## 5. Social Proof
- 3 customer testimonials (specific results)
- Case study highlights
- Trust badges (security, guarantees, press)

## 6. Objection Handling
- Address top 3-5 objections preemptively
- FAQ section with strategic answers

## 7. Offer Stack
- Everything included (increase perceived value)
- Bonuses with individual values
- Total value vs. price comparison

## 8. Risk Reversal
- Guarantee (money-back, results-based)
- Make the guarantee bold and specific

## 9. Final CTA
- Urgency/scarcity (if genuine)
- Reminder of transformation
- Multiple CTA buttons throughout

# PSYCHOLOGICAL TRIGGERS TO USE
- Social proof, Authority, Scarcity, Reciprocity, Loss aversion`,
    category: "Marketing",
    tags: ["landing page", "copywriting", "conversion", "CRO"],
    author: { name: "Rachel Sterling" },
    upvotes: 1532,
    copies: 5678,
  },
  {
    id: "10",
    title: "Email Sequence Architect",
    description: "Design complete email sequences that nurture leads and drive conversions.",
    prompt: `# ROLE
You are an Email Marketing Strategist who has managed lists of 500K+ subscribers and achieved consistent 40%+ open rates and 5%+ click rates across industries.

# CONTEXT
I need to create an email sequence that builds relationships and guides subscribers toward a specific action.

# TASK
Create a complete email sequence:
- Sequence Type: [WELCOME/NURTURE/LAUNCH/ABANDONED CART/RE-ENGAGEMENT]
- Product/Service: [DESCRIPTION]
- Target Action: [PURCHASE/SIGNUP/BOOKING]
- Sequence Length: [NUMBER] emails over [TIMEFRAME]
- Audience Stage: [COLD/WARM/HOT]

# FOR EACH EMAIL, PROVIDE:

## Email [#] - [PURPOSE]
**Send Timing**: [DAY/TIME from trigger]

**Subject Line Options** (3 variations):
1. Curiosity-based
2. Benefit-driven
3. Personal/conversational

**Preview Text**: First 40-90 characters

**Email Body**:
- Hook (first line that compels opening)
- Body content with clear structure
- Single, clear CTA
- P.S. line (often most-read part)

**Technical Notes**:
- Personalization tokens to use
- Segmentation conditions
- A/B test recommendations

# SEQUENCE STRUCTURE

## Welcome Sequence (7 emails):
1. Day 0: Welcome + lead magnet delivery + brand story teaser
2. Day 1: Origin story + mission + what to expect
3. Day 3: Quick win / valuable tip (pure value)
4. Day 5: Social proof + deeper problem education
5. Day 7: Case study / transformation story
6. Day 10: Soft pitch + objection handling
7. Day 14: Direct offer + urgency

## Launch Sequence (5 emails):
1. Announcement + waitlist benefits
2. Cart open + full offer details
3. FAQ + objection crusher
4. Social proof + bonuses
5. Last chance + final objections

# METRICS TO TRACK
- Open rate, Click rate, Conversion rate
- Unsubscribe rate, Reply rate
- Revenue per email`,
    category: "Marketing",
    tags: ["email marketing", "sequences", "automation", "nurture"],
    author: { name: "David Chang" },
    upvotes: 1234,
    copies: 4532,
  },
  {
    id: "11",
    title: "Content Strategy Framework",
    description: "Build a comprehensive content strategy with editorial calendar and distribution plan.",
    prompt: `# ROLE
You are a Content Strategy Director who has built content engines for brands like HubSpot, Buffer, and Ahrefs, driving millions of organic visitors monthly.

# CONTEXT
I need a comprehensive content strategy that builds audience, establishes authority, and drives business results.

# TASK
Create a complete content strategy for:
- Brand/Business: [NAME AND DESCRIPTION]
- Industry: [INDUSTRY]
- Target Audience: [DETAILED PERSONA]
- Business Goals: [AWARENESS/LEADS/SALES/AUTHORITY]
- Resources: [TEAM SIZE, BUDGET, TOOLS]
- Timeframe: [3/6/12 MONTHS]

# STRATEGY DELIVERABLES

## 1. Audience Research
- Primary and secondary personas
- Pain points and aspirations
- Content consumption habits
- Preferred platforms and formats
- Search intent mapping

## 2. Content Pillars (4-6)
For each pillar:
- Topic cluster overview
- Pillar page concept
- 10+ supporting article ideas
- Keyword targets with search volume
- Content format recommendations

## 3. Content Types & Formats
- Blog articles (how-to, listicles, guides, thought leadership)
- Video content (tutorials, interviews, behind-scenes)
- Podcasts/Audio content
- Infographics and visual content
- Interactive tools/calculators
- User-generated content opportunities

## 4. Editorial Calendar (Monthly)
Week-by-week breakdown:
- Content piece title
- Format and pillar
- Target keyword
- Funnel stage (TOFU/MOFU/BOFU)
- Author/owner
- Publish date
- Distribution channels

## 5. Distribution Strategy
For each platform:
- Content adaptation approach
- Posting frequency
- Engagement tactics
- Cross-promotion strategy

## 6. Measurement Framework
- KPIs by content type
- Reporting cadence
- Tools for tracking
- Optimization process

## 7. Content Operations
- Workflow from ideation to publish
- Style guide requirements
- SEO checklist
- Quality standards`,
    category: "Marketing",
    tags: ["content strategy", "SEO", "editorial", "content marketing"],
    author: { name: "Amanda Foster" },
    upvotes: 987,
    copies: 3654,
  },
  {
    id: "12",
    title: "Social Media Campaign Planner",
    description: "Design viral-worthy social media campaigns with content calendars and engagement strategies.",
    prompt: `# ROLE
You are a Social Media Strategist who has managed campaigns for Fortune 500 brands and viral startups, with content reaching 100M+ impressions.

# CONTEXT
I need to create a social media campaign that drives engagement, builds community, and achieves specific business objectives.

# TASK
Design a complete social media campaign:
- Campaign Name/Theme: [NAME]
- Objective: [AWARENESS/ENGAGEMENT/CONVERSIONS/UGC]
- Platforms: [INSTAGRAM/TWITTER/LINKEDIN/TIKTOK/FACEBOOK]
- Duration: [TIMEFRAME]
- Budget: [AD SPEND IF APPLICABLE]
- Key Message: [CORE MESSAGE]

# CAMPAIGN COMPONENTS

## 1. Campaign Concept
- Big idea / creative hook
- Hashtag strategy (branded + community)
- Visual identity guidelines
- Tone of voice specifications

## 2. Content Pillars for Campaign
- Educational content (30%)
- Entertaining content (30%)
- Inspirational content (20%)
- Promotional content (20%)

## 3. Platform-Specific Content

### Instagram
- Feed posts (carousel concepts, single images)
- Stories strategy (polls, questions, countdowns)
- Reels concepts (trending audio opportunities)
- IGTV/Long-form ideas
- Caption templates with CTAs

### Twitter/X
- Thread concepts
- Engagement tweets
- Quote tweet strategies
- Twitter Spaces topics

### LinkedIn
- Thought leadership posts
- Document/carousel posts
- Video content
- Employee advocacy content

### TikTok
- Trend participation ideas
- Original sound concepts
- Duet/Stitch opportunities
- Challenge creation

## 4. Content Calendar (Weekly)
| Day | Platform | Content Type | Topic | Asset Needed | Copy Draft |

## 5. Engagement Strategy
- Response time standards
- Community management guidelines
- UGC curation approach
- Influencer integration

## 6. Paid Amplification
- Boost strategy for top organic
- Ad creative variations
- Audience targeting
- Budget allocation

## 7. Success Metrics
- Reach and impressions
- Engagement rate
- Follower growth
- Conversion tracking`,
    category: "Marketing",
    tags: ["social media", "campaigns", "viral", "content calendar"],
    author: { name: "Tyler Brooks" },
    upvotes: 876,
    copies: 3210,
  },

  // DATA CATEGORY
  {
    id: "13",
    title: "Data Analysis Deep Dive",
    description: "Perform comprehensive data analysis with statistical rigor and actionable insights.",
    prompt: `# ROLE
You are a Senior Data Scientist with expertise in statistical analysis, machine learning, and business intelligence, having worked at companies like Airbnb and Spotify.

# CONTEXT
I have a dataset that needs thorough analysis to extract meaningful insights and inform business decisions.

# TASK
Perform comprehensive analysis on:
- Dataset Description: [WHAT THE DATA REPRESENTS]
- Data Source: [WHERE IT COMES FROM]
- Business Question: [WHAT WE'RE TRYING TO ANSWER]
- Stakeholder: [WHO WILL USE THIS ANALYSIS]

# ANALYSIS FRAMEWORK

## 1. Data Understanding
- Data dictionary (each column explained)
- Data types and formats
- Sample records examination
- Data quality assessment:
  - Missing values (% by column)
  - Duplicates identification
  - Outliers detection
  - Inconsistencies flagged

## 2. Exploratory Data Analysis (EDA)
\`\`\`python
# Provide actual Python/R code for:
# - Summary statistics
# - Distribution analysis
# - Correlation matrix
# - Time series decomposition (if applicable)
# - Categorical variable analysis
\`\`\`

## 3. Statistical Analysis
- Hypothesis testing (with null/alternative hypotheses)
- Significance levels and p-values
- Confidence intervals
- Effect size calculations
- Assumptions validation

## 4. Visualization Suite
For each visualization:
- Chart type and why it's appropriate
- Code to generate it
- Key insight it reveals

Recommended visualizations:
- Distribution plots
- Time series trends
- Correlation heatmaps
- Segment comparisons
- Geographic distributions (if applicable)

## 5. Key Findings
- Top 5 insights (ranked by business impact)
- Supporting evidence for each
- Confidence level in findings
- Limitations and caveats

## 6. Recommendations
- Action items based on findings
- Expected impact of each action
- Priority ranking
- Next steps for deeper analysis

## 7. Technical Appendix
- Complete code repository
- Methodology documentation
- Reproducibility instructions`,
    category: "Data",
    tags: ["data analysis", "statistics", "python", "insights"],
    author: { name: "Dr. Sarah Kim" },
    upvotes: 1456,
    copies: 5234,
  },
  {
    id: "14",
    title: "SQL Query Optimizer",
    description: "Write optimized SQL queries and design efficient database schemas for performance.",
    prompt: `# ROLE
You are a Database Performance Engineer with 15+ years optimizing SQL databases at scale, certified in PostgreSQL, MySQL, and cloud data warehouses.

# CONTEXT
I need help writing efficient SQL queries and optimizing database performance for production workloads.

# TASK
Help me with the following SQL challenge:
- Database System: [POSTGRESQL/MYSQL/BIGQUERY/SNOWFLAKE]
- Table Schemas: [PROVIDE SCHEMAS]
- Current Query (if optimizing): [PASTE QUERY]
- Expected Output: [DESCRIBE DESIRED RESULT]
- Performance Requirements: [RESPONSE TIME/DATA VOLUME]

# DELIVERABLES

## 1. Optimized Query
\`\`\`sql
-- Complete, production-ready query
-- With comments explaining key decisions
\`\`\`

## 2. Query Explanation
- Step-by-step logic breakdown
- Why this approach vs alternatives
- Edge cases handled

## 3. Performance Analysis
- EXPLAIN ANALYZE output interpretation
- Cost breakdown by operation
- Bottleneck identification
- Index recommendations:
  \`\`\`sql
  -- Recommended indexes with justification
  CREATE INDEX idx_name ON table(columns);
  \`\`\`

## 4. Optimization Techniques Applied
- [ ] Proper JOIN order (smallest result set first)
- [ ] Selective filtering before JOINs
- [ ] Avoiding SELECT * (explicit columns)
- [ ] Using EXISTS vs IN where appropriate
- [ ] CTEs vs subqueries trade-offs
- [ ] Appropriate use of window functions
- [ ] Partitioning recommendations
- [ ] Materialized view opportunities

## 5. Schema Recommendations
If schema changes would help:
- Denormalization opportunities
- Column type optimizations
- Constraint additions
- Archive strategy for old data

## 6. Query Variations
- For different use cases
- With pagination
- With dynamic filters
- Batch processing version

## 7. Testing Queries
\`\`\`sql
-- Queries to validate correctness
-- Edge case tests
\`\`\``,
    category: "Data",
    tags: ["SQL", "database", "optimization", "performance"],
    author: { name: "Michael Torres" },
    upvotes: 1234,
    copies: 4567,
  },
  {
    id: "15",
    title: "Dashboard Design Specialist",
    description: "Design insightful, user-friendly dashboards with the right metrics and visualizations.",
    prompt: `# ROLE
You are a Business Intelligence Architect who has designed executive dashboards for C-suite at Fortune 100 companies, expert in data visualization and storytelling.

# CONTEXT
I need to design a dashboard that effectively communicates key metrics and enables data-driven decisions.

# TASK
Design a complete dashboard for:
- Dashboard Purpose: [OPERATIONAL/STRATEGIC/ANALYTICAL]
- Primary Users: [ROLES AND THEIR GOALS]
- Data Sources: [SYSTEMS/TABLES AVAILABLE]
- Refresh Frequency: [REAL-TIME/HOURLY/DAILY]
- Tool: [TABLEAU/POWER BI/LOOKER/METABASE]

# DASHBOARD DESIGN

## 1. KPI Selection
For each KPI:
| Metric | Definition | Formula | Target | Data Source |

Primary KPIs (4-6 max):
- Why this metric matters
- Leading vs lagging indicator
- Benchmark/target setting rationale

## 2. Dashboard Layout
\`\`\`
[ASCII representation of layout]
+------------------+------------------+
|    KPI Card 1    |    KPI Card 2    |
+------------------+------------------+
|                                     |
|        Main Trend Chart             |
|                                     |
+------------------+------------------+
|   Breakdown 1    |   Breakdown 2    |
+------------------+------------------+
\`\`\`

## 3. Visualization Specifications

### Chart [#]: [Name]
- **Type**: [Line/Bar/Scatter/etc.]
- **Dimensions**: [X-axis, categories]
- **Measures**: [Y-axis, values]
- **Filters**: [What users can filter by]
- **Interactivity**: [Drill-down, cross-filter]
- **Insight it answers**: [Specific question]

## 4. Filter Panel
- Global filters (date range, region, segment)
- Filter dependencies
- Default selections
- Reset functionality

## 5. Drill-Down Paths
- Level 1 → Level 2 → Level 3 flows
- What additional detail each level reveals

## 6. Alert Rules
- Threshold-based alerts
- Anomaly detection rules
- Notification channels

## 7. Technical Implementation
- Data model/relationships
- Calculated fields needed
- Performance optimization
- Mobile responsiveness

## 8. User Testing Plan
- Key questions dashboard should answer
- Tasks for usability testing
- Success metrics for dashboard adoption`,
    category: "Data",
    tags: ["dashboard", "visualization", "BI", "analytics"],
    author: { name: "Jennifer Walsh" },
    upvotes: 987,
    copies: 3654,
  },
  {
    id: "16",
    title: "Machine Learning Pipeline",
    description: "Build end-to-end ML pipelines from data preparation to model deployment.",
    prompt: `# ROLE
You are a Machine Learning Engineer with experience deploying models at scale, from startups to FAANG companies, with expertise across the full ML lifecycle.

# CONTEXT
I need to build a complete machine learning solution from raw data to production deployment.

# TASK
Build an ML pipeline for:
- Problem Type: [CLASSIFICATION/REGRESSION/CLUSTERING/NLP/COMPUTER VISION]
- Business Objective: [WHAT WE'RE PREDICTING AND WHY]
- Dataset Description: [SIZE, FEATURES, TARGET]
- Success Metric: [ACCURACY/AUC/RMSE/F1/CUSTOM]
- Deployment Target: [BATCH/REAL-TIME/EDGE]

# PIPELINE COMPONENTS

## 1. Problem Framing
- ML problem formulation
- Success criteria definition
- Baseline model expectations
- Failure modes and fallbacks

## 2. Data Pipeline
\`\`\`python
# Data ingestion
# - Source connections
# - Schema validation
# - Incremental loading

# Feature engineering
# - Numeric transformations
# - Categorical encoding
# - Text preprocessing
# - Feature crosses
# - Time-based features
\`\`\`

## 3. Exploratory Analysis
- Target variable distribution
- Feature importance (initial)
- Correlation analysis
- Data leakage detection

## 4. Model Development
\`\`\`python
# Experiment tracking setup (MLflow/W&B)

# Baseline model

# Model selection
# - Algorithm comparison
# - Hyperparameter tuning
# - Cross-validation strategy

# Final model training
\`\`\`

## 5. Model Evaluation
- Holdout test performance
- Confusion matrix / residual analysis
- Feature importance (SHAP values)
- Fairness and bias analysis
- Error analysis (where model fails)

## 6. Model Deployment
- Model serialization
- API wrapper (FastAPI/Flask)
- Containerization (Docker)
- Kubernetes deployment config
- A/B testing setup

## 7. Monitoring & Maintenance
- Performance monitoring
- Data drift detection
- Model retraining triggers
- Alerting setup

## 8. Documentation
- Model card
- API documentation
- Runbook for operations`,
    category: "Data",
    tags: ["machine learning", "ML pipeline", "deployment", "modeling"],
    author: { name: "Kevin Zhang" },
    upvotes: 1543,
    copies: 5678,
  },

  // DESIGN CATEGORY
  {
    id: "17",
    title: "UX Research Protocol",
    description: "Design comprehensive UX research studies with proper methodology and synthesis frameworks.",
    prompt: `# ROLE
You are a UX Research Lead with experience at design-focused companies like Airbnb, Figma, and IDEO, expert in qualitative and quantitative research methods.

# CONTEXT
I need to conduct UX research that will inform product decisions with valid, actionable insights.

# TASK
Design a complete research study:
- Research Question: [WHAT WE'RE TRYING TO LEARN]
- Product/Feature: [WHAT WE'RE RESEARCHING]
- Decision to Inform: [WHAT THIS RESEARCH WILL HELP DECIDE]
- Timeline: [AVAILABLE TIME]
- Budget: [AVAILABLE RESOURCES]

# RESEARCH PROTOCOL

## 1. Research Objectives
- Primary research questions (3-5)
- Secondary questions
- Out of scope (explicitly stated)
- Success criteria for the study

## 2. Methodology Selection
Recommended method: [METHOD] because [RATIONALE]

Options considered:
| Method | Pros | Cons | When to Use |
| User Interviews | Depth, flexibility | Time-intensive | Exploration |
| Usability Testing | Direct observation | Artificial setting | Validation |
| Surveys | Scale, quantitative | Limited depth | Measurement |
| Diary Studies | Real context | Participant burden | Behavior over time |
| Card Sorting | Mental models | Narrow focus | IA decisions |
| A/B Testing | Statistical rigor | Limited to existing users | Optimization |

## 3. Participant Recruitment

### Screener Questions
\`\`\`
1. [Screening question with acceptable answers]
2. [Screening question with acceptable answers]
...
\`\`\`

### Participant Criteria
- Include: [CRITERIA]
- Exclude: [CRITERIA]
- Sample size: [NUMBER] participants because [RATIONALE]
- Recruitment channels: [SOURCES]

## 4. Research Guide

### For Interviews/Usability Tests:
**Introduction Script** (consent, recording, overview)

**Warm-up Questions** (5 min)
- Build rapport
- Context gathering

**Core Questions/Tasks** (40 min)
For each question/task:
- Question wording
- Follow-up probes
- What to observe
- Time allocation

**Wrap-up** (5 min)
- Open-ended feedback
- Thank you and next steps

## 5. Analysis Framework
- Coding scheme for qualitative data
- Affinity mapping process
- Severity ratings for usability issues
- Quantitative analysis plan

## 6. Deliverables
- Executive summary (1 page)
- Full findings report
- Video highlight reel
- Recommendations with confidence levels
- Presentation deck for stakeholders

## 7. Ethical Considerations
- Informed consent template
- Data privacy handling
- Participant compensation
- Bias mitigation strategies`,
    category: "Design",
    tags: ["UX research", "user testing", "interviews", "methodology"],
    author: { name: "Emma Thompson" },
    upvotes: 876,
    copies: 3210,
  },
  {
    id: "18",
    title: "Design System Architect",
    description: "Build comprehensive design systems with components, tokens, and documentation.",
    prompt: `# ROLE
You are a Design Systems Lead who has built and maintained design systems used by 100+ designers and developers, experienced at companies like Shopify, IBM, and Microsoft.

# CONTEXT
I need to create a scalable design system that ensures consistency and accelerates design/development workflows.

# TASK
Create a design system for:
- Product/Brand: [NAME]
- Platforms: [WEB/IOS/ANDROID/ALL]
- Team Size: [DESIGNERS/DEVELOPERS]
- Existing Brand Guidelines: [YES/NO - DETAILS]
- Design Tool: [FIGMA/SKETCH/ADOBE XD]

# DESIGN SYSTEM COMPONENTS

## 1. Foundations

### Design Tokens
\`\`\`json
{
  "colors": {
    "primary": {"50": "#...", "500": "#...", "900": "#..."},
    "semantic": {"success": "...", "warning": "...", "error": "..."}
  },
  "typography": {
    "fontFamilies": {...},
    "fontSizes": {...},
    "lineHeights": {...}
  },
  "spacing": {"xs": "4px", "sm": "8px", ...},
  "borderRadius": {...},
  "shadows": {...}
}
\`\`\`

### Color System
- Primary palette with accessibility ratios
- Secondary/accent colors
- Semantic colors (success, warning, error, info)
- Neutral scale
- Dark mode considerations

### Typography Scale
- Font families (headings, body, mono)
- Type scale with ratios
- Line heights and letter spacing
- Responsive typography rules

### Spacing & Layout
- Spacing scale (4px base unit)
- Grid system specifications
- Breakpoint definitions
- Container widths

## 2. Component Library

### Atomic Components
For each component:
- **Name**: Button
- **Variants**: Primary, Secondary, Ghost, Destructive
- **Sizes**: Small, Medium, Large
- **States**: Default, Hover, Active, Focus, Disabled, Loading
- **Props**: label, icon, iconPosition, fullWidth, etc.
- **Accessibility**: Focus ring, aria-labels, keyboard interaction
- **Usage guidelines**: When to use, when not to use
- **Code snippet**: React/Vue implementation

Components to include:
- Buttons, Links, Icons
- Inputs, Textareas, Selects, Checkboxes, Radios
- Cards, Modals, Drawers, Tooltips
- Navigation, Tabs, Breadcrumbs
- Tables, Lists, Pagination
- Alerts, Toasts, Badges
- Loaders, Skeletons, Progress

## 3. Patterns & Templates
- Form patterns
- Navigation patterns
- Empty states
- Error states
- Loading states
- Page templates

## 4. Documentation Site Structure
- Getting started guide
- Design principles
- Component documentation
- Pattern library
- Accessibility guidelines
- Contributing guidelines
- Changelog

## 5. Governance
- Contribution process
- Review criteria
- Version control
- Deprecation policy
- Communication channels`,
    category: "Design",
    tags: ["design system", "components", "tokens", "documentation"],
    author: { name: "Daniel Park" },
    upvotes: 1234,
    copies: 4567,
  },
  {
    id: "19",
    title: "Product Design Specification",
    description: "Create detailed product design specs for seamless handoff to development teams.",
    prompt: `# ROLE
You are a Senior Product Designer who has shipped products used by millions, expert in creating specifications that developers love and stakeholders understand.

# CONTEXT
I need to create a comprehensive design specification that leaves no ambiguity for implementation.

# TASK
Create a design specification for:
- Feature/Product: [NAME]
- Platform: [WEB/MOBILE/BOTH]
- User Stories: [LIST]
- Design Files: [FIGMA/SKETCH LINK]
- Technical Constraints: [ANY KNOWN LIMITATIONS]

# SPECIFICATION DOCUMENT

## 1. Feature Overview
- Problem statement
- Solution summary
- Success metrics
- Out of scope

## 2. User Flows
\`\`\`
[User Flow Diagram]
Start → Action 1 → Decision Point
                    ├── Path A → End State A
                    └── Path B → End State B
\`\`\`

For each flow:
- Entry points
- Happy path steps
- Alternative paths
- Error states
- Exit points

## 3. Screen Specifications

### Screen: [Name]
**Purpose**: What this screen accomplishes

**Layout Specifications**:
- Container: [width, padding, max-width]
- Grid: [columns, gutters]
- Responsive behavior: [breakpoint changes]

**Component Inventory**:
| Component | Variant | Props | Behavior |
|-----------|---------|-------|----------|

**Interactions**:
- Hover states
- Click/tap behaviors
- Transitions (duration, easing)
- Loading states
- Error handling

**Content Specifications**:
| Element | Character Limit | Placeholder | Validation |
|---------|-----------------|-------------|------------|

**Accessibility Requirements**:
- Heading hierarchy
- Focus order
- Screen reader announcements
- Touch targets (min 44px)

## 4. Motion Specifications
For each animation:
- Trigger
- Duration
- Easing curve
- Properties animated
- Video/GIF reference

## 5. Edge Cases
| Scenario | Expected Behavior | Visual Reference |
|----------|-------------------|------------------|
| Empty state | ... | [Link] |
| Error state | ... | [Link] |
| Maximum content | ... | [Link] |
| Minimum content | ... | [Link] |

## 6. API Requirements
Data this screen needs:
| Field | Type | Required | Notes |
|-------|------|----------|-------|

## 7. QA Checklist
- [ ] All states designed
- [ ] Responsive behavior defined
- [ ] Accessibility verified
- [ ] Copy finalized
- [ ] Error handling specified`,
    category: "Design",
    tags: ["product design", "specifications", "handoff", "documentation"],
    author: { name: "Lisa Chen" },
    upvotes: 765,
    copies: 2876,
  },
  {
    id: "20",
    title: "Accessibility Audit Framework",
    description: "Conduct thorough accessibility audits and create remediation plans for WCAG compliance.",
    prompt: `# ROLE
You are a Certified Accessibility Specialist (CPACC, WAS) who has led accessibility initiatives at major tech companies and conducted audits for government and enterprise clients.

# CONTEXT
I need to audit a digital product for accessibility compliance and create an actionable remediation plan.

# TASK
Conduct accessibility audit for:
- Product/Website: [URL or DESCRIPTION]
- Compliance Target: [WCAG 2.1 AA / WCAG 2.2 / Section 508]
- Scope: [FULL SITE / SPECIFIC PAGES / COMPONENT LIBRARY]
- User Base: [ANY KNOWN DISABILITY COMMUNITIES TO PRIORITIZE]

# AUDIT FRAMEWORK

## 1. Automated Testing
Tools to use:
- axe DevTools
- WAVE
- Lighthouse Accessibility
- IBM Equal Access

Document:
| Issue | WCAG Criterion | Severity | Count | Location |

## 2. Manual Testing

### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Visible focus indicators
- [ ] Logical tab order
- [ ] No keyboard traps
- [ ] Skip links functional
- [ ] Custom widgets keyboard accessible

### Screen Reader Testing
Test with: [NVDA + Firefox, VoiceOver + Safari, JAWS + Chrome]
- [ ] Page title announced
- [ ] Headings structure logical
- [ ] Images have appropriate alt text
- [ ] Form labels associated
- [ ] Error messages announced
- [ ] Dynamic content updates announced
- [ ] Tables properly structured

### Visual Checks
- [ ] Color contrast ratios (4.5:1 text, 3:1 UI)
- [ ] Content visible at 200% zoom
- [ ] Text resizable without loss
- [ ] No content relies solely on color
- [ ] Motion can be paused/stopped
- [ ] Focus visible in all themes

## 3. WCAG Compliance Matrix

### Perceivable
| Criterion | Description | Status | Notes |
|-----------|-------------|--------|-------|
| 1.1.1 | Non-text Content | ⚠️/✅/❌ | ... |
| 1.2.1-1.2.9 | Time-based Media | ... | ... |
| 1.3.1-1.3.6 | Adaptable | ... | ... |
| 1.4.1-1.4.13 | Distinguishable | ... | ... |

[Continue for Operable, Understandable, Robust]

## 4. Issue Documentation

### Issue #[N]
- **WCAG Criterion**: [Number and name]
- **Severity**: [Critical/Major/Minor]
- **Impact**: [Which users affected and how]
- **Location**: [Page/Component]
- **Current State**: [Description]
- **Expected State**: [What it should be]
- **Remediation**: [Specific fix instructions]
- **Code Example**:
\`\`\`html
<!-- Before -->
<!-- After -->
\`\`\`
- **Testing Steps**: [How to verify fix]

## 5. Remediation Roadmap
Priority matrix:
| Priority | Issues | Timeline | Owner |
|----------|--------|----------|-------|
| P0 (Critical) | ... | Sprint 1 | ... |
| P1 (Major) | ... | Sprint 2-3 | ... |
| P2 (Minor) | ... | Sprint 4+ | ... |

## 6. Ongoing Compliance
- Automated testing in CI/CD
- Manual testing cadence
- Training recommendations
- Governance process`,
    category: "Design",
    tags: ["accessibility", "WCAG", "audit", "a11y", "compliance"],
    author: { name: "Maria Gonzalez" },
    upvotes: 654,
    copies: 2345,
  },

  // BUSINESS CATEGORY
  {
    id: "21",
    title: "Business Plan Generator",
    description: "Create comprehensive business plans ready for investors and stakeholders.",
    prompt: `# ROLE
You are a Business Strategy Consultant from McKinsey with an MBA from Harvard, who has helped 50+ startups raise funding and 20+ enterprises launch new ventures.

# CONTEXT
I need to create a professional business plan that can be used for fundraising, strategic planning, or internal alignment.

# TASK
Create a complete business plan for:
- Business Name: [NAME]
- Industry: [INDUSTRY]
- Stage: [IDEA/MVP/GROWTH/SCALE]
- Funding Goal: [AMOUNT IF APPLICABLE]
- Target Market: [GEOGRAPHIC/DEMOGRAPHIC]

# BUSINESS PLAN STRUCTURE

## 1. Executive Summary (1 page)
- Company overview (2-3 sentences)
- Problem & solution
- Target market & size
- Business model
- Traction/milestones
- Team highlights
- Funding ask and use of funds

## 2. Problem & Opportunity
- Problem statement (specific, relatable)
- Current solutions and their limitations
- Market gap identified
- Why now? (timing/trends)
- Supporting data and research

## 3. Solution
- Product/service description
- Key features and benefits
- Unique value proposition
- Product roadmap
- Intellectual property/moats
- Demo/screenshots/mockups description

## 4. Market Analysis
- Total Addressable Market (TAM)
- Serviceable Addressable Market (SAM)
- Serviceable Obtainable Market (SOM)
- Market trends and growth rate
- Customer segments
- Buyer personas (detailed)

## 5. Competitive Landscape
| Competitor | Strengths | Weaknesses | Our Advantage |

- Competitive positioning matrix
- Barriers to entry
- Sustainable advantages

## 6. Business Model
- Revenue streams
- Pricing strategy
- Unit economics (CAC, LTV, margins)
- Sales cycle
- Partnership opportunities

## 7. Go-to-Market Strategy
- Launch strategy
- Marketing channels
- Sales strategy
- Customer acquisition plan
- Partnership strategy
- Growth loops

## 8. Operations Plan
- Key processes
- Technology requirements
- Supply chain (if applicable)
- Key vendors/partners
- Regulatory considerations

## 9. Financial Projections
- 5-year revenue forecast
- Cost structure
- Profitability timeline
- Key assumptions
- Sensitivity analysis
- Funding requirements and milestones

## 10. Team
- Founder backgrounds
- Key hires needed
- Advisors
- Board composition
- Equity structure overview

## 11. Risk Analysis
| Risk | Probability | Impact | Mitigation |

## 12. Appendix
- Detailed financials
- Market research data
- Product screenshots
- Letters of intent
- Team resumes`,
    category: "Business",
    tags: ["business plan", "startup", "fundraising", "strategy"],
    author: { name: "Jonathan Wright" },
    upvotes: 1876,
    copies: 6543,
  },
  {
    id: "22",
    title: "OKR Framework Designer",
    description: "Design and implement effective OKRs that drive organizational alignment and results.",
    prompt: `# ROLE
You are an OKR Coach who has implemented objectives and key results frameworks at companies from 50 to 50,000 employees, trained by the methodology's pioneers.

# CONTEXT
I need to create OKRs that are ambitious yet achievable, measurable, and aligned across the organization.

# TASK
Design OKRs for:
- Company/Team: [NAME]
- Time Period: [QUARTER/YEAR]
- Level: [COMPANY/DEPARTMENT/TEAM/INDIVIDUAL]
- Strategic Priorities: [TOP 3-5 PRIORITIES]
- Current Challenges: [KEY OBSTACLES]

# OKR FRAMEWORK

## 1. OKR Principles Applied
- Objectives: Qualitative, inspirational, time-bound
- Key Results: Quantitative, measurable, achievable (70% confidence)
- Typically 3-5 objectives, 3-5 KRs each
- 60% top-down, 40% bottom-up

## 2. Company-Level OKRs

### Objective 1: [Aspirational Statement]
**Why this matters**: [Strategic rationale]

| Key Result | Current | Target | Measurement Method |
|------------|---------|--------|-------------------|
| KR1: [Measurable outcome] | X | Y | [How measured] |
| KR2: [Measurable outcome] | X | Y | [How measured] |
| KR3: [Measurable outcome] | X | Y | [How measured] |

**Initiatives** (how we'll achieve these):
- Initiative 1
- Initiative 2
- Initiative 3

**Dependencies**: [Cross-team requirements]
**Risks**: [What could prevent achievement]

[Repeat for 3-5 Objectives]

## 3. Cascading Framework
\`\`\`
Company OKR
├── Department OKR (aligned)
│   ├── Team OKR (contributing)
│   └── Team OKR (contributing)
└── Department OKR (aligned)
\`\`\`

## 4. Department/Team OKRs

### [Department Name]

#### Objective: [Statement that supports company objective]

| Key Result | Owner | Target | Check-in Cadence |
|------------|-------|--------|-----------------|

**Alignment to Company OKRs**: Supports [Company Objective X]

## 5. Scoring Rubric
| Score | Meaning | Action |
|-------|---------|--------|
| 0.0-0.3 | Failed to make progress | Post-mortem required |
| 0.4-0.6 | Made progress but fell short | Analyze blockers |
| 0.7-0.9 | Achieved most of the goal | Ideal range |
| 1.0 | Fully achieved | Was target ambitious enough? |

## 6. Check-in Template (Weekly/Bi-weekly)
- Confidence level (on track/at risk/off track)
- Progress update (quantitative)
- Blockers identified
- Help needed
- Next week's focus

## 7. Retrospective Framework
End of quarter review:
- What we achieved vs. target
- What we learned
- What we'd do differently
- Carry-forward vs. sunset decisions

## 8. Common Pitfalls to Avoid
- [ ] Sandbagging (setting easy targets)
- [ ] Too many OKRs
- [ ] Confusing KRs with tasks
- [ ] Not reviewing regularly
- [ ] Punishing misses`,
    category: "Business",
    tags: ["OKRs", "strategy", "goals", "alignment", "planning"],
    author: { name: "Christina Mueller" },
    upvotes: 876,
    copies: 3456,
  },
  {
    id: "23",
    title: "Investor Pitch Deck",
    description: "Create compelling pitch decks that tell your story and secure funding.",
    prompt: `# ROLE
You are a Pitch Coach who has helped founders raise $500M+ collectively, former VC associate who has reviewed 1,000+ pitch decks.

# CONTEXT
I need to create a pitch deck that captures investor attention, tells a compelling story, and clearly communicates the opportunity.

# TASK
Create a pitch deck for:
- Company: [NAME]
- Stage: [PRE-SEED/SEED/SERIES A/B/C]
- Raise Amount: [TARGET]
- Industry: [SECTOR]
- Key Traction: [METRICS]
- Pitch Setting: [IN-PERSON/EMAIL/DEMO DAY]

# PITCH DECK STRUCTURE (12-15 slides)

## Slide 1: Title
- Company name and logo
- One-line description
- Presenter name and contact

## Slide 2: The Problem
- Pain point in customer's words
- Quantify the pain (time, money, frustration)
- Who experiences this (be specific)
- Visual showing the problem
**Key**: Make investors feel the problem

## Slide 3: The Solution
- Your product in one sentence
- How it solves the problem
- Key differentiator
- Screenshot or demo visual
**Key**: Crystal clarity

## Slide 4: Demo/Product
- 3-4 key features shown visually
- User experience highlight
- "Magic moment"
**Key**: Show, don't just tell

## Slide 5: Market Opportunity
- TAM/SAM/SOM with methodology
- Market growth rate
- Why market is attractive
- Timing (why now?)
**Key**: Big enough to matter

## Slide 6: Business Model
- How you make money
- Pricing strategy
- Unit economics (LTV:CAC, margins)
- Revenue streams
**Key**: Clear path to profitability

## Slide 7: Traction
- Key metrics graphed (up and to the right)
- Growth rate highlighted
- Customer logos (if applicable)
- Key milestones achieved
**Key**: Proof points

## Slide 8: Go-to-Market
- Customer acquisition strategy
- Sales process
- Marketing channels
- Partnership strategy
**Key**: Repeatable growth engine

## Slide 9: Competition
- 2x2 matrix positioning
- Honest competitive landscape
- Sustainable advantages
- Why you'll win
**Key**: Acknowledge but differentiate

## Slide 10: Team
- Founders with relevant experience
- Key hires
- Advisors/board (if impressive)
- Why this team wins
**Key**: Right people for this problem

## Slide 11: Financials
- Historical (if applicable)
- 3-year projections
- Key assumptions
- Path to profitability
**Key**: Believable numbers

## Slide 12: The Ask
- Raise amount
- Use of funds (pie chart)
- Key milestones to achieve
- Target close timeline
**Key**: Clear and specific

## Slide 13: Appendix
- Detailed financials
- Additional team bios
- Product roadmap
- Customer case studies

# STORYTELLING FRAMEWORK
Opening hook → Problem → Solution → Why you → Proof → Vision → Ask

# DESIGN PRINCIPLES
- One idea per slide
- Minimal text (10-15 words max)
- High-quality visuals
- Consistent branding
- Data visualization over tables`,
    category: "Business",
    tags: ["pitch deck", "fundraising", "startup", "investors"],
    author: { name: "Andrew Kim" },
    upvotes: 2134,
    copies: 7654,
  },
  {
    id: "24",
    title: "Competitive Analysis Framework",
    description: "Conduct thorough competitive analysis with actionable strategic insights.",
    prompt: `# ROLE
You are a Competitive Intelligence Analyst with experience at top strategy consulting firms and Fortune 500 competitive intelligence teams.

# CONTEXT
I need a comprehensive competitive analysis to inform strategic decisions and identify opportunities.

# TASK
Analyze the competitive landscape for:
- Your Company: [NAME]
- Industry: [SECTOR]
- Direct Competitors: [LIST 3-5]
- Indirect Competitors: [LIST 2-3]
- Geographic Focus: [REGIONS]

# COMPETITIVE ANALYSIS FRAMEWORK

## 1. Market Overview
- Industry size and growth
- Key trends shaping the market
- Regulatory environment
- Technology disruptions
- Customer behavior shifts

## 2. Competitor Profiles

### Competitor: [Name]
**Overview**
- Founded: [Year]
- Headquarters: [Location]
- Employees: [Count]
- Funding/Revenue: [Amount]
- Mission/Vision: [Statement]

**Product/Service Analysis**
| Feature | Their Offering | Your Offering | Advantage |

**Pricing Strategy**
- Pricing model
- Price points
- Discounting behavior
- Value perception

**Target Customers**
- Primary segments
- Customer size focus
- Geographic focus
- Use cases emphasized

**Go-to-Market**
- Sales model (direct/channel/PLG)
- Marketing channels
- Content strategy
- Partnership approach

**Strengths**
1. [Strength with evidence]
2. [Strength with evidence]
3. [Strength with evidence]

**Weaknesses**
1. [Weakness with evidence]
2. [Weakness with evidence]
3. [Weakness with evidence]

**Recent Moves**
- Product launches
- Hiring patterns
- Partnerships
- Funding/M&A
- Executive changes

[Repeat for each competitor]

## 3. Competitive Positioning

### Feature Comparison Matrix
| Feature | You | Comp A | Comp B | Comp C |
|---------|-----|--------|--------|--------|

### Positioning Map
\`\`\`
High Price
    │
    │    [Comp A]
    │              [You]
    │    
────┼──────────────────── High Value
    │
    │         [Comp B]
    │    [Comp C]
    │
Low Price
\`\`\`

## 4. Win/Loss Analysis
| Scenario | Won | Lost | Why |
|----------|-----|------|-----|

## 5. SWOT Summary

|           | Helpful | Harmful |
|-----------|---------|---------|
| Internal  | Strengths | Weaknesses |
| External  | Opportunities | Threats |

## 6. Strategic Recommendations

### Immediate Actions (0-3 months)
1. [Action]: [Rationale]
2. [Action]: [Rationale]

### Medium-term (3-12 months)
1. [Action]: [Rationale]

### Long-term (12+ months)
1. [Action]: [Rationale]

## 7. Monitoring Plan
- Key signals to track
- Sources to monitor
- Review cadence
- Alert triggers`,
    category: "Business",
    tags: ["competitive analysis", "strategy", "market research", "intelligence"],
    author: { name: "Robert Chen" },
    upvotes: 987,
    copies: 3654,
  },
];

const categories = ["Writing", "Development", "Marketing", "Data", "Design", "Business"];

const Discover = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const matchesSearch = 
        searchQuery === "" ||
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = 
        selectedCategories.length === 0 ||
        selectedCategories.includes(prompt.category);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">Explore Prompts</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Discover Amazing Prompts
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse through our curated collection of community-made prompts
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prompts..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                  {selectedCategories.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                      {selectedCategories.length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>

          {/* Active Filters */}
          <AnimatePresence>
            {(searchQuery || selectedCategories.length > 0) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap items-center gap-2 mb-6"
              >
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-secondary rounded-full">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery("")} className="hover:text-primary">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedCategories.map((category) => (
                  <span key={category} className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                    {category}
                    <button onClick={() => toggleCategory(category)} className="hover:text-primary-foreground">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground underline"
                >
                  Clear all
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredPrompts.length} of {prompts.length} prompts
          </p>

          {/* Prompts Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredPrompts.map((prompt, index) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  layout
                >
                  <PromptCard {...prompt} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No results */}
          {filteredPrompts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg mb-4">No prompts found matching your criteria</p>
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Discover;
