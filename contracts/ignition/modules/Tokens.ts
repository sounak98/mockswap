import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "hardhat";

export default buildModule("Tokens", (m) => {
  const owner = m.getAccount(0);

  // Deploy contracts
  const thb = m.contract(
    "ERC20MintableOwnable",
    ["Tokenized Thai Baht", "THB", owner],
    { id: "thb" },
  );
  const tver = m.contract(
    "ERC20MintableOwnable",
    ["Tokenized Carbon Credit", "TVER", owner],
    { id: "tver" },
  );

  // Mint initial supply
  m.call(thb, "mint", [owner, ethers.parseEther("1000000")], { from: owner });
  m.call(tver, "mint", [owner, ethers.parseEther("1000000")], { from: owner });

  return { thb, tver };
});
