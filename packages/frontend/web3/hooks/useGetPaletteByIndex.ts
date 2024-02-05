import { useQuery } from "@tanstack/react-query";

import { useContracts } from "@/web3/WagmiContractsProvider";

export function useGetPaletteByIndex(index: bigint) {
  const contracts = useContracts();

  return useQuery({
    queryFn: async () => {
      return contracts.BlockSocksDesigns().getPaletteByIndex(BigInt(index));
    },
    queryKey: ["useGetPaletteByIndex", index.toString()],
  });
}
