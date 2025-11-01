import { useEffect, useState } from "react";

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

const cryptoData: CryptoData[] = [
  { symbol: "BTC", name: "Bitcoin", price: 110097.50, change: 2.45 },
  { symbol: "ETH", name: "Ethereum", price: 3857.85, change: -1.23 },
  { symbol: "SOL", name: "Solana", price: 185.74, change: 5.67 },
  { symbol: "BNB", name: "BNB", price: 1087.45, change: -0.89 },
  { symbol: "DOGE", name: "Dogecoin", price: 0.1864, change: 3.21 },
  { symbol: "XRP", name: "Ripple", price: 2.50, change: -2.15 },
];

const CryptoTicker = () => {
  const [prices, setPrices] = useState(cryptoData);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => prev.map(crypto => ({
        ...crypto,
        price: crypto.price * (1 + (Math.random() - 0.5) * 0.002),
        change: crypto.change + (Math.random() - 0.5) * 0.5,
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const tickerItems = [...prices, ...prices];

  return (
    <div className="w-full overflow-hidden bg-card border-y border-border">
      <div className="flex animate-scroll">
        {tickerItems.map((crypto, index) => (
          <div
            key={`${crypto.symbol}-${index}`}
            className="flex items-center gap-3 px-8 py-3 border-r border-border whitespace-nowrap"
          >
            <span className="font-bold text-sm">{crypto.symbol}</span>
            <span className="font-mono text-sm">
              ${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className={`font-mono text-xs ${crypto.change >= 0 ? 'text-success' : 'text-danger'}`}>
              {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default CryptoTicker;
