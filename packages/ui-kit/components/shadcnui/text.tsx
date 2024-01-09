import { ElementType, ReactNode } from "react";

import { cn } from "ui-utils";

type BaseProps = {
  children: ReactNode;
  className?: string;
};

type PolymorphicComponentProps = BaseProps & {
  as?: ElementType;
};

function H1({
  as: Component = "h1",
  children,
  className,
}: PolymorphicComponentProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className,
      )}
    >
      {children}
    </Component>
  );
}

function H2({
  as: Component = "h2",
  children,
  className,
}: PolymorphicComponentProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
    >
      {children}
    </Component>
  );
}

function H3({
  as: Component = "h3",
  children,
  className,
}: PolymorphicComponentProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </Component>
  );
}

function H4({
  as: Component = "h4",
  children,
  className,
}: PolymorphicComponentProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
    >
      {children}
    </Component>
  );
}

function P({
  as: Component = "p",
  children,
  className,
}: PolymorphicComponentProps) {
  return (
    <Component
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
    >
      {children}
    </Component>
  );
}

function Blockquote({
  as: Component = "blockquote",
  children,
  className,
}: PolymorphicComponentProps) {
  return (
    <Component className={cn("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </Component>
  );
}

function List({ children, className }: BaseProps) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
      {children}
    </ul>
  );
}

function Code({
  as: Component = "code",
  children,
  className,
}: PolymorphicComponentProps) {
  return (
    <Component
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className,
      )}
    >
      {children}
    </Component>
  );
}

function Lead({
  as: Component = "p",
  children,
  className,
}: PolymorphicComponentProps) {
  return (
    <Component className={cn("text-xl text-muted-foreground", className)}>
      {children}
    </Component>
  );
}

function Large({
  as: Component = "div",
  children,
  className,
}: PolymorphicComponentProps) {
  return (
    <Component className={cn("text-lg font-semibold", className)}>
      {children}
    </Component>
  );
}

function Small({
  as: Component = "small",
  children,
  className,
}: PolymorphicComponentProps) {
  return (
    <Component className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </Component>
  );
}

function Muted({
  as: Component = "p",
  children,
  className,
}: PolymorphicComponentProps) {
  return (
    <Component className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </Component>
  );
}

export const Text = {
  H1,
  H2,
  H3,
  H4,
  P,
  Blockquote,
  List,
  Code,
  Lead,
  Large,
  Small,
  Muted,
};
