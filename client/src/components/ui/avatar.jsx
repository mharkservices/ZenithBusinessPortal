"use client"

import PropTypes from 'prop-types';
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef(function Avatar(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...otherProps}
    />
  );
});

Avatar.displayName = AvatarPrimitive.Root.displayName;

Avatar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const AvatarImage = React.forwardRef(function AvatarImage(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      {...otherProps}
    />
  );
});

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

AvatarImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string
};

const AvatarFallback = React.forwardRef(function AvatarFallback(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className
      )}
      {...otherProps}
    />
  );
});

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

AvatarFallback.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export { Avatar, AvatarImage, AvatarFallback }
