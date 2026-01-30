import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
import { signIn, signUp, getSession } from "@/lib/authClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Mail, Lock, Loader2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const navigate = useNavigate();
  const { toast } = useToast();

  // useEffect(() => {
  //   const { data: { subscription } } = supabase.auth.onAuthStateChange(
  //     (event, session) => {
  //       if (session?.user) {
  //         navigate("/");
  //       }
  //     }
  //   );

  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     if (session?.user) {
  //       navigate("/");
  //     }
  //   });

  //   return () => subscription.unsubscribe();
  // }, [navigate]);

  useEffect(() => {
    getSession().then((data) => {
      if (data?.user) navigate("/");
    });
  }, [navigate]);

  const validateForm = () => {
    try {
      authSchema.parse({ email, password });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0] === "email") fieldErrors.email = err.message;
          if (err.path[0] === "password") fieldErrors.password = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  // const handleSignIn = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   setLoading(true);
  //   const { error } = await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });

  //   if (error) {
  //     toast({
  //       title: "Sign in failed",
  //       description: error.message === "Invalid login credentials"
  //         ? "Invalid email or password. Please try again."
  //         : error.message,
  //       variant: "destructive",
  //     });
  //   } else {
  //     toast({
  //       title: "Welcome back!",
  //       description: "You have successfully signed in.",
  //     });
  //   }
  //   setLoading(false);
  // };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const data = await signIn(email, password);

    if (data.error) {
      toast({
        title: "Sign in failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    } else {
      localStorage.setItem("token", data.token);
      toast({ title: "Welcome back!" });
      navigate("/");
    }

    setLoading(false);
  };

  // const handleSignUp = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   setLoading(true);
  //   const redirectUrl = `${window.location.origin}/`;

  //   const { error } = await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: redirectUrl,
  //     },
  //   });

  //   if (error) {
  //     if (error.message.includes("already registered")) {
  //       toast({
  //         title: "Account exists",
  //         description:
  //           "This email is already registered. Please sign in instead.",
  //         variant: "destructive",
  //       });
  //     } else {
  //       toast({
  //         title: "Sign up failed",
  //         description: error.message,
  //         variant: "destructive",
  //       });
  //     }
  //   } else {
  //     toast({
  //       title: "Account created!",
  //       description: "You can now sign in with your credentials.",
  //     });
  //   }
  //   setLoading(false);
  // };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const data = await signUp(email, password);

    if (data.error === "EMAIL_EXISTS") {
      toast({
        title: "Account exists",
        description: "Please sign in instead.",
        variant: "destructive",
      });
    } else {
      localStorage.setItem("token", data.token);
      toast({ title: "Account created!" });
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm">Back</span>
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-4"
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Sparkles className="h-6 w-6 text-primary" />
          </motion.div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            OpenPrompts
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to share and discover prompts
          </p>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">Welcome</CardTitle>
            <CardDescription>
              Sign in or create an account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        disabled={loading}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
