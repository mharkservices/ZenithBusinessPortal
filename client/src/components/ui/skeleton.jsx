"use client"

import PropTypes from 'prop-types';
import { cn } from "@/lib/utils"

function Skeleton({ className, ...otherProps }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...otherProps}
    />
  );
}

Skeleton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export { Skeleton }
