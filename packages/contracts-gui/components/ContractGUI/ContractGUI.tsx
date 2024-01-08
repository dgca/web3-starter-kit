import { Abi, AbiFunction } from "abitype";
import { useMemo, useState } from "react";

import { Input, Button, Label, Text } from "ui-kit";
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

  console.log(readFunctions);

  return (
    <div>
      {readFunctions.length > 0 && <Text.H3>Read functions:</Text.H3>}
      <div className="mb-4" />
      {readFunctions.map((fn) => (
        <div key={fn.name}>
          <div>
            <Label>{fn.name}</Label>
            <Input />
          </div>
          <Button
            className={cn("mr-2", "mb-2")}
            onClick={() => {
              console.log("clicked");
            }}
          >
            Call
          </Button>
        </div>
      ))}
      <Button>Click me</Button>
    </div>
  );
}
