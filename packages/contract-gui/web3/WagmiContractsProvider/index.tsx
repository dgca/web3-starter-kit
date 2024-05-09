import { initUseWagmiContracts } from "@type_of/use-wagmi-contracts";
import { abis } from "contracts";

import { getContractAddresses } from "../getContractAddresses";

const contractAddresses = getContractAddresses();

const { WagmiContractsProvider, useContracts } = initUseWagmiContracts({
  TodoList: {
    abi: abis.TodoList,
    defaultAddress: contractAddresses.TodoList,
  },
  TestSolidityTypes: {
    abi: abis.TestSolidityTypes,
    defaultAddress: contractAddresses.TestSolidityTypes,
  },
});

export { WagmiContractsProvider, useContracts };
