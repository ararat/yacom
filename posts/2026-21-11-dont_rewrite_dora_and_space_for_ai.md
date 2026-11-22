---
title: 'Don't rewrite DORA for AI'
date: '2026-11-21T00:00:00.000Z'
description: 'How measuring engineering is changing and why i would not recommend rewriting DORA and SPACE for AI. '
thumbnail: '/img/blog/blog-thumbnail.jpeg'
---

# How measuring engineering is changing and why i would not recommend rewriting DORA and SPACE for AI. 

For nearly a decade, DORA and SPACE have been the gold standards for measuring software delivery performance and developer productivity. DORA's core metrics (Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Mean Time to Recovery) have anchored engineering organizations across the industry. SPACE's five dimensions (Satisfaction, Performance, Activity, Communication, and Efficiency) gave leaders a holistic defense against one-dimensional productivity traps. Now, as AI and automated development (often called Software Factories) become standard, a growing number of voices in the industry are suggesting we reshape and rewrite both frameworks.

I understand the impulse. As AI coding assistants and autonomous agents reshape software outputs and speed to market these measures seem inadequate or old. Thus the pitch to rewrit them or create new ones sounds logical: DORA and SPACE were designed for a world where humans wrote every line of code, so we should replace them with "AI-focused DORA" and "AI-tuned SPACE."

At first, I went down that exact road. When AI changes how we write code, updating the metrics themselves feels like the obvious move. And for a short while i thought that i was going somewhere. But as i went on and dug deeper into how modern Software Factories actually operate and looking closely at recent empirical research, I realized I was going the wrong way.

Rewriting the baseline metrics is a trap. When we mutate foundational frameworks, whether by inflating "elite" deployment frequency to 10+ deploys a day or replacing delivery metrics with prompt counts, we destroy our historical baseline and confuse agent activity with system delivery. A Software Factory gets busy long before software delivery gets better.

Instead of rewriting DORA and SPACE, we need to keep our core engineering values of deployment speed and stability firmly in place and add an AI efficiency layer on top:

1. **Keep DORA unchanged** to protect the engineering values of deployment cadence, lead time, change failure rate, and rate of recovery.
2. **Keep SPACE unchanged** to protect human sustainability, cognitive load, and review quality.
3. **Add an AI Agent & Factory Layer** on top, using Inverse Lines of Code per Change and Code Churn as indicators of a well-tuned AI agent, paired with Cost per Feature and Time to Complete as factory KPIs.

## Why Mutating DORA and SPACE Goes the Wrong Way

Many early proposals to adapt engineering metrics for AI try to recalibrate DORA thresholds upward while dismissing code-level signals like Lines of Code (LOC) and Code Churn as obsolete antipatterns. Looking at what actually happens in production, both moves backfire.

### 1. The physics of production stability do not care who wrote the code
DORA (originated by Forsgren, Humble, and Kim in *Accelerate*, 2018) was never meant to measure how fast a human types. It measures the health of the delivery system. Whether a pull request is written by a staff engineer, pair-programmed with GitHub Copilot, or generated autonomously by a cloud agent, production has the exact same failure physics.

DORA's 2024 and 2025 *State of AI-Assisted Software Development* reports found that AI acts as an amplifier. It magnifies existing strengths in modular, well-tested systems while accelerating instability in tightly coupled ones. If we change DORA's definitions the moment we introduce AI, we blind ourselves to the most important question engineering leaders have to answer: did AI actually make our delivery system healthier, or did it just flood our pipeline?

### 2. In a Software Factory, the bottleneck shifts from generation to validation
When teams move toward a Software Factory where autonomous and semi-autonomous agents handle implementation workflows, writing code stops being the main constraint:

* At Anthropic, merged changes jumped from roughly 2,500 per day in May 2026 to over 30,000 per day by September 2026, turning source control and CI merge queues into the bottleneck.
* At Uber, over 70% of pull requests by late 2026 involved local or cloud agents executing 30,000+ agent skills daily.
* At Stripe, autonomous *Minions* produced over 1,300 merged pull requests per week, with humans acting as planned review gates rather than line-by-line authors.

