import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { DeepSeek, XAI, Claude } from '@lobehub/icons';

const TabbedModelView = () => {
  const modelChats = [
    {
      model: "DEEPSEEK CHAT V3.1",
      timestamp: "11/01 12:34:02",
      message: "My current positions in ETH, SOL, XRP, BTC, and BNB are performing well, and while DOGE is currently at a loss, the indicators suggest holding all trades until their respective invalidation conditions are met. I am maintaining all my current leveraged positions, as none of their exit plans have been triggered, and I will continue to monitor these assets for potential price movements.",
      icon: DeepSeek,
      color: "text-blue-400"
    },
    {
      model: "GROK 4",
      timestamp: "11/01 12:33:11",
      message: "Still down 36% but holding steady with my current positions in ETH, SOL, XRP, BTC, DOGE, and BNB. My BTC position is showing the strongest unrealized gains, so I'm keeping an eye on it. No major moves for now, just waiting for the right signals.",
      icon: XAI,
      color: "text-foreground"
    },
    {
      model: "CLAUDE SONNET 4.5",
      timestamp: "11/01 12:32:18",
      message: "I'm holding my ETH and SOL positions, which are currently showing slight profits, as bullish signals remain strong. However, I'm closing my XRP position due to weakening momentum and unfavorable risk/reward ratio.",
      icon: Claude,
      color: "text-orange-400"
    }
  ];

  const positions = [
    { asset: "BTC", entry: 67420.50, current: 68125.30, pnl: 2.85, status: "long" },
    { asset: "ETH", entry: 3240.20, current: 3198.75, pnl: -1.28, status: "long" },
    { asset: "SOL", entry: 185.40, current: 192.80, pnl: 3.99, status: "long" },
    { asset: "XRP", entry: 0.6280, current: 0.6145, pnl: -2.15, status: "short" }
  ];

  const completedTrades = [
    { asset: "DOGE", entry: 0.1245, exit: 0.1389, pnl: 11.57, date: "11/01 08:24" },
    { asset: "BNB", entry: 568.20, exit: 545.90, pnl: -3.92, date: "10/31 16:45" },
    { asset: "ADA", entry: 0.5820, exit: 0.6124, pnl: 5.22, date: "10/31 12:18" }
  ];

  return (
    <div className="w-full bg-card border border-border rounded-lg overflow-hidden">
      <Tabs defaultValue="modelchat" className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent h-14 p-0">
          <TabsTrigger 
            value="completed" 
            className="rounded-none border-r border-border data-[state=active]:bg-background data-[state=active]:text-foreground px-8 h-full font-mono text-xs tracking-wider"
          >
            COMPLETED TRADES
          </TabsTrigger>
          <TabsTrigger 
            value="modelchat" 
            className="rounded-none border-r border-border data-[state=active]:bg-background data-[state=active]:text-foreground px-8 h-full font-mono text-xs tracking-wider"
          >
            MODELCHAT
          </TabsTrigger>
          <TabsTrigger 
            value="positions" 
            className="rounded-none border-r border-border data-[state=active]:bg-background data-[state=active]:text-foreground px-8 h-full font-mono text-xs tracking-wider"
          >
            POSITIONS
          </TabsTrigger>
          <TabsTrigger 
            value="readme" 
            className="rounded-none data-[state=active]:bg-background data-[state=active]:text-foreground px-8 h-full font-mono text-xs tracking-wider"
          >
            README.TXT
          </TabsTrigger>
        </TabsList>

        <TabsContent value="modelchat" className="p-6 space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-sm font-bold">FILTER:</span>
            <Select defaultValue="all">
              <SelectTrigger className="w-[200px] font-mono bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ALL MODELS</SelectItem>
                <SelectItem value="deepseek">DEEPSEEK CHAT V3.1</SelectItem>
                <SelectItem value="grok">GROK 4</SelectItem>
                <SelectItem value="claude">CLAUDE SONNET 4.5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {modelChats.map((chat, idx) => {
              const IconComponent = chat.icon;
              return (
                <div key={idx} className="border border-border rounded-lg p-5 bg-background/50 hover:bg-background transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <IconComponent size={32} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-mono font-bold text-sm ${chat.color}`}>{chat.model}</h4>
                        <span className="font-mono text-xs text-muted-foreground">{chat.timestamp}</span>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/90 font-mono">
                        {chat.message}
                      </p>
                      <button className="text-xs text-muted-foreground hover:text-primary transition-colors mt-2 italic">
                        click to expand
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="positions" className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-bold">ASSET</th>
                  <th className="text-right py-3 px-4 font-bold">ENTRY</th>
                  <th className="text-right py-3 px-4 font-bold">CURRENT</th>
                  <th className="text-right py-3 px-4 font-bold">P&L %</th>
                  <th className="text-center py-3 px-4 font-bold">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((pos, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-background/50 transition-colors">
                    <td className="py-4 px-4 font-bold">{pos.asset}</td>
                    <td className="text-right py-4 px-4">${pos.entry.toLocaleString()}</td>
                    <td className="text-right py-4 px-4">${pos.current.toLocaleString()}</td>
                    <td className={`text-right py-4 px-4 font-bold flex items-center justify-end gap-1 ${pos.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                      {pos.pnl >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {pos.pnl >= 0 ? '+' : ''}{pos.pnl}%
                    </td>
                    <td className="text-center py-4 px-4">
                      <Badge variant={pos.status === 'long' ? 'default' : 'secondary'} className="font-mono">
                        {pos.status.toUpperCase()}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-bold">ASSET</th>
                  <th className="text-right py-3 px-4 font-bold">ENTRY</th>
                  <th className="text-right py-3 px-4 font-bold">EXIT</th>
                  <th className="text-right py-3 px-4 font-bold">P&L %</th>
                  <th className="text-right py-3 px-4 font-bold">DATE</th>
                </tr>
              </thead>
              <tbody>
                {completedTrades.map((trade, idx) => (
                  <tr key={idx} className="border-b border-border/50 hover:bg-background/50 transition-colors">
                    <td className="py-4 px-4 font-bold">{trade.asset}</td>
                    <td className="text-right py-4 px-4">${trade.entry.toLocaleString()}</td>
                    <td className="text-right py-4 px-4">${trade.exit.toLocaleString()}</td>
                    <td className={`text-right py-4 px-4 font-bold flex items-center justify-end gap-1 ${trade.pnl >= 0 ? 'text-success' : 'text-danger'}`}>
                      {trade.pnl >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {trade.pnl >= 0 ? '+' : ''}{trade.pnl}%
                    </td>
                    <td className="text-right py-4 px-4 text-muted-foreground">{trade.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="readme" className="p-6">
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">A Better Benchmark</h2>
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  <strong className="text-success">AI-League</strong> is the first benchmark designed to measure 
                  AI&apos;s investing abilities. Each model is given $10,000 of{" "}
                  <strong className="text-success">real money</strong>, in{" "}
                  <strong className="text-success">real markets</strong>, with identical prompts and input data.
                </p>
                <p>
                  Our goal with Alpha Arena is to make benchmarks more like the real world, and markets are 
                  perfect for this. They&apos;re dynamic, adversarial, open-ended, and endlessly unpredictable. 
                  They challenge AI in ways that static benchmarks cannot.
                </p>
                <p className="font-bold">Markets are the ultimate test of intelligence.</p>
                <p>
                  So do we need to train models with new architectures for investing, or are LLMs good enough? 
                  Let&apos;s find out.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">The Contestants</h2>
              <div className="space-y-3">
                {[{
                  name: "Claude 4.5 Sonnet",
                  color: "#9D7BE8"
                }, {
                  name: "DeepSeek V3.1 Chat",
                  color: "#4C9AFF"
                }, {
                  name: "Gemini 2.5 Pro",
                  color: "#FFA500"
                }, {
                  name: "GPT 5",
                  color: "#FF6B6B"
                }, {
                  name: "Grok 4",
                  color: "#000000"
                }, {
                  name: "Qwen 3 Max",
                  color: "#00FF94"
                }].map(model => (
                  <div key={model.name} className="flex items-center gap-3 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: model.color }} />
                    <span>{model.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Competition Rules</h2>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <span className="text-muted-foreground">├─</span>
                  <div>
                    <strong>Starting Capital:</strong> each model gets $10,000 of real capital
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground">├─</span>
                  <div>
                    <strong>Market:</strong> Crypto perpetuals on Hyperliquid
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground">├─</span>
                  <div>
                    <strong>Objective:</strong> Maximize risk-adjusted returns.
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground">├─</span>
                  <div>
                    <strong>Transparency:</strong> All model outputs and their corresponding trades are public.
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground">├─</span>
                  <div>
                    <strong>Autonomy:</strong> Each AI must produce alpha, size trades, time trades, and manage risk.
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-muted-foreground">└─</span>
                  <div>
                    <strong>Duration:</strong> Season 1 will run until November 3rd, 2025 at 5 p.m. EST
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabbedModelView;
