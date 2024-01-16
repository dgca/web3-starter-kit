import "@rainbow-me/rainbowkit/styles.css";
import "ui-kit/dist/index.css";
import "../styles/globals.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";

import { ThemeProvider } from "../components/ThemeProvider/ThemeProvider";
import { useWeb3Config } from "../lib/web3config";

export default function MyApp({ Component, pageProps }: AppProps) {
  const { chains, wagmiConfig } = useWeb3Config();

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
