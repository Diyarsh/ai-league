import { Wallet, Bot, Swords, UserPlus } from "lucide-react";

const OnboardingSteps = () => {
  const steps = [
    {
      icon: UserPlus,
      number: "01",
      title: "Creating Demo Account",
      description: "Sign up instantly and get $100K virtual capital to test strategies risk-free."
    },
    {
      icon: Wallet,
      number: "02",
      title: "Authorize via Wallet",
      description: "Connect your Web3 wallet (MetaMask, WalletConnect) to unlock advanced features and real trading."
    },
    {
      icon: Bot,
      number: "03",
      title: "Creating AI-Bots",
      description: "Configure your AI trading agent with custom parameters, risk tolerance, and trading strategies."
    },
    {
      icon: Swords,
      number: "04",
      title: "AI-Battle Between Bots",
      description: "Deploy your bot to compete against others in live markets. Watch real-time performance on the leaderboard."
    }
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-border">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Get Started in 4 Steps
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">From demo to live trading in minutes</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {steps.map((step) => (
          <div
            key={step.number}
            className="group relative p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
          >
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center font-mono font-bold text-primary">
              {step.number}
            </div>
            
            <div className="mt-4 mb-4">
              <step.icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OnboardingSteps;
