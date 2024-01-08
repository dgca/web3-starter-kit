import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Abi } from "abitype";

import { Button, Text } from "ui-kit";
import { cn } from "ui-utils";

type Props = {
  contractAbis: {
    [key: string]: Abi;
  };
};

export function ContractGUI({ contractAbis }: Props) {
  return (
    <>
      <nav className="flex justify-between items-center border-b py-2 px-4">
        <Text.H4 as="div">Contract GUI</Text.H4>
        <ConnectButton />
      </nav>
      <p>Hello world</p>
      <Button>Click me</Button>
    </>
  );
}
