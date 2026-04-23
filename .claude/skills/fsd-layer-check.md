# Skill: FSD Layer Compliance Check

Verify that imports follow the FSD layer dependency rules.

## Layer Order (top → bottom)

```
app → views → widgets → entities → shared
```

## Rules

- Each layer may only import from layers **below** it
- `shared` cannot import from any other layer
- `entities` cannot import from `widgets`, `views`, or `app`
- Cross-slice imports within the same layer are **not allowed**
  - e.g. `entities/user` cannot import from `entities/team`

## How to Check

Search for violations:
```bash
# shared importing from upper layers
grep -r "from \"@/entities" src/shared/
grep -r "from \"@/widgets" src/shared/
grep -r "from \"@/views" src/shared/

# entities importing from upper layers
grep -r "from \"@/widgets" src/entities/
grep -r "from \"@/views" src/entities/
```

## Output

Report each violation with:
- File path
- The offending import line
- Suggested fix (which layer the dependency should be moved to or how to restructure)
