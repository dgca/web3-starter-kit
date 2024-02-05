import { configureChains } from "wagmi";
import { baseSepolia, base, hardhat } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { getEnv } from "@/utils/getEnv";

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? "";

function getConfiguredChains() {
  const env = getEnv();

  if (env === "development") {
    return configureChains([hardhat], [publicProvider()]);
  }

  return configureChains(
    [env === "testnet" ? baseSepolia : base],
    [
      alchemyProvider({
        apiKey: ALCHEMY_API_KEY,
      }),
    ],
  );
}

export const { chains, publicClient, webSocketPublicClient } =
  getConfiguredChains();

export function getPublicClient() {
  const env = getEnv();

  const chainId = {
    development: hardhat.id,
    testnet: baseSepolia.id,
    mainnet: base.id,
  }[env];

  return publicClient({
    chainId: chainId,
  });
}
