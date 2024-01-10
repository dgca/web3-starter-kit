import hre from "hardhat";

async function deployTodoList() {
  const [deployerClient] = await hre.viem.getWalletClients();
  const todoList = await hre.viem.deployContract("TodoList", [
    deployerClient.account.address,
  ]);

  console.log(`TodoList deployed to ${todoList.address}`);
}

async function deployTestSolidityTypes() {
  const testSolidityTypes = await hre.viem.deployContract("TestSolidityTypes");
  console.log(`TestSolidityTypes deployed to ${testSolidityTypes.address}`);
}

async function main() {
  await deployTodoList();
  await deployTestSolidityTypes();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
