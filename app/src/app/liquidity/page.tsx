'use client';

import { useState } from 'react';

import { Card } from '@/components/Card';
import { TokenInput } from '@/components/TokenInput';

export default function Home() {
  // Remove unused state variables
  // const [fromToken, setFromToken] = useState('TVER');
  // const [toToken, setToToken] = useState('THB');
  // const [swapAmount, setSwapAmount] = useState('');

  // Add new state variables for liquidity
  const [liquidityTVER, setLiquidityTVER] = useState('');
  const [liquidityTHB, setLiquidityTHB] = useState('');

  // Remove unused handleSwap function
  // const handleSwap = () => {
  //   setFromToken(toToken);
  //   setToToken(fromToken);
  // };

  return (
    <div className="flex-grow flex items-center justify-center py-8">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-center">Add Liquidity</h2>
          <div className="mb-4">
            <TokenInput
              label="TVER"
              value={liquidityTVER}
              onChange={setLiquidityTVER}
              token="TVER"
            />
          </div>
          <div className="mb-6">
            <TokenInput
              label="THB"
              value={liquidityTHB}
              onChange={setLiquidityTHB}
              token="THB"
            />
          </div>
          <button className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
            Add Liquidity
          </button>
        </Card>
      </div>
    </div>
  );
}
