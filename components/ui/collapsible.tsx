"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

const CollapsibleContent = ({
  ...props
}: CollapsiblePrimitive.CollapsibleContentProps) => (
  <CollapsiblePrimitive.Content
    className="collapsible overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown"
    {...props}
  />
);

export { Collapsible, CollapsibleTrigger, CollapsibleContent };