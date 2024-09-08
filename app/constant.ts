// Solana Network Configuration
export const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
export const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';

// API Endpoints
export const SWAP_API_URL = process.env.NEXT_PUBLIC_SWAP_API_URL || 'https://api.swap.barkprotocol.net/';
export const METADATA_SERVICE_URL = process.env.METADATA_SERVICE_URL || 'https://api.example.com/upload-metadata';
export const ERROR_TRACKING_SERVICE_URL = process.env.ERROR_TRACKING_SERVICE_URL || 'https://errors.example.com/report';

// Helios and Jupiter API Endpoints
export const HELIOS_API_URL = process.env.NEXT_PUBLIC_HELIOS_API_URL || 'https://mainnet.helius-rpc.com/?api-key=';
export const JUPITER_API_URL = process.env.NEXT_PUBLIC_JUPITER_API_URL || 'https://quote-api.jup.ag/v6/';

// Token Program and NFT Program IDs
export const TOKEN_PROGRAM_ID = process.env.TOKEN_PROGRAM_ID || 'TokenkegQfeZyiNwAJbNbGKPFXkQd5J8X8wnF8MPzYx';
export const TOKEN_2022_PROGRAM_ID = process.env.TOKEN_2022_PROGRAM_ID || '';
export const NFT_PROGRAM_ID = process.env.NFT_PROGRAM_ID || 'gEb7nD9yLkau1P4uyMdke9byJNrat61suH4vYiPUuiR';

// Token Addresses
export const USDC_MINT_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
export const BARK_MINT_ADDRESS = '2NTvEssJ2i998V2cMGT4Fy3JhyFnAzHFonDo9dbAkVrg';
export const SOL_MINT_ADDRESS = 'So11111111111111111111111111111111111111112'; // Native SOL token mint

// WalletConnect Bridge
export const WALLETCONNECT_BRIDGE = process.env.WALLETCONNECT_BRIDGE || 'https://bridge.walletconnect.org';

// Miscellaneous
export const DEFAULT_WALLET_ADDRESS = process.env.DEFAULT_WALLET_ADDRESS || 'gEb7nD9yLkau1P4uyMdke9byJNrat61suH4vYiPUuiR';
export const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key-here';
export const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-here';
export const NODE_ENV = process.env.NODE_ENV || 'development';

// Default Slippage BPS
export const DEFAULT_SLIPPAGE_BPS = 50; // Default slippage in basis points (0.5%)

// Vercel and Supabase Configuration

// Vercel Frontend
export const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL || 'https://trade.barkprotocol.vercel.app';

// Supabase Frontend
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://trade.barkprotocol.supabase.co';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// Supabase Backend (Service Role)
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';
export const SUPABASE_BACKEND_URL = process.env.SUPABASE_BACKEND_URL || 'https://trade.barkprotocol.supabase.co';
