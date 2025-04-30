import { Server } from '@modelcontextprotocol/sdk';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { sendTransaction, getBalance, deployContract, callContract, getTransactionReceipt } from './tools/blockchain';
import { generateMeme } from './tools/meme';
import { getAnalytics } from './tools/analytics';
import { sendAndCelebrate, deployAndTestContract, checkBalanceAndAnalyze, deployAndTrack } from './tools/composite';
import { account, history } from './resources';
import { contextManager } from './context';
import { prompts } from './prompts';

// Create a public client directly
const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const server = new Server();

// Initialize the resource handlers with the client
const accountHandler = account(client);
const historyHandler = history(client);

server.setRequestHandler('sendTransaction', sendTransaction(client));
server.setRequestHandler('getBalance', getBalance(client));
server.setRequestHandler('deployContract', deployContract(client));
server.setRequestHandler('callContract', callContract(client));
server.setRequestHandler('getTransactionReceipt', getTransactionReceipt(client));
server.setRequestHandler('getAnalytics', getAnalytics);
server.setRequestHandler('generateMeme', generateMeme);
server.setRequestHandler('sendAndCelebrate', sendAndCelebrate(client));
server.setRequestHandler('deployAndTestContract', deployAndTestContract(client));
server.setRequestHandler('checkBalanceAndAnalyze', checkBalanceAndAnalyze(client));
server.setRequestHandler('deployAndTrack', deployAndTrack(client));

// Set the resource handlers
server.setResource('accountState', accountHandler);
server.setResource('transactionHistory', historyHandler);

// Use prompts from prompts.ts
server.setPrompts(prompts);

server.setContextManager(contextManager);

server.start();