import deployed_addresses from '../../contracts/ignition/deployments/chain-11155111/deployed_addresses.json';

export const tokenConfig: Record<
  string,
  { address: string; decimals: number }
> = {
  TVER: {
    address: deployed_addresses['Tokens#tver'],
    decimals: 18,
  },
  THB: {
    address: deployed_addresses['Tokens#thb'],
    decimals: 18,
  },
  PAIR: {
    address: deployed_addresses['Pair#Pair'],
    decimals: 18,
  },
};
