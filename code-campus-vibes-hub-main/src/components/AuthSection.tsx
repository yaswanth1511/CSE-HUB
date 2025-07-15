import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  Chrome,
  Star,
  Sparkles,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AuthSectionProps {
  onLogin: () => void;
}

const AuthSection = ({ onLogin }: AuthSectionProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        
        // Check if login was successful
        if (data.user) {
          toast({
            title: "Success!",
            description: "Logged in successfully!",
          });
          onLogin();
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        if (error) throw error;
        
        if (data.user) {
          toast({
            title: "Success!",
            description: data.user.email_confirmed_at 
              ? "Account created successfully!" 
              : "Please check your email to confirm your account!",
          });
          
          // If email is already confirmed, log them in
          if (data.user.email_confirmed_at) {
            onLogin();
          }
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        // If Google auth is not enabled, show a helpful message
        if (error.message.includes('provider is not enabled')) {
          toast({
            title: "Google Sign-In Not Available",
            description: "Google authentication is not enabled. Please use email/password instead.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Redirecting...",
          description: "Redirecting to Google Sign-In...",
        });
      }
    } catch (error: any) {
      console.error('Google auth error:', error);
      toast({
        title: "Error",
        description: error.message || "Google sign-in failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -120, 0],
            y: [0, 120, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center"
            >
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-2xl">
                <Code className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-white"
              >
                Welcome to CSE Hub
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-white/80"
              >
                {isLogin ? 'Sign in to access your study materials' : 'Create your account to get started'}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center space-x-2"
            >
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-medium">Premium Study Experience</span>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Google Sign In - Only show if not loading */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={handleGoogleAuth}
                disabled={loading}
                className="w-full bg-white hover:bg-gray-50 text-gray-800 border-0 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Chrome className="w-5 h-5 mr-3" />
                Continue with Google
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="relative"
            >
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-white/60">or continue with email</span>
              </div>
            </motion.div>

            {/* Email/Password Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-xl py-3"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-xl py-3"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </>
                )}
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center"
            >
              <p className="text-white/60">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                  disabled={loading}
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </motion.div>
          </CardContent>
        </Card>

        {/* Floating Icons */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-8 -left-8 bg-purple-500/20 backdrop-blur-sm p-3 rounded-2xl"
        >
          <Github className="w-6 h-6 text-purple-300" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -bottom-8 -right-8 bg-blue-500/20 backdrop-blur-sm p-3 rounded-2xl"
        >
          <Code className="w-6 h-6 text-blue-300" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthSection;
