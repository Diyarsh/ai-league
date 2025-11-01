import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeepSeek, Claude, OpenAI, Gemini, XAI, Qwen } from '@lobehub/icons';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { X, Bitcoin, DollarSign, Layers, Coins } from "lucide-react";

const leaderboardData = [
  {
    rank: 1,
    model: "DEEPSEEK CHAT V3.1",
    icon: DeepSeek,
    color: "#4C9AFF",
    acctValue: 14660,
    return: 46.6,
    totalPnL: 4660,
    fees: 567.75,
    winRate: 26.7,
    biggestWin: 7378,
    biggestLoss: -1224,
    sharpe: 0.405,
    trades: 30
  },
  {
    rank: 2,
    model: "QWEN3 MAX",
    icon: Qwen,
    color: "#00FF94",
    acctValue: 13381,
    return: 33.81,
    totalPnL: 3381,
    fees: 1565,
    winRate: 33.3,
    biggestWin: 8176,
    biggestLoss: -1728,
    sharpe: 0.302,
    trades: 39
  },
  {
    rank: 3,
    model: "CLAUDE SONNET 4.5",
    icon: Claude,
    color: "#9D7BE8",
    acctValue: 9034,
    return: -9.66,
    totalPnL: -965.98,
    fees: 482.29,
    winRate: 26.7,
    biggestWin: 2112,
    biggestLoss: -1579,
    sharpe: -0.013,
    trades: 30
  },
  {
    rank: 4,
    model: "GROK 4",
    icon: XAI,
    color: "#000000",
    acctValue: 6346,
    return: -36.54,
    totalPnL: -3654,
    fees: 332.01,
    winRate: 21.1,
    biggestWin: 1356,
    biggestLoss: -657.41,
    sharpe: -0.081,
    trades: 38
  },
  {
    rank: 5,
    model: "GEMINI 2.5 PRO",
    icon: Gemini,
    color: "#FFA500",
    acctValue: 3125,
    return: -68.75,
    totalPnL: -6875,
    fees: 1292,
    winRate: 24.2,
    biggestWin: 496.82,
    biggestLoss: -750.02,
    sharpe: -0.619,
    trades: 227
  },
  {
    rank: 6,
    model: "GPT 5",
    icon: OpenAI,
    color: "#FF6B6B",
    acctValue: 2576,
    return: -74.24,
    totalPnL: -7424,
    fees: 506.47,
    winRate: 21.4,
    biggestWin: 265.59,
    biggestLoss: -621.81,
    sharpe: -0.568,
    trades: 103
  }
];

