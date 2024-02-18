import hre from "hardhat";

import { updateContractAddresses } from "../lib/update-contract-addresses";

async function deployTodoList() {
  const [deployerClient] = await hre.viem.getWalletClients();
  const todoList = await hre.viem.deployContract("TodoList", [
    deployerClient.account.address,
  ]);
  console.log(`TodoList deployed to ${todoList.address}`);
  return todoList;
}

async function deployTestSolidityTypes() {
  const testSolidityTypes = await hre.viem.deployContract("TestSolidityTypes");
  console.log(`TestSolidityTypes deployed to ${testSolidityTypes.address}`);
  return testSolidityTypes;
}

async function main() {
  const [deployerClient] = await hre.viem.getWalletClients();

  const todoList = await deployTodoList();
  const testSolidityTypes = await deployTestSolidityTypes();

  await deployerClient.writeContract({
    abi: todoList.abi,
    address: todoList.address,
    functionName: "add",
    args: ["Build the next big thing"],
  });

  if (hre.network.name === "localhost") {
    updateContractAddresses("localhost", {
      TodoList: todoList.address,
      TestSolidityTypes: testSolidityTypes.address,
    });
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