A 2026 Harvard Business School and Jellyfish study of 300 million work events across 718 firms put hard numbers on this shift. Adopting AI coding agents increased lines of code by 30% and pull requests by 23%, yet completed features (resolved Jira issues and epics) grew by only 12%. That happens because engineers only spend 30 to 40% of their time writing code in the first place. Downstream, average PR review time increased by 49%, review comments jumped 53%, and the share of PRs needing revision doubled.

Research by Newman, Bird, Butler, and Murphy-Hill ([arXiv:2611.18939](https://arxiv.org/abs/2611.18939)) backs this up: AI-assisted authoring significantly increases reviewer burden due to PR volume, bloated diff sizes, and reduced author stewardship, and simply throwing AI code-review bots at the queue does not fix the bottleneck.

## The 3-Layer AI Engineering Measurement Stack

Rather than replacing frameworks that already work, it is cleaner to separate System Health, Human Experience, and Agent Tuning into three distinct layers.

| Layer | Framework | Core Metrics | Question It Answers |
| :--- | :--- | :--- | :--- |
| **Layer 1: Delivery & Stability** | DORA (Unchanged) | Lead Time for Changes, Deployment Frequency, Change Failure Rate, Failed Deployment Recovery Time (MTTR), Deployment Rework Rate | Are we preserving our core engineering values of speed and stability? |
| **Layer 2: Human Experience** | SPACE (Unchanged) | Satisfaction, Performance, Activity, Communication, Efficiency & Flow (focused on Review Load & Trust) | Is the pace sustainable for the engineers steering and reviewing the factory? |
| **Layer 3: AI Factory & Agent Tuning** | AI Efficiency Layer | Inverse LOC per Change, Code Churn (Survival Rate), Cost per Feature, Time to Complete | Are our AI agents well-tuned, surgical, durable, and cost-effective? |

## Layer 1: Keep DORA Intact to Guard Our Engineering Values

Keeping our engineering values of deployment and stability in place is the non-negotiable starting point, so DORA stays our ground truth.

* **Lead Time for Changes** (time from commit or PR to production) shows us when faster AI code generation is getting stuck in slow CI pipelines or human review queues.
* **Deployment Frequency** (how often changes reach production) tells us whether higher PR volume actually translates into smaller, safer production releases.
* **Change Failure Rate** (percentage of deployments causing production failure) protects us from high-velocity recklessness when agents ship subtle logic bugs or hallucinations.
* **Rate of Recovery / MTTR** (time to restore service after a failure) measures true operational resilience and shows whether AI debugging and runbook agents actually help us recover faster.
* **Deployment Rework Rate** (DORA's fifth metric, measuring unplanned deployments required to fix recent changes) catches the "fast-merge, fast-patch" illusion where an agent ships broken code in minutes and has to patch it the next morning.

My rule for Layer 1 is straightforward: we never celebrate an increase in Deployment Frequency or a drop in Lead Time if Change Failure Rate, Rework Rate, or Rate of Recovery gets worse. Stability is the boundary condition of the Software Factory.

## Layer 2: Keep SPACE Intact to Protect the Engineers Steering the Factory

When Forsgren, Storey, Maddila, Zimmermann, Houck, and Butler published SPACE in 2021, their goal was to stop organizations from treating developers like factory machines. In an AI Software Factory, our role as engineers moves up the abstraction ladder: less typing syntax, more specifying intent, designing systems, and auditing agent output.

Agarwal, Miller, Kästner, and Vasilescu ([arXiv:2607.07980](https://arxiv.org/abs/2607.07980)) analyzed 3,100 practitioner discussions to build a causal model of AI code review. Their core finding matches what teams see every day: code review is the control point where a coding agent's impact on software quality is decided. Repository-mining research on the SPACE model ([arXiv:2511.20955](https://arxiv.org/html/2511.20955)) also found a statistically significant link between negative developer sentiment (frustration) and high commit frequency, which is the classic footprint of a developer trapped in endless fix-and-retry loops.

Instead of inventing 25 new AI-SPACE metrics, we can use SPACE's existing five dimensions to watch the human control plane:

* **Satisfaction:** Developer trust in AI output (DORA 2025 found 30% of developers still have little or no trust in AI code) and reviewer fatigue from constant auditing.
* **Performance:** Review catch rate, making sure teams are neither rubber-stamping agent PRs nor rewriting every agent submission from scratch.
* **Activity:** Writing clear specs, building evaluation harnesses, and improving architecture rather than chasing raw commit counts.
* **Communication:** Maintaining the shared context (`AGENTS.md`, architectural guardrails, deterministic linters) that aligns both teammates and agents.
* **Efficiency & Flow:** Protecting uninterrupted deep-work blocks and tracking Review Queue Wait Time, so senior engineers aren't turned into full-time diff janitors.

## Layer 3: The AI Agent & Factory Efficiency Layer

This is where my own thinking changed the most.

Traditional engineering wisdom rightly warns us never to use Lines of Code or raw Code Churn to measure human developers. When you apply those metrics to people, you reward bloat and punish cleanup.

When you apply them to AI agents, however, the signal flips. Because LLMs generate tokens for pennies, an agent's natural failure mode is verbosity, over-editing, and context-blind churn. If we treat Inverse Lines of Code per Change and Code Churn as diagnostics for the *agent* rather than quotas for the *human*, and pair them with Cost per Feature and Time to Complete, we get a clear picture of how well our AI factory is tuned.

### 1. INVERSE Lines of Code per Change (The well tuned Agent Indicator)
Inverse Lines of Code per Change measures how concise and minimal an agent's diff is relative to the task's complexity (task complexity divided by $\Delta \text{LOC}$, or excess edit distance). Smaller, surgical diffs signal a better-tuned agent.

When humans wrote all the code, more lines of code was often mistaken for more progress. With AI agents, every extra line of code is a review burden and a maintenance liability. Ask an untuned AI agent to fix a simple null-pointer bug, and it will happily rewrite the whole function, add 60 lines of defensive boilerplate, rename variables, and invent abstractions nobody asked for, all while passing the unit tests.

In *"When Models Edit Too Much: On the Fidelity of Minimal Code Edits"* ([arXiv:2609.04061](https://arxiv.org/abs/2609.04061), EMNLP 2026), Zhu, Lim, and Kan tested frontier models on 400 bug-repair tasks where the true minimal fix was known (98% needed $\le 4$ token edits across 1 to 2 lines). Frontier LLMs routinely added 30 to 60+ lines of unrequested input validation, type coercion, and boilerplate for single-line fixes. Excess Levenshtein edit distance matched human reviewer rejection for poor reviewability in 94.8% of cases and unfaithfulness in 96.9% of cases. When the researchers constrained models to minimal edits, added cognitive complexity dropped by 26.6% and Pass@1 accuracy actually increased by 2.3 percentage points.

In practice, normalizing $\Delta \text{LOC}$ by task complexity gives an immediate readout of agent tuning. Large diffs per change (low Inverse LOC) tell us our prompts are too vague, our repository instructions are missing, or the agent doesn't know how to reuse existing helpers and standard library functions. Small, surgical diffs and net line deletions (high Inverse LOC) tell us the agent understands the codebase architecture, traces the root cause, and fixes the bug with the smallest possible footprint.

### 2. Code Churn and Line Survival Rate (The Durability Indicator)
Code Churn tracks the share of AI-authored lines that get reverted, rewritten, or heavily patched within 14 to 30 days of merge, alongside surviving code smells. Lower churn points to a well-grounded agent.

A lot of articles argue we should ignore code churn because AI makes refactoring cheap. I disagree, because that confuses deliberate refactoring with cleaning up after a messy agent. If an agent merges a feature on Monday, and we have to rewrite 40% of those lines next week, we didn't move faster; we just borrowed time against next sprint.

Three studies illustrate why Code Churn is one of the sharpest indicators of how well an AI workflow is tuned:

* **The clone and churn spike (GitClear, 2025):** Looking at 211 million changed lines across enterprise repos from 2020 to 2024, GitClear found that 2-week code churn doubled as AI adoption grew. Copy-pasted code clones jumped 4x, while modular refactoring ("moved" lines showing code reuse) dropped from 24.8% to 9.5%. Left unchecked, AI copies and pastes instead of reusing shared modules.
* **Survival analysis of agent code ([arXiv:2601.16809](https://arxiv.org/abs/2601.16809), 2026):** Rahman, Begoug, and Shihab tracked 648,959 lines of code across 2,794 merged PRs in 215 open-source projects. Their takeaway is important: agent code is not doomed to be disposable if the agent is properly tuned and supervised. Supervised assistants like GitHub Copilot and OpenAI Codex actually had a 17 to 24% lower modification hazard rate than human baseline code, while early, poorly scoped autonomous runs churned more until teams tightened their workflows. They also found that file size and recent churn strongly predict whether agent code will need rewriting.
* **Silent technical debt survival ([arXiv:2603.28592](https://arxiv.org/abs/2603.28592), 2026):** Liu et al. studied 302,600 verified AI-authored commits across 6,299 repositories and found 484,366 AI-introduced issues (89.3% code smells, plus bugs and security flaws). More than 15% of AI commits introduced at least one issue, and 22.7% of those issues survived into the latest version of the codebase.

In practice, we should pair 21-day agent code churn with static smell survival. High churn with low smell survival means engineers are spending their week rewriting messy agent code right after merge, so prompts or repo guardrails need work. Low churn with high smell survival is the hidden danger: bloated or smelly AI code is getting rubber-stamped in review and hardening into permanent technical debt. The target is low churn, low smell survival, and high reuse ("moved" code), showing that agents respect codebase patterns and pass strict automated checks before a human ever sees the PR.

### 3. Cost per Feature / Durable Outcome (Factory Unit Economics)
Cost per Durable Feature measures total attributable AI spend (model tokens, agent runtime compute, and CI runs) plus human verification overhead, divided by durable features shipped (completed features that survive 30 days in production without rework).

DORA was never designed to track cost. On a traditional team, engineering cost was mostly fixed payroll per sprint. In an AI Software Factory, an autonomous agent can solve a ticket in 5 tool calls, or it can get stuck in a loop and burn 500 tool calls, millions of tokens, and dozens of CI runs on the exact same task. Without a cost KPI, a faster pipeline that tripled your cloud and token bill looks like a free win.

In *"SWE-Bench ProMax: Benchmarking Agents on Large-Scale Multilingual Code Refactoring"* ([arXiv:2608.09802](https://arxiv.org/abs/2608.09802), COLM 2026), Shi et al. tested frontier coding agents on complex multi-file refactorings averaging 11.5 files and 261.6 lines of code. More spend did not guarantee better code: one frontier model spent an average of $4.77 per task (117.9 steps) to resolve 38.8% of tasks, while an open-weight model solved a nearly identical 36.5% at just $0.24 per task, a 20x difference in cost per outcome. As Larridin and Orq.ai noted in 2026, teams running large-scale Software Factories like Uber now track outcome-denominated unit costs rather than raw token budgets.

To use this in practice, count durable features rather than raw PRs, since an agent can open 50 tiny PRs for a few dollars. Also compare within workload tiers: a routine dependency bump and a cross-service feature shouldn't share the same denominator. Tracking cost per outcome within each workload class (for example, watching routine bug fixes drop from $18 to $11 per merged fix) tells us whether our context pruning, prompt caching, and model routing are paying off.

### 4. Time to Complete (End-to-End Spec-to-Production Cycle Time)
Time to Complete measures total wall-clock time from task specification (when the ticket or prompt is ready) to production release, split into spec and agent execution time, human review and validation wait time, and CI/release time.

We need this alongside DORA's Lead Time for Changes because DORA Lead Time only starts the clock at the first commit. When an agent writes code and opens a PR in three minutes, commit-to-deploy time misses everything that happened before the commit (specifying the task, failed agent runs) and hides how long that PR sat waiting for a human reviewer to make sense of it.

A longitudinal study of 33,228 pull requests in fast-moving AI repositories (*vLLM* and *SGLang*, [arXiv:2608.13884](https://arxiv.org/abs/2608.13884), 2026) showed that while median PR cycle time was under a day (0.62 to 1.04 days), P90 cycle time dragged out to 14.3 to 16.8 days whenever large, complex PRs hit the review queue. Similarly, alongside the 49% longer review wait found across 718 companies in the Harvard/Jellyfish study, an analysis of 2,260 performance PRs ([arXiv:2610.03969](https://arxiv.org/abs/2610.03969)) found that agent PRs were merged far less often than human PRs (54.4% vs. 73.3%) when agents relied on static reasoning instead of attaching concrete benchmark validation.

Breaking Time to Complete into those three stages—spec and agent execution (minutes), review and validation wait (the real bottleneck), and CI and release (the DORA pipeline)—shows how all four AI KPIs connect. When we tune agents for Inverse LOC per Change (smaller, surgical diffs) and automated pre-review checks, human review wait time drops sharply, cutting total Time to Complete. That leads to lower Code Churn and a lower Cost per Feature, which finally shows up in our baseline DORA and SPACE metrics as faster lead times, lower failure rates, and happier engineers.

## Reading All Three Layers Together

None of these numbers tell the full story on their own. Looking at how all three layers move together shows what a Software Factory is actually doing:

* **Unconstrained Slop Factory:** Deployment frequency, change failure rate, rework, diff size, and churn are all rising while reviewer fatigue climbs and trust drops. Agents are shipping big, brittle diffs that tired reviewers rubber-stamp. The fix is enforcing strict diff budgets, sharpening `AGENTS.md` context, and blocking oversized PRs.
* **The Review Bottleneck:** Lead time is flat or rising and deployment frequency is flat, while review load spikes and developer flow drops. Agent coding time is down, yet Time to Complete is up because huge PRs sit in human review queues for days. The fix is driving down LOC per change, splitting work into stacked PRs, and pushing deterministic checks upstream.
* **Runaway Token Loop:** DORA is healthy and stable, satisfaction is up, and friction is low, yet Cost per Feature and retries are spiking. Output quality is good, but agents are brute-forcing tasks with too many retries or bloated context. The fix is pruning context, enabling prompt caching, and routing simple tasks to smaller models.
* **Well-Tuned AI Software Factory:** Deployment frequency is up, lead time and MTTR are down, and change failure rate stays $\le 2\%$, alongside high flow and sustainable review load. Inverse LOC is high (minimal diffs), while churn, Cost per Feature, and Time to Complete all trend down. Agents produce surgical, durable changes that engineers can verify quickly at a predictable cost per feature.

## Keep Our Engineering Values, Tune the Agents

Moving into the age of AI and Software Factories doesn't mean throwing away the engineering values that got us here. Deployment frequency, lead time, low change failure rates, fast recovery, and sustainable human focus matter more when generating code becomes almost free.

We don't need to rewrite DORA and SPACE to fit AI. Keep DORA intact to guard delivery and stability, keep SPACE intact to protect your people, and layer Inverse LOC per Change, Code Churn, Cost per Feature, and Time to Complete on top. That is how we turn AI from a noisy code generator into a well-tuned Software Factory.

## References & Further Reading

### Academic Research (arXiv)
1. **Minimal Code Edits & Inverse LOC:** Zhu, T., Lim, W. H., & Kan, M.-Y. (2026). *"When Models Edit Too Much: On the Fidelity of Minimal Code Edits."* EMNLP 2026. [arXiv:2609.04061](https://arxiv.org/abs/2609.04061)
2. **Survival Analysis & Code Churn of AI Agents:** Rahman, M., Begoug, M., & Shihab, E. (2026). *"Will It Survive? Deciphering the Fate of AI Agent-Authored Code in Open Source."* [arXiv:2601.16809](https://arxiv.org/abs/2601.16809)
3. **Technical Debt in AI-Generated Code:** Liu, Y., Widyasari, R., Zhao, Y., Irsan, I. C., Chen, J., & Lo, D. (2026). *"Debt Behind the AI Boom: A Large-Scale Empirical Study of AI-Generated Code in the Wild."* [arXiv:2603.28592](https://arxiv.org/abs/2603.28592)
4. **Code Review Bottlenecks & Reviewer Burden:** Newman, K., Bird, C., Butler, J., & Murphy-Hill, E. (2026). *"Level Up! AI-Driven Challenges and Adaptations to Code Review Practices."* [arXiv:2611.18939](https://arxiv.org/abs/2611.18939)
5. **Causal Theory of AI Code Review as Control Point:** Agarwal, S., Miller, C., Kästner, C., & Vasilescu, B. (2026). *"3100 Opinions on Code Review in an AI World: Building Causal Theory from Practitioner Discourse."* [arXiv:2607.07980](https://arxiv.org/abs/2607.07980)
6. **Agent Cost Variance & Multi-File Refactoring:** Shi, Y., Xu, J., Fu, K., et al. (2026). *"SWE-Bench ProMax: Benchmarking Agents on Large-Scale Multilingual Code Refactoring."* COLM 2026. [arXiv:2608.09802](https://arxiv.org/abs/2608.09802)
7. **Longitudinal Cycle Time & P90 Tail Latency in Agentic Era:** *"Engineering Signals of Human-AI Collaboration in the Agentic Coding Era: A Longitudinal Analysis of 33,228 Pull Requests from vLLM and SGLang."* (2026). [arXiv:2608.13884](https://arxiv.org/abs/2608.13884)
8. **Agentic PR Merge Rates & Validation Gaps:** *"How Do Coding Agents Optimize Software and Report Performance Validation? A Large-Scale Empirical Study of Open-Source Pull Requests."* (2026). [arXiv:2610.03969](https://arxiv.org/abs/2610.03969)
9. **Empirical SPACE Operationalization:** *"SPACEX: Exploring metrics with the SPACE model for developer productivity."* (2025). [arXiv:2511.20955](https://arxiv.org/html/2511.20955)

### Industry Reports & Benchmarks
10. **DORA (2024 & 2025).** *Accelerate State of DevOps Report & State of AI-Assisted Software Development.* [dora.dev](https://dora.dev/)
11. **Forsgren, N., Storey, M.-A., Maddila, C., Zimmermann, T., Houck, B., & Butler, J. (2021).** *"The SPACE of Developer Productivity: There's More to It Than You Think."* *ACM Queue*, 19(1).
12. **Larridin (2026).** *"DORA and SPACE Metrics in the Age of AI."* [larridin.com/blog/dora-space-metrics-ai](https://larridin.com/blog/dora-space-metrics-ai)
13. **Hosseini, S. / Orq.ai (2026).** *"How to Measure a Software Factory With DORA Metrics."* [orq.ai/blog/how-to-measure-a-software-factory-with-dora-metrics](https://orq.ai/blog/how-to-measure-a-software-factory-with-dora-metrics)
14. **Harvard Business School & Jellyfish (2026).** *"Artificial Intelligence in the Firm: Bottlenecks in Software Production"* (Study of 300M work events across 718 firms).
15. **GitClear (2025).** *"AI Copilot Code Quality: 2025 Data Suggests 4x Growth in Code Clones."* (Analysis of 211M changed lines).
