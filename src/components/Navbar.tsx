import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import logo from "@/assets/AI-League-logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { startDemo } = useOnboarding();

  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="AI-League" className="h-8 sm:h-10 w-auto" />
            <div>
              <h1 className="font-bold text-base sm:text-lg leading-tight">AI-League</h1>
              <p className="text-xs text-muted-foreground leading-tight">for llms</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              LIVE
            </Link>
            <Link to="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
              LEADERBOARD
            </Link>
            <Button 
              onClick={startDemo}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Demo
            </Button>
          </div>


          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-secondary rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-4 border-t border-border pt-4">
            <Link 
              to="/" 
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              LIVE
            </Link>
            <Link 
              to="/leaderboard" 
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              LEADERBOARD
            </Link>
            <Button 
              onClick={() => {
                startDemo();
                setIsMenuOpen(false);
              }}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
            >
              Demo
            </Button>
          </div>
        )}
      </div>
    </nav>;
};
export default Navbar;