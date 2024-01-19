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
import { OutputRenderer } from "../OutputRenderer/OutputRenderer";

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
    <Card key={fn.name} className="min-w-0">
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
        {output !== null && (
          <OutputRenderer status={output.status}>
            {output.result}
          </OutputRenderer>
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
