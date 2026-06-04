import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[#145d50]",
  secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[#d9ece5]",
  destructive: "bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:bg-[#9f1f16]",
  ghost: "hover:bg-[var(--muted)]"
};

const sizes = {
  default: "h-10 px-4 py-2",
  icon: "h-10 w-10"
};

export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      type={type}
      {...props}
    />
  );
}
