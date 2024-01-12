import { Abi, AbiFunction, AbiType } from "abitype";
import { useState } from "react";
import { usePublicClient } from "wagmi";

import {
  Button,
  Label,
  Text,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "ui-kit";
import { cn } from "ui-utils";

import { handleContractRead } from "../../utils/handleContractRead";
import { useFunctionInputs } from "../FunctionInput/FunctionInput";

export function ReadFunctionCard({
  fn,
  contractAddress,
  contractAbi,
}: {
  fn: AbiFunction;
  contractAddress: string;
  contractAbi: Abi;
}) {
  const [output, setOutput] = useState<{
    status: "success" | "error";
    result: string;
  } | null>(null);
  const publicClient = usePublicClient();

  const { args, inputElements } = useFunctionInputs(fn);
  console.log(args);

  return (
    <Card key={fn.name}>
      <CardHeader>
        <CardTitle>{fn.name}</CardTitle>
        <CardDescription>
          stateMutability: {fn.stateMutability}
          <br />
          returns: {fn.outputs.map((output) => output.type).join(", ")}
        </CardDescription>
      </CardHeader>
      {inputElements && (
        <CardContent>
          <Text.P className="mb-2">Inputs:</Text.P>
          {inputElements}
        </CardContent>
      )}
      <CardContent>
        <Text.P className="mb-2">Output:</Text.P>
        {output === null ? (
          <Text.Muted>—</Text.Muted>
        ) : (
          <div
            className={cn(
              "flex w-100 flex-col gap-2 rounded-lg px-3 py-2 text-sm whitespace-pre",
              {
                "bg-muted": output.status === "success",
                "bg-destructive": output.status === "error",
                "text-destructive-foreground": output.status === "error",
              },
            )}
          >
            {output.result}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          className={cn("mr-2", "mb-2")}
          onClick={async () => {
            const data = await handleContractRead({
              publicClient,
              address: contractAddress,
              abi: contractAbi,
              functionName: fn.name,
            });
            setOutput(data);
          }}
        >
          Read
        </Button>
      </CardFooter>
    </Card>
  );
}
