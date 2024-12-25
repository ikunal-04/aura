/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserWindow } from '@/components/BrowserWindow'

interface MemeBrowserProps {
  title: string
  score: number
  type: 'comparison' | 'activities'
}

export function MemeBrowser({ title, score, type }: MemeBrowserProps) {
  const getComparison = (score: number) => {
    if (score < 30) return {
      text: "pushing a pull door (-1000 aura)",
      description: "bruh moment detected"
    }
    if (score < 60) return {
      text: "using light mode IDE (+500 aura)",
      description: "at least you're trying"
    }
    if (score < 90) return {
      text: "helping someone debug their code (+2000 aura)",
      description: "absolute chad behavior"
    }
    return {
      text: "fixing a bug by restarting the computer (+∞ aura)",
      description: "enlightened being detected"
    }
  }

  const getActivities = (score: number) => {
    if (score < 30) return {
      text: "Your aura is so weak, it couldn't even load this message",
      activities: ["✗ can't center a div", "✗ struggles with CSS", "✗ uses light mode"]
    }
    if (score < 60) return {
      text: "Your aura is getting there",
      activities: ["✓ can use console.log()", "✓ knows what CSS is", "✗ still uses var"]
    }
    if (score < 90) return {
      text: "Your aura is pretty strong",
      activities: ["✓ writes clean code", "✓ uses dark mode", "✓ helps others"]
    }
    return {
      text: "Your aura is legendary",
      activities: ["✓ debugs in production", "✓ codes in binary", "✓ doesn't need Stack Overflow"]
    }
  }

  const content = type === 'comparison' 
    ? getComparison(score) 
    : getActivities(score)

  return (
    <BrowserWindow title={title} variant="dark">
      <div className="bg-[#16213e] p-6">
        {type === 'comparison' ? (
            <div className="space-y-4">
                <div className="bg-purple-400/10 border-2 border-purple-400/50 p-4 text-center">
                    <p className="text-lg font-bold text-gray-300">{content.text}</p>
                </div>
                <div className="bg-[#1a1a2e] border-2 border-purple-400/50 p-4 text-center">
                    <p className="text-gray-400">{(content as { text: string; description: string; }).description}</p>
                </div>
            </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-purple-400/10 border-2 border-purple-400/50 p-4 text-center">
              <p className="text-lg font-bold text-gray-300">{content.text}</p>
            </div>
            <div className="space-y-2">
              {(content as any).activities.map((activity: string, i: number) => (
                <div 
                  key={i}
                  className="bg-[#1a1a2e] border-2 border-purple-400/50 p-2 text-gray-300"
                >
                  {activity}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </BrowserWindow>
  )
}

