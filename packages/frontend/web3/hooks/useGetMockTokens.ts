import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount, usePublicClient } from "wagmi";

import { usePendingTransaction } from "@/web3/PendingTransactionsProvider/PendingTransactionsProvider";
import { useContracts } from "@/web3/WagmiContractsProvider";

export function useGetMockTokens() {
  const contracts = useContracts();
  const account = useAccount();
  const queryClient = useQueryClient();
  const pendingTx = usePendingTransaction();
  const publicClient = usePublicClient();

  return useMutation({
    mutationFn: async () => {
      if (!account.address) {
        pendingTx.noAccount();
        return;
      }

      pendingTx.awaitingInput({
        title: "Minting mock tokens",
        description: "Please confirm the mint transaction",
      });

      const [txHash] = await contracts.MockUSDC().mint();

      pendingTx.pending();

      await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });

      pendingTx.success({
        description: "Success! Now go design some socks 🧦",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      console.error(err);

      pendingTx.error({
        description: "Transaction failed, please try again.",
      });
    },
  });
}
