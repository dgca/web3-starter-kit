import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";
import { createConfig, WagmiConfig } from "wagmi";

import { chains, publicClient, webSocketPublicClient } from "@/web3/chains";
import { WagmiContractsProvider } from "@/web3/WagmiContractsProvider";

const { connectors } = getDefaultWallets({
  appName: "Web3 Starter Kit",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <WagmiContractsProvider>{children}</WagmiContractsProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
