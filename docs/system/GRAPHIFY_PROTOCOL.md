# Graphify Protocol

**Status:** Git Spec-ready governance draft  
**Scope:** Optional repo knowledge-graph usage  
**Runtime impact:** None  
**Implementation status:** Documentation only; Graphify is not installed or required by this repo

## 1. Purpose

Graphify may be used as an optional external analysis tool to understand architecture, file relationships, and documentation clusters. This repo must not depend on Graphify at runtime.

## 2. Authorized Uses

Graphify is appropriate for:

- Mapping relationships between docs, schemas, prompts, and source files.
- Reviewing whether product concepts are duplicated or contradictory.
- Generating architecture exploration reports during QA/readiness work.
- Supporting agent onboarding when the repo grows too large for manual inspection.

## 3. Not Authorized

This protocol does not authorize:

- Installing Graphify as a project dependency.
- Adding Graphify output to runtime code paths.
- Committing large generated graph artifacts without operator approval.
- Sending secrets, private customer files, signed PDFs, or sensitive data into graph extraction.
- Treating inferred graph edges as verified architecture decisions.

## 4. Output Policy

If Graphify is run, keep outputs outside the committed repo by default.

Commit Graphify outputs only when:

- The operator approves it.
- The output is sanitized.
- The output has clear maintenance value.
- The PR states whether the graph is a point-in-time artifact or an actively maintained doc.

## 5. Recommended Workflow

1. Run normal repo inspection first.
2. Use Graphify only when manual inspection is insufficient or when a graph report is explicitly requested.
3. Review generated report for false inferences.
4. Convert useful findings into normal docs under `docs/`.
5. Do not let generated output replace accepted architecture docs.

## 6. Evidence Standard

Graphify output can support analysis, but accepted repo facts must still cite source files. Use labels such as:

- Fact: directly present in a file.
- Inference: derived from relationships between files.
- Unknown: not proven by the graph or repo.
