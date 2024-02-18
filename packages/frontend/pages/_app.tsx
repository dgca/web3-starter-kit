import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import { Web3Provider } from "@/web3/Web3Provider/Web3Provider";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <Web3Provider>
          <Component {...pageProps} />
        </Web3Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default MyApp;
