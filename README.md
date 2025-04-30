
# MonadMCP

An open-source MCP server for interacting with Monad Testnet, compatible with Claude Desktop and Cursor IDE.

## Features
- Send transactions, query balances, deploy/call contracts on Monad Testnet.
- Fetch blockchain analytics via Flipside Crypto API.
- Generate memes for transaction success.
- Supports long action chains with Supabase logging.
- Easy setup with a single script.

## Installation
1. Clone the repo: `git clone https://github.com/xRafay/MonadMCP`
2. Run setup: `chmod +x setup.sh && ./setup.sh`
3. Edit `.env` with your credentials.
4. Start the server: `npx ts-node --require tsconfig-paths/register src/index.ts`

## Cursor Desktop Setup

{
  "mcpServers": {
    "monadmcp": {
      "command": "npx ts-node C:/Users/9sept/monadmcp/src/index.ts"
    }
  }
}

