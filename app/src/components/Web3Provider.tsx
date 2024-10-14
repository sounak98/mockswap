"use client";

import { WagmiProvider, createConfig, webSocket } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";

const config = createConfig(
  getDefaultConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: webSocket(process.env.NEXT_PUBLIC_RPC_URL!),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    appName: "mockswap",
  })
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
