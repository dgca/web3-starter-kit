import { Abi } from "abitype";
import { Account, PublicClient, WalletClient, stringify } from "viem";

import { assertAddress } from "./abiUtils";

export async function handleContractWrite({
  publicClient,
  walletClient,
  account,
  address,
  abi,
  functionName,
  simulate = false,
}: {
  publicClient: PublicClient;
  walletClient: WalletClient;
  account: Account;
  address: string;
  abi: Abi;
  functionName: string;
  simulate?: boolean;
}): Promise<{
  status: "success" | "error";
  result: {
    txHash: string | null;
    data: string;
  };
}> {
  try {
    assertAddress(address);
    const { request, result } = await publicClient.simulateContract({
      account,
      address,
      abi,
      functionName,
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
