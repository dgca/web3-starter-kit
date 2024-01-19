import { Abi, AbiFunction } from "abitype";
import { useState } from "react";
import { Account } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

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

import { handleContractWrite } from "../../utils/handleContractWrite";
import { useFunctionInputs } from "../FunctionInput/FunctionInput";
import { OutputRenderer } from "../OutputRenderer/OutputRenderer";

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
            {output.status === "success" && (
              <>
                txHash: {output.result.txHash ?? "—"}
                <br />
                <br />
              </>
            )}
            {output.result.data ?? "—"}
          </OutputRenderer>
        )}
      </CardContent>

      <CardFooter>
        <Button
          className={cn("mr-2", "mb-2")}
          onClick={async () => {
            const data = await handleContractWrite({
              publicClient,
              walletClient,
              account: account as unknown as Account,
              address: contractAddress,
              abi: contractAbi,
              fn,
              args,
            });
            setOutput(data);
          }}
        >
          Write
        </Button>
        <Button
          className={cn("mr-2", "mb-2")}
          onClick={async () => {
            const data = await handleContractWrite({
              publicClient,
              walletClient,
              account: account as unknown as Account,
              address: contractAddress,
              abi: contractAbi,
              fn,
              args,
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
