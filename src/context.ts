// Define the type for the context manager parameters
type ContextManagerParams = {
  sessionId: string;
  action: string;
};

// Define the type for the context manager return value
type ContextManagerResult = {
  chain: string[];
  nextAction: string | null;
};

export const contextManager = async ({ sessionId, action }: ContextManagerParams): Promise<ContextManagerResult> => {
  let chain: string[] = [];
  let nextAction: string | null = null;

  if (action === 'sendTransaction') {
    chain.push('sendTransaction');
    nextAction = 'getBalance';
  } else if (action === 'getBalance') {
    chain.push('getBalance');
    nextAction = 'getAnalytics';
  } else if (action === 'deployContract') {
    chain.push('deployContract');
    nextAction = 'callContract';
  } else if (action === 'callContract') {
    chain.push('callContract');
    nextAction = 'getTransactionReceipt';
  } else if (action === 'getTransactionReceipt') {
    chain.push('getTransactionReceipt');
    nextAction = 'getBalance';
  } else if (action === 'getAnalytics') {
    chain.push('getAnalytics');
    nextAction = 'generateMeme';
  } else if (action === 'generateMeme') {
    chain.push('generateMeme');
    nextAction = null; // Stop chaining to prevent loops
  } else if (action === 'sendAndCelebrate') {
    chain.push('sendAndCelebrate');
    nextAction = 'generateMeme';
  } else if (action === 'deployAndTestContract') {
    chain.push('deployAndTestContract');
    nextAction = 'callContract';
  } else if (action === 'checkBalanceAndAnalyze') {
    chain.push('checkBalanceAndAnalyze');
    nextAction = 'getAnalytics';
  } else if (action === 'deployAndTrack') {
    chain.push('deployAndTrack');
    nextAction = 'callContract';
  }

  return { chain, nextAction };
};