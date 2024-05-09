import { createPublicClient } from "viem";
import { http } from "wagmi";
import { baseSepolia, base, hardhat } from "wagmi/chains";

import { getEnv } from "@/utils/getEnv";

const ALCHEMY_HTTP_URL = process.env.NEXT_PUBLIC_ALCHEMY_HTTP_URL ?? "";

export function getChainsAndTransports(): {
  chains:
    | readonly [typeof baseSepolia]
    | readonly [typeof base]
    | readonly [typeof hardhat];
  transports: {
    [key: string]: ReturnType<typeof http>;
  };
} {
  const env = getEnv();

  if (env === "development") {
    return {
      chains: [hardhat],
      transports: {
        [hardhat.id]: http(),
      },
    } as const;
  }

  if (env === "testnet") {
    return {
      chains: [baseSepolia],
      transports: {
        [baseSepolia.id]: http(ALCHEMY_HTTP_URL),
      },
    } as const;
  }

  return {
    chains: [base],
    transports: {
      [base.id]: http(ALCHEMY_HTTP_URL),
    },
  } as const;
}

export function getPublicClient() {
  const { chains, transports } = getChainsAndTransports();

  const chain = chains.at(0);

  if (!chain) throw new Error("Chain not found");

  return createPublicClient({
    chain: chain,
    transport: transports[chain.id],
  });
}
