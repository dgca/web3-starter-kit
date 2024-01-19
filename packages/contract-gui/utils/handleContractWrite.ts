import { Abi, AbiFunction } from "abitype";
import { Account, PublicClient, WalletClient, stringify } from "viem";

import { assertAddress } from "./abiUtils";

export async function handleContractWrite({
  publicClient,
  walletClient,
  account,
  address,
  abi,
  fn,
  args,
  simulate = false,
}: {
  publicClient: PublicClient;
  walletClient?: WalletClient | null;
  account: Account;
  address: string;
  abi: Abi;
  fn: AbiFunction;
  args: unknown[] | undefined;
  simulate?: boolean;
}): Promise<{
  status: "success" | "error";
  result: {
    txHash: string | null;
    data: string;
  };
}> {
  try {
    if (!walletClient) {
      throw new Error(
        "Wallet client not provided. Please connect your wallet.",
      );
    }

    assertAddress(address);

    const formattedArgs = fn.inputs.map((input, i) => {
      if (!args) {
        throw new Error("No args provided");
      }
      if (input.type === "tuple" || input.type.endsWith("[]")) {
        return JSON.parse(args[i] as string);
      }
      return args[i];
    });

    const { request, result } = await publicClient.simulateContract({
      account,
      address,
      abi,
      functionName: fn.name,
      args: formattedArgs.length ? formattedArgs : undefined,
    });

    if (simulate) {
      return {
        status: "success",
        result: {
          txHash: null,
          data: stringify(result),
        },
      };
    }

    const txHash = await walletClient.writeContract(request);
    return {
      status: "success",
      result: {
        txHash,
        data: stringify(result),
      },
    };
  } catch (err) {
    return {
      status: "error",
      result: {
        txHash: null,
        data: err instanceof Error ? err.message : String(err),
      },
    };
  }
}
