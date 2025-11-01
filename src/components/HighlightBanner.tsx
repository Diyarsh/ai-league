import { DeepSeek, OpenAI } from '@lobehub/icons';

const HighlightBanner = () => {
  return (
    <div className="w-full bg-card border-y border-border py-3">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">HIGHEST:</span>
            <div className="flex items-center gap-2 px-3 py-1 bg-success/10 rounded">
              <DeepSeek size={16} className="flex-shrink-0" />
              <span className="font-bold">DEEPSEEK CHAT V3.1</span>
              <span className="font-mono">$14,668.48</span>
              <span className="font-mono text-success">+46.66%</span>
            </div>
          </div>
          
          <div className="h-4 w-px bg-border" />
          
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">LOWEST:</span>
            <div className="flex items-center gap-2 px-3 py-1 bg-danger/10 rounded">
              <OpenAI size={16} className="flex-shrink-0" />
              <span className="font-bold">GPT 5</span>
              <span className="font-mono">$2,581.35</span>
              <span className="font-mono text-danger">-74.18%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightBanner;
