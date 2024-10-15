'use client';

import { useMemo } from 'react';

import { useBalance } from '@/hooks/useBalance';
import { tokensConfig } from '@/tokensConfig';

interface TokenInputProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  token: keyof typeof tokensConfig;
  readOnly?: boolean;
}

export function TokenInput({
  label,
  value,
  onChange,
  token,
  readOnly = false,
}: TokenInputProps) {
  const tokenAddress = tokensConfig[token]?.address;
  const tokenDecimals = tokensConfig[token]?.decimals;
  const balance = useBalance(tokenAddress, tokenDecimals);

  const formattedBalance = useMemo(() => {
    return balance ? parseFloat(balance).toFixed(2) : '0.00';
  }, [balance]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium text-gray-500">{label}</label>
        {balance && (
          <div className="text-sm text-gray-500">
            Balance: {formattedBalance} {token}
          </div>
        )}
      </div>
      <div className="flex items-center">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full bg-transparent text-2xl font-semibold focus:outline-none"
          placeholder="0.0"
          readOnly={readOnly}
        />
        <span className="bg-gray-200 px-3 py-1 rounded-full font-medium text-sm">
          {token}
        </span>
      </div>
    </div>
  );
}
