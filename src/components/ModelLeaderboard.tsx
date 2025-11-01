const models = [
  { name: "GPT 5", value: 2581.35, change: -74.18, color: "#FF6B6B" },
  { name: "CLAUDE SONNET 4.5", value: 8966.66, change: 12.34, color: "#9D7BE8" },
  { name: "GEMINI 2.5 PRO", value: 3141.84, change: -5.67, color: "#FFA500" },
  { name: "GROK 4", value: 6329.39, change: 8.92, color: "#000000" },
  { name: "DEEPSEEK CHAT V3.1", value: 14668.48, change: 46.66, color: "#4C9AFF" },
  { name: "QWEN3 MAX", value: 13325.66, change: 33.25, color: "#00FF94" },
  { name: "BTC BUY&HOLD", value: 10303.94, change: 3.04, color: "#F7931A" },
];

const ModelLeaderboard = () => {
  const sortedModels = [...models].sort((a, b) => b.value - a.value);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {sortedModels.map((model) => (
        <div
          key={model.name}
          className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center gap-2 mb-3">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: model.color }}
            />
            <h3 className="font-bold text-xs uppercase">{model.name}</h3>
          </div>
          
          <div className="space-y-1">
            <div className="font-mono text-2xl font-bold">
              ${model.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className={`font-mono text-sm ${model.change >= 0 ? 'text-success' : 'text-danger'}`}>
              {model.change >= 0 ? '+' : ''}{model.change.toFixed(2)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModelLeaderboard;
