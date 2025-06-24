"use client"

import * as React from "react"
import PropTypes from 'prop-types'
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef((props, ref) => {
  const { className, orientation = "horizontal", decorative = true, ...otherProps } = props
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...otherProps}
    />
  )
})

Separator.displayName = SeparatorPrimitive.Root.displayName

Separator.propTypes = {
  className: PropTypes.string,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  decorative: PropTypes.bool
}

export { Separator }
