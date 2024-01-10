import { Abi, AbiFunction } from "abitype";
import { useState } from "react";
import { Account } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

import {
  Input,
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
      {fn.inputs.length > 0 && (
        <CardContent>
          <Text.P className="mb-2">Inputs:</Text.P>
          <div className="grid gap-4">
            {fn.inputs.map((input, i) => {
              return (
                <div className="grid w-full items-center gap-2" key={i}>
                  <Label>
                    {input.type}: {input.name || "unnamed"}
                  </Label>
                  <Input />
                </div>
              );
            })}
          </div>
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
