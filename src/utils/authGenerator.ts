export function generateAura(address: string): {
    color: string;
    vibe: string;
    power: number;
    memeQuote: string;
  } {
    
    const hash = address.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
  
    const colors = ['#FF69B4', '#00FFFF', '#FF4500', '#32CD32', '#FFD700'];
    const vibes = ['HODL', 'To the Moon', 'Diamond Hands', 'Degen', 'Based'];
    const memeQuotes = [
      "Wen Lambo?",
      "Sir, this is a Wendy's",
      "I'm not a cat",
      "Stonks only go up",
      "This is fine"
    ];
  
    return {
      color: colors[Math.abs(hash) % colors.length],
      vibe: vibes[Math.abs(hash) % vibes.length],
      power: (Math.abs(hash) % 100) + 1,
      memeQuote: memeQuotes[Math.abs(hash) % memeQuotes.length]
    };
  }
  
  