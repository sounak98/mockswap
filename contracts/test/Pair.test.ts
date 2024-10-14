import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";

import { ERC20MintableOwnable, Pair } from "../typechain-types";

describe("Pair", function () {
  let pair: Pair;
  let tokenA: ERC20MintableOwnable;
  let tokenB: ERC20MintableOwnable;
  let owner: Signer;
  let initialAmountA: bigint;
  let initialAmountB: bigint;

  const TVER_AMOUNT = ethers.parseEther("100");
  const THB_AMOUNT = ethers.parseEther("400");
  const MINT_AMOUNT = ethers.parseEther("1000000"); // 1 million tokens

  beforeEach(async function () {
    [owner] = await ethers.getSigners();

    const ERC20MintableOwnable = await ethers.getContractFactory(
      "ERC20MintableOwnable",
    );
    const tver = await ERC20MintableOwnable.deploy(
      "Tokenized Carbon Credit",
      "TVER",
      owner.getAddress(),
    );
    const thb = await ERC20MintableOwnable.deploy(
      "Tokenized Thai Baht",
      "THB",
      owner.getAddress(),
    );

    const Pair = await ethers.getContractFactory("Pair");
    pair = await Pair.deploy(await tver.getAddress(), await thb.getAddress());

    // Determine which token is tokenA and tokenB
    const pairTokenA = await pair.getTokenA();
    tokenA = pairTokenA === (await tver.getAddress()) ? tver : thb;
    tokenB = pairTokenA === (await tver.getAddress()) ? thb : tver;

    // Set initial amounts based on token order
    initialAmountA = tokenA === tver ? TVER_AMOUNT : THB_AMOUNT;
    initialAmountB = tokenB === thb ? THB_AMOUNT : TVER_AMOUNT;

    // Mint 1 million tokens to owner for each token type
    await tokenA.mint(await owner.getAddress(), MINT_AMOUNT);
    await tokenB.mint(await owner.getAddress(), MINT_AMOUNT);

    // Approve pair contract to spend tokens (using initialAmountA and initialAmountB)
    await tokenA.approve(await pair.getAddress(), MINT_AMOUNT);
    await tokenB.approve(await pair.getAddress(), MINT_AMOUNT);
  });

  describe("Deployment", function () {
    it("Should set the correct token addresses", async function () {
      expect(await pair.getTokenA()).to.equal(await tokenA.getAddress());
      expect(await pair.getTokenB()).to.equal(await tokenB.getAddress());
    });

    it("Should initialize reserves to zero", async function () {
      const [reserveA, reserveB] = await pair.getReserves();
      expect(reserveA).to.equal(0);
      expect(reserveB).to.equal(0);
    });
  });

  describe("Add Liquidity", function () {
    it("Should add initial liquidity correctly", async function () {
      await expect(pair.addLiquidity(initialAmountA, initialAmountB))
        .to.emit(pair, "AddLiquidity")
        .withArgs(
          await owner.getAddress(),
          initialAmountA,
          initialAmountB,
          ethers.parseEther("200"), // sqrt(100 * 400)
        );

      const [reserveA, reserveB] = await pair.getReserves();
      expect(reserveA).to.equal(initialAmountA);
      expect(reserveB).to.equal(initialAmountB);
    });

    it("Should add subsequent liquidity proportionally", async function () {
      await pair.addLiquidity(initialAmountA, initialAmountB);

      const amountA = initialAmountA / 2n;
      const amountB = initialAmountB / 2n;

      await expect(pair.addLiquidity(amountA, amountB))
        .to.emit(pair, "AddLiquidity")
        .withArgs(
          await owner.getAddress(),
          amountA,
          amountB,
          ethers.parseEther("100"), // 50% of initial liquidity
        );
    });
  });

  describe("Remove Liquidity", function () {
    beforeEach(async function () {
      await pair.addLiquidity(initialAmountA, initialAmountB);
    });

    it("Should remove liquidity correctly", async function () {
      const liquidity = ethers.parseEther("100"); // 50% of total liquidity

      const amountA = initialAmountA / 2n;
      const amountB = initialAmountB / 2n;

      await expect(pair.removeLiquidity(liquidity))
        .to.emit(pair, "RemoveLiquidity")
        .withArgs(await owner.getAddress(), amountA, amountB, liquidity);

      const [reserveA, reserveB] = await pair.getReserves();
      expect(reserveA).to.equal(amountA);
      expect(reserveB).to.equal(amountB);
    });
  });

  describe("Swap", function () {
    beforeEach(async function () {
      await pair.addLiquidity(initialAmountA, initialAmountB);
    });

    it("Should sell TVER for THB correctly", async function () {
      const amountIn = ethers.parseEther("100"); // 100 TVER
      const expectedAmountOut = ethers.parseEther("200"); // 200 THB

      let tverAddress, thbAddress, tokenAIsTver;
      if ((await tokenA.symbol()) === "TVER") {
        tverAddress = await tokenA.getAddress();
        thbAddress = await tokenB.getAddress();
        tokenAIsTver = true;
      } else {
        tverAddress = await tokenB.getAddress();
        thbAddress = await tokenA.getAddress();
        tokenAIsTver = false;
      }

      await expect(pair.swap(tverAddress, thbAddress, amountIn))
        .to.emit(pair, "Swap")
        .withArgs(
          await owner.getAddress(),
          tverAddress,
          thbAddress,
          amountIn,
          expectedAmountOut,
        );

      const [reserveA, reserveB] = await pair.getReserves();
      const expectedReserveA = tokenAIsTver
        ? initialAmountA + amountIn
        : initialAmountA - expectedAmountOut;
      const expectedReserveB = tokenAIsTver
        ? initialAmountB - expectedAmountOut
        : initialAmountB + amountIn;
      expect(reserveA).to.equal(expectedReserveA);
      expect(reserveB).to.equal(expectedReserveB);
    });

    it("Should revert when trying to swap with insufficient input amount", async function () {
      await expect(
        pair.swap(await tokenA.getAddress(), await tokenB.getAddress(), 0),
      ).to.be.revertedWith("INSUFFICIENT_INPUT_AMOUNT");
    });

    it("Should revert when trying to swap with invalid tokens", async function () {
      const invalidToken = await (
        await ethers.getContractFactory("ERC20MintableOwnable")
      ).deploy("Invalid", "INV", owner.getAddress());
      await expect(
        pair.swap(
          await invalidToken.getAddress(),
          await tokenB.getAddress(),
          ethers.parseEther("10"),
        ),
      ).to.be.revertedWith("INVALID_TOKEN_IN");
    });
  });
});
