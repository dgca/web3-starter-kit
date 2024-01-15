import { Abi, AbiFunction } from "abitype";
import { useState } from "react";
import { usePublicClient } from "wagmi";

import {
  Button,
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

  return (
    <Card key={fn.name}>
      <CardHeader>
        <CardTitle>{fn.name}</CardTitle>
        <CardDescription>stateMutability: {fn.stateMutability}</CardDescription>
      </CardHeader>
      <CardContent>
        <Text.P className="mb-2">Inputs:</Text.P>
        {inputElements ?? <Text.Muted>—</Text.Muted>}
      </CardContent>
      <CardContent>
        <div className="mb-2">
          <Text.P className="mb-0">Output:</Text.P>
          <Text.Small className="text-muted-foreground">
            returns:{" "}
            {fn.outputs.length
              ? fn.outputs.map((output) => output.type).join(", ")
              : "—"}
          </Text.Small>
        </div>
        {output === null ? (
          <Text.Muted>—</Text.Muted>
        ) : (
          <>
            <div
              className={cn(
                "flex w-100 flex-col gap-2 rounded-lg px-3 py-2 text-sm whitespace-pre font-mono",
                {
                  "bg-muted": output.status === "success",
                  "bg-destructive": output.status === "error",
                  "text-destructive-foreground": output.status === "error",
                },
              )}
            >
              {output.result}
            </div>
          </>
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
              fn,
              args,
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
