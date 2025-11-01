import { createContext, useContext, useState, ReactNode } from "react";

interface OnboardingContextType {
  startDemo: () => void;
  currentStep: number | null;
  setCurrentStep: (step: number | null) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<number | null>(null);

  const startDemo = () => {
    setCurrentStep(0);
  };

  return (
    <OnboardingContext.Provider value={{ startDemo, currentStep, setCurrentStep }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};

