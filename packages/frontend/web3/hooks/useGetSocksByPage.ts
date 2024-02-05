import { useQuery } from "@tanstack/react-query";
import { zeroAddress } from "viem";

import { useContracts } from "@/web3/WagmiContractsProvider";

export function useGetSocksByPage(page: number, pageSize: number) {
  const contracts = useContracts();

  return useQuery({
    queryFn: async () => {
      const start = (page - 1) * pageSize + 1;

      const socks = await contracts
        .BlockSocksDesigns()
        .getSocksFromIndex(BigInt(start), BigInt(pageSize));

      const totalSocks = await contracts.BlockSocksNFT().totalSupply();

      const pages = Math.ceil(Number(totalSocks) / pageSize);

      return {
        socks: socks
          .filter((item) => {
            return item.artist !== zeroAddress;
          })
          .map((sock, i) => ({
            ...sock,
            tokenId: Number(BigInt(start)) + i,
          })),
        totalSupply: Number(totalSocks),
        pages,
      };
    },
    queryKey: ["useGetSocksByPage", page, pageSize],
  });
}
