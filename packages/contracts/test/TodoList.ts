import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("TodoList", function () {
  async function deployTodoListFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const todoList = await hre.viem.deployContract("TodoList", [
      owner.account.address,
    ]);

    const todoListAsOtherAccount = await hre.viem.getContractAt(
      "TodoList",
      todoList.address,
      { walletClient: otherAccount },
    );

    const publicClient = await hre.viem.getPublicClient();

    return {
      todoList,
      todoListAsOtherAccount,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Add Todo", function () {
    it("Owner can add todo", async function () {
      const { todoList, publicClient } = await loadFixture(
        deployTodoListFixture,
      );
      const todoText = "Test Todo";

      const hash = await todoList.write.add([todoText]);
      await publicClient.waitForTransactionReceipt({ hash });

      const todoAddedEvents = await todoList.getEvents.TodoAdded();
      expect(todoAddedEvents).to.have.lengthOf(1);
      expect(todoAddedEvents[0].args.text).to.equal(todoText);
      expect(todoAddedEvents[0].args.completed).to.equal(false);
    });

    it("Non-owner can not add todo", async function () {
      const { todoListAsOtherAccount } = await loadFixture(
        deployTodoListFixture,
      );
      const todoText = "Test Todo";

      await expect(
        todoListAsOtherAccount.write.add([todoText]),
      ).to.be.rejectedWith("OwnableUnauthorizedAccount");
    });
  });

  describe("Toggle Todo", function () {
    it("Owner can toggle todo to completed", async function () {
      const { todoList } = await loadFixture(deployTodoListFixture);
      const todoText = "Test Todo";

      await todoList.write.add([todoText]);
      await todoList.write.toggleCompleted([0n]);

      const todos = await todoList.read.getAll();
      expect(todos[0].completed).to.equal(true);
    });

    it("Non-owner can not toggle todo to completed", async function () {
      const { todoList, todoListAsOtherAccount } = await loadFixture(
        deployTodoListFixture,
      );
      const todoText = "Test Todo";

      await todoList.write.add([todoText]);
      await expect(
        todoListAsOtherAccount.write.toggleCompleted([0n]),
      ).to.be.rejectedWith("OwnableUnauthorizedAccount");
    });
  });

  describe("Get All Todos", function () {
    it("Anyone can get all todos", async function () {
      const { todoList, todoListAsOtherAccount } = await loadFixture(
        deployTodoListFixture,
      );
      const todoText = "Test Todo";

      await todoList.write.add([todoText]);

      const todosAsOwner = await todoList.read.getAll();
      const todosAsOtherAccount = await todoListAsOtherAccount.read.getAll();

      expect(todosAsOwner[0].text).to.equal(todoText);
      expect(todosAsOtherAccount[0].text).to.equal(todoText);
    });
  });
});
