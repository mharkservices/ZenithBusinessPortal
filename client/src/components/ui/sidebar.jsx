"use client"

import * as React from "react"
import PropTypes from 'prop-types'
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

const SidebarContext = React.createContext(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

const SidebarProvider = React.forwardRef((props, ref) => {
  const {
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...otherProps
  } = props

  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  const toggleSidebar = React.useCallback(() => {
    return isMobile
      ? setOpenMobile((open) => !open)
      : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={{
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          }}
          className={cn(
            "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
            className
          )}
          ref={ref}
          {...otherProps}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
})

SidebarProvider.displayName = "SidebarProvider"

SidebarProvider.propTypes = {
  defaultOpen: PropTypes.bool,
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired
}

const Sidebar = React.forwardRef((props, ref) => {
  const {
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    children,
    ...otherProps
  } = props

  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === "none") {
    return (
      <div
        className={cn(
          "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
          className
        )}
        ref={ref}
        {...otherProps}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...otherProps}>
        <SheetContent
          data-sidebar="sidebar"
          data-mobile="true"
          className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={{
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
          }}
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      ref={ref}
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
    >
      <div
        className={cn(
          "relative w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
        )}
      />
      <div
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
            : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
          variant === "floating"
            ? "top-4 mx-4 h-[calc(100vh-2rem)] rounded-lg border bg-sidebar shadow-lg"
            : variant === "inset"
            ? "border-r bg-sidebar"
            : "bg-sidebar"
        )}
      >
        <div
          className={cn(
            "flex h-full w-full flex-col overflow-hidden",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
              : ""
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
})

Sidebar.displayName = "Sidebar"

Sidebar.propTypes = {
  side: PropTypes.oneOf(["left", "right"]),
  variant: PropTypes.oneOf(["sidebar", "floating", "inset"]),
  collapsible: PropTypes.oneOf(["offcanvas", "icon", "none"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

const SidebarHeader = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props
  return (
    <div
      ref={ref}
      className={cn("flex h-14 items-center border-b px-4", className)}
      {...otherProps}
    >
      {children}
    </div>
  )
})

SidebarHeader.displayName = "SidebarHeader"

SidebarHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

const SidebarBody = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props
  return (
    <div
      ref={ref}
      className={cn("flex-1 overflow-auto", className)}
      {...otherProps}
    >
      {children}
    </div>
  )
})

SidebarBody.displayName = "SidebarBody"

SidebarBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

const SidebarFooter = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props
  return (
    <div
      ref={ref}
      className={cn("flex h-14 items-center border-t px-4", className)}
      {...otherProps}
    >
      {children}
    </div>
  )
})

SidebarFooter.displayName = "SidebarFooter"

SidebarFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

const SidebarToggle = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props
  const { toggleSidebar, state } = useSidebar()

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("h-9 w-9", className)}
      onClick={toggleSidebar}
      {...otherProps}
    >
      {children ?? (
        <PanelLeft
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            state === "collapsed" && "rotate-180"
          )}
        />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})

SidebarToggle.displayName = "SidebarToggle"

SidebarToggle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

const SidebarSearch = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props
  return (
    <div ref={ref} className={cn("px-4 py-2", className)} {...otherProps}>
      <Input
        type="search"
        placeholder="Search..."
        className="h-9 bg-sidebar-foreground/5"
      />
    </div>
  )
})

SidebarSearch.displayName = "SidebarSearch"

SidebarSearch.propTypes = {
  className: PropTypes.string
}

const SidebarNav = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props
  return (
    <nav
      ref={ref}
      className={cn("flex flex-col gap-1 p-2", className)}
      {...otherProps}
    >
      {children}
    </nav>
  )
})

SidebarNav.displayName = "SidebarNav"

SidebarNav.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

const SidebarNavItem = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    active,
    disabled,
    icon: Icon,
    ...otherProps
  } = props

  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          ref={ref}
          variant="ghost"
          className={cn(
            "group relative h-9 justify-start gap-2 px-2",
            active && "bg-sidebar-foreground/10",
            disabled && "pointer-events-none opacity-50",
            isCollapsed && "w-9 p-0",
            className
          )}
          disabled={disabled}
          {...otherProps}
        >
          {Icon && (
            <Icon
              className={cn(
                "h-4 w-4 shrink-0",
                isCollapsed && "mx-auto"
              )}
            />
          )}
          <span
            className={cn(
              "flex-1 truncate",
              isCollapsed && "hidden"
            )}
          >
            {children}
          </span>
          {active && (
            <div
              className={cn(
                "absolute inset-y-0 left-0 w-1 rounded-full bg-primary",
                isCollapsed && "hidden"
              )}
            />
          )}
        </Button>
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent
          side="right"
          className="flex items-center gap-2"
        >
          {Icon && <Icon className="h-4 w-4" />}
          {children}
        </TooltipContent>
      )}
    </Tooltip>
  )
})

