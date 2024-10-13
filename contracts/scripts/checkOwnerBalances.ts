import hre from "hardhat";
import { ethers } from "hardhat";

import TokensModule from "../ignition/modules/Tokens";

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const { thb, tver } = await hre.ignition.deploy(TokensModule);

  console.log("THB address:", await thb.getAddress());
  console.log("TVER address:", await tver.getAddress());

  const thbBalance = ethers.formatEther(await thb.balanceOf(deployer.address));
  const tverBalance = ethers.formatEther(
    await tver.balanceOf(deployer.address),
  );

  console.log("THB balance:", thbBalance);
  console.log("TVER balance:", tverBalance);
}

main().catch(console.error);
