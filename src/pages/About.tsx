import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Heart, Users, Sparkles, Target, Shield, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "We believe in the power of community. Every prompt shared helps others learn and grow.",
  },
  {
    icon: Shield,
    title: "Quality Focused",
    description: "We curate and review prompts to ensure they meet high standards of usefulness and clarity.",
  },
  {
    icon: Zap,
    title: "Open & Free",
    description: "Knowledge should be accessible. Our platform is free to use and share prompts.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">About Us</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Empowering AI Conversations
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              OpenPrompts is a community-driven platform where creators share and discover 
              prompts that unlock the full potential of AI.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-16"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  We're on a mission to democratize AI expertise. By creating an open library of 
                  community-tested prompts, we help everyone from beginners to experts get better 
                  results from AI tools. Whether you're writing code, creating content, or solving 
                  complex problems, the right prompt makes all the difference.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">Our Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                          {value.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Join Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-8 md:p-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Join Our Community
                </h2>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  Be part of a growing community of prompt enthusiasts. Share your best prompts, 
                  learn from others, and help shape the future of AI interactions.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
