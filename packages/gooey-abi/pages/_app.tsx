import "@rainbow-me/rainbowkit/styles.css";
import "ui-kit/dist/index.css";
import "../styles/globals.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { hardhat, base, baseGoerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

import { ThemeProvider } from "../components/ThemeProvider/ThemeProvider";

function configureChainsByEnvironment() {
  if (process.env.NEXT_PUBLIC_ENV === "local") {
    return configureChains([hardhat], [publicProvider()]);
  }

  if (process.env.NEXT_PUBLIC_ENV === "testnet") {
    return configureChains([baseGoerli], [publicProvider()]);
  }

  if (process.env.NEXT_PUBLIC_ENV === "mainnet") {
    return configureChains([base], [publicProvider()]);
  }

  throw new Error("Invalid NEXT_PUBLIC_ENV");
}

const { chains, publicClient, webSocketPublicClient } =
  configureChainsByEnvironment();

const { connectors } = getDefaultWallets({
  appName: "Contracts GUI",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default MyApp;
