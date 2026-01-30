import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="font-display text-lg font-semibold text-foreground">
              OpenPrompts
            </span>
          </Link>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} OpenPrompts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
