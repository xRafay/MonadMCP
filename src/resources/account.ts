import { PublicClient } from 'viem';

// Define type for params
type AccountParams = {
  address: string;
};

// Resource: Wallet details
export const account = (client: PublicClient) => async (params: AccountParams) => {
  const address = params.address as `0x${string}`;
  const balance = await client.getBalance({ address });
  const nonce = await client.getTransactionCount({ address });
  return { address, balance: balance.toString(), nonce };
};