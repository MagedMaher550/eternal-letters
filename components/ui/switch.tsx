// 'use client'

// import * as React from 'react'
// import * as SwitchPrimitive from '@radix-ui/react-switch'

// import { cn } from '@/lib/utils'

// function Switch({
//   className,
//   ...props
// }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
//   return (
//     <SwitchPrimitive.Root
//       data-slot="switch"
//       className={cn(
//         'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
//         className,
//       )}
//       {...props}
//     >
//       <SwitchPrimitive.Thumb
//         data-slot="switch-thumb"
//         className={
//           'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0'
//         }
//       />
//     </SwitchPrimitive.Root>
//   )
// }

// export { Switch }

"use client";

import type * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 transition-all outline-none",
        "focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-950",
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Checked state - amber/golden glow
        "data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-500",
        // Unchecked state - dark purple with visible border
        "data-[state=unchecked]:bg-purple-950/50 data-[state=unchecked]:border-purple-700/50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full shadow-lg transition-transform",
          // Checked state - white/bright thumb
          "data-[state=checked]:translate-x-5 data-[state=checked]:bg-white",
          // Unchecked state - darker purple thumb
          "data-[state=unchecked]:translate-x-0 data-[state=unchecked]:bg-purple-400"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
