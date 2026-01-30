import { motion } from "framer-motion";
import { Search, Copy, Sparkles, Share2 } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description: "Browse thousands of community-created prompts across categories",
  },
  {
    icon: Copy,
    title: "Copy",
    description: "One-click copy to use in ChatGPT, Claude, or any AI tool",
  },
  {
    icon: Sparkles,
    title: "Create",
    description: "Craft your own prompts and share with the community",
  },
  {
    icon: Share2,
    title: "Share",
    description: "Help others learn from your successful prompt patterns",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Getting started with OpenPrompts is simple
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center z-10">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-card border border-border mb-6 mx-auto group-hover:border-primary/50 transition-colors">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
