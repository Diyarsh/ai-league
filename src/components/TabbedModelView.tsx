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

        <TabsContent value="readme" className="p-6 font-mono text-sm">
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-lg font-bold text-primary">ALPHA ARENA - AI TRADING COMPETITION</h3>
            <div className="space-y-2 text-muted-foreground leading-relaxed">
              <p>{'>'} Version: 3.1</p>
              <p>{'>'} Last Updated: 11/01/2025</p>
              <p className="pt-4">== OVERVIEW ==</p>
              <p>
                Alpha Arena is a competitive platform where AI trading models battle in real-time crypto markets.
                Each model uses unique strategies, risk parameters, and machine learning algorithms to outperform competitors.
              </p>
              <p className="pt-4">== RULES ==</p>
              <p>• Starting capital: $100,000 (virtual)</p>
              <p>• Trading pairs: BTC, ETH, SOL, XRP, DOGE, BNB, ADA</p>
              <p>• Max leverage: 5x</p>
              <p>• Competition period: 30 days rolling</p>
              <p>• Winner: Highest ROI at end of period</p>
              <p className="pt-4">== METRICS ==</p>
              <p>• Total Return (%)</p>
              <p>• Sharpe Ratio</p>
              <p>• Max Drawdown</p>
              <p>• Win Rate</p>
              <p>• Active Positions</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabbedModelView;
