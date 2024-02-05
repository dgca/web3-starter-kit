import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { useContracts } from "@/web3/WagmiContractsProvider";

export function useTokenBalance() {
  const contracts = useContracts();
  const account = useAccount();

  return useQuery({
    queryFn: async () => {
      if (!account.address) return null;

      return contracts.MockUSDC().balanceOf(account.address);
    },
    queryKey: ["useTokenBalance", account.address],
  });
}
