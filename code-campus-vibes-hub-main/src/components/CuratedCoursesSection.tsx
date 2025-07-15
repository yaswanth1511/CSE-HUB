
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CuratedCoursesSection = () => {
  const courses = [
    {
      id: 'striver-dsa',
      title: "Striver's A2Z DSA Course",
      description: "Complete Data Structures and Algorithms course with 450+ problems",
      type: "Interactive Course",
      icon: <BookOpen className="w-6 h-6 text-white" />,
      link: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-500",
      buttonColor: "bg-green-500 hover:bg-green-600"
    },
    {
      id: 'codewithharry-web',
      title: "Web Development by CodeWithHarry",
      description: "Comprehensive web development course covering HTML, CSS, JavaScript, and more",
      type: "Video Playlist",
      icon: <Play className="w-6 h-6 text-white" />,
      link: "https://www.youtube.com/playlist?list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w",
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-500",
      buttonColor: "bg-red-500 hover:bg-red-600"
    }
  ];

  return (
    <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
            Curated Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hand-picked courses from industry experts to accelerate your learning journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${course.color}`} />
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${course.bgColor}`}>
                      {course.icon}
                    </div>
                    <span className="text-sm text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full">
                      {course.type}
                    </span>
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                    {course.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="text-gray-600 text-base mb-6 leading-relaxed">
                    {course.description}
                  </CardDescription>

                  <Button
                    asChild
                    className={`w-full ${course.buttonColor} text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:scale-105`}
                  >
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2"
                    >
                      <span>Start Learning</span>
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedCoursesSection;
