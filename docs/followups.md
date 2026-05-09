# Follow-up backlog

Surfaced from `feat/healthcare-bold-icu-nurse` (Phase 5b). Items here
are deferred — addressing them was out of scope for the build that
introduced this file.

## Schema

- **Drop legacy `templateKey` column on `Resume` model in a separate
  migration session.** The field defaults to `"brand-essence"` and is
  not read at render time (the editor + print routes resolve the
  template via `resume.template`, default `"classic-serif"`). Removal
  is a non-breaking schema change but warrants its own migration to
  isolate any stale read paths.
