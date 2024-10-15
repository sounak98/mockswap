// NOTE: imported from contracts project
import deployed_addresses from '../../contracts/ignition/deployments/chain-11155111/deployed_addresses.json';

export const tokensConfig: Record<
  string,
  { symbol: string; address: `0x${string}`; decimals: number }
> = {
  TVER: {
    symbol: 'TVER',
    address: deployed_addresses['Tokens#tver'] as `0x${string}`,
    decimals: 18,
  },
  THB: {
    symbol: 'THB',
    address: deployed_addresses['Tokens#thb'] as `0x${string}`,
    decimals: 18,
  },
  PAIR: {
    symbol: 'Pair',
    address: deployed_addresses['Pair#Pair'] as `0x${string}`,
    decimals: 18,
  },
};
