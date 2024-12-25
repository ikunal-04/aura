'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { BrowserWindow } from '@/components/BrowserWindow'
import { RetroButton } from '@/components/RetroButton'
import { AuraEffect } from './components/AuraEffect'
import { MemeBrowser } from './components/MemeBrowser'
import { motion, AnimatePresence } from 'framer-motion'
import ConnectWallett from '@/components/ConnectWallet'

export default function RetroAuraWebsite() {
  const searchParams = useSearchParams()
  const address = searchParams.get('address')
  const [inputValue, setInputValue] = useState(address || '')
  const [auraScore, setAuraScore] = useState<number | null>(null)

  useEffect(() => {
    if (address) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleSubmit(new Event('submit') as any)
    }
  }, [address])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newScore = Math.floor(Math.random() * 100)
    setAuraScore(newScore)
  }

  return (
    <div className="relative min-h-screen bg-[#1a1a2e] p-4">
      {auraScore !== null && <AuraEffect score={auraScore} />}

      <div className="absolute top-4 right-4 z-10">
      <ConnectWallett />
      </div>
      
      <div className="max-w-5xl mx-auto grid gap-4 pt-16">
        {/* Main Input Window */}
        <BrowserWindow title="AURA.ANALYZER/INPUT" variant="dark">
          <div className="bg-[#16213e] p-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-purple-400 mb-2 uppercase tracking-widest">
                Aura Analyzer v1.0
              </h1>
              <div className="bg-purple-400/10 border border-purple-400/50 p-2 text-sm text-gray-300">
                Type your vibe to calculate your aura power level
              </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              <div className="bg-[#1a1a2e] border border-purple-400/50 p-4">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="What's your current vibe?"
                  className="w-full border-2 border-purple-400/50 bg-[#16213e] px-3 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-0"
                />
              </div>
              <RetroButton type="submit" className="w-full" variant="primary">
                Calculate Aura Power
              </RetroButton>
            </form>
          </div>
        </BrowserWindow>

        {/* Results and Meme Windows */}
        <AnimatePresence>
          {auraScore !== null && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.2 }}
              >
                <BrowserWindow title="AURA.ANALYZER/RESULTS" variant="dark">
                  <div className="bg-[#16213e] p-6">
                    <div className="text-center space-y-4">
                      <h2 className="text-3xl font-bold text-purple-400">
                        {auraScore >= 70 ? 'STRONG AURA' : 'WEAK AURA'}
                      </h2>
                      <div className="text-4xl font-bold text-gray-300">
                        +{auraScore * 25} AURA POINTS
                      </div>
                      <div className="h-6 bg-[#1a1a2e] border-2 border-purple-400/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all duration-1000"
                          style={{
                            width: `${auraScore}%`,
                            background: auraScore >= 70 
                              ? 'linear-gradient(90deg, #c084fc, #818cf8)' 
                              : 'linear-gradient(90deg, #ef4444, #7f1d1d)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </BrowserWindow>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: 0.4 }}
                >
                  <MemeBrowser
                    title="AURA.COMPARISON"
                    score={auraScore}
                    type="comparison"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.6 }}
                >
                  <MemeBrowser
                    title="AURA.ACTIVITIES"
                    score={auraScore}
                    type="activities"
                  />
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

