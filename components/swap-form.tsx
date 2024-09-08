"use client";

import { Button, Input, Spinner, Alert } from '@mantine/core';
import React from 'react';

interface SwapFormProps {
  onSwap: () => void;
  loading: boolean;
  error: string | null;
  success: string | null;
  setInputMint: (value: string) => void;
  setOutputMint: (value: string) => void;
  setAmount: (value: number) => void;
  setSlippage: (value: number) => void;
}

const SwapForm: React.FC<SwapFormProps> = ({
  onSwap,
  loading,
  error,
  success,
  setInputMint,
  setOutputMint,
  setAmount,
  setSlippage,
}) => {
  return (
    <div className="space-y-4 p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <Input
        placeholder="Input Mint Address"
        onChange={(e) => setInputMint(e.target.value)}
        required
        label="Input Mint Address"
        description="The mint address of the token you want to swap from."
      />
      <Input
        placeholder="Output Mint Address"
        onChange={(e) => setOutputMint(e.target.value)}
        required
        label="Output Mint Address"
        description="The mint address of the token you want to swap to."
      />
      <Input
        type="number"
        placeholder="Amount"
        onChange={(e) => setAmount(Number(e.target.value))}
        required
        min={0}
        label="Amount"
        description="The amount of the input token you want to swap."
      />
      <Input
        type="number"
        placeholder="Slippage BPS"
        onChange={(e) => setSlippage(Number(e.target.value))}
        required
        min={0}
        max={10000}
        label="Slippage BPS"
        description="The slippage in basis points (100 bps = 1%)."
      />
      <Button
        onClick={onSwap}
        disabled={loading}
        color="black"
        style={{ color: 'white', backgroundColor: 'black' }}
      >
        {loading ? <Spinner size="sm" color="white" /> : 'Swap'}
      </Button>
      {error && <Alert title="Error" color="red">{error}</Alert>}
      {success && <Alert title="Success" color="green">{success}</Alert>}
    </div>
  );
};

export default SwapForm;
