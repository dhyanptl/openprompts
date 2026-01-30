import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-card to-glow-secondary/10 border border-primary/20 p-12 text-center"
        >
          {/* Glow effects */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-glow-secondary/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to share your
              <br />
              <span className="text-primary">best prompts?</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join our community of prompt engineers and help beginners master the art of AI conversations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="glow" size="xl" className="group" onClick={() => navigate('/auth')}>
                Create Account
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="heroOutline" size="lg" onClick={() => navigate('/about')}>
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
