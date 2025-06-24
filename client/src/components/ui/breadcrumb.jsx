import PropTypes from 'prop-types';
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef(function Breadcrumb(props, ref) {
  const { separator, ...otherProps } = props;
  return <nav ref={ref} aria-label="breadcrumb" {...otherProps} />;
});

Breadcrumb.displayName = "Breadcrumb";

Breadcrumb.propTypes = {
  separator: PropTypes.node,
  children: PropTypes.node
};

const BreadcrumbList = React.forwardRef(function BreadcrumbList(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className
      )}
      {...otherProps}
    />
  );
});

BreadcrumbList.displayName = "BreadcrumbList";

BreadcrumbList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const BreadcrumbItem = React.forwardRef(function BreadcrumbItem(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...otherProps}
    />
  );
});

BreadcrumbItem.displayName = "BreadcrumbItem";

BreadcrumbItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const BreadcrumbLink = React.forwardRef(function BreadcrumbLink(props, ref) {
  const { asChild, className, ...otherProps } = props;
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...otherProps}
    />
  );
});

BreadcrumbLink.displayName = "BreadcrumbLink";

BreadcrumbLink.propTypes = {
  asChild: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string
};

const BreadcrumbPage = React.forwardRef(function BreadcrumbPage(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...otherProps}
    />
  );
});

BreadcrumbPage.displayName = "BreadcrumbPage";

BreadcrumbPage.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

const BreadcrumbSeparator = function BreadcrumbSeparator(props) {
  const { children, className, ...otherProps } = props;
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
      {...otherProps}
    >
      {children ?? <ChevronRight />}
    </li>
  );
};

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

BreadcrumbSeparator.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const BreadcrumbEllipsis = function BreadcrumbEllipsis(props) {
  const { className, ...otherProps } = props;
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...otherProps}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  );
};

BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

BreadcrumbEllipsis.propTypes = {
  className: PropTypes.string
};

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