SidebarNavItem.displayName = "SidebarNavItem"

SidebarNavItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.elementType
}

const SidebarNavSection = React.forwardRef((props, ref) => {
  const { className, children, title, ...otherProps } = props
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1", className)}
      {...otherProps}
    >
      {title && (
        <div
          className={cn(
            "flex h-9 items-center px-4 text-xs font-semibold text-sidebar-foreground/50",
            isCollapsed && "hidden"
          )}
        >
          {title}
        </div>
      )}
      {children}
    </div>
  )
})

SidebarNavSection.displayName = "SidebarNavSection"

SidebarNavSection.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  title: PropTypes.string
}

const SidebarNavSectionSeparator = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  if (isCollapsed) {
    return null
  }

  return (
    <Separator
      ref={ref}
      className={cn("my-2", className)}
      {...otherProps}
    />
  )
})

SidebarNavSectionSeparator.displayName = "SidebarNavSectionSeparator"

SidebarNavSectionSeparator.propTypes = {
  className: PropTypes.string
}

const SidebarNavSectionTitle = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  if (isCollapsed) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex h-9 items-center px-4 text-xs font-semibold text-sidebar-foreground/50",
        className
      )}
      {...otherProps}
    >
      {children}
    </div>
  )
})

SidebarNavSectionTitle.displayName = "SidebarNavSectionTitle"

SidebarNavSectionTitle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

const SidebarNavSectionContent = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1", className)}
      {...otherProps}
    >
      {children}
    </div>
  )
})

SidebarNavSectionContent.displayName = "SidebarNavSectionContent"

SidebarNavSectionContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

const SidebarNavSectionItem = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    active,
    disabled,
    icon: Icon,
    ...otherProps
  } = props

  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          ref={ref}
          variant="ghost"
          className={cn(
            "group relative h-9 justify-start gap-2 px-2",
            active && "bg-sidebar-foreground/10",
            disabled && "pointer-events-none opacity-50",
            isCollapsed && "w-9 p-0",
            className
          )}
          disabled={disabled}
          {...otherProps}
        >
          {Icon && (
            <Icon
              className={cn(
                "h-4 w-4 shrink-0",
                isCollapsed && "mx-auto"
              )}
            />
          )}
          <span
            className={cn(
              "flex-1 truncate",
              isCollapsed && "hidden"
            )}
          >
            {children}
          </span>
          {active && (
            <div
              className={cn(
                "absolute inset-y-0 left-0 w-1 rounded-full bg-primary",
                isCollapsed && "hidden"
              )}
            />
          )}
        </Button>
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent
          side="right"
          className="flex items-center gap-2"
        >
          {Icon && <Icon className="h-4 w-4" />}
          {children}
        </TooltipContent>
      )}
    </Tooltip>
  )
})

SidebarNavItem.displayName = "SidebarNavItem"

SidebarNavItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.elementType
}

const SidebarNavSectionItemSkeleton = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  if (isCollapsed) {
    return (
      <Skeleton
        ref={ref}
        className={cn("h-9 w-9 rounded-md", className)}
        {...otherProps}
      />
    )
  }

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-2 px-2", className)}
      {...otherProps}
    >
      <Skeleton className="h-4 w-4 rounded-md" />
      <Skeleton className="h-4 flex-1 rounded-md" />
    </div>
  )
})

SidebarNavSectionItemSkeleton.displayName = "SidebarNavSectionItemSkeleton"

SidebarNavSectionItemSkeleton.propTypes = {
  className: PropTypes.string
}

const SidebarNavSectionItemIcon = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <div
      ref={ref}
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center",
        isCollapsed && "mx-auto",
        className
      )}
      {...otherProps}
    >
      {children}
    </div>
  )
})

SidebarNavSectionItemIcon.displayName = "SidebarNavSectionItemIcon"

SidebarNavSectionItemIcon.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

const SidebarNavSectionItemText = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  if (isCollapsed) {
    return null
  }

  return (
    <span
      ref={ref}
      className={cn("flex-1 truncate", className)}
      {...otherProps}
    >
      {children}
    </span>
  )
})

