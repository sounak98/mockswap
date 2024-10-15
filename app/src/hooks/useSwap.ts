import { useEffect, useMemo, useState } from 'react';
import { formatUnits, parseUnits } from 'viem';
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import { tokensConfig } from '@/tokensConfig';

// NOTE: imported from contracts project
import pairArtifact from '../../../contracts/artifacts/contracts/Pair.sol/Pair.json';

export function useSwap() {
  const [inToken, setInToken] = useState(tokensConfig.THB.symbol);
  const [outToken, setOutToken] = useState(tokensConfig.TVER.symbol);
  const [inAmount, setInAmount] = useState('');
  const [estimatedOutAmount, setEstimatedOutAmount] = useState('');

  const { address } = useAccount();

  // Get token addresses
  const { data: tokenA } = useReadContract({
    address: tokensConfig.PAIR.address,
    abi: pairArtifact.abi,
    functionName: 'getTokenA',
  });

  const { data: tokenB } = useReadContract({
    address: tokensConfig.PAIR.address,
    abi: pairArtifact.abi,
    functionName: 'getTokenB',
  });

  // Get reserves
  const { data: reserves } = useReadContract({
    address: tokensConfig.PAIR.address,
    abi: pairArtifact.abi,
    functionName: 'getReserves',
  });

  // Estimate output amount
  useEffect(() => {
    if (inAmount === '') setEstimatedOutAmount('');

    if (inAmount && reserves) {
      const [reserveA, reserveB] = reserves as [number, number];
      const inAmountBN = parseUnits(inAmount, tokensConfig[inToken].decimals);
      const inReserve = inToken === 'TVER' ? reserveA : reserveB;
      const outReserve = inToken === 'TVER' ? reserveB : reserveA;

      // Using the constant product formula: x * y = k
      // Can have a reader contract to calculate this
      const numerator = inAmountBN * BigInt(outReserve);
      const denominator = BigInt(inReserve) + inAmountBN;
      const estimatedOut = numerator / denominator;

      setEstimatedOutAmount(
        parseFloat(formatUnits(estimatedOut, tokensConfig[outToken].decimals))
          .toFixed(2)
          .toString(),
      );
    }
  }, [inAmount, inToken, outToken, reserves]);

  // Swap function
  const { writeContract: swap, data: hash } = useWriteContract();

  const {
    isLoading: isSwapLoading,
    isSuccess: isSwapSuccess,
    data: txReceipt,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const executeSwap = () => {
    if (!address || !inAmount) return;

    const tokenIn = inToken === 'TVER' ? tokenA : tokenB;
    const tokenOut = inToken === 'TVER' ? tokenB : tokenA;
    const amountIn = parseUnits(inAmount, tokensConfig.PAIR.decimals);

    swap({
      address: tokensConfig.PAIR.address,
      abi: pairArtifact.abi,
      functionName: 'swap',
      args: [tokenIn, tokenOut, amountIn],
    });
  };

  // Price
  const price = useMemo(() => {
    if (inAmount && estimatedOutAmount && parseFloat(inAmount) > 0) {
      return (parseFloat(estimatedOutAmount) / parseFloat(inAmount))
        .toFixed(2)
        .toString();
    }
    return null;
  }, [inAmount, estimatedOutAmount]);

  return {
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
  };
}
