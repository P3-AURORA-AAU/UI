import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground h-9 w-fit rounded-lg",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
          "border-primary/50 hover:border-primary hover:bg-primary/20 hover:text-primary bg-transparent transition-all duration-200" +
          " data-[state=active]:bg-primary/10 data-[state=active]:border-primary/50 border py-3 data-[state=active]:text-foreground" +
          " data-[state=active]:bg-primary/10 data-[state=active]:border-primary/50" +
          " active:bg-primary/50 active:text-secondary data-[state=active]:active:bg-primary/50 data-[state=active]:active:text-secondary" +
          " data-[state=active]:hover:border-primary data-[state=active]:hover:text-primary data-[state=active]:hover:bg-primary/20",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
