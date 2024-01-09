import { Abi, AbiFunction, Address } from "abitype";
import { useMemo, useState } from "react";
import { usePublicClient } from "wagmi";

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
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "ui-kit";
import { cn } from "ui-utils";

type Contract = {
  abi: Abi;
  address?: string;
};

type Props = {
  contracts: {
    [key: string]: Contract;
  };
};

function useContractsArray(contracts: Props["contracts"]) {
  const asArray = useMemo(() => {
    return Object.entries(contracts).map(([name, contract]) => ({
      name,
      ...contract,
    }));
  }, [contracts]);

  return asArray;
}

function useContractFunctions(contract: Contract) {
  const functions = useMemo(() => {
    const writeFunctions: AbiFunction[] = [];
    const readFunctions: AbiFunction[] = [];

    for (const item of contract.abi) {
      if (item.type !== "function") {
        continue;
      }

      if (item.stateMutability === "view" || item.stateMutability === "pure") {
        readFunctions.push(item);
      } else {
        writeFunctions.push(item);
      }
    }

    return [writeFunctions, readFunctions];
  }, [contract]);

  return functions;
}

export function ContractGUI({ contracts }: Props) {
  const contractsArray = useContractsArray(contracts);
  const [activeContract, setActiveContract] = useState(contractsArray[0]);
  const [writeFunctions, readFunctions] = useContractFunctions(activeContract);

  return (
    <div className="container lg:max-w-5xl mx-auto grid gap-8 p-8">
      <div>
        <div className="flex flex-col items-start gap-2">
          <Text.H4>Contract:</Text.H4>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" size="lg">
                {activeContract.name}.sol
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {contractsArray.map((contract) => (
                <DropdownMenuItem
                  key={contract.name}
                  onSelect={() => setActiveContract(contract)}
                >
                  <DropdownMenuLabel>{contract.name}.sol</DropdownMenuLabel>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {readFunctions.length > 0 && (
        <div>
          <Text.H4 className="mb-4">Read functions:</Text.H4>
          <div className="grid w-full gap-4">
            {readFunctions.map((fn) => (
              <FunctionCard
                key={fn.name}
                fn={fn}
                contractAddress={activeContract.address ?? ""}
                contractAbi={activeContract.abi}
              />
            ))}
          </div>
        </div>
      )}
      {writeFunctions.length > 0 && (
        <div>
          <Text.H4 className="mb-4">Write functions:</Text.H4>
          <div className="grid w-full gap-4">
            {readFunctions.map((fn) => (
              <FunctionCard
                key={fn.name}
                fn={fn}
                contractAddress={activeContract.address ?? ""}
                contractAbi={activeContract.abi}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FunctionCard({
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
    data: string;
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
        </CardContent>
      )}
      <CardContent>
        <Text.P className="mb-2">Output:</Text.P>
        {output === null ? (
          <Text.Muted>—</Text.Muted>
        ) : (
          <div
            className={cn(
              "flex w-100 flex-col gap-2 rounded-lg px-3 py-2 text-sm",
              {
                "bg-muted": output.status === "success",
                "bg-destructive": output.status === "error",
                "text-destructive-foreground": output.status === "error",
                "whitespace-pre": output.status === "error",
              },
            )}
          >
            {output.data}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          className={cn("mr-2", "mb-2")}
          onClick={async () => {
            try {
              const result = await publicClient.readContract({
                address: contractAddress as Address,
                abi: contractAbi,
                functionName: fn.name,
              });
              setOutput({
                status: "success",
                data:
                  typeof result === "string"
                    ? result
                    : JSON.stringify(result, null, 2),
              });
            } catch (err) {
              setOutput({
                status: "error",
                data: err instanceof Error ? err.message : String(err),
              });
            }
          }}
        >
          Call
        </Button>
      </CardFooter>
    </Card>
  );
}
