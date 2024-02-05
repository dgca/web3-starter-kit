import { useMutation } from "@tanstack/react-query";
import { useAccount, usePublicClient, useQueryClient } from "wagmi";

import { constants } from "@/web3/constants";
import { getContractAddresses } from "@/web3/getContractAddresses";
import { usePendingTransaction } from "@/web3/PendingTransactionsProvider/PendingTransactionsProvider";
import { useContracts } from "@/web3/WagmiContractsProvider";

const contractAddresses = getContractAddresses();

export function useMintSockDesign() {
  const account = useAccount();
  const contracts = useContracts();
  const publicClient = usePublicClient();
  const queryClient = useQueryClient();
  const pendingTx = usePendingTransaction();

  return useMutation({
    mutationFn: async (pattern: number[]) => {
      if (!account.address) {
        pendingTx.noAccount();
        return;
      }

      pendingTx.awaitingInput({
        title: "Approve allowance",
        description:
          "Please approve the allowance spend and wait for the transaction to confirm.",
      });

      const [approveSpendHash] = await contracts
        .MockUSDC()
        .approve(contractAddresses.BlockSocksNFT, constants.SOCK_MINT_PRICE);

      pendingTx.pending();

      const approveSpendReceipt = await publicClient.waitForTransactionReceipt({
        hash: approveSpendHash,
      });

      console.log({ approveSpendReceipt, approveSpendHash });

      pendingTx.awaitingInput({
        title: "Confirm mint",
        description: `Please confirm the mint transaction.`,
      });

      const [mintDesignHash] = await contracts.BlockSocksNFT().mint(pattern);

      pendingTx.pending({
        title: "Minting",
        description: `We're minting your design. Please wait for the transaction to finish.`,
      });

      await publicClient.waitForTransactionReceipt({
        hash: mintDesignHash,
      });

      pendingTx.success({
        title: "Mint success",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      console.error(err);

      pendingTx.error({
        description: "Something went wrong, please try again.",
      });
    },
  });
}
