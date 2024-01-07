import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      // Change this to "paris" if your target chain does not support PUSH0
      evmVersion: "shanghai",
    },
  },
  paths: {
    sources: "./src",
  },
};

export default config;
