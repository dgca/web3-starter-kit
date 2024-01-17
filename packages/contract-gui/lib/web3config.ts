import {
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { ChainProviderFn, Config, configureChains, createConfig } from "wagmi";
import * as wagmiChains from "wagmi/chains";
import { Chain } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import { getLocalConfig } from "../utils/getLocalConfig";

type ChainOptions = keyof typeof wagmiChains;
export type ChainConfig = Record<ChainOptions, true | string>;

function createJsonRpcProvider(url: string) {
  return jsonRpcProvider({
    rpc: () => ({
      http: url,
    }),
  });
}

async function getConfiguredChains(chainConfig: ChainConfig) {
  const localConfig = await getLocalConfig();
  const selectedChains: ChainConfig =
    (localConfig?.chains as ChainConfig) || chainConfig;
  const chains: Chain[] = [];
  const providers: ChainProviderFn[] = [];

  Object.entries(selectedChains).forEach(([chain, value]) => {
    // @ts-expect-error @todo: Unable type dynamically defined chains
    // eslint-disable-next-line import/namespace
    chains.push(wagmiChains[chain]);
    const provider =
      value === true ? publicProvider() : createJsonRpcProvider(value);
    providers.push(provider);
  });

  return configureChains(chains, providers);
}

export function useWeb3Config({
  walletConnectId,
  chainConfig,
}: {
  walletConnectId: string;
  chainConfig: ChainConfig;
}) {
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
        await getConfiguredChains(chainConfig);

      const localConfig = await getLocalConfig();
      const projectId = localConfig?.walletConnectId ?? walletConnectId;

      const { wallets } = getDefaultWallets({
        appName: "Contracts GUI",
        projectId,
        chains,
      });

      const connectors = connectorsForWallets([
        {
          groupName: "Popular",
          wallets: projectId
            ? wallets[0].wallets
            : wallets[0].wallets.filter(
                ({ id }) => id !== "walletConnect" && id !== "rainbow",
              ),
        },
      ]);

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
  }, [chainConfig, walletConnectId]);

  return config;
}
