
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Globe, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const JobPostingsSection = () => {
  const jobPlatforms = [
    {
      id: 'talentd',
      title: "Talentd",
      description: "Platform connecting talented developers with top companies",
      whatsappLink: "https://chat.whatsapp.com/JfQSna3CTTgBJTo8Fat5QQ",
      websiteLink: "https://www.talentd.in/",
      color: "from-blue-500 to-blue-600",
      bgGradient: "bg-gradient-to-br from-blue-50 to-indigo-50"
    },
    {
      id: 'krishan-kumar',
      title: "Krishan Kumar Jobs & Internships",
      description: "Curated job and internship opportunities for CSE students",
      whatsappLink: "https://www.whatsapp.com/channel/0029Va6I79K60eBfQ92DwH0W",
      websiteLink: null,
      color: "from-green-500 to-emerald-600",
      bgGradient: "bg-gradient-to-br from-green-50 to-emerald-50"
    }
  ];

  return (
    <section id="jobs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
            Job Opportunities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with recruiters and find your dream job or internship
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {jobPlatforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className={`h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ${platform.bgGradient}`}>
                <div className={`h-2 bg-gradient-to-r ${platform.color}`} />
                
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors mb-2">
                    {platform.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {platform.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 space-y-3">
                  <Button
                    asChild
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:scale-105"
                  >
                    <a
                      href={platform.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Join WhatsApp</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>

                  {platform.websiteLink && (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-all duration-300"
                    >
                      <a
                        href={platform.websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2"
                      >
                        <Globe className="w-5 h-5" />
                        <span>Visit Website</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobPostingsSection;
