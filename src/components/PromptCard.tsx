import { useState } from "react";
import { Copy, Heart, ArrowUpRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PromptCardProps {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  upvotes: number;
  copies: number;
}

const PromptCard = ({
  title,
  description,
  prompt,
  category,
  tags,
  author,
  upvotes,
  copies,
}: PromptCardProps) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(upvotes);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="glass-card p-6 group cursor-pointer hover:border-primary/30 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary border border-primary/20">
              {category}
            </span>
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
        <button className="p-2 rounded-lg hover:bg-secondary transition-colors opacity-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {description}
      </p>

      {/* Prompt Preview */}
      <div className="relative mb-4">
        <div className="p-4 rounded-lg bg-secondary/50 border border-border">
          <p className="text-sm text-foreground/80 font-mono line-clamp-3">
            {prompt}
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-md bg-background/80 backdrop-blur-sm border border-border hover:bg-secondary transition-all"
        >
          {copied ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs text-muted-foreground bg-muted rounded-md"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      {/* <div className="flex items-center pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary/50 to-glow-secondary/50 flex items-center justify-center text-xs font-medium text-foreground">
            {author.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm text-muted-foreground">{author.name}</span>
        </div>
      </div> */}
    </motion.div>
  );
};

export default PromptCard;
