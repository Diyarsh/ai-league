import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const generateChartData = () => {
  const data = [];
  const startDate = new Date('2024-10-17');
  const models = [
    { name: 'DeepSeek V3.1', color: '#4C9AFF', volatility: 0.015 },
    { name: 'Claude 4.5', color: '#9D7BE8', volatility: 0.012 },
    { name: 'GPT 5', color: '#FF6B6B', volatility: 0.018 },
    { name: 'Gemini 2.5 Pro', color: '#FFA500', volatility: 0.010 },
    { name: 'Grok 4', color: '#000000', volatility: 0.020 },
  ];

  for (let i = 0; i < 100; i++) {
    const date = new Date(startDate);
    date.setHours(startDate.getHours() + i * 3);
    
    const point: any = {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit' }),
    };

    models.forEach((model, idx) => {
      const baseValue = 10000 + idx * 500;
      const trend = i * (idx % 2 === 0 ? 50 : -30);
      const noise = (Math.random() - 0.5) * baseValue * model.volatility;
      point[model.name] = Math.max(5000, baseValue + trend + noise);
    });

    data.push(point);
  }

  return { data, models };
};

const { data, models } = generateChartData();

const PerformanceChart = () => {
  return (
    <div className="w-full h-[600px] bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">TOTAL ACCOUNT VALUE</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-foreground text-background rounded text-sm font-medium">
            ALL
          </button>
          <button className="px-4 py-2 bg-secondary text-foreground rounded text-sm font-medium">
            72H
          </button>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px',
              fontSize: '12px'
            }}
            formatter={(value: any) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, '']}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
          />
          {models.map((model) => (
            <Line
              key={model.name}
              type="monotone"
              dataKey={model.name}
              stroke={model.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
