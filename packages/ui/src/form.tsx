import * as React from "react";

// Minimal shadcn-style form primitives (presentational).
// These are intentionally simple so they integrate cleanly with existing `Input`, `Select`, etc.

export function Form({
  children,
  className,
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) {
  return (
    <form className={className} {...props}>
      {children}
    </form>
  );
}

export function FormField({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function FormItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function FormLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <label className={className}>{children}</label>;
}

export function FormControl({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function FormMessage({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  if (!children) return null;
  return <p className={className}>{children}</p>;
}
