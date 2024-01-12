import { AbiFunction, AbiType } from "abitype";
import { useEffect, useMemo, useState } from "react";

import { Input, Label, Switch } from "ui-kit";

export function useFunctionInputs(fn: AbiFunction) {
  const [args, setArgs] = useState<unknown[]>(() =>
    Array.from({ length: fn.inputs.length }).map(() => null),
  );

  useEffect(() => {
    setArgs(Array.from({ length: fn.inputs.length }).map(() => null));
  }, [fn]);

  const inputElements = useMemo(() => {
    if (fn.inputs.length === 0) return null;

    return (
      <div className="grid gap-4">
        {fn.inputs.map((input, i) => {
          return (
            <div className="flex flex-col w-full items-start gap-2" key={i}>
              <Label>
                {input.type}: {input.name || "unnamed"}
              </Label>
              <FunctionInput
                type={input.type as AbiType}
                value={args[i]}
                onChange={(value) => {
                  console.log(value);
                  // const newArgs = [...args];
                  // newArgs[i] = value;
                  // setArgs(newArgs);
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }, [args, fn.inputs]);

  return { args, inputElements } as const;
}

type Props = {
  type: AbiType;
  value: unknown;
  onChange: (value: unknown) => void;
};

function FunctionInput({ type, value, onChange }: Props) {
  console.log(type);
  if (type === "bool") {
    return <Switch onChange={(value) => onChange(value)} />;
  }
  return <Input className="w-full" onChange={(value) => onChange(value)} />;
}
