'use client';

import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { ReactNode } from 'react';
import { WagmiProvider, createConfig, webSocket } from 'wagmi';

import { chainConfig } from '@/chainConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = createConfig(
  getDefaultConfig({
    chains: [chainConfig.chain],
    transports: {
      [chainConfig.chain.id]: webSocket(chainConfig.rpcWssUrl),
    },
    walletConnectProjectId: chainConfig.walletConnectProjectId,
    appName: 'mockswap',
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
