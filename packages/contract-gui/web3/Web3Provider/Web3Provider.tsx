import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";

import { getChainsAndTransports } from "@/web3/chains";
import { WagmiContractsProvider } from "@/web3/WagmiContractsProvider";

const { chains, transports } = getChainsAndTransports();

const config = getDefaultConfig({
  appName: "Frontend Client",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? "",
  chains,
  transports,
  ssr: true,
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider>
        <WagmiContractsProvider>{children}</WagmiContractsProvider>
      </RainbowKitProvider>
    </WagmiProvider>
  );
}
