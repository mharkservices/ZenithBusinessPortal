import PropTypes from 'prop-types';
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(function AccordionItem(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-b", className)}
      {...otherProps}
    />
  );
});

AccordionItem.displayName = "AccordionItem";

AccordionItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const AccordionTrigger = React.forwardRef(function AccordionTrigger(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...otherProps}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

AccordionTrigger.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

const AccordionContent = React.forwardRef(function AccordionContent(props, ref) {
  const { className, children, ...otherProps } = props;
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...otherProps}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
});

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

AccordionContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
