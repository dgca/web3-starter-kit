import { useEffect, useState } from "react";
import { Config, createConfig, http } from "wagmi";
import * as wagmiChains from "wagmi/chains";
import { Chain } from "wagmi/chains";

import { getLocalConfig } from "../utils/getLocalConfig";

type ChainOptions = keyof typeof wagmiChains;
export type ChainConfig = Record<ChainOptions, true | string>;

async function getChainsAndTransports(chainConfig: ChainConfig) {
  const localConfig = await getLocalConfig();
  const selectedChains: ChainConfig =
    (localConfig?.chains as ChainConfig) || chainConfig;

  const chainsAndTransports: {
    chains: Chain[];
    transports: {
      [key: string]: ReturnType<typeof http>;
    };
  } = {
    chains: [],
    transports: {},
  };

  Object.entries(selectedChains).forEach(([chain, value]) => {
    // @ts-expect-error @todo: Unable to type dynamically defined chains
    // eslint-disable-next-line import/namespace
    const wagmiChain = wagmiChains[chain];

    if (!wagmiChain) {
      throw new Error(
        `Unknown chain: "${chain}"

Please ensure chains match the name of the exported wagmi chains.`,
      );
    }

    chainsAndTransports.chains.push(wagmiChain);
    chainsAndTransports.transports[wagmiChain.id] = http(
      value === true ? undefined : value,
    );
  });

  return chainsAndTransports;
}

export function useChainsAndTransports(chainConfig: ChainConfig) {
  const [error, setError] = useState<Error | null>(null);
  const [chainsAndTransports, setChainsAndTransports] = useState<{
    chains?: Chain[];
    transports?: {
      [key: string]: ReturnType<typeof http>;
    };
  }>({
    chains: undefined,
    transports: undefined,
  });

  if (error) {
    throw error;
  }

  useEffect(() => {
    async function handleChainsAndTransports() {
      try {
        const chainsAndTransports = await getChainsAndTransports(chainConfig);
        setChainsAndTransports(chainsAndTransports);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    }

    handleChainsAndTransports();
  }, [chainConfig]);

  return chainsAndTransports;
}

export function useWeb3Config({
  walletConnectId,
  chainConfig,
}: {
  walletConnectId: string;
  chainConfig: ChainConfig;
}) {
  const [config, setConfig] = useState<Config>();

  useEffect(() => {
    async function handleConfig() {
      if (config) return;

      const chainsAndTransports = await getChainsAndTransports(chainConfig);

      if (chainsAndTransports.chains && chainsAndTransports.transports) {
        setConfig(
          createConfig({
            appName: "Frontend Client",
            projectId: walletConnectId,
            // @ts-expect-error Unable to type dynamically defined chains
            chains: chainsAndTransports.chains,
            transports: chainsAndTransports.transports,
            ssr: true,
          }),
        );
      }
    }
    handleConfig();
  }, [chainConfig, walletConnectId, config]);

  return config;
}
