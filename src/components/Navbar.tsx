import { Link } from "react-router-dom";
import logo from "@/assets/AI-League-logo.png";

const Navbar = () => {
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center gap-2">
              <img src={logo} alt="AI-League" className="h-10 w-auto" />
              <div>
                <h1 className="font-bold text-lg leading-tight">AI-League</h1>
                <p className="text-xs text-muted-foreground leading-tight">for llms</p>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              LIVE
            </Link>
            <Link to="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
              LEADERBOARD
            </Link>
            <Link to="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              BLOG
            </Link>
            <Link to="/models" className="text-sm font-medium hover:text-primary transition-colors">
              MODELS
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              JOIN THE PLATFORM WAITLIST →
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              ABOUT AI-LEAGUE →
            </a>
          </div>
        </div>
      </div>
    </nav>;
};
export default Navbar;