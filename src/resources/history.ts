import { PublicClient } from 'viem';

// Define type for params
type HistoryParams = {
  address: string;
};

// Resource: Transaction history
export const history = (client: PublicClient) => async (params: HistoryParams) => {
  const address = params.address as `0x${string}`;
  // Note: Monad Testnet may not support full history queries
  // Placeholder: Return mock data or limited recent transactions
  return { address, transactions: [] };
};