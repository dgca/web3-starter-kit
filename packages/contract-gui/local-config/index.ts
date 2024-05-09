import { TodoList, TestSolidityTypes, contractAddresses } from "contracts";

const contracts = {
  TodoList: {
    abi: TodoList,
    address: contractAddresses.localhost.TodoList,
  },
  TestSolidityTypes: {
    abi: TestSolidityTypes,
    address: contractAddresses.localhost.TestSolidityTypes,
  },
};

const config = {
  contracts,
  chains: {
    hardhat: true,
    baseSepolia:
      "https://base-sepolia.g.alchemy.com/v2/jQHi5fdn31Y_CEw6l2Tf27oF4QZGU-_P",
    polygonMumbai: true,
  },
  walletConnectId: "6aa783ad4de9a655f4e4537ef6b909c6",
};

export default config;
