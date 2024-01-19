import { ReactNode } from "react";

import { cn } from "ui-utils";

type Props = {
  children: ReactNode;
  status: "success" | "error";
};

export function OutputRenderer({ children, status }: Props) {
  return (
    <div
      className={cn(
        "flex w-100 flex-col gap-2 rounded-lg px-3 py-2 text-sm whitespace-pre overflow-auto",
        {
          "bg-muted": status === "success",
          "bg-destructive text-destructive-foreground": status === "error",
        },
      )}
    >
      {children}
    </div>
  );
}
