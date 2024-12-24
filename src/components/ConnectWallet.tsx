'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import {
  Wallet,
  ConnectWallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
} from '@coinbase/onchainkit/identity';
import { color } from '@coinbase/onchainkit/theme';

export default function ConnectWallett() {
  const [manualAddress, setManualAddress] = useState<string>('');
  const router = useRouter();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (typeof window !== 'undefined' && isConnected && address) {
      router.push(`/base/points?address=${address}`);
    }
  }, [isConnected, address, router]);

  const handleManualCheck = () => {
    const trimmedAddress = manualAddress.trim();
    if (trimmedAddress) {
      router.push(`/base/points?address=${trimmedAddress}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative w-[420px] p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-black/30">
        {/* Gradient orbs */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Aura
          </h1>
          <p className="text-gray-400 mb-8">
            Connect your Base wallet or enter an address to check your score
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="0xABC..."
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
              />
              <Button
                onClick={handleManualCheck}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
              >
                Check Score
              </Button>
            </div>
          </div>

          <div className="w-full">
            <Wallet>
              <ConnectWallet>
                <Avatar className="h-6 w-6" />
                <Name />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address className={color.foregroundMuted} />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        </div>
      </div>
    </div>
  );
}
