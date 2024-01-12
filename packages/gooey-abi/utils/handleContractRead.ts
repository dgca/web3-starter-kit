import { Abi, AbiFunction } from "abitype";
import { PublicClient, stringify } from "viem";

import { assertAddress } from "./abiUtils";

export async function handleContractRead({
  publicClient,
  address,
  abi,
  fn,
  args,
}: {
  publicClient: PublicClient;
  address: string;
  abi: Abi;
  fn: AbiFunction;
  args: unknown[] | undefined;
}): Promise<{
  status: "success" | "error";
  result: string;
}> {
  try {
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

    const result = await publicClient.readContract({
      address,
      abi,
      functionName: fn.name,
      args: formattedArgs.length ? formattedArgs : undefined,
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
