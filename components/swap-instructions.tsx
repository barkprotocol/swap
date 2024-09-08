"use client";

import React, { useState } from 'react';
import { Connection, PublicKey, VersionedTransaction, TransactionMessage } from '@solana/web3.js';
import fetch from 'cross-fetch';
import { useWallet } from '@solana/wallet-adapter-react';
import { deserializeInstruction, getAddressLookupTableAccounts } from '../utils/transaction';
import { Button, Alert, Spinner } from '@mantine/core';

// Ensure the connection URL is configured correctly in your environment variables
const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com');

interface SwapInstructionsProps {
  quoteResponse: any; // Adjust this type as per your actual response type
}

const SwapInstructions: React.FC<SwapInstructionsProps> = ({ quoteResponse }) => {
  const { publicKey, signTransaction } = useWallet();
  const [instructions, setInstructions] = useState<any | null>(null); // Adjust type as necessary
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchInstructions = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!publicKey) throw new Error('Wallet not connected');

      // Fetch swap instructions
      const response = await fetch('https://quote-api.jup.ag/v6/swap-instructions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quoteResponse, userPublicKey: publicKey.toBase58() }),
      });

      if (!response.ok) throw new Error('Failed to fetch swap instructions');
      
      const instructionsData = await response.json();
      setInstructions(instructionsData);

      // Extract necessary details from instructionsData
      const {
        setupInstructions = [],
        swapInstruction: swapInstructionPayload,
        cleanupInstruction,
        addressLookupTableAddresses = []
      } = instructionsData;

      // Fetch address lookup table accounts
      const addressLookupTableAccounts = await getAddressLookupTableAccounts(connection, addressLookupTableAddresses);
      const blockhash = (await connection.getLatestBlockhash()).blockhash;

      // Create transaction message
      const messageV0 = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: blockhash,
        instructions: [
          ...setupInstructions.map(deserializeInstruction),
          deserializeInstruction(swapInstructionPayload),
          cleanupInstruction ? deserializeInstruction(cleanupInstruction) : undefined,
        ].filter(Boolean),
      }).compileToV0Message(addressLookupTableAccounts);

      // Create and send transaction
      const transaction = new VersionedTransaction(messageV0);

      if (signTransaction) {
        const signedTransaction = await signTransaction(transaction);
        const rawTransaction = signedTransaction.serialize();
        const txid = await connection.sendRawTransaction(rawTransaction, {
          skipPreflight: true,
          maxRetries: 2,
        });
        await connection.confirmTransaction(txid);
        setSuccess(`Transaction successful: <a href="https://solscan.io/tx/${txid}" target="_blank" rel="noopener noreferrer">View on Solscan</a>`);
      } else {
        throw new Error('Failed to sign transaction');
      }
    } catch (err: any) {
      setError(`Swap failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white shadow-md rounded-lg">
      <Button
        onClick={fetchInstructions}
        disabled={loading}
        color="dark"
        variant="filled"
        style={{ color: 'white', backgroundColor: 'black' }}
      >
        {loading ? <Spinner size="sm" /> : 'Fetch and Execute Swap Instructions'}
      </Button>
      {error && <Alert title="Error" color="red">{error}</Alert>}
      {success && <Alert title="Success" color="green" dangerouslySetInnerHTML={{ __html: success }} />}
    </div>
  );
};

export default SwapInstructions;
