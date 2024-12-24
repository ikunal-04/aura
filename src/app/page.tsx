'use client';
import { useEffect, useState } from 'react';
import ConnectWallett from '@/components/ConnectWallet';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      {/* Main gradient orbs */}
      <div 
        className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
        }}
      />
      <div 
        className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"
        style={{
          animationDelay: '1s',
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
        }}
      />
      
      {/* Additional smaller orbs */}
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1.5s' }}
      />
      <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '2s' }}
      />

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]"
        style={{
          backgroundPosition: `${mousePosition.x * 5}px ${mousePosition.y * 5}px`
        }}
      />

      {/* Dark overlay to ensure content readability */}
      <div className="absolute inset-0 bg-black/70" />
    </div>
  );
};

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      <AnimatedBackground />
      
      {/* Hero text */}
      <div className="absolute top-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Welcome to Aura
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto px-4">
          Check your on-chain reputation score and unlock new possibilities
        </p>
      </div>

      <ConnectWallett />
      
      {/* Footer */}
      <div className="absolute bottom-6 text-gray-500 text-sm">
        Powered by blockchain technology
      </div>
    </div>
  );
}