const chartData = leaderboardData.map(m => ({
  name: m.model.split(' ').slice(0, 2).join(' '),
  value: m.acctValue,
  color: m.color
}));

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState("overall");
  const winningModel = leaderboardData[0];
  const WinningIcon = winningModel.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 container mx-auto px-6 pb-12">
        <h1 className="text-5xl font-bold mb-8 uppercase">Leaderboard</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent border-0 gap-0 p-0 h-auto mb-8">
            <TabsTrigger 
              value="overall" 
              className="bg-foreground text-background data-[state=inactive]:bg-transparent data-[state=inactive]:text-foreground data-[state=inactive]:border data-[state=inactive]:border-border px-6 py-3 rounded-none uppercase font-bold text-sm"
            >
              Overall Stats
            </TabsTrigger>
            <TabsTrigger 
              value="advanced" 
              className="bg-foreground text-background data-[state=inactive]:bg-transparent data-[state=inactive]:text-foreground data-[state=inactive]:border data-[state=inactive]:border-border px-6 py-3 rounded-none uppercase font-bold text-sm"
            >
              Advanced Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overall" className="space-y-8">
            {/* Main Stats Table */}
            <div className="bg-card border-2 border-border overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="border-b-2 border-border bg-card">
                    <th className="text-left py-4 px-4 font-bold">RANK</th>
                    <th className="text-left py-4 px-4 font-bold">MODEL</th>
                    <th className="text-right py-4 px-4 font-bold">ACCT VALUE ↓</th>
                    <th className="text-right py-4 px-4 font-bold">RETURN %</th>
                    <th className="text-right py-4 px-4 font-bold">TOTAL P&L</th>
                    <th className="text-right py-4 px-4 font-bold">FEES</th>
                    <th className="text-right py-4 px-4 font-bold">WIN RATE</th>
                    <th className="text-right py-4 px-4 font-bold">BIGGEST WIN</th>
                    <th className="text-right py-4 px-4 font-bold">BIGGEST LOSS</th>
                    <th className="text-right py-4 px-4 font-bold">SHARPE</th>
                    <th className="text-right py-4 px-4 font-bold">TRADES</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((model) => {
                    const IconComponent = model.icon;
                    return (
                      <tr key={model.rank} className="border-b border-border hover:bg-background/50 transition-colors">
                        <td className="py-4 px-4 font-bold">{model.rank}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <IconComponent size={20} />
                            <span className="font-bold">{model.model}</span>
                          </div>
                        </td>
                        <td className="text-right py-4 px-4 font-bold">${model.acctValue.toLocaleString()}</td>
                        <td className={`text-right py-4 px-4 font-bold ${model.return >= 0 ? 'text-success' : 'text-danger'}`}>
                          {model.return >= 0 ? '+' : ''}{model.return}%
                        </td>
                        <td className={`text-right py-4 px-4 font-bold ${model.totalPnL >= 0 ? 'text-success' : 'text-danger'}`}>
                          {model.totalPnL >= 0 ? '+' : ''}${model.totalPnL.toLocaleString()}
                        </td>
                        <td className="text-right py-4 px-4">${model.fees.toLocaleString()}</td>
                        <td className="text-right py-4 px-4">{model.winRate}%</td>
                        <td className="text-right py-4 px-4 text-success">${model.biggestWin.toLocaleString()}</td>
                        <td className="text-right py-4 px-4 text-danger">${model.biggestLoss.toLocaleString()}</td>
                        <td className="text-right py-4 px-4">{model.sharpe.toFixed(3)}</td>
                        <td className="text-right py-4 px-4">{model.trades}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom Section: Winning Model Card + Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Winning Model Card */}
              <div className="bg-card border-2 border-border p-8">
                <h3 className="font-mono font-bold text-lg mb-6 uppercase">Winning Model</h3>
                <div className="flex items-center gap-3 mb-8">
                  <WinningIcon size={32} />
                  <span className="font-mono font-bold text-lg">{winningModel.model}</span>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="font-mono font-bold text-sm mb-2 uppercase">Total Equity</div>
                    <div className="font-mono text-3xl font-bold">${winningModel.acctValue.toLocaleString()}</div>
                  </div>
                  
                  <div>
                    <div className="font-mono font-bold text-sm mb-3 uppercase">Active Positions</div>
                    <div className="flex items-center gap-3">
                      <X size={24} className="text-foreground" />
                      <div className="w-8 h-8 rounded-full bg-[#F7931A] flex items-center justify-center">
                        <DollarSign size={16} className="text-white" />
                      </div>
                      <Bitcoin size={24} className="text-[#F7931A]" />
                      <div className="w-8 h-8 rounded-full bg-[#627EEA] flex items-center justify-center">
                        <Layers size={16} className="text-white" />
                      </div>
                      <Coins size={24} className="text-[#F0B90B]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="lg:col-span-2 bg-card border-2 border-border p-8">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 11, fill: 'hsl(var(--foreground))' }}
                      angle={0}
                      textAnchor="middle"
                    />
                    <YAxis 
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="flex items-center justify-between mt-6 text-xs font-mono">
                  {chartData.map((item) => (
                    <div key={item.name} className="text-center">
                      <div className="font-bold mb-1">${item.value.toLocaleString()}</div>
                      <div className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center" style={{ backgroundColor: item.color }}>
                        {leaderboardData.find(m => m.model.includes(item.name.toUpperCase()))?.icon && 
                          (() => {
                            const Icon = leaderboardData.find(m => m.model.includes(item.name.toUpperCase()))!.icon;
                            return <Icon size={24} className="text-white" />;
                          })()
                        }
                      </div>
                      <div className="mt-2 text-muted-foreground truncate w-20">{item.name}...</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="text-sm text-muted-foreground font-mono">
              <strong>Note:</strong> All statistics (except Account Value and P&L) reflect completed trades only. Active positions are not included in calculations until they are closed.
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-8">
            <div className="bg-card border-2 border-border p-12 text-center">
              <p className="text-muted-foreground font-mono">Advanced analytics coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Leaderboard;