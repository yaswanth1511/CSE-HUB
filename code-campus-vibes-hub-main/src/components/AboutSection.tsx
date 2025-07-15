
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const contactLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-6 h-6" />,
      url: 'https://github.com/yaswanth1511',
      color: 'border-gray-200 text-gray-700 hover:bg-gray-50',
      gradient: 'from-gray-400 to-gray-600'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      url: 'https://www.linkedin.com/in/yaswanthborra/',
      color: 'border-blue-200 text-blue-700 hover:bg-blue-50',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Gmail',
      icon: <Mail className="w-6 h-6" />,
      url: 'mailto:yaswanthborra15@gmail.com',
      color: 'border-red-200 text-red-700 hover:bg-red-50',
      gradient: 'from-red-400 to-red-600'
    }
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-8 bg-white scroll-mt-24">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              Yaswanth Borra
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600"
            >
              CS undergrad • Thrive-ing toward impact ⚡
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12"
          >
            <div className="grid md:grid-cols-3 gap-8">
              {contactLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + (0.1 * index) }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="bg-white border-2 hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                    <CardContent className="p-0">
                      <Button
                        onClick={() => window.open(link.url, '_blank')}
                        className={`w-full h-full bg-transparent border-0 rounded-2xl p-8 ${link.color} transition-all duration-300 hover:scale-105`}
                        variant="ghost"
                      >
                        <div className="flex flex-col items-center space-y-4">
                          <div className={`w-16 h-16 bg-gradient-to-r ${link.gradient} rounded-full flex items-center justify-center text-white shadow-lg`}>
                            {link.icon}
                          </div>
                          <span className="font-semibold text-lg">{link.name}</span>
                        </div>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center pt-8"
          >
            <p className="text-gray-500 text-sm mb-3">
              Built with ❤️ using React, TypeScript, and Tailwind CSS
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <span>© 2024 CSE Hub</span>
              <span>•</span>
              <span>Made for students, by students</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
