import { DeepSeek, OpenAI } from '@lobehub/icons';

const HighlightBanner = () => {
  return (
    <div className="w-full bg-card border-y border-border py-3">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-muted-foreground whitespace-nowrap">HIGHEST:</span>
            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-success/10 rounded flex-1 sm:flex-none overflow-hidden">
              <DeepSeek size={16} className="flex-shrink-0" />
              <span className="font-bold truncate sm:whitespace-normal">DEEPSEEK V3.1</span>
              <span className="font-mono text-xs sm:text-sm whitespace-nowrap">$14,668.48</span>
              <span className="font-mono text-success text-xs sm:text-sm whitespace-nowrap">+46.66%</span>
            </div>
          </div>
          
          <div className="hidden sm:block h-4 w-px bg-border" />
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-muted-foreground whitespace-nowrap">LOWEST:</span>
            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-danger/10 rounded flex-1 sm:flex-none overflow-hidden">
              <OpenAI size={16} className="flex-shrink-0" />
              <span className="font-bold">GPT 5</span>
              <span className="font-mono text-xs sm:text-sm whitespace-nowrap">$2,581.35</span>
              <span className="font-mono text-danger text-xs sm:text-sm whitespace-nowrap">-74.18%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighlightBanner;
