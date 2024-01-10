import { Abi, AbiFunction } from "abitype";
import { useMemo, useState } from "react";

import {
  Button,
  Text,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "ui-kit";

import { isReadFunction } from "../../utils/abiUtils";
import { ReadFunctionCard } from "../FunctionCards/ReadFunctionCard";
import { WriteFunctionCard } from "../FunctionCards/WriteFunctionCard";

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

      if (isReadFunction(item)) {
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
    <div className="container lg:max-w-5xl mx-auto grid gap-8 p-8 pb-48">
      <div>
        <div className="flex flex-col items-start gap-2">
          <Text.H4>Contract:</Text.H4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
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
              <ReadFunctionCard
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
            {writeFunctions.map((fn) => (
              <WriteFunctionCard
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
