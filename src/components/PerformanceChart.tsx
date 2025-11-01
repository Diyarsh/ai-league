import { useState, useEffect } from "react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DeepSeek, Claude, OpenAI, Gemini, XAI } from '@lobehub/icons';
const models = [{
  name: 'DeepSeek V3.1',
  color: '#4C9AFF',
  volatility: 0.015,
  icon: DeepSeek
}, {
  name: 'Claude 4.5',
  color: '#9D7BE8',
  volatility: 0.012,
  icon: Claude
}, {
  name: 'GPT 5',
  color: '#FF6B6B',
  volatility: 0.018,
  icon: OpenAI
}, {
  name: 'Gemini 2.5 Pro',
  color: '#FFA500',
  volatility: 0.010,
  icon: Gemini
}, {
  name: 'Grok 4',
  color: '#000000',
  volatility: 0.020,
  icon: XAI
}];
const generateChartData = (hours: number, isLive: boolean = false) => {
  const data = [];
  const startDate = new Date();
  startDate.setHours(startDate.getHours() - hours);
  const dataPoints = hours === 72 ? 72 : 100;
  for (let i = 0; i < dataPoints; i++) {
    const date = new Date(startDate);
    date.setHours(startDate.getHours() + i * (hours / dataPoints));
    const point: any = {
      date: hours === 72 ? date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit'
      }) : date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit'
      })
    };
    models.forEach((model, idx) => {
      const baseValue = 10000 + idx * 500;
      const trend = i * (idx % 2 === 0 ? 50 : -30);
      const noise = (Math.random() - 0.5) * baseValue * model.volatility;
      point[model.name] = Math.max(5000, baseValue + trend + noise);
    });
    data.push(point);
  }
  return data;
};
const CustomDot = (props: any) => {
  const {
    cx,
    cy,
    payload,
    dataKey,
    index,
    data
  } = props;

  // Only show icon on the last data point
  if (index !== data.length - 1) return null;
  const model = models.find(m => m.name === dataKey);
  if (!model) return null;
  const IconComponent = model.icon;
  return <g>
      <foreignObject x={cx - 16} y={cy - 16} width={32} height={32}>
        <div className="w-8 h-8 rounded-full bg-card border-2 flex items-center justify-center shadow-lg" style={{
        borderColor: model.color
      }}>
          <IconComponent size={16} />
        </div>
      </foreignObject>
    </g>;
};
const PerformanceChart = () => {
  const [timeRange, setTimeRange] = useState<'all' | '72h'>('all');
  const [chartData, setChartData] = useState(generateChartData(300));
  const [isLive, setIsLive] = useState(false);
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setChartData(prevData => {
        const newData = [...prevData];
        const lastPoint = newData[newData.length - 1];
        const date = new Date();
        const newPoint: any = {
          date: date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit'
          })
        };
        models.forEach(model => {
          const lastValue = lastPoint[model.name];
          const noise = (Math.random() - 0.5) * lastValue * model.volatility * 2;
          newPoint[model.name] = Math.max(5000, lastValue + noise);
        });

        // Keep last 100 points for 'all', last 72 for '72h'
        const maxPoints = timeRange === '72h' ? 72 : 100;
        const updatedData = [...newData.slice(-(maxPoints - 1)), newPoint];
        return updatedData;
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isLive, timeRange]);
  const handleTimeRangeChange = (range: 'all' | '72h') => {
    setTimeRange(range);
    setIsLive(false);
    const hours = range === '72h' ? 72 : 300;
    setChartData(generateChartData(hours));
  };
  const toggleLiveTrading = () => {
    setIsLive(!isLive);
  };
  return <div className="w-full h-[600px] bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">TOTAL ACCOUNT VALUE</h2>
          {isLive && <div className="flex items-center gap-2 px-3 py-1 bg-success/10 rounded-full border border-success/20">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-mono font-bold text-success">LIVE</span>
            </div>}
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleTimeRangeChange('all')} className={`px-4 py-2 rounded text-sm font-medium transition-colors ${timeRange === 'all' ? 'bg-foreground text-background' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}>
            ALL
          </button>
          <button onClick={() => handleTimeRangeChange('72h')} className={`px-4 py-2 rounded text-sm font-medium transition-colors ${timeRange === '72h' ? 'bg-foreground text-background' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}>
            72H
          </button>
          
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{
          fontSize: 11,
          fill: 'hsl(var(--muted-foreground))'
        }} />
          <YAxis stroke="hsl(var(--muted-foreground))" tick={{
          fontSize: 11,
          fill: 'hsl(var(--muted-foreground))'
        }} tickFormatter={value => `$${(value / 1000).toFixed(0)}k`} />
          <Tooltip contentStyle={{
          backgroundColor: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '6px',
          fontSize: '12px'
        }} formatter={(value: any) => [`$${value.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`, '']} />
          <Legend wrapperStyle={{
          fontSize: '12px'
        }} />
          {models.map(model => <Line key={model.name} type="monotone" dataKey={model.name} stroke={model.color} strokeWidth={2} dot={<CustomDot data={chartData} />} activeDot={{
          r: 6
        }} />)}
        </LineChart>
      </ResponsiveContainer>
    </div>;
};
export default PerformanceChart;