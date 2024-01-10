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

import { handleContractWrite } from "../../utils/handleContractWrite";

export function WriteFunctionCard({
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
    result: {
      txHash: string | null;
      data: string;
    };
  } | null>(null);
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const account = useAccount();

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
            {output.status === "success" && (
              <>
                txHash: {output.result.txHash ?? "—"}
                <br />
                <br />
              </>
            )}
            {output.result.data}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          className={cn("mr-2", "mb-2")}
          onClick={async () => {
            if (!walletClient) return;
            const data = await handleContractWrite({
              publicClient,
              walletClient,
              account: account as unknown as Account,
              address: contractAddress,
              abi: contractAbi,
              functionName: fn.name,
            });
            setOutput(data);
          }}
        >
          Write
        </Button>
        <Button
          className={cn("mr-2", "mb-2")}
          onClick={async () => {
            if (!walletClient) return;
            const data = await handleContractWrite({
              publicClient,
              walletClient,
              account: account as unknown as Account,
              address: contractAddress,
              abi: contractAbi,
              functionName: fn.name,
              simulate: true,
            });
            setOutput(data);
          }}
        >
          Simulate Write
        </Button>
      </CardFooter>
    </Card>
  );
}
