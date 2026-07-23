import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../cn";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * Portals render outside the header DOM. We mark the surface itself as
 * `.cn-suite-root` and put Tailwind utilities on an inner node so
 * `important: '.cn-suite-root'` still applies.
 */
export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, children, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className="cn-suite-root"
      {...props}
    >
      <div
        className={cn(
          "z-[100] rounded-3xl border border-border bg-card text-card-foreground shadow-2xl outline-none",
          className,
        )}
      >
        {children}
      </div>
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
