#!/usr/bin/env python3
"""Lightweight repo policy checks for agent-governed work.

This script is intentionally dependency-free and non-destructive. It reports
obvious policy risks so an agent can stop before expanding scope.
"""

from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]

SELF_PATH = ".codex/hooks/repo_policy.py"

SECRET_MARKERS = [
    "api_key=",
    "apikey=",
    "private_key",
    "client_secret",
    "access_token",
    "refresh_token",
    "hubspot_access_token",
    "quickbooks_client_secret",
]

FORBIDDEN_RUNTIME_TEXT = [
    "firebase",
    "firestore",
    "firebaseauth",
    "firebase storage",
]

APPROVAL_GATED_PATHS = {
    "package.json",
    "package-lock.json",
    "next.config.ts",
    "eslint.config.mjs",
}

APPROVAL_GATED_RUNTIME_MARKERS = [
    "createClient(",
    "supabase",
    "clerk",
    "hubspot",
    "quickbooks",
    "resend",
    "twilio",
    "pdf-lib",
    "puppeteer",
    "playwright",
    "s3client",
    "r2",
]


def run_git(args: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["git", *args],
        cwd=ROOT,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=False,
    )


def changed_files(staged: bool) -> list[Path]:
    if staged:
        result = run_git(["diff", "--cached", "--name-only", "--diff-filter=ACMR"])
    else:
        result = run_git(["diff", "--name-only", "--diff-filter=ACMR"])
        untracked = run_git(["ls-files", "--others", "--exclude-standard"])
        names = result.stdout.splitlines() + untracked.stdout.splitlines()
        return [ROOT / name for name in sorted(set(names)) if name]

    if result.returncode != 0:
        print(result.stderr.strip(), file=sys.stderr)
        return []

    return [ROOT / name for name in result.stdout.splitlines() if name]


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return ""
    except OSError:
        return ""


def is_runtime_path(path: Path) -> bool:
    if path.suffix.lower() == ".md":
        return False

    try:
        rel = path.relative_to(ROOT).as_posix()
    except ValueError:
        return False
    return rel.startswith("src/") or rel in APPROVAL_GATED_PATHS


def is_policy_script(path: Path) -> bool:
    try:
        return path.relative_to(ROOT).as_posix() == SELF_PATH
    except ValueError:
        return False


def main() -> int:
    parser = argparse.ArgumentParser(description="Check repo policy risks.")
    parser.add_argument("--check", action="store_true", help="Run policy checks.")
    parser.add_argument("--staged", action="store_true", help="Only inspect staged files.")
    args = parser.parse_args()

    if not args.check:
        parser.print_help()
        return 0

    paths = [path for path in changed_files(args.staged) if path.exists() and path.is_file()]
    issues: list[str] = []

    for path in paths:
        if is_policy_script(path):
            continue

        rel = path.relative_to(ROOT).as_posix()
        text = read_text(path)
        lowered = text.lower()

        if rel in APPROVAL_GATED_PATHS:
            issues.append(f"{rel}: approval-gated config/dependency file changed")

        for marker in SECRET_MARKERS:
            if marker in lowered:
                issues.append(f"{rel}: contains policy-sensitive marker '{marker}'")

        if is_runtime_path(path):
            for marker in FORBIDDEN_RUNTIME_TEXT:
                if marker in lowered:
                    issues.append(f"{rel}: contains forbidden runtime marker '{marker}'")

            for marker in APPROVAL_GATED_RUNTIME_MARKERS:
                if marker.lower() in lowered:
                    issues.append(f"{rel}: contains approval-gated runtime marker '{marker}'")

    if issues:
        print("Repo policy check found risks:")
        for issue in issues:
            print(f"- {issue}")
        print("Stop and get operator approval if these changes were not explicitly authorized.")
        return 1

    print("Repo policy check passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
