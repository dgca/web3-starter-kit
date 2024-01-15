import { AbiFunction, AbiType } from "abitype";
import { useEffect, useMemo, useState } from "react";

import { Input, Label, Switch, Text, Textarea } from "ui-kit";

function assertString(arg: unknown): asserts arg is string {
  if (typeof arg !== "string") {
    throw new Error("Expected string");
  }
}

function getInitialArgs(fn: AbiFunction) {
  return fn.inputs.map((input) => {
    if (input.type.endsWith("[]")) {
      if (input.type.startsWith("bool")) {
        return "[false]";
      }

      if (input.type.startsWith("uint") || input.type.startsWith("int")) {
        return "[0]";
      }

      if (input.internalType?.startsWith("struct")) {
        return "[{}]";
      }

      return "[]";
    }

    if (input.type === "bool") {
      return false;
    }

    if (input.type.startsWith("uint") || input.type.startsWith("int")) {
      return "0";
    }

    if (input.internalType?.startsWith("struct")) {
      return "{}";
    }

    return "";
  });
}

function makeTypeLabel(type: string, internalType?: string) {
  if (internalType && type !== internalType) {
    return `${internalType} (${type})`;
  }
  return type;
}

export function useFunctionInputs(fn: AbiFunction) {
  const [args, setArgs] = useState<unknown[]>(() => getInitialArgs(fn));

  useEffect(() => {
    setArgs(getInitialArgs(fn));
  }, [fn]);

  const inputElements = useMemo(() => {
    if (fn.inputs.length === 0) return null;

    return (
      <div className="grid gap-4">
        {fn.inputs.map((input, i) => {
          return (
            <div className="flex flex-col w-full items-start gap-2" key={i}>
              <Label>
                {makeTypeLabel(input.type, input.internalType)}:{" "}
                {input.name || "unnamed"}
              </Label>
              <FunctionInput
                type={input.type as AbiType}
                value={args[i]}
                onChange={(value) => {
                  const newArgs = [...args];
                  newArgs[i] = value;
                  setArgs(newArgs);
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }, [args, fn.inputs]);

  return { args: args.length > 0 ? args : undefined, inputElements } as const;
}

type Props = {
  type: AbiType;
  value: unknown;
  onChange: (value: unknown) => void;
};

function FunctionInput({ type, value, onChange }: Props) {
  if (type === "bool") {
    return (
      <div className="flex items-center gap-2">
        <Text.Small>False</Text.Small>{" "}
        <Switch onCheckedChange={(value) => onChange(value)} />{" "}
        <Text.Small>True</Text.Small>
      </div>
    );
  }

  assertString(value);

  if (type === "tuple") {
    return (
      <Textarea
        className="whitespace-pre font-mono"
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <Input
      value={value}
      className="w-full"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
