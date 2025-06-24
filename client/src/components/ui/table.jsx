import PropTypes from 'prop-types';
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef(function Table(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...otherProps}
      />
    </div>
  );
});

Table.displayName = "Table";

Table.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const TableHeader = React.forwardRef(function TableHeader(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...otherProps} />
  );
});

TableHeader.displayName = "TableHeader";

TableHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const TableBody = React.forwardRef(function TableBody(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...otherProps}
    />
  );
});

TableBody.displayName = "TableBody";

TableBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const TableFooter = React.forwardRef(function TableFooter(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <tfoot
      ref={ref}
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...otherProps}
    />
  );
});

TableFooter.displayName = "TableFooter";

TableFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const TableRow = React.forwardRef(function TableRow(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...otherProps}
    />
  );
});

TableRow.displayName = "TableRow";

TableRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const TableHead = React.forwardRef(function TableHead(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...otherProps}
    />
  );
});

TableHead.displayName = "TableHead";

TableHead.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  scope: PropTypes.string
};

const TableCell = React.forwardRef(function TableCell(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <td
      ref={ref}
      className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
      {...otherProps}
    />
  );
});

TableCell.displayName = "TableCell";

TableCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

const TableCaption = React.forwardRef(function TableCaption(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <caption
      ref={ref}
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...otherProps}
    />
  );
});

TableCaption.displayName = "TableCaption";

TableCaption.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
