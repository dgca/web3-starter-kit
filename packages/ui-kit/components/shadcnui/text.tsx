import { ElementType } from "react";

type PolymorphicComponentProps = {
  as?: ElementType;
  children: React.ReactNode;
};

type Props = {
  children: React.ReactNode;
};

function H1({ as: Component = "h1", children }: PolymorphicComponentProps) {
  return (
    <Component className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </Component>
  );
}

function H2({ as: Component = "h2", children }: PolymorphicComponentProps) {
  return (
    <Component className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </Component>
  );
}

function H3({ as: Component = "h3", children }: PolymorphicComponentProps) {
  return (
    <Component className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </Component>
  );
}

function H4({ as: Component = "h4", children }: PolymorphicComponentProps) {
  return (
    <Component className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </Component>
  );
}

function P({ as: Component = "p", children }: PolymorphicComponentProps) {
  return (
    <Component className="leading-7 [&:not(:first-child)]:mt-6">
      {children}
    </Component>
  );
}

function Blockquote({
  as: Component = "blockquote",
  children,
}: PolymorphicComponentProps) {
  return (
    <Component className="mt-6 border-l-2 pl-6 italic">{children}</Component>
  );
}

function List({ children }: Props) {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>;
}

function Code({ as: Component = "code", children }: PolymorphicComponentProps) {
  return (
    <Component className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </Component>
  );
}

function Lead({ as: Component = "p", children }: PolymorphicComponentProps) {
  return (
    <Component className="text-xl text-muted-foreground">{children}</Component>
  );
}

function Large({ as: Component = "div", children }: PolymorphicComponentProps) {
  return <Component className="text-lg font-semibold">{children}</Component>;
}

function Small({
  as: Component = "small",
  children,
}: PolymorphicComponentProps) {
  return (
    <Component className="text-sm font-medium leading-none">
      {children}
    </Component>
  );
}

function Muted({ as: Component = "p", children }: PolymorphicComponentProps) {
  return (
    <Component className="text-sm text-muted-foreground">{children}</Component>
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
