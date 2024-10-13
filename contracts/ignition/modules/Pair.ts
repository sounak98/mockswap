import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

import TokensModule from "./Tokens";

export default buildModule("Pair", (m) => {
  const { thb, tver } = m.useModule(TokensModule);

  // Deploy pair
  const pair = m.contract("Pair", [tver, thb]);

  return { pair };
});
