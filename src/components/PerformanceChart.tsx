import { useState, useEffect } from "react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DeepSeek, Claude, OpenAI, Gemini, XAI, Qwen } from '@lobehub/icons';
import { Bitcoin } from 'lucide-react';
const models = [{
  name: 'DeepSeek V3.1',
  color: '#4C9AFF',
  volatility: 0.015,
  icon: DeepSeek,
  isDashed: false
}, {
  name: 'Claude 4.5',
  color: '#9D7BE8',
  volatility: 0.012,
  icon: Claude,
  isDashed: false
}, {
  name: 'GPT 5',
  color: '#FF6B6B',
  volatility: 0.018,
  icon: OpenAI,
  isDashed: false
}, {
  name: 'Gemini 2.5 Pro',
  color: '#FFA500',
  volatility: 0.010,
  icon: Gemini,
  isDashed: false
}, {
  name: 'Grok 4',
  color: '#FFFFFF',
  volatility: 0.020,
  icon: XAI,
  isDashed: false
}, {
  name: 'Qwen 3 Max',
  color: '#00FF94',
  volatility: 0.014,
  icon: Qwen,
  isDashed: false
}, {
  name: 'Bitcoin',
  color: '#808080',
  volatility: 0.005,
  icon: Bitcoin,
  isDashed: true
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
      const baseValue = 100; // Все модели стартуют с $100
      
      // Получаем предыдущее значение для более естественного движения
      let previousValue = baseValue;
      if (i > 0 && data.length > 0) {
        previousValue = data[i - 1][model.name] || baseValue;
      }
      
      // Увеличиваем волатильность для эффекта скачущих линий
      const trend = model.name === 'Bitcoin' ? 0 : (i * (idx % 2 === 0 ? 0.5 : -0.3));
      const volatilityMultiplier = 10; // Увеличиваем для более заметных колебаний
      const noise = (Math.random() - 0.5) * baseValue * model.volatility * volatilityMultiplier;
      
      // Добавляем случайные скачки для эффекта трейдинга
      const randomJump = (Math.random() - 0.5) * 15;
      
      // Новое значение на основе предыдущего + изменения
      const change = noise * 0.5 + randomJump * 0.4 + (i === 0 ? 0 : trend / dataPoints);
      point[model.name] = Math.max(0, Math.min(250, previousValue + change));
    });
    data.push(point);
  }
  return data;
};
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
      <div className="text-sm font-semibold text-foreground mb-2">{label}</div>
      <div className="space-y-1.5">
        {payload.map((entry: any, index: number) => {
          const model = models.find(m => m.name === entry.dataKey);
          if (!model) return null;
          const IconComponent = model.icon;
          
          return (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: model.color }}
              >
                <IconComponent size={14} color={model.color === '#FFFFFF' ? '#fff' : model.color} />
              </div>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xs text-muted-foreground truncate">{model.name}</span>
                <span 
                  className="text-xs font-mono font-semibold ml-auto"
                  style={{ color: model.color }}
                >
                  ${entry.value?.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
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
  const logoSize = 32;
  const logoOffset = logoSize / 2;
  return <g>
      <foreignObject x={cx - logoOffset} y={cy - logoOffset} width={logoSize} height={logoSize}>
        <div className="rounded-full bg-background border-2 flex items-center justify-center shadow-lg" style={{
        borderColor: model.color,
        width: `${logoSize}px`,
        height: `${logoSize}px`
      }}>
          <IconComponent size={20} color={model.color === '#FFFFFF' ? '#fff' : model.color} />
        </div>
      </foreignObject>
    </g>;
};
const PerformanceChart = () => {
  const [timeRange, setTimeRange] = useState<'all' | '72h'>('all');
  const [chartData, setChartData] = useState(generateChartData(300));

  const handleTimeRangeChange = (range: 'all' | '72h') => {
    setTimeRange(range);
    const hours = range === '72h' ? 72 : 300;
    setChartData(generateChartData(hours));
  };
  return <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-card border border-border rounded-lg p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg lg:text-xl font-bold">TOTAL ACCOUNT VALUE</h2>
        <div className="flex gap-2">
          <button onClick={() => handleTimeRangeChange('all')} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors ${timeRange === 'all' ? 'bg-foreground text-background' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}>
            ALL
          </button>
          <button onClick={() => handleTimeRangeChange('72h')} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors ${timeRange === '72h' ? 'bg-foreground text-background' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}>
            72H
          </button>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData} margin={{ top: 5, right: 50, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{
          fontSize: 9,
          fill: 'hsl(var(--muted-foreground))'
        }} interval="preserveStartEnd" />
          <YAxis 
            domain={[0, 250]}
            stroke="hsl(var(--muted-foreground))" 
            tick={{
              fontSize: 9,
              fill: 'hsl(var(--muted-foreground))'
            }}
            ticks={[0, 50, 100, 150, 200, 250]}
            tickFormatter={value => `$${value.toFixed(0)}`} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{
          fontSize: '10px'
        }} />
          {models.map(model => <Line key={model.name} type="linear" dataKey={model.name} stroke={model.color} strokeWidth={model.isDashed ? 1.5 : 2} strokeDasharray={model.isDashed ? '5 5' : '0'} dot={<CustomDot data={chartData} />} activeDot={{
          r: 4
        }} animationDuration={300} />)}
        </LineChart>
      </ResponsiveContainer>
    </div>;
};
export default PerformanceChart;
