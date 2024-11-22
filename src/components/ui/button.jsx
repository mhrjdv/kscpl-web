import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-500 box-border",
  {
    variants: {
      variant: {
        default: "border-2 border-primary text-secondary-foreground hover:text-primary-foreground relative z-10 after:absolute after:top-0 after:right-0 after:z-[-1] after:bg-primary after:w-full after:h-full after:hover:w-0 after:transition-all after:duration-500",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-muted bg-transparent text-muted-foreground hover:text-cream-foreground hover:border-primary relative z-10 after:absolute after:top-0 after:left-0 after:z-[-1] after:bg-primary after:w-0 hover:after:w-full after:h-full after:transition-all after:duration-500",
        secondary:
          "bg-background text-secondary-foreground hover:bg-background/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "max-h-[62px] lg:px-[33px] px-6 lg:py-4 py-3",
        sm: "h-9 rounded-md px-3",
        lg: "max-h-[68px] lg:py-[15px] py-3 lg:px-10 px-7.5 lg:text-2xl text-xl font-bold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
