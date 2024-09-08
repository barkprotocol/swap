import React from 'react';
import ConnectButton from "@/components/connect-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "BARK",
  description: "BarkSwap - Trade and Mint SPL Tokens",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col">
            <nav className="w-full flex justify-between items-center border-b border-b-foreground/10 h-16 p-3 px-5">
              <div className="flex items-center gap-5 font-semibold text-sm">
                <Link href="/" className="hover:underline">
                  BARK
                </Link>
                <ConnectButton />
              </div>
              <div className="flex items-center gap-2">
                {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
              </div>
            </nav>

            <div className="flex-1 flex flex-col items-center gap-20 max-w-5xl mx-auto p-5">
              {children}
            </div>

            <footer className="w-full border-t border-foreground/10 py-16 text-center text-xs">
              <p>
                Powered by{" "}
                <a
                  href="https://solana.com/"
                  target="_blank"
                  className="font-bold hover:underline"
                  rel="noreferrer"
                >
                  Solana
                </a>
              </p>
              <ThemeSwitcher />
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
