import PropTypes from 'prop-types';
import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef(function AlertDialogOverlay(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <AlertDialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...otherProps}
      ref={ref}
    />
  );
});

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

AlertDialogOverlay.propTypes = {
  className: PropTypes.string
};

const AlertDialogContent = React.forwardRef(function AlertDialogContent(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        {...otherProps}
      />
    </AlertDialogPortal>
  );
});

AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

AlertDialogContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const AlertDialogHeader = function AlertDialogHeader(props) {
  const { className, ...otherProps } = props;
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )}
      {...otherProps}
    />
  );
};

AlertDialogHeader.displayName = "AlertDialogHeader";

AlertDialogHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const AlertDialogFooter = function AlertDialogFooter(props) {
  const { className, ...otherProps } = props;
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...otherProps}
    />
  );
};

AlertDialogFooter.displayName = "AlertDialogFooter";

AlertDialogFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const AlertDialogTitle = React.forwardRef(function AlertDialogTitle(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold", className)}
      {...otherProps}
    />
  );
});

AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

AlertDialogTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

const AlertDialogDescription = React.forwardRef(function AlertDialogDescription(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...otherProps}
    />
  );
});

AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

AlertDialogDescription.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

const AlertDialogAction = React.forwardRef(function AlertDialogAction(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <AlertDialogPrimitive.Action
      ref={ref}
      className={cn(buttonVariants(), className)}
      {...otherProps}
    />
  );
});

AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

AlertDialogAction.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

const AlertDialogCancel = React.forwardRef(function AlertDialogCancel(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "mt-2 sm:mt-0",
        className
      )}
      {...otherProps}
    />
  );
});

AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

AlertDialogCancel.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
