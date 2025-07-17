
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  BookOpen, 
  Code, 
  Users, 
  User,
  ChevronDown,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Zap,
  Brain,
  Target,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import AuthSection from '@/components/AuthSection';
import StudyNotesSection from '@/components/StudyNotesSection';
import InterviewPrepSection from '@/components/InterviewPrepSection';
import AboutSection from '@/components/AboutSection';
import CuratedCoursesSection from '@/components/CuratedCoursesSection';
import JobPostingsSection from '@/components/JobPostingsSection';
import UserProfileDropdown from '@/components/UserProfileDropdown';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'notes', label: 'Study Notes' },
    { id: 'courses', label: 'Curated Courses' },
    { id: 'jobs', label: 'Job Postings' },
    { id: 'interview', label: 'Interview Prep' },
    { id: 'about', label: 'About' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setUser(session?.user || null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'notes', 'courses', 'jobs', 'interview', 'about'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return <AuthSection onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-background overflow-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md shadow-sm border-b border-border"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left - Logo */}
            <motion.div 
              className="flex items-center space-x-2 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg sm:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                StudySync
              </span>
            </motion.div>

            {/* Center - Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center space-x-6 xl:space-x-8">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-3 py-2 rounded-lg font-medium transition-all text-sm xl:text-base ${
                      activeSection === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right - Profile & Mobile Menu */}
            <div className="flex items-center space-x-2">
              {user && (
                <UserProfileDropdown 
                  user={user} 
                  onLogout={handleLogout}
                />
              )}
              
              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2"
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-card/95 backdrop-blur-md border-t border-border"
            >
              <div className="px-4 py-2 space-y-1 max-h-96 overflow-y-auto">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-3 py-3 rounded-lg font-medium transition-all ${
                      activeSection === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-background min-h-screen flex items-center scroll-mt-24 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto text-center relative">
          {/* Colorful Background Animations */}
          <div className="absolute inset-0 -inset-x-8 sm:-inset-x-16 lg:-inset-x-32 -inset-y-16 sm:-inset-y-24 lg:-inset-y-32 overflow-hidden pointer-events-none">
            {/* Floating colorful shapes */}
            <motion.div
              animate={{ 
                x: [0, 50, 0],
                y: [0, -25, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-4 sm:left-10 w-6 sm:w-8 h-6 sm:h-8 bg-vibrant-purple rounded-full opacity-30 blur-sm"
            />
            
            <motion.div
              animate={{ 
                x: [0, -40, 0],
                y: [0, 30, 0],
                rotate: [0, -180, -360],
                scale: [1, 1.5, 1]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              className="absolute top-20 right-4 sm:right-20 w-4 sm:w-6 h-4 sm:h-6 bg-vibrant-cyan rounded-full opacity-25 blur-sm"
            />
            
            <motion.div
              animate={{ 
                x: [0, 30, 0],
                y: [0, -20, 0],
                rotate: [0, 90, 180],
                scale: [1, 1.4, 1]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
              className="absolute bottom-10 left-1/4 w-4 sm:w-5 h-4 sm:h-5 bg-vibrant-yellow opacity-40 blur-sm"
            />
            
            <motion.div
              animate={{ 
                x: [0, -20, 0],
                y: [0, 15, 0],
                rotate: [0, -90, -180],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-20 right-1/3 w-5 sm:w-7 h-5 sm:h-7 bg-vibrant-pink rounded-full opacity-35 blur-sm"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 sm:space-y-12 relative z-10"
          >
            {/* Animated floating elements */}
            <div className="relative">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 3, -3, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-8 sm:-top-10 -left-8 sm:-left-20 text-vibrant-blue opacity-40"
              >
                <Code className="w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 8, 0],
                  rotate: [0, -2, 2, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -top-4 sm:-top-5 -right-6 sm:-right-16 text-vibrant-purple opacity-40"
              >
                <Brain className="w-6 sm:w-8 lg:w-12 h-6 sm:h-8 lg:h-12" />
              </motion.div>

              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute top-12 sm:top-20 left-4 sm:left-10 text-vibrant-green"
              >
                <Target className="w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8" />
              </motion.div>
            </div>
            
            <div className="space-y-6 sm:space-y-8">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight px-4 sm:px-0"
              >
                One Stop Hub for Every{' '}
                <motion.span 
                  className="bg-gradient-primary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]"
                >
                  CSE
                </motion.span>{' '}
                <span className="text-vibrant-purple">Student</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0"
              >
                Ace your placements, projects & more!
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="pt-4 sm:pt-6 px-4 sm:px-0"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => scrollToSection('interview')}
                    className="bg-gradient-primary hover:opacity-90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg animate-pulse-slow"
                  >
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Interview Prep
                    </motion.span>
                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="space-y-16 sm:space-y-20 lg:space-y-24">
        {/* Study Notes Section */}
        <div className="scroll-mt-24">
          <StudyNotesSection />
        </div>

        {/* Curated Courses Section */}
        <div className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <CuratedCoursesSection />
        </div>

        {/* Job Postings Section */}
        <div className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
          <JobPostingsSection />
        </div>

        {/* Interview Prep Section */}
        <div className="scroll-mt-24">
          <InterviewPrepSection />
        </div>

        {/* About Section */}
        <div className="scroll-mt-24">
          <AboutSection />
        </div>
      </div>
    </div>
  );
};

export default Index;
