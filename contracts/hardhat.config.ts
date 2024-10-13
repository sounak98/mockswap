import { HardhatUserConfig, vars } from "hardhat/config";
import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";

const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");
const PRIVATE_KEY = vars.get("PRIVATE_KEY");

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      chainId: 11155111,
      url: process.env.RPC_URL || "https://sepolia.drpc.org",
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
