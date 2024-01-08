import hre from "hardhat";

async function deployTodoList() {
  const [deployerClient] = await hre.viem.getWalletClients();
  const todoList = await hre.viem.deployContract("TodoList", [
    deployerClient.account.address,
  ]);

  console.log(`TodoList deployed to ${todoList.address}`);
}

async function main() {
  await deployTodoList();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
