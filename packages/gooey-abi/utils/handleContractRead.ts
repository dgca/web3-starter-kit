import { Abi } from "abitype";
import { PublicClient, stringify } from "viem";

import { assertAddress } from "./abiUtils";

export async function handleContractRead({
  publicClient,
  address,
  abi,
  functionName,
}: {
  publicClient: PublicClient;
  address: string;
  abi: Abi;
  functionName: string;
}): Promise<{
  status: "success" | "error";
  result: string;
}> {
  try {
    assertAddress(address);
    const result = await publicClient.readContract({
      address,
      abi,
      functionName,
    });
    return {
      status: "success",
      result: stringify(result, null, 2),
    };
  } catch (err) {
    return {
      status: "error",
      result: err instanceof Error ? err.message : String(err),
    };
  }
}
