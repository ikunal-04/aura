"use client"
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { generateAura } from '@/utils/authGenerator';
import { WalletDefault } from '@coinbase/onchainkit/wallet';
import { Sparkles, Zap } from 'lucide-react';

export default function OnChainAura() {
  const searchParams = useSearchParams();
  const [address, setAddress] = useState<string | null>(null);
  const [aura, setAura] = useState<ReturnType<typeof generateAura> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const addressParam = searchParams.get('address');
    if (addressParam) {
      setAddress(addressParam);
      setAura(generateAura(addressParam));
    } else {
      router.push('/');
    }
  }, [searchParams]);

  if (!address || !aura) {
    return <div>No address provided</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute top-4 right-4 z-50">
        <WalletDefault />
      </div>

      <div className="relative w-full max-w-md mx-auto p-8">
        {/* Animated background blur effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-20 blur-3xl" />
        
        <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Your On-Chain Aura
              </h1>
              <p className="text-gray-400 text-sm">
                Based on your galaxy brain transactions
              </p>
            </div>

            {/* Content */}
            <div className="space-y-4">
              {/* Address */}
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Address</span>
                  <span className="text-sm text-gray-300 truncate max-w-[200px]">
                    {address}
                  </span>
                </div>
              </div>

              {/* Vibe */}
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Vibe</span>
                  <span 
                    className="text-xl font-bold"
                    style={{ color: aura.color }}
                  >
                    {aura.vibe}
                  </span>
                </div>
              </div>

              {/* Aura Power */}
              <div className="bg-black/20 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Aura Power</span>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" style={{ color: aura.color }} />
                    <span className="text-xl font-bold text-white">
                      {aura.power}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="bg-black/20 rounded-2xl p-4 text-center">
                <p className="text-gray-300 italic">&quot;{aura.memeQuote}&quot;</p>
              </div>

              {/* Mint Button */}
              <button
                className="w-full rounded-2xl p-4 flex items-center justify-center gap-2 text-white font-semibold transition-all hover:opacity-90"
                style={{
                  background: `linear-gradient(45deg, ${aura.color}, ${adjustColorBrightness(aura.color, 40)})`
                }}
              >
                <Sparkles className="w-5 h-5" />
                Mint Your Aura NFT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for gradient generation
function adjustColorBrightness(color: string, percent: number) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return `#${(1 << 24 | (R < 255 ? R < 1 ? 0 : R : 255) << 16 | (G < 255 ? G < 1 ? 0 : G : 255) << 8 | (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)}`;
}