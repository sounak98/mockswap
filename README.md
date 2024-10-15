# MockSwap

MockSwap is a decentralized exchange (DEX) built on the Ethereum blockchain, allowing users to swap ERC20 tokens efficiently and securely.

## Project Structure

This project consists of two main parts:

1. Smart Contracts
2. Frontend Application

### Smart Contracts

For detailed information about the smart contracts, please refer to the [Contracts README](./contracts/README.md).

#### Deployed Contracts

The contracts are deployed on Sepolia testnet. The contracts have been verified on Etherscan. The deployed addresses are:

- `THB`: [0x21A9b3d629bbF9954Fd0f5397C91d8dDeDF01291](https://sepolia.etherscan.io/address/0x21A9b3d629bbF9954Fd0f5397C91d8dDeDF01291)
- `TVER`: [0x2a1d0650AD9f38C0d1B0BAEC8Da41Eaf11B6c8f3](https://sepolia.etherscan.io/address/0x2a1d0650AD9f38C0d1B0BAEC8Da41Eaf11B6c8f3)
- `Pair`: [0xe2a97F46cb425315Aa29B08e342a90119bD494aC](https://sepolia.etherscan.io/address/0xe2a97F46cb425315Aa29B08e342a90119bD494aC)

### Frontend Application

For information about the frontend application, including setup and usage instructions, please see the [App README](./app/README.md).

#### Deployed Application

You can access the live deployed version of the MockSwap application at: [mockswap.vercel.app](https://mockswap.vercel.app)

## Tests

To run the tests, visit the [Contracts README](./contracts/README.md).

### Pair Contract Tests

The tests are written for the following cases:

1. Deployment

   - Should set the correct token addresses
   - Should initialize reserves to zero

2. Add Liquidity

   - Should add initial liquidity correctly
   - Should add subsequent liquidity proportionally

3. Remove Liquidity

   - Should remove liquidity correctly

4. Swap

   - Should sell TVER for THB correctly
   - Should revert when trying to swap with insufficient input amount
   - Should revert when trying to swap with invalid tokens
