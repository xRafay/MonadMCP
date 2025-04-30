import { z } from 'zod';
import { PublicClient, parseEther, Abi, AbiParameter } from 'viem'; // Import Abi and AbiParameter types

// Define a schema for ABI items (simplified)
const abiItemSchema = z.object({
  type: z.string(),
  name: z.string().optional(),
  inputs: z.array(z.any()).optional(),
  outputs: z.array(z.any()).optional(),
  stateMutability: z.enum(['pure', 'view', 'nonpayable', 'payable']).optional(),
});

// Tool: Send a transaction
type SendTransactionRequest = {
  params: {
    to: string;
    value: string;
  };
};

export const sendTransaction = (client: PublicClient) => async (request: SendTransactionRequest) => {
  const schema = z.object({ to: z.string(), value: z.string() });
  const { to, value } = schema.parse(request.params);
  try {
    // Mock: In a real setup, you'd use a WalletClient to send a transaction
    const parsedValue = parseEther(value);
    // Simulate a transaction hash
    const hash = `0xMockTransactionHashFor_${to}_${parsedValue.toString()}`;
    return { hash };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to send transaction' };
  }
};

// Tool: Get balance of an address
type GetBalanceRequest = {
  params: {
    address: string;
  };
};

export const getBalance = (client: PublicClient) => async (request: GetBalanceRequest) => {
  const schema = z.object({ address: z.string() });
  const { address } = schema.parse(request.params);
  try {
    // Mock: In a real setup, this would fetch the balance from the blockchain
    const balance = BigInt('1000000000000000000'); // Mock 1 MONAD (in wei)
    return { balance: balance.toString() };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to get balance' };
  }
};

// Tool: Deploy a smart contract
type DeployContractRequest = {
  params: {
    bytecode: string;
    abi: Abi;
    args?: any[];
  };
};

export const deployContract = (client: PublicClient) => async (request: DeployContractRequest) => {
  const schema = z.object({
    bytecode: z.string(),
    abi: z.array(abiItemSchema), // Validate ABI structure
    args: z.array(z.any()).optional(),
  });
  const { bytecode, abi, args = [] } = schema.parse(request.params);
  try {
    // Mock: In a real setup, you'd use a WalletClient to deploy the contract
    const hash = `0xMockDeployHashFor_${bytecode}`;
    return { hash };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to deploy contract' };
  }
};

// Tool: Call a contract function
type CallContractRequest = {
  params: {
    contractAddress: string;
    abi: Abi;
    functionName: string;
    args: any[];
  };
};

export const callContract = (client: PublicClient) => async (request: CallContractRequest) => {
  const schema = z.object({
    contractAddress: z.string(),
    abi: z.array(abiItemSchema),
    functionName: z.string(),
    args: z.array(z.any()),
  });
  const { contractAddress, abi, functionName, args } = schema.parse(request.params);
  try {
    // Mock: In a real setup, this would call the contract on the blockchain
    const result = `MockResultFor_${functionName}_${args.join('_')}`;
    return { result };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to call contract' };
  }
};

// Tool: Get transaction receipt
type GetTransactionReceiptRequest = {
  params: {
    hash: string;
  };
};

export const getTransactionReceipt = (client: PublicClient) => async (request: GetTransactionReceiptRequest) => {
  const schema = z.object({ hash: z.string() });
  const { hash } = schema.parse(request.params);
  try {
    // Mock: In a real setup, this would fetch the receipt from the blockchain
    const receipt = {
      transactionHash: hash,
      status: 'success',
      gasUsed: '21000',
    };
    return { receipt };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Failed to get transaction receipt' };
  }
};