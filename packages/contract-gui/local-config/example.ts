const contracts = {
  TodoList: {
    abi: [],
    address: "0x0000000000000000000000000000000000000000",
  },
  Lock: {
    abi: [],
    address: "0x0000000000000000000000000000000000000000",
  },
};

const config = {
  contracts,
  chains: {
    hardhat: true,
    baseSepolia: "https://base-sepolia.g.alchemy.com/v2/KEY_GOES_HERE",
  },
  walletConnectId: "",
};

export default config;
