import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { getSession } from "@/lib/authClient";

type User = {
  email: string;
};

const categories = [
  "Writing",
  "Development",
  "Marketing",
  "Data",
  "Design",
  "Business",
];

const Submit = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // 🔐 Replace Supabase auth with JWT session check
  useEffect(() => {
    getSession().then((data) => {
      if (!data?.user) {
        setUser(null);
      } else {
        setUser(data.user);
      }
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to submit a prompt.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!title || !description || !prompt || !category) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    // 🚧 TODO: send this data to MongoDB backend
    // await fetch("/prompts/create", ...)

    toast({
      title: "Prompt submitted!",
      description: "Your prompt has been submitted for review.",
    });

    setTitle("");
    setDescription("");
    setPrompt("");
    setCategory("");
    setTags("");
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                Share Your Prompt
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Submit a Prompt
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Share your best prompts with the community and help others unlock
              AI's potential
            </p>
          </motion.div>

          {!user ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm text-center py-12">
                <CardContent>
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-semibold mb-2">
                    Sign in to submit
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    You need to be signed in to submit prompts
                  </p>
                  <Button onClick={() => navigate("/auth")}>Sign In</Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Prompt Details</CardTitle>
                  <CardDescription>
                    Fill in the details about your prompt
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="Give your prompt a descriptive title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={submitting}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Briefly describe what this prompt does and when to use it"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={submitting}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prompt">Prompt *</Label>
                      <Textarea
                        id="prompt"
                        placeholder="Enter your full prompt here..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={submitting}
                        rows={6}
                        className="font-mono text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={category}
                          onValueChange={setCategory}
                          disabled={submitting}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Input
                          id="tags"
                          placeholder="e.g., creative, storytelling"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          disabled={submitting}
                        />
                        <p className="text-xs text-muted-foreground">
                          Separate with commas
                        </p>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Prompt
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Submit;
