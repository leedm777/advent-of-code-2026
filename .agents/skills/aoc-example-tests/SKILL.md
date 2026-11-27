---
name: aoc-example-tests
description: |
  Update src/dayYYDD.spec.ts with example inputs and expected outputs from
  inputs/dayYYDD.html for the current src/dayYYDD.ts or src/dayYYDD.spec.ts
  file. Use when asked to populate Advent of Code example tests; exclude solver
  implementation and personal-input answers.
---

# Advent of Code Example Tests

Save learners from copying examples. Keep the solution theirs.

## Scope and source

- Follow repository teaching boundaries. Edit example tests only when requested.
  Coaching, debugging, or automatic skill loading alone grants no edit
  permission.
- Identify the current `src/dayYYDD.ts` or `src/dayYYDD.spec.ts` from the active
  file or user request. Use the exact `dayYYDD` stem to find
  `inputs/dayYYDD.html` and the target `src/dayYYDD.spec.ts`. Ask which file
  only if context is missing or ambiguous.
- Human runs `prep.sh` to generate these files. Do not run it, download
  statements or input, read auth cookies, or fetch external solutions. If a
  required file is missing, report its path and ask the user to supply it or run
  their prep workflow.
- Read the local HTML statement and update matching tests with example inputs
  and stated outputs. Use the requested or active part. Do not inspect later
  parts. If part ambiguity affects edits, ask before reading that section.
  Extract only the relevant section before bringing text into context.

## Transcribe examples

- Inspect only the relevant test file, exported function signatures, and needed
  test config. Match existing naming, imports, and assertions. Repo uses
  TypeScript ES modules with `.ts` imports. Vitest tests usually live in
  `src/*.spec.ts`.
- Test each distinct published input/output example the existing public
  interface supports. Use outputs explicitly stated for that example and part.
  Do not use intermediate states as final outputs.
- Define example input constants as `string[]`, one string per line, matching
  solver input. Use `it.each` for multiple examples of the same function, with
  each matching expected output.
- Preserve significant spaces, blank lines, punctuation, and line breaks.
  Represent blank input lines as empty strings. Do not add parsing or puzzle
  logic to tests.
- Keep expected values literal and from the statement. Never derive them by
  running the solver, implementing an oracle, or calculating unstated cases.
  Flag ambiguous values and omit those cases until clarified.
- Use number literals for numeric sample expectations, such as `1985`, not
  `"1985"`. Keep example input lines as strings. Do not infer the expected type
  from a generated solver's `"TODO"` return value.
- Replace generated placeholders with matching statement examples. Add cases for
  multiple examples. Preserve user-written cases, comments, and assertions
  outside requested updates. Do not replace personal-input expectations, change
  solver code, add dependencies, or introduce helper APIs to fit examples. If no
  suitable public interface exists, report what's missing and ask how to
  proceed.
- Keep `"TODO"` as the placeholder for expectations without a published example
  value; do not replace it with a numeric sentinel or change solver
  placeholders.
- Do not invent edge cases, reveal an algorithm, or explain solution strategy.

## Verify and report

- Check each case against the statement for correct part, exact input, and
  stated output. Check for duplicates.
- Before running tests, inspect selected tests and relevant module
  initialization for personal-input reads or solver execution. If the file would
  run solvers on personal input, stop and discuss before running it.
- Run `vitest run src/dayYYDD.spec.ts` with the current file's stem and the
  project's installed Vitest. Expect example assertions to fail if the generated
  solver remains unimplemented. Confirm tests reach assertions. Collection,
  import, or syntax errors do not confirm execution.
- Run `npm run typecheck` to check TypeScript types.
- Report observed results. Do not implement the solver, weaken assertions, or
  replace expected values with actual output. Report unexpected passes. Do not
  force failure or assume existing solver code is incomplete. Distinguish test
  failures from typecheck failures.
- Summarize added examples, identify the local HTML source, and state what
  validation ran. Omit puzzle reasoning and unrelated results.
