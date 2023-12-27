import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
import { getAddress } from "viem";

describe("TestToken", function () {
  async function deployTestTokenFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const testToken = await hre.viem.deployContract("TestToken", [
      owner.account.address,
    ]);

    return {
      testToken,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { testToken, owner } = await loadFixture(deployTestTokenFixture);

      expect(await testToken.read.owner()).to.equal(
        getAddress(owner.account.address),
      );
    });
  });

  describe("Minting", function () {
    it("Should allow the owner to mint tokens", async function () {
      const { testToken, owner } = await loadFixture(deployTestTokenFixture);

      const initialBalance = await testToken.read.balanceOf([
        owner.account.address,
      ]);
      await testToken.write.mint([owner.account.address, 1000n]);
      const finalBalance = await testToken.read.balanceOf([
        owner.account.address,
      ]);

      expect(finalBalance - initialBalance).to.equal(1000n);
    });

    it("Should not allow non-owners to mint tokens", async function () {
      const { testToken, otherAccount } = await loadFixture(
        deployTestTokenFixture,
      );

      const testTokenAsOtherAccount = await hre.viem.getContractAt(
        "TestToken",
        testToken.address,
        { walletClient: otherAccount },
      );

      await expect(
        testTokenAsOtherAccount.write.mint([
          otherAccount.account.address,
          1000n,
        ]),
      ).to.be.rejectedWith("OwnableUnauthorizedAccount");
    });
  });
});
