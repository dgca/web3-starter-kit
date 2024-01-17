import "@rainbow-me/rainbowkit/styles.css";
import "ui-kit/dist/index.css";
import "../styles/globals.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";

import { ThemeProvider } from "../components/ThemeProvider/ThemeProvider";
import { useWeb3Config, ChainConfig } from "../lib/web3config";

type Props = AppProps & {
  walletConnectId: string;
  chainConfig: ChainConfig;
};

export default function App({
  Component,
  pageProps,
  walletConnectId,
  chainConfig,
}: Props) {
  const { chains, wagmiConfig } = useWeb3Config({
    walletConnectId,
    chainConfig,
  });

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {chains && wagmiConfig && (
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      )}
    </ThemeProvider>
  );
}

App.getInitialProps = async () => {
  const walletConnectId = process.env.CONTRACT_GUI_WALLETCONNECT_ID || "";
  const chainConfig = JSON.parse(process.env.CONTRACT_GUI_CHAINS || "{}");

  return {
    walletConnectId,
    chainConfig,
  };
};
