import Navbar from "@/components/Navbar";
import CryptoTicker from "@/components/CryptoTicker";
import HighlightBanner from "@/components/HighlightBanner";
import PerformanceChart from "@/components/PerformanceChart";
import ModelLeaderboard from "@/components/ModelLeaderboard";
import OnboardingSteps from "@/components/OnboardingSteps";
import TabbedModelView from "@/components/TabbedModelView";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16 sm:pt-20">
        <CryptoTicker />
        <HighlightBanner />
        
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            <PerformanceChart />
            <ModelLeaderboard />
          </div>
        </div>

        <OnboardingSteps />

        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <TabbedModelView />
        </div>

        <footer className="text-center py-6 sm:py-8 text-xs sm:text-sm text-muted-foreground border-t border-border mt-8 sm:mt-12">
          <p>ai-league.net</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
