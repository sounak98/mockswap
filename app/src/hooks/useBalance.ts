import { useEffect, useState } from 'react';
import { formatUnits, parseAbi } from 'viem';
import { useAccount, usePublicClient } from 'wagmi';

// ABI for ERC20 token balance function
const erc20ABI = parseAbi([
  'function balanceOf(address owner) view returns (uint256)',
]);

export function useBalance(
  tokenAddress: string | undefined,
  tokenDecimals: number | undefined,
) {
  const [balance, setBalance] = useState<string | null>(null);
  const { address } = useAccount();
  const publicClient = usePublicClient();

  useEffect(() => {
    async function fetchBalance() {
      if (!address || !tokenAddress || !publicClient || !tokenDecimals) return;

      try {
        const balanceResult = await publicClient.readContract({
          address: tokenAddress as `0x${string}`,
          abi: erc20ABI,
          functionName: 'balanceOf',
          args: [address],
        });

        setBalance(formatUnits(balanceResult, tokenDecimals)); // Assuming 18 decimals, adjust if needed
      } catch (error) {
        console.error('Error fetching balance:', error);
        setBalance(null);
      }
    }

    fetchBalance();
    // Set up an interval to fetch the balance every 30 seconds
    const intervalId = setInterval(fetchBalance, 30000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [address, tokenAddress, tokenDecimals, publicClient]);

  return balance;
}
