import { Abi, Address } from "abitype";
import type { Simplify } from "type-fest";
import { useReadContract, useSimulateContract } from "wagmi";

import { WagmiArgs, AbiFunctionTypes, HandlersMap } from "./types";

export function createAbiMethodHandlers<TAbi extends Abi>(
  { publicClient, walletClient, account }: WagmiArgs,
  abi: TAbi,
  address: Address,
) {
  const functionDefinitions = abi.filter(
    (item): item is AbiFunctionTypes<TAbi> => item.type === "function",
  );

  const handlers: {
    [key: string]: unknown;
  } = {};

  for (const func of functionDefinitions) {
    const isReadOnlyFunction =
      func.stateMutability === "view" || func.stateMutability === "pure";

    if (isReadOnlyFunction) {
      handlers[func.name] = async (...args: unknown[]) => {
        return publicClient!.readContract({
          address,
          abi,
          functionName: func.name,
          args,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (handlers[func.name] as any).useRead = (args: any) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useReadContract({
          abi,
          address,
          functionName: func.name,
          ...args,
        });
      };
    }

    if (!isReadOnlyFunction) {
      handlers[func.name] = async (...args: unknown[]) => {
        const { request, result } = await publicClient!.simulateContract({
          abi,
          address,
          functionName: func.name,
          account: account.address,
          args,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        const hash = await walletClient.data?.writeContract(request);
        return [hash, result];
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (handlers[func.name] as any).useSimulateContract = (
        args?: Record<string, unknown>,
      ) => {
        // @ts-expect-error @todo: Fix this type error to make functionName more explicit
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useSimulateContract({
          abi: abi,
          address: address,
          functionName: func.name,
          ...args,
        });
      };
    }
  }

  return handlers as Simplify<HandlersMap<TAbi>>;
}
