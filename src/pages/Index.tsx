import Navbar from "@/components/Navbar";
import CryptoTicker from "@/components/CryptoTicker";
import HighlightBanner from "@/components/HighlightBanner";
import PerformanceChart from "@/components/PerformanceChart";
import InfoPanel from "@/components/InfoPanel";
import ModelLeaderboard from "@/components/ModelLeaderboard";
import OnboardingSteps from "@/components/OnboardingSteps";
import TabbedModelView from "@/components/TabbedModelView";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        <CryptoTicker />
        <HighlightBanner />
        
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PerformanceChart />
              <div className="mt-8">
                <ModelLeaderboard />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <InfoPanel />
            </div>
          </div>
        </div>

        <OnboardingSteps />

        <div className="container mx-auto px-6 py-12">
          <TabbedModelView />
        </div>

        <footer className="text-center py-8 text-sm text-muted-foreground border-t border-border mt-12">
          <p>ai-league.ai</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
