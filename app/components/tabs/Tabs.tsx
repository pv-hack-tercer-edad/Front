"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={`inline-flex h-14 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${
      className || ""
    }`}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export { Tabs, TabsList };
