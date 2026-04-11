Create a component based on the given name and options: $ARGUMENTS

## Rules

- Determine the correct FSD layer based on usage scope:
  - Used across multiple features → `src/shared/ui/`
  - Used within a single feature → `src/widgets/<feature>/` or `src/entities/<domain>/ui/`
- Use `interface` for Props definition
- Default export only
- Use Tailwind CSS for styling — no inline styles
- Use `cn()` from `@/shared/utils/cn` for conditional className merging
- Always accept `className?: string` prop for external style overrides
- Server Component by default — add `"use client"` only when needed (event handlers, hooks, browser APIs)

## Component Template

```tsx
// src/shared/ui/ComponentName.tsx
interface ComponentNameProps {
  // required props first
  // optional props last with ?
  className?: string
}

export default function ComponentName({ className }: ComponentNameProps) {
  return (
    <div className={cn("", className)}>
      {/* content */}
    </div>
  )
}
```

## Client Component Template (when needed)

```tsx
"use client"

import { useState } from "react"
import { cn } from "@/shared/utils/cn"

interface ComponentNameProps {
  className?: string
}

export default function ComponentName({ className }: ComponentNameProps) {
  const [state, setState] = useState(...)

  return (
    <div className={cn("", className)}>
      {/* content */}
    </div>
  )
}
```

## Steps

1. Identify the correct layer and folder for this component
2. Create the component file with the template above
3. If placed in `shared/ui/`, export it from `src/shared/ui/index.ts`
4. Confirm file path and export with the user
