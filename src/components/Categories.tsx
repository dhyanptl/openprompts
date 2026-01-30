import { motion } from "framer-motion";
import { 
  Code2, 
  Palette, 
  GraduationCap, 
  Briefcase, 
  Heart, 
  Gamepad2,
  PenTool,
  Lightbulb
} from "lucide-react";

const categories = [
  {
    name: "Development",
    description: "Code review, debugging, and technical documentation",
    icon: Code2,
    count: 324,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  {
    name: "Creative",
    description: "Storytelling, art prompts, and creative writing",
    icon: Palette,
    count: 256,
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    name: "Education",
    description: "Study aids, explanations, and learning tools",
    icon: GraduationCap,
    count: 412,
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
    iconColor: "text-green-400",
  },
  {
    name: "Business",
    description: "Professional communication and productivity",
    icon: Briefcase,
    count: 189,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    iconColor: "text-amber-400",
  },
  {
    name: "Lifestyle",
    description: "Health, cooking, fitness, and daily life",
    icon: Heart,
    count: 178,
    color: "from-rose-500/20 to-red-500/20",
    borderColor: "border-rose-500/30",
    iconColor: "text-rose-400",
  },
  {
    name: "Gaming",
    description: "Game strategies, worldbuilding, and RPG tools",
    icon: Gamepad2,
    count: 145,
    color: "from-indigo-500/20 to-violet-500/20",
    borderColor: "border-indigo-500/30",
    iconColor: "text-indigo-400",
  },
  {
    name: "Writing",
    description: "Essays, articles, and professional writing",
    icon: PenTool,
    count: 298,
    color: "from-teal-500/20 to-cyan-500/20",
    borderColor: "border-teal-500/30",
    iconColor: "text-teal-400",
  },
  {
    name: "Ideas",
    description: "Brainstorming, problem-solving, and innovation",
    icon: Lightbulb,
    count: 167,
    color: "from-yellow-500/20 to-amber-500/20",
    borderColor: "border-yellow-500/30",
    iconColor: "text-yellow-400",
  },
];

const Categories = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-secondary/20 to-background">
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
            Explore Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect prompts for your needs across diverse categories
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className={`group relative p-6 rounded-xl bg-gradient-to-br ${category.color} border ${category.borderColor} cursor-pointer hover:border-opacity-60 transition-all duration-300`}
            >
              <div className={`inline-flex p-3 rounded-lg bg-background/50 mb-4 ${category.iconColor}`}>
                <category.icon className="h-6 w-6" />
              </div>
              
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {category.description}
              </p>
              
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{category.count}</span> prompts
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
