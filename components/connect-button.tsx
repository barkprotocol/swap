"use client";

import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from './ui/button';

export default function ConnectButton() {
  return (
    <div className="flex items-center gap-2">
      <WalletMultiButton
        className="flex items-center gap-2"
        style={{
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 16px',
        }}
      >
        <svg
          className="h-3 w-3"
          viewBox="0 0 76 65"
          fill="hsl(var(--background)/1)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="inherit" />
        </svg>
        <span>Connect Wallet</span>
      </WalletMultiButton>
    </div>
  );
}
