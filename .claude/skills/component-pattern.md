# Skill: Component Pattern

Reference for writing React components consistently in this project.

## Basic Template

```tsx
import { cn } from "@/shared/utils/cn"

interface <Name>Props {
  // required props first
  // optional props last
  className?: string
}

export default function <Name>({ className }: <Name>Props) {
  return (
    <div className={cn(className)}>
      {/* content */}
    </div>
  )
}
```

## Client Component (when event handlers or hooks are needed)

```tsx
"use client"

import { useState } from "react"
import { cn } from "@/shared/utils/cn"

interface <Name>Props {
  className?: string
}

export default function <Name>({ className }: <Name>Props) {
  return (
    <div className={cn(className)}>
      {/* content */}
    </div>
  )
}
```

## forwardRef Component (for input-like elements)

```tsx
import { forwardRef } from "react"
import { cn } from "@/shared/utils/cn"

interface <Name>Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const <Name> = forwardRef<HTMLInputElement, <Name>Props>(
  ({ label, className, ...props }, ref) => {
    return (
      <div>
        {label && <label>{label}</label>}
        <input ref={ref} className={cn(className)} {...props} />
      </div>
    )
  }
)
<Name>.displayName = "<Name>"

export default <Name>
```

## Checklist

- [ ] `interface` or `type` for props — both acceptable
- [ ] `className?: string` prop included
- [ ] `cn()` used for className merging
- [ ] Default export
- [ ] `"use client"` only when needed
- [ ] No inline styles
- [ ] `displayName` set for `forwardRef` / `memo` components
