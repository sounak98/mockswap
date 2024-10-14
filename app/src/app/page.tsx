'use client';

import { useState } from 'react';

import { Card } from '@/components/Card';
import { SwapButton } from '@/components/SwapButton';
import { TokenInput } from '@/components/TokenInput';

export default function Home() {
  const [fromToken, setFromToken] = useState('TVER');
  const [toToken, setToToken] = useState('THB');
  const [swapAmount, setSwapAmount] = useState('');

  const handleSwap = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  return (
    <div className="flex-grow flex items-center justify-center py-8">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-center">Swap</h2>
          <div className="mb-2 relative">
            <TokenInput
              label="From"
              value={swapAmount}
              onChange={setSwapAmount}
              token={fromToken}
            />
            <SwapButton onClick={handleSwap} />
          </div>
          <div className="mt-2 mb-6">
            <TokenInput
              label="To"
              value={swapAmount}
              token={toToken}
              readOnly
            />
          </div>
          <button className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
            Swap
          </button>
        </Card>
      </div>
    </div>
  );
}
