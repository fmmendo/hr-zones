# HR Zones — build plan

A small single-page app that calculates heart-rate (and pace) training zones
using a **pluggable set of methods**. Learning project: the goal is to
understand how a modern Vite + React + TS stack fits together, so we build it
step by step, guided rather than auto-generated.

## Scope

- No backend, no database, no multi-user, no fancy statistics.
- Optional `localStorage` to remember the last inputs.
- Optional GitHub Pages deploy at the end.

## Stack (trimmed-down preference-ranker)

- Vite + React 19 + TypeScript
- Tailwind CSS 4
- Vitest for unit-testing the calculation logic
- oxlint + Prettier
- (optional) GitHub Pages via Actions

## Core abstraction: the method registry

Each zone method is a small self-describing module implementing one interface:

```ts
interface ZoneMethod {
  id: string;
  name: string;                    // "Joe Friel — Running (HR)"
  discipline?: 'run' | 'bike' | 'swim' | 'general';
  inputs: InputSpec[];             // declares what values it needs
  compute(values: InputValues): Zone[];   // pure function
}

interface Zone {
  label: string;                   // "Zone 2", "Zone 5b", "Gray zone"
  lower: number;                   // in this method's unit
  upper: number;
  unit: 'bpm' | 'pace';
  color?: string;
}
```

The app asks the registry what methods exist, shows a picker, then asks the
chosen method what inputs it needs and renders a form from that. Adding a new
method = write one file, register it, no UI changes.

This handles the known wrinkles:
- **Variable zone count** — `compute()` returns however many zones it wants
  (Friel splits Zone 5 into 5a/5b/5c).
- **Gray zones (80/20)** — just extra `Zone` entries with a distinct label/colour.
- **Pace vs HR** — `unit` per zone; pace methods do faster-is-smaller math and
  format as pace, HR methods stay bpm.
- **Method-specific inputs** — Karvonen needs Max + Resting HR; Friel-HR needs
  LTHR; Friel-pace needs threshold pace; CTS needs a field-test result.

## Milestones

1. **Scaffold** — Vite + React + TS + Tailwind, dev server running.
2. **Types + Karvonen** — define `ZoneMethod`/`Zone`, implement Karvonen only,
   with Vitest tests. Prove the shape in tests before any UI.
3. **Second method (Friel-run-HR)** — different inputs + 5a/5b/5c zone count.
   Stress-tests the abstraction while it's cheap to change.
4. **Registry + picker UI** — list methods, select one.
5. **Dynamic form** — render inputs from the selected method's `inputs` spec.
6. **Zone output** — table + coloured bars, unit-aware.
7. **Remaining methods** — Friel-bike, Friel-pace, CTS, Norwegian, 80/20.
8. **Polish** — dark mode, remember inputs in `localStorage`, deploy (optional).

## Workflow

- "I guide, you build" — Claude explains each step and reviews; Filipe writes
  the code and commits when he feels like it (no auto-commit for this project).
