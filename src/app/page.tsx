'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [address, setAddress] = useState('');
  const router = useRouter();

  const handleCheckScore = () => {
    if (!address) return;
    router.push(`/dashboard?address=${address}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-1000 text-white">
      <h1 className="text-5xl font-bold mb-4">Aura</h1>
      <p className="mb-8 text-lg text-gray-400">Enter your wallet address to see your Aura Score</p>

      <input
        type="text"
        placeholder="0xABC..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="p-3 mb-4 text-black rounded-lg w-64"
      />
      <button
        onClick={handleCheckScore}
        className="bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700"
      >
        Check My Score
      </button>
    </div>
  );
}
