"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button, type buttonVariants } from "@/components/ui/button"
import type { VariantProps } from "class-variance-authority"

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "flex items-center rounded-md border border-input shadow-xs transition-[color,box-shadow,200ms] focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] has-[>:last-child:not(:first-child)]:[&>input:first-child]:rounded-r-none has-[>:first-child:not(:last-child)]:[&>input:last-child]:rounded-l-none",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & { align?: "inline-start" | "inline-end" }) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        "flex items-center",
        "data-[align=inline-start]:order-first",
        "data-[align=inline-end]:order-last",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input-group-input"
      className={cn(
        "flex h-9 w-full min-w-0 bg-transparent px-3 py-1 text-sm outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "rounded-none border-0 shadow-none focus-visible:ring-0",
        className
      )}
      {...props}
    />
  )
}

function InputGroupButton({
  className,
  variant = "ghost",
  size = "icon-sm",
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <Button
      data-slot="input-group-button"
      variant={variant}
      size={size}
      className={cn("rounded-none", className)}
      {...props}
    />
  )
}

export { InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton }
