"use client"

import * as React from "react"
import PropTypes from 'prop-types'
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root
Collapsible.propTypes = {
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  onOpenChange: PropTypes.func,
  children: PropTypes.node
}

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger
CollapsibleTrigger.propTypes = {
  asChild: PropTypes.bool,
  children: PropTypes.node
}

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent
CollapsibleContent.propTypes = {
  asChild: PropTypes.bool,
  children: PropTypes.node
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
