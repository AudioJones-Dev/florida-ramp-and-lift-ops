# Obsidian Sync Protocol

**Status:** Git Spec-ready governance draft  
**Scope:** Safe movement between repo docs and private Obsidian business memory  
**Runtime impact:** None  
**Implementation status:** Documentation only

## 1. Purpose

Obsidian is the business memory and decision system. GitHub is the specification, execution, and code-review system. This protocol defines how information may move between them without coupling this repo to a private vault.

## 2. Boundaries

Repo docs may reference Obsidian as a source-of-truth category, but must not hardcode private vault paths, personal note paths, or local machine-specific locations.

Use generic examples only:

```txt
Example vault export path: <vault>/Projects/Florida Ramp And Lift/
Example repo import path: docs/system/
```

## 3. What Belongs In The Repo

- Product requirements.
- Architecture decisions.
- Implementation gates.
- Workflow specs.
- Schema contracts.
- Agent operating rules.
- Sanitized decision summaries needed for future repo work.

## 4. What Belongs In Obsidian

- Private business memory.
- Meeting notes.
- Strategy notes.
- Cross-client context.
- Personal operating preferences.
- Draft thinking not yet ready to govern repo behavior.

## 5. Sync Rules

- Export only sanitized, repo-relevant decisions.
- Do not export secrets, credentials, private client data, signed documents, or private rate sheets.
- Do not import broad vault context into the repo without a specific repo reason.
- Convert vault notes into Git Spec-ready Markdown before committing.
- If a vault decision changes repo architecture, create or update the relevant repo doc rather than adding an orphan note.

## 6. Operator Approval Required

Ask for explicit approval before:

- Writing into a private vault.
- Bulk-exporting vault notes.
- Committing exported vault material.
- Adding local vault paths to repo config.
- Creating automated sync scripts.

## 7. Handoff Format

When asking another assistant or human to sync context, use:

```txt
Review/Diagnosis owner:
Actionable AI Assistant Task owner:
Execution location/tool:
Human/operator role:
Copy/paste destination:
Sanitization requirements:
Repo docs to update:
```
