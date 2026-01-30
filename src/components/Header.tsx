import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import {
  Sparkles,
  Menu,
  X,
  Home,
  Compass,
  Send,
  Info,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { getSession } from "@/lib/authClient";

type User = {
  email: string;
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // 🔐 Load user from JWT session (replaces Supabase)
  useEffect(() => {
    getSession().then((data) => {
      setUser(data?.user ?? null);
    });
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);

    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });

    navigate("/auth");
  };

  const navTabs = [
    { title: "Home", icon: Home, href: "/" },
    { title: "Discover", icon: Compass, href: "/discover" },
    { title: "Submit", icon: Send, href: "/submit" },
    { type: "separator" as const },
    { title: "About", icon: Info, href: "/about" },
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Discover", href: "/discover" },
    { name: "Submit", href: "/submit" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-5 w-5 text-primary group-hover:animate-pulse" />
            </motion.div>
            <span className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
              OpenPrompts
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ExpandableTabs
              tabs={navTabs}
              activeColor="text-primary"
              className="border-border/50"
            />
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/auth")}
                >
                  Sign In
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate("/auth")}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-border flex flex-col gap-2">
                {user ? (
                  <>
                    <p className="px-4 text-sm text-muted-foreground">
                      {user.email}
                    </p>
                    <Button
                      variant="ghost"
                      className="w-full justify-center"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="w-full justify-center"
                      onClick={() => {
                        navigate("/auth");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="default"
                      className="w-full justify-center"
                      onClick={() => {
                        navigate("/auth");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
