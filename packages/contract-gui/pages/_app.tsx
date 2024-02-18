import "@rainbow-me/rainbowkit/styles.css";
import "ui-kit/dist/index.css";
import "../styles/globals.css";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { WagmiProvider } from "wagmi";

import { ErrorBoundary } from "../components/ErrorBoundary/ErrorBoundary";
import { ThemeProvider } from "../components/ThemeProvider/ThemeProvider";
import {
  ChainConfig,
  useChainsAndTransports,
  useWeb3Config,
} from "../lib/web3config";

type Props = AppProps & {
  walletConnectId: string;
  chainConfig: ChainConfig;
};

const queryClient = new QueryClient();

function AppContents({
  Component,
  pageProps,
  walletConnectId,
  chainConfig,
}: Props) {
  const config = useWeb3Config({
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
      <QueryClientProvider client={queryClient}>
        {config && (
          <WagmiProvider config={config}>
            <RainbowKitProvider>
              <Component {...pageProps} />
            </RainbowKitProvider>
          </WagmiProvider>
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default function App(props: Props) {
  return (
    <ErrorBoundary>
      <AppContents {...props} />
    </ErrorBoundary>
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
