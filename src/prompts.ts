import { z } from 'zod';

// Define the type for a prompt
type Prompt = {
  name: string;
  description: string;
  template: string;
};

// Define the schema for runtime validation
const promptSchema = z.object({
  name: z.string(),
  description: z.string(),
  template: z.string(),
});

// Predefined prompts
const promptsData: Prompt[] = [
  {
    name: 'deployAndTestContract',
    description: 'Deploy a contract on Monad Testnet and test its functions',
    template: 'Deploy a smart contract with source code: {contractCode}. Then call its function: {functionName} with args: {args}.',
  },
  {
    name: 'sendAndCelebrate',
    description: 'Send tokens and celebrate with a meme',
    template: 'Send {value} tokens to {to}. Then generate a meme with template: {template} and text: {text}.',
  },
  {
    name: 'checkBalanceAndAnalyze',
    description: 'Check wallet balance and get blockchain analytics',
    template: 'Check balance of {address}. Then fetch analytics with query: {query}.',
  },
  {
    name: 'deployAndTrack',
    description: 'Deploy a contract and track the transaction',
    template: 'Deploy a smart contract with source code: {contractCode}. Then get the transaction receipt for hash: {hash}.',
  },
];

// Validate prompts at runtime
export const prompts: Prompt[] = promptsData.map((prompt) => {
  return promptSchema.parse(prompt);
});