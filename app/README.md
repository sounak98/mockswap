# MockSwap

MockSwap is a Next.js project that allows users to swap between Thai Baht (THB) and Carbon Credits (TVER) tokens on the Sepolia testnet.

## Deployment

The project is deployed on Vercel. You can find the live version at [mockswap.vercel.app](https://mockswap.vercel.app/).

## Setup and Run

To set up and run the project, follow these steps:

1. Clone the repository:

   ```bash
   $ git clone https://github.com/yourusername/mockswap.git
   $ cd mockswap
   ```

2. Install dependencies:

   ```bash
   $ pnpm install
   ```

3. Copy the `env.example` file to `.env` in the root directory:

   ```bash
   $ cp env.example .env
   ```

   Then, update the environment variables in the `.env` file as needed.

   ```bash
   NEXT_PUBLIC_RPC_WSS_URL="https://sepolia.drpc.org"
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your_walletconnect_project_id"
   ```

4. Run the development server:

   ```bash
   $ pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Basic Structure and Considerations

The project is structured as follows:

- `src/app`: Contains the main application pages and layout.
- `src/components`: Reusable React components.
- `src/hooks`: Custom React hooks for various functionalities.
- `src/chainConfig.ts`: Configuration for the Sepolia testnet.
- `src/tokensConfig.ts`: Configuration for the THB and TVER tokens.

Key considerations:

1. **Web3 Integration**: The project uses Wagmi and ConnectKit for seamless Web3 integration and wallet connections.

2. **Token Swapping**: The `useSwap` hook in `src/hooks/useSwap.ts` handles the token swapping logic, including price estimation and execution.

3. **Responsive Design**: The UI is built with Tailwind CSS, ensuring a responsive design across different devices.

4. **Notifications**: Toast notifications are used to provide feedback on successful transactions and potential errors.

5. **Code Organization**: The project follows a modular structure, separating concerns into components, hooks, and configuration files for better maintainability.

## Implemented Features

1. **Token Swapping**: Users can swap between THB and TVER tokens with real-time price estimation.

2. **Wallet Connection**: Integration with various wallets through ConnectKit for a seamless connection experience.

3. **Balance Display**: Real-time balance display for connected wallets.

4. **Transaction Feedback**: Users receive immediate feedback on the status of their swap transactions.

5. **Price Information**: The current exchange rate between THB and TVER is displayed during the swap process.

## Future Features

1. **Liquidity Provision**: Allow users to add and remove liquidity to the THB-TVER pair.

2. **Transaction History**: Implement a feature to view past swap and liquidity transactions.
