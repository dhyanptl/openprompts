import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
        }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-[1]" />
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[15%] w-2 h-2 rounded-full bg-primary/60"
        />
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-[20%] w-3 h-3 rounded-full bg-glow-secondary/40"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 left-[25%] w-1.5 h-1.5 rounded-full bg-primary/50"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 cursor-pointer group"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="h-4 w-4 text-primary" />
          </motion.div>
          <span className="text-sm text-primary font-medium">Community-Powered Prompts</span>
          <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform duration-200" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="text-foreground">Discover Prompts</span>
          <br />
          <span className="gradient-text">That Actually Work</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          An open collection of community-made prompts for everyone. 
          Learn, share, and master the art of AI conversations.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="hero" size="lg" className="group" onClick={() => navigate('/discover')}>
            Browse Prompts
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="heroOutline" size="lg" onClick={() => navigate('/submit')}>
            Share Your Prompts
          </Button>
        </motion.div>

      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  );
};

export default Hero;
