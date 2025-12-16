import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-soft hover:shadow-card hover:scale-[1.02] active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground shadow-soft hover:shadow-card hover:scale-[1.02]",
        outline: "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary",
        secondary: "bg-secondary text-secondary-foreground shadow-soft hover:shadow-card hover:scale-[1.02]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Student-friendly variants
        student: "bg-student-blue text-primary-foreground shadow-glow-blue font-display text-lg hover:scale-105 active:scale-95 rounded-2xl",
        "student-orange": "bg-student-orange text-primary-foreground shadow-glow-orange font-display text-lg hover:scale-105 active:scale-95 rounded-2xl",
        "student-green": "bg-student-green text-primary-foreground shadow-glow-green font-display text-lg hover:scale-105 active:scale-95 rounded-2xl",
        "student-outline": "border-3 border-student-blue bg-transparent text-student-blue font-display text-lg hover:bg-student-blue hover:text-primary-foreground rounded-2xl",
        // Teacher variants
        teacher: "bg-teacher-primary text-primary-foreground shadow-soft hover:shadow-card",
        // Admin variants
        admin: "bg-admin-primary text-primary-foreground shadow-soft hover:shadow-card",
        // Role selection cards
        role: "flex-col h-auto py-8 px-6 bg-card border-2 border-border hover:border-primary hover:shadow-card text-card-foreground rounded-2xl",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-11 w-11",
        // Student sizes
        "student-sm": "h-12 px-6 text-base",
        "student-lg": "h-16 px-8 text-xl",
        "student-xl": "h-20 px-10 text-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
