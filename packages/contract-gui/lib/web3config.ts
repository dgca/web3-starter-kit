import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { ChainProviderFn, Config, configureChains, createConfig } from "wagmi";
import * as wagmiChains from "wagmi/chains";
import { Chain } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

type ChainOptions = keyof typeof wagmiChains;
type ChainConfig = Record<ChainOptions, true | string>;

function createJsonRpcProvider(url: string) {
  return jsonRpcProvider({
    rpc: () => ({
      http: url,
    }),
  });
}

async function getConfiguredChains() {
  let chainConfig: ChainConfig;

  if (process.env.NEXT_PUBLIC_USE_LOCAL_CONFIG === "true") {
    chainConfig = (await import("../local-config/index")).default
      .chains as ChainConfig;
  } else {
    chainConfig = JSON.parse(process.env.CONTRACT_GUI_CHAINS ?? "{}");
  }

  const chains: Chain[] = [];
  const providers: ChainProviderFn[] = [];

  Object.entries(chainConfig).forEach(([chain, value]) => {
    // @ts-expect-error @todo: Unable type dynamically defined chains
    // eslint-disable-next-line import/namespace
    chains.push(wagmiChains[chain]);
    const provider =
      value === true ? publicProvider() : createJsonRpcProvider(value);
    providers.push(provider);
  });

  return configureChains(chains, providers);
}

export function useWeb3Config() {
  const [config, setConfig] = useState<{
    chains?: Chain[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    wagmiConfig?: Config<any, any>;
  }>({
    chains: undefined,
    wagmiConfig: undefined,
  });

  useEffect(() => {
    async function handleConfig() {
      const { chains, publicClient, webSocketPublicClient } =
        await getConfiguredChains();

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

      setConfig({
        chains,
        wagmiConfig,
      });
    }

    handleConfig();
  }, []);

  return config;
}
