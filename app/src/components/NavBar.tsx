'use client';

import { ConnectKitButton } from 'connectkit';

export function NavBar() {
  return (
    <div className="sticky top-0 bg-white shadow-md z-10 h-16">
      <div className="container mx-auto px-4 h-full flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">MockSwap</h1>
        <ConnectKitButton.Custom>
          {({ isConnected, show, truncatedAddress, ensName }) => (
            <button
              onClick={show}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              {isConnected ? (ensName ?? truncatedAddress) : 'Connect Wallet'}
            </button>
          )}
        </ConnectKitButton.Custom>
      </div>
    </div>
  );
}
