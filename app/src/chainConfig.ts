import { Chain, sepolia } from 'wagmi/chains';

type ChainConfig = {
  chain: Chain;
  rpcWssUrl: string;
  walletConnectProjectId: string;
  getTxUrl: (txHash: string) => string;
  getAddressUrl: (address: string) => string;
};

export const chainConfig: ChainConfig = {
  chain: sepolia,
  rpcWssUrl: process.env.NEXT_PUBLIC_RPC_WSS_URL!,
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  getTxUrl: (txHash: string) => `https://sepolia.etherscan.io/tx/${txHash}`,
  getAddressUrl: (address: string) =>
    `https://sepolia.etherscan.io/address/${address}`,
};