SidebarNavSectionItemText.displayName = "SidebarNavSectionItemText"

SidebarNavSectionItemText.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

const SidebarNavSectionItemActiveIndicator = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  if (isCollapsed) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-y-0 left-0 w-1 rounded-full bg-primary",
        className
      )}
      {...otherProps}
    />
  )
})

SidebarNavSectionItemActiveIndicator.displayName = "SidebarNavSectionItemActiveIndicator"

SidebarNavSectionItemActiveIndicator.propTypes = {
  className: PropTypes.string
}

const SidebarNavSectionItemTooltip = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  if (!isCollapsed) {
    return null
  }

  return (
    <TooltipContent
      ref={ref}
      side="right"
      className={cn("flex items-center gap-2", className)}
      {...otherProps}
    >
      {children}
    </TooltipContent>
  )
})

SidebarNavSectionItemTooltip.displayName = "SidebarNavSectionItemTooltip"

SidebarNavSectionItemTooltip.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

const SidebarNavSectionItemTooltipTrigger = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  if (!isCollapsed) {
    return children
  }

  return (
    <TooltipTrigger
      ref={ref}
      asChild
      className={cn(className)}
      {...otherProps}
    >
      {children}
    </TooltipTrigger>
  )
})

SidebarNavSectionItemTooltipTrigger.displayName = "SidebarNavSectionItemTooltipTrigger"

SidebarNavSectionItemTooltipTrigger.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

const SidebarNavSectionItemTooltipContent = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  if (!isCollapsed) {
    return null
  }

  return (
    <TooltipContent
      ref={ref}
      side="right"
      className={cn("flex items-center gap-2", className)}
      {...otherProps}
    >
      {children}
    </TooltipContent>
  )
})

SidebarNavSectionItemTooltipContent.displayName = "SidebarNavSectionItemTooltipContent"

SidebarNavSectionItemTooltipContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

const SidebarNavSectionItemTooltipProvider = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  if (!isCollapsed) {
    return children
  }

  return (
    <TooltipProvider
      ref={ref}
      delayDuration={0}
      className={cn(className)}
      {...otherProps}
    >
      {children}
    </TooltipProvider>
  )
})

SidebarNavSectionItemTooltipProvider.displayName = "SidebarNavSectionItemTooltipProvider"

SidebarNavSectionItemTooltipProvider.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

const SidebarNavSectionItemTooltipRoot = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  if (!isCollapsed) {
    return children
  }

  return (
    <Tooltip
      ref={ref}
      className={cn(className)}
      {...otherProps}
    >
      {children}
    </Tooltip>
  )
})

SidebarNavSectionItemTooltipRoot.displayName = "SidebarNavSectionItemTooltipRoot"

SidebarNavSectionItemTooltipRoot.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

const SidebarNavSectionItemTooltipArrow = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  if (!isCollapsed) {
    return null
  }

  return (
    <TooltipArrow
      ref={ref}
      className={cn(className)}
      {...otherProps}
    />
  )
})

SidebarNavSectionItemTooltipArrow.displayName = "SidebarNavSectionItemTooltipArrow"

SidebarNavSectionItemTooltipArrow.propTypes = {
  className: PropTypes.string
}

const SidebarNavSectionItemTooltipPortal = React.forwardRef((props, ref) => {
  const { className, children, ...otherProps } = props
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  if (!isCollapsed) {
    return children
  }

  return (
    <TooltipPortal
      ref={ref}
      className={cn(className)}
      {...otherProps}
    >
      {children}
    </TooltipPortal>
  )
})

SidebarNavSectionItemTooltipPortal.displayName = "SidebarNavSectionItemTooltipPortal"

SidebarNavSectionItemTooltipPortal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
  SidebarToggle,
  SidebarSearch,
  SidebarNav,
  SidebarNavItem,
  SidebarNavSection,
  SidebarNavSectionSeparator,
  SidebarNavSectionTitle,
  SidebarNavSectionContent,
  SidebarNavSectionItem,
  SidebarNavSectionItemSkeleton,
  SidebarNavSectionItemIcon,
  SidebarNavSectionItemText,
  SidebarNavSectionItemActiveIndicator,
  SidebarNavSectionItemTooltip,
  SidebarNavSectionItemTooltipTrigger,
  SidebarNavSectionItemTooltipContent,
  SidebarNavSectionItemTooltipProvider,
  SidebarNavSectionItemTooltipRoot,
  SidebarNavSectionItemTooltipArrow,
  SidebarNavSectionItemTooltipPortal,
}
