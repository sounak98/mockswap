'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { chainConfig } from '@/chainConfig';
import { Card } from '@/components/Card';
import { SwapButton } from '@/components/SwapButton';
import { TokenInput } from '@/components/TokenInput';
import { useSwap } from '@/hooks/useSwap';

export default function Home() {
  const {
    inToken,
    setInToken,
    outToken,
    setOutToken,
    inAmount,
    setInAmount,
    estimatedOutAmount,
    executeSwap,
    isSwapLoading,
    isSwapSuccess,
    txReceipt,
    price,
  } = useSwap();

  function switchTokens() {
    setInToken(outToken);
    setOutToken(inToken);
    setInAmount(estimatedOutAmount);
  }

  useEffect(() => {
    if (isSwapSuccess && txReceipt) {
      setInAmount('');
      toast.success(
        <div className="flex flex-col gap-0.5">
          <span>Swap posted on the blockchain successfully!</span>
          <a
            href={chainConfig.getTxUrl(txReceipt.transactionHash)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            Transaction Link
          </a>
        </div>,
      );
    }
  }, [isSwapSuccess, txReceipt, setInAmount]);

  return (
    <div className="flex-grow flex items-center justify-center py-8">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Card>
          <h2 className="text-2xl font-bold mb-6 text-center">Swap</h2>
          <div className="mb-2 relative">
            <TokenInput
              label="From"
              value={inAmount}
              onChange={setInAmount}
              token={inToken}
            />
            <SwapButton onClick={switchTokens} />
          </div>
          <div className="mt-2 mb-6">
            <TokenInput
              label="To"
              value={estimatedOutAmount}
              token={outToken}
              readOnly
            />
          </div>
          {price !== null && (
            <p className="text-sm text-gray-600 mb-4">
              Price: 1 {inToken} = {price} {outToken}
            </p>
          )}
          <button
            className={`w-full p-3 rounded-lg font-semibold transition-colors ${
              isSwapLoading || !inAmount
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            onClick={executeSwap}
            disabled={isSwapLoading || !inAmount}
          >
            {isSwapLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Swapping...
              </div>
            ) : (
              'Swap'
            )}
          </button>
        </Card>
      </div>
    </div>
  );
}
