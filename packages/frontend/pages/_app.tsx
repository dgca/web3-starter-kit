import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import { Web3Provider } from "@/web3/Web3Provider/Web3Provider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </ThemeProvider>
  );
}

export default MyApp;
