import { motion } from "framer-motion";
import PromptCard from "./PromptCard";

const featuredPrompts = [
  {
    id: "1",
    title: "Expert Code Reviewer",
    description: "Get detailed, constructive code reviews with suggestions for improvements, best practices, and potential bugs.",
    prompt: "You are an expert code reviewer. Analyze the following code for: 1) Potential bugs and edge cases, 2) Performance improvements, 3) Code readability and maintainability, 4) Best practices. Provide specific, actionable feedback with examples.",
    category: "Development",
    tags: ["code-review", "programming", "best-practices"],
    author: { name: "Alex Chen" },
    upvotes: 342,
    copies: 1205,
  },
  {
    id: "2",
    title: "Creative Story Generator",
    description: "Generate engaging short stories with compelling characters and unexpected plot twists.",
    prompt: "Write a short story (500-800 words) about [topic]. Include: a memorable protagonist with a clear motivation, an unexpected twist in the middle, vivid sensory details, and a satisfying but thought-provoking ending. Style: [genre].",
    category: "Creative",
    tags: ["storytelling", "creative-writing", "fiction"],
    author: { name: "Maya Johnson" },
    upvotes: 289,
    copies: 876,
  },
  {
    id: "3",
    title: "Study Notes Summarizer",
    description: "Transform lengthy study materials into concise, memorable notes with key concepts highlighted.",
    prompt: "Summarize the following study material into concise notes. Format as: 1) Key Concepts (bullet points), 2) Important Definitions, 3) Relationships between ideas, 4) Memory hooks or mnemonics, 5) Potential exam questions. Keep it under 500 words.",
    category: "Education",
    tags: ["studying", "notes", "learning"],
    author: { name: "Sam Rivera" },
    upvotes: 456,
    copies: 2340,
  },
  {
    id: "4",
    title: "Email Professional Rewriter",
    description: "Transform casual emails into polished, professional communications that maintain your authentic voice.",
    prompt: "Rewrite this email to be more professional while maintaining a friendly tone. Ensure: clear subject line suggestion, proper greeting, organized main points, clear call-to-action, appropriate sign-off. Keep the original intent and personality.",
    category: "Business",
    tags: ["email", "professional", "communication"],
    author: { name: "Jordan Lee" },
    upvotes: 198,
    copies: 654,
  },
  {
    id: "5",
    title: "Debate Argument Builder",
    description: "Construct balanced arguments for any topic with supporting evidence and counterpoints.",
    prompt: "Build a comprehensive debate argument on [topic]. Include: 1) Three strong arguments FOR, 2) Three strong arguments AGAINST, 3) Key evidence/statistics for each, 4) Common rebuttals and responses, 5) Neutral conclusion weighing both sides.",
    category: "Education",
    tags: ["debate", "critical-thinking", "research"],
    author: { name: "Chris Taylor" },
    upvotes: 267,
    copies: 890,
  },
  {
    id: "6",
    title: "Recipe Modifier",
    description: "Adapt any recipe to dietary restrictions while maintaining flavor and texture.",
    prompt: "Modify this recipe for [dietary restriction: vegan/gluten-free/keto/etc]. Provide: 1) Ingredient substitutions with exact amounts, 2) Any technique changes needed, 3) Expected texture/flavor differences, 4) Tips for best results. Keep the dish's essence intact.",
    category: "Lifestyle",
    tags: ["cooking", "recipes", "dietary"],
    author: { name: "Pat Morgan" },
    upvotes: 312,
    copies: 1045,
  },
];

const FeaturedPrompts = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured Prompts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hand-picked prompts loved by our community. Ready to copy and use in your favorite AI tools.
          </p>
        </motion.div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPrompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PromptCard {...prompt} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrompts;
