import { useMemo, useState } from "react";
import {
  useAccount,
  useMutation,
  usePublicClient,
  useQueryClient,
  useSignTypedData,
} from "wagmi";

import { delay } from "@/utils/delay";
import { getTypedOrderData } from "@/utils/getTypedOrderData";
import { type GootenOrderSchema } from "@/utils/submitGootenOrder";
import { constants } from "@/web3/constants";
import { getContractAddresses } from "@/web3/getContractAddresses";
import { useContracts } from "@/web3/WagmiContractsProvider";

type Steps =
  | "Approve"
  | "ApprovePending"
  | "ApproveSubmitting"
  | "Mint"
  | "MintPending"
  | "MintSubmitting"
  | "Ship"
  | "Success"
  | "Error";

const contractAddresses = getContractAddresses();

export function useBuySocksFlow(sockId: number) {
  const [step, setStep] = useState<Steps>("Approve");
  const [error, setError] = useState<string | null>(null);

  const contracts = useContracts();
  const account = useAccount();
  const publicClient = usePublicClient();
  const queryClient = useQueryClient();
  const typedData = useMemo(() => {
    return getTypedOrderData(BigInt(sockId));
  }, [sockId]);
  const { signTypedDataAsync } = useSignTypedData(typedData);

  const { mutate: approveSpend } = useMutation({
    mutationFn: async () => {
      if (!account.address) {
        throw new Error("No account connected");
      }

      setStep("ApprovePending");

      const [approveSpendHash] = await contracts
        .MockUSDC()
        .approve(contractAddresses.BlockSocksOrders, constants.SOCK_BUY_PRICE);

      setStep("ApproveSubmitting");

      const approvePromise = publicClient.waitForTransactionReceipt({
        hash: approveSpendHash,
      });

      await Promise.all([approvePromise, delay()]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      setStep("Mint");
    },
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong, please try again.";
      setStep("Error");
      setError(message);
    },
  });

  const { mutate: approveMint } = useMutation({
    mutationFn: async () => {
      if (!account.address) {
        throw new Error("No account connected");
      }

      setStep("MintPending");

      const [approveMintHash] = await contracts
        .BlockSocksOrders()
        .mint(BigInt(sockId));

      setStep("MintSubmitting");

      const approvePromise = publicClient.waitForTransactionReceipt({
        hash: approveMintHash,
      });

      await Promise.all([approvePromise, delay()]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      setStep("Ship");
    },
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong, please try again.";
      setStep("Error");
      setError(message);
    },
  });

  const { mutate: submitOrder } = useMutation({
    mutationFn: async (orderData: GootenOrderSchema) => {
      const signedData = await signTypedDataAsync();
      const apiResponse = await fetch(`/api/submit-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: sockId,
          signedData,
          mailingAddress: orderData,
        }),
      });
      const data = await apiResponse.json();
      console.log({ data });
    },
    onSuccess: () => {
      setStep("Success");
    },
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong, please try again.";
      setStep("Error");
      setError(message);
    },
  });

  return {
    step,
    error,
    approveSpend,
    approveMint,
    submitOrder,
  };
}
