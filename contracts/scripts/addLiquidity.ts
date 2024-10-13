import hre, { ethers } from "hardhat";

import PairModule from "../ignition/modules/Pair";
import TokensModule from "../ignition/modules/Tokens";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const { thb, tver } = await hre.ignition.deploy(TokensModule);
  const { pair } = await hre.ignition.deploy(PairModule);
  const pairAddress = await pair.getAddress();

  // Amounts to add
  // Setting price to 1 TVER = 2 THB
  const tverAmount = ethers.parseEther("50000");
  const thbAmount = ethers.parseEther("100000");

  // Print pair address
  console.log("Pair address:", await pair.getAddress());

  // Allow pair to spend tokens
  const tverBalance = BigInt(await tver.balanceOf(deployer.address));
  const thbBalance = BigInt(await thb.balanceOf(deployer.address));

  // Print TVER and THB address and balance
  console.log("TVER address:", await tver.getAddress());
  console.log("THB address:", await thb.getAddress());
  console.log("TVER balance:", ethers.formatEther(tverBalance));
  console.log("THB balance:", ethers.formatEther(thbBalance));

  // If balance is less than amount, throw error
  if (tverBalance < tverAmount || thbBalance < thbAmount) {
    throw new Error("Insufficient balance");
  }

  // Print allowance
  const tverAllowance = BigInt(
    await tver.allowance(deployer.address, pairAddress),
  );
  const thbAllowance = BigInt(
    await thb.allowance(deployer.address, pairAddress),
  );
  console.log("TVER allowance:", ethers.formatEther(tverAllowance));
  console.log("THB allowance:", ethers.formatEther(thbAllowance));

  // if allowance is less than amount, approve
  if (tverAllowance < tverAmount) {
    await tver.approve(pairAddress, ethers.MaxUint256, { from: deployer });
  }
  if (thbAllowance < thbAmount) {
    await thb.approve(pairAddress, ethers.MaxUint256, { from: deployer });
  }

  // Add liquidity
  await pair.addLiquidity(tverAmount, thbAmount, { from: deployer });
}

main().catch(console.error);
