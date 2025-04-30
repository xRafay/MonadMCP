// THIS IS FOR RUNNING ONLINE (INCASE)
import { Server } from '@modelcontextprotocol/sdk';
import { createPublicClient, http } from 'viem';
import { sendTransaction, getBalance, deployContract, callContract, getTransactionReceipt } from './tools/blockchain';
import { getAnalytics } from './tools/analytics';
import { generateMeme } from './tools/meme';
import { accountState, transactionHistory } from './resources';
import { prompts } from './prompts';
import { initSupabase } from './supabase';
import { manageContext } from './context';

// Create HTTP server
const server = new Server({ transport: 'http' });

const client = createPublicClient({
  transport: http(process.env.MONAD_TESTNET_RPC),
});

// Register tools, resources, prompts (same as index.ts)
server.setRequestHandler('sendTransaction', sendTransaction(client));
server.setRequestHandler('getBalance', getBalance(client));
server.setRequestHandler('deployContract', deployContract(client));
server.setRequestHandler('callContract', callContract(client));
server.setRequestHandler('getTransactionReceipt', getTransactionReceipt(client));
server.setRequestHandler('getAnalytics', getAnalytics);
server.setRequestHandler('generateMeme', generateMeme);

server.setResource('accountState', accountState(client));
server.setResource('transactionHistory', transactionHistory(client));

server.setPrompts(prompts);

initSupabase();

server.setContextManager(manageContext);

// Start HTTP server
server.start();