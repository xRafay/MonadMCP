#!/bin/bash
echo "Installing Node.js dependencies..."
npm install
echo "Creating .env file..."
cat <<EOT > .env
MONAD_TESTNET_RPC=https://testnet-rpc.monad.xyz
WALLET_PRIVATE_KEY=your_private_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
FLIPSIDE_API_KEY=your_flipside_api_key
MEMEGEN_API_URL=https://api.memegen.link
EOT
echo "Setup complete! Edit .env with your credentials."