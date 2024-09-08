"use client";

import React, { useState } from 'react';
import { Connection, VersionedTransaction } from '@solana/web3.js';
import fetch from 'cross-fetch';
import { useWallet } from '@solana/wallet-adapter-react';
import SwapInstructions from '@/components/swap-instructions'; // Make sure this component exists

const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com');

const SwapPage: React.FC = () => {
  const { publicKey, signTransaction } = useWallet();
  const [inputMint, setInputMint] = useState<string>('So11111111111111111111111111111111111111112'); // SOL
  const [outputMint, setOutputMint] = useState<string>('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'); // USDC
  const [amount, setAmount] = useState<number>(100000000); // Example amount in base units
  const [slippage, setSlippage] = useState<number>(50); // 0.5%
  const [quoteResponse, setQuoteResponse] = useState<any>(null); // Adjust type as necessary
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippage}`);
      
      if (!response.ok) throw new Error('Failed to fetch quote');

      const data = await response.json();
      setQuoteResponse(data);
    } catch (err) {
      setError(`Error fetching quote: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = async () => {
    if (!quoteResponse || !publicKey || !signTransaction) {
      setError('Quote response is not available or wallet is not connected');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch swap instructions
      const response = await fetch('https://quote-api.jup.ag/v6/swap-instructions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quoteResponse,
          userPublicKey: publicKey.toBase58(),
        }),
      });

      if (!response.ok) throw new Error('Failed to get swap instructions');

      const { swapTransaction } = await response.json();

      // Deserialize the transaction
      const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

      // Sign the transaction
      const signedTransaction = await signTransaction(transaction);
      const rawTransaction = signedTransaction.serialize();
      const txid = await connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });

      await connection.confirmTransaction(txid);
      setSuccess(`Transaction successful: <a href="https://solscan.io/tx/${txid}" target="_blank" rel="noopener noreferrer">View on Solscan</a>`);
    } catch (err) {
      setError(`Swap failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Swap Tokens</h1>
      <div className="bg-white shadow-md p-4 rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Input Token Mint Address:</label>
          <input
            type="text"
            value={inputMint}
            onChange={(e) => setInputMint(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Output Token Mint Address:</label>
          <input
            type="text"
            value={outputMint}
            onChange={(e) => setOutputMint(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Slippage (BPS):</label>
          <input
            type="number"
            value={slippage}
            onChange={(e) => setSlippage(Number(e.target.value))}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button
          onClick={fetchQuote}
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded"
        >
          {loading ? 'Fetching Quote...' : 'Get Quote'}
        </button>
      </div>
      {quoteResponse && (
        <div className="mt-4 bg-white shadow-md p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Quote Response</h2>
          <pre className="whitespace-pre-wrap bg-gray-100 p-2 rounded">{JSON.stringify(quoteResponse, null, 2)}</pre>
          <button
            onClick={handleSwap}
            disabled={loading}
            className="bg-green-500 text-white p-2 rounded mt-4"
          >
            {loading ? 'Swapping...' : 'Execute Swap'}
          </button>
        </div>
      )}
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {success && <div className="text-green-600 mt-4" dangerouslySetInnerHTML={{ __html: success }} />}
    </div>
  );
};

export default SwapPage;
