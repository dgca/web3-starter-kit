import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress, parseGwei } from "viem";

describe("TodoList", function () {
  async function deployTodoListFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const todoList = await hre.viem.deployContract("TodoList", []);

    const publicClient = await hre.viem.getPublicClient();

    return {
      todoList,
      owner,
      otherAccount,
      publicClient,
    };
  }
});
