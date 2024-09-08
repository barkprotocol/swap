"use client";

import React from 'react';
import Link from 'next/link';

// Define constants directly in the file
const HERO_TITLE = "Welcome to BarkSwap";
const HERO_DESCRIPTION =
  "Unlock the power of Solana with BarkSwap. Trade SPL tokens, discover unique assets, and mint your own NFTs backed by real-world value. Start your trading journey and explore new opportunities today!";
const TRADE_BUTTON_TEXT = "Start Trading";
const DASHBOARD_BUTTON_TEXT = "User Dashboard";

export default function AppHero() {
  return (
    <div className="hero py-16 md:py-32 bg-gray-900 text-white">
      <div className="hero-content text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold">{HERO_TITLE}</h1>
          <p className="py-6 text-lg md:text-xl">{HERO_DESCRIPTION}</p>
          <div className="flex justify-center gap-4">
            <Link href="/swap">
              <a className="btn btn-primary bg-black-600 hover:bg-black-700 text-white" aria-label={TRADE_BUTTON_TEXT}>
                {TRADE_BUTTON_TEXT}
              </a>
            </Link>
            <Link href="/dashboard">
              <a className="btn btn-secondary bg-gray-700 hover:bg-gray-800 text-white" aria-label={DASHBOARD_BUTTON_TEXT}>
                {DASHBOARD_BUTTON_TEXT}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
