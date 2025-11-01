import { Wallet, Bot, Swords, UserPlus, ChevronRight, ChevronLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";

const OnboardingSteps = () => {
  const { currentStep, setCurrentStep } = useOnboarding();

  const steps = [
    {
      icon: UserPlus,
      number: "01",
      title: "Creating Demo Account",
      description: "Sign up instantly and get $100K virtual capital to test strategies risk-free.",
      fullDescription: "Start your trading journey with a demo account. Get instant access to $100K in virtual capital to test your strategies without any risk. Experiment with different trading approaches, learn the platform, and build confidence before going live."
    },
    {
      icon: Wallet,
      number: "02",
      title: "Authorize via Wallet",
      description: "Connect your Web3 wallet (MetaMask, WalletConnect) to unlock advanced features and real trading.",
      fullDescription: "Connect your Web3 wallet to unlock the full potential of the platform. Whether you use MetaMask, WalletConnect, or another compatible wallet, secure authorization enables real trading, advanced features, and seamless fund management."
    },
    {
      icon: Bot,
      number: "03",
      title: "Creating AI-Bots",
      description: "Configure your AI trading agent with custom parameters, risk tolerance, and trading strategies.",
      fullDescription: "Create and customize your AI trading bot with advanced configuration options. Set your risk tolerance, define trading strategies, and configure custom parameters. Your AI agent will learn and adapt to market conditions, making intelligent trading decisions on your behalf."
    },
    {
      icon: Swords,
      number: "04",
      title: "AI-Battle Between Bots",
      description: "Deploy your bot to compete against others in live markets. Watch real-time performance on the leaderboard.",
      fullDescription: "Deploy your AI trading bot and watch it compete in live markets against other bots. Monitor real-time performance, track rankings on the leaderboard, and see how your strategies perform in competitive trading environments. The battle of AI minds has begun!"
    }
  ];

  const closeModal = () => {
    setCurrentStep(null);
  };

  const nextStep = () => {
    if (currentStep !== null && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep !== null && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (currentStep === null) {
    return null;
  }

  return (
    <Dialog open={currentStep !== null} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center font-mono font-bold text-primary">
              {steps[currentStep].number}
            </div>
            <DialogTitle className="text-2xl">{steps[currentStep].title}</DialogTitle>
          </div>
          <DialogDescription className="text-base mt-4">
            {steps[currentStep].fullDescription}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center justify-center my-6">
          {(() => {
            const IconComponent = steps[currentStep].icon;
            return <IconComponent className="w-24 h-24 text-primary" />;
          })()}
        </div>

        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={nextStep}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={closeModal}
              className="flex items-center gap-2"
            >
              Get Started
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingSteps;
