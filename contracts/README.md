# TVER-THB Swap Contracts

This project implements a simple token swap system for TVER (Tokenized Carbon Credit) and THB (Tokenized Thai Baht) using Solidity smart contracts.

## Structure

The project is structured as follows:

- `contracts`: Contains the Solidity smart contracts
  - `ERC20MintableOwnable.sol`: Custom ERC20 token with minting capabilities
  - `Pair.sol`: Implements the swap pair functionality
  - `interface/IPair.sol`: Interface for the Pair contract
- `ignition`: Contains Hardhat Ignition deployment modules
  - `modules/Tokens.ts`: Deployment module for TVER and THB tokens
  - `modules/Pair.ts`: Deployment module for the Pair contract
- `scripts`: Contains utility scripts
  - `addLiquidity.ts`: Script to add liquidity to the pair
  - `checkOwnerBalances.ts`: Script to check token balances of the owner

## Setup

```bash
# Install dependencies
$ npm install

# Optionally copy the .env.example file to .env and set the variables
# Default value: https://sepolia.drpc.org
$ cp .env.example .env

# Set the private key and etherscan api key
$ npx hardhat vars set PRIVATE_KEY
$ npx hardhat vars set ETHERSCAN_API_KEY
```

## Deployment

### Sepolia

Find it in the [`deployed_addresses.json`](ignition/deployments/chain-11155111/deployed_addresses.json) file.