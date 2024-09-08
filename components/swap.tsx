"use client";

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button, Input, Loader, Alert } from '@mantine/core';
import SwapInstructions from './swap-instructions'; // Ensure this path is correct

const Swap: React.FC = () => {
  const { publicKey } = useWallet();
  const [inputMint, setInputMint] = useState<string>('So11111111111111111111111111111111111111112'); // Default SOL mint
  const [outputMint, setOutputMint] = useState<string>('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'); // Default USDC mint
  const [amount, setAmount] = useState<number>(100000000); // Example amount in base units
  const [slippage, setSlippage] = useState<number>(50); // 0.5%
  const [quoteResponse, setQuoteResponse] = useState<any>(null); // Adjust type as necessary
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippage}`);

      if (!response.ok) throw new Error('Failed to fetch quote');

      const data = await response.json();
      setQuoteResponse(data);
    } catch (err: any) {
      setError(`Error fetching quote: ${err.message}`);
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
          <Input
            value={inputMint}
            onChange={(e) => setInputMint(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Output Token Mint Address:</label>
          <Input
            value={outputMint}
            onChange={(e) => setOutputMint(e.target.value)}
            className="mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount:</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Slippage (BPS):</label>
          <Input
            type="number"
            value={slippage}
            onChange={(e) => setSlippage(Number(e.target.value))}
            className="mt-1"
          />
        </div>
        <Button
          onClick={fetchQuote}
          disabled={loading}
          color="dark"
          variant="filled"
          style={{ color: 'white', backgroundColor: 'black' }}
        >
          {loading ? <Loader size="sm" /> : 'Get Quote'}
        </Button>
        {error && <Alert title="Error" color="red" className="mt-4">{error}</Alert>}
      </div>
      {quoteResponse && (
        <SwapInstructions quoteResponse={quoteResponse} />
      )}
    </div>
  );
};

export default Swap;
