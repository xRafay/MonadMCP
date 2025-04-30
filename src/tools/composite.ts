import { PublicClient, Abi } from 'viem';
import { sendTransaction } from './blockchain';
import { generateMeme } from './meme';
import { getBalance } from './blockchain';
import { getAnalytics } from './analytics';
import { deployContract, callContract, getTransactionReceipt } from './blockchain';

// Composite handler for sendAndCelebrate
export const sendAndCelebrate = (client: PublicClient) => async (request: {
  params: { send: { to: string; value: string }; meme: { template: string; text: string } };
}) => {
  const { send, meme } = request.params;

  // Step 1: Send tokens
  const sendResult = await sendTransaction(client)({ params: send });

  // Step 2: Generate a meme
  const memeResult = await generateMeme({ params: meme });

  return {
    send: sendResult,
    meme: memeResult,
  };
};

// Composite handler for deployAndTestContract
export const deployAndTestContract = (client: PublicClient) => async (request: {
  params: {
    deploy: { contractCode: string };
    call: { functionName: string; args: any[] };
  };
}) => {
  const { deploy, call } = request.params;

  // Placeholder: In a real scenario, you'd compile contractCode to get bytecode and ABI
  const bytecode = '0x' + deploy.contractCode; // Simplified for demo
  const abi: Abi = []; // Explicitly type abi as Abi

  // Step 1: Deploy the contract
  const deployResult = await deployContract(client)({
    params: { bytecode, abi, args: [] },
  });

  // Step 2: Call the contract function (assuming the contract address is returned)
  const contractAddress = '0xDeployedContractAddress'; // Placeholder (you'd extract this from deployResult)
  const callResult = await callContract(client)({
    params: {
      contractAddress,
      abi,
      functionName: call.functionName,
      args: call.args,
    },
  });

  return {
    deploy: deployResult,
    call: callResult,
  };
};

// Composite handler for checkBalanceAndAnalyze
export const checkBalanceAndAnalyze = (client: PublicClient) => async (request: {
  params: { balance: { address: string }; analytics: { query: string } };
}) => {
  const { balance, analytics } = request.params;

  // Step 1: Check balance
  const balanceResult = await getBalance(client)({ params: balance });

  // Step 2: Fetch analytics
  const analyticsResult = await getAnalytics({ params: analytics });

  return {
    balance: balanceResult,
    analytics: analyticsResult,
  };
};

// Composite handler for deployAndTrack
export const deployAndTrack = (client: PublicClient) => async (request: {
  params: { deploy: { contractCode: string } };
}) => {
  const { deploy } = request.params;

  // Placeholder: In a real scenario, you'd compile contractCode to get bytecode and ABI
  const bytecode = '0x' + deploy.contractCode; // Simplified for demo
  const abi: Abi = []; // Explicitly type abi as Abi

  // Step 1: Deploy the contract
  const deployResult = await deployContract(client)({
    params: { bytecode, abi, args: [] },
  });

  // Check if deployment was successful
  if ('error' in deployResult) {
    throw new Error(`Deployment failed: ${deployResult.error}`);
  }

  // Step 2: Get the transaction receipt
  const receiptResult = await getTransactionReceipt(client)({
    params: { hash: deployResult.hash }, // hash is now guaranteed to be a string
  });

  return {
    deploy: deployResult,
    receipt: receiptResult,
  };
};