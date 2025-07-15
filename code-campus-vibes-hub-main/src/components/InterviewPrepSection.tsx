
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Database,
  Network,
  Users,
  ChevronDown, 
  ChevronUp,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const InterviewPrepSection = () => {
  const [openHRQuestions, setOpenHRQuestions] = useState<string[]>([]);

  const technicalCategories = [
    {
      id: 'dsa',
      name: 'DSA',
      icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" />,
      questions: [
        {
          q: "What is the time complexity of binary search?",
          a: "O(log n) - Binary search divides the search space in half with each comparison, making it logarithmic."
        },
        {
          q: "Explain the difference between Array and LinkedList.",
          a: "Arrays provide O(1) access but O(n) insertion/deletion. LinkedLists provide O(1) insertion/deletion but O(n) access."
        },
        {
          q: "What is a Hash Table and how does it work?",
          a: "A hash table uses a hash function to map keys to array indices, providing average O(1) access, insertion, and deletion."
        },
        {
          q: "Explain different sorting algorithms and their complexities.",
          a: "Quick Sort: O(n log n) average, O(n²) worst. Merge Sort: O(n log n) always. Bubble Sort: O(n²). Heap Sort: O(n log n)."
        },
        {
          q: "What is Dynamic Programming and when to use it?",
          a: "DP solves complex problems by breaking them into simpler subproblems. Use when problems have overlapping subproblems and optimal substructure."
        },
        {
          q: "Explain BFS vs DFS traversal algorithms.",
          a: "BFS explores level by level using a queue. DFS explores as far as possible along each branch using a stack or recursion."
        }
      ]
    },
    {
      id: 'oop',
      name: 'OOPs',
      icon: <Database className="w-4 h-4 sm:w-5 sm:h-5" />,
      questions: [
        {
          q: "What are the four pillars of OOP?",
          a: "Encapsulation (data hiding), Inheritance (code reuse), Polymorphism (multiple forms), and Abstraction (hiding complexity)."
        },
        {
          q: "Explain the difference between Abstract Class and Interface.",
          a: "Abstract classes can have concrete methods and constructors. Interfaces only define method signatures (contracts)."
        },
        {
          q: "What is method overloading vs method overriding?",
          a: "Overloading: Same method name, different parameters. Overriding: Child class provides specific implementation of parent method."
        },
        {
          q: "Explain composition vs inheritance.",
          a: "Composition: 'has-a' relationship, more flexible. Inheritance: 'is-a' relationship, creates tight coupling."
        },
        {
          q: "What are design patterns? Give examples.",
          a: "Reusable solutions to common problems. Examples: Singleton, Factory, Observer, Strategy, Decorator patterns."
        },
        {
          q: "Explain SOLID principles.",
          a: "S-Single Responsibility, O-Open/Closed, L-Liskov Substitution, I-Interface Segregation, D-Dependency Inversion."
        }
      ]
    },
    {
      id: 'os',
      name: 'Operating Systems',
      icon: <Database className="w-4 h-4 sm:w-5 sm:h-5" />,
      questions: [
        {
          q: "What is the difference between process and thread?",
          a: "Process is an independent program execution. Thread is a lightweight sub-process sharing memory space."
        },
        {
          q: "Explain deadlock and its prevention.",
          a: "Deadlock occurs when processes wait indefinitely. Prevention: avoid circular wait, hold and wait, no preemption, mutual exclusion."
        },
        {
          q: "What are different CPU scheduling algorithms?",
          a: "FCFS, SJF, Round Robin, Priority, Multilevel Queue. Each has different time complexity and use cases."
        },
        {
          q: "Explain virtual memory and paging.",
          a: "Virtual memory allows programs larger than physical RAM. Paging divides memory into fixed-size blocks for efficient management."
        },
        {
          q: "What is the difference between mutex and semaphore?",
          a: "Mutex: Binary lock for mutual exclusion. Semaphore: Counter-based, allows multiple threads to access shared resource."
        },
        {
          q: "Explain different types of system calls.",
          a: "Process control, File management, Device management, Information maintenance, Communication system calls."
        }
      ]
    },
    {
      id: 'networking',
      name: 'Computer Networks',
      icon: <Network className="w-4 h-4 sm:w-5 sm:h-5" />,
      questions: [
        {
          q: "Explain the OSI model layers.",
          a: "Physical, Data Link, Network, Transport, Session, Presentation, Application - each handles specific networking functions."
        },
        {
          q: "What is the difference between TCP and UDP?",
          a: "TCP is reliable, connection-oriented with error checking. UDP is fast, connectionless without guaranteed delivery."
        },
        {
          q: "Explain HTTP vs HTTPS.",
          a: "HTTP: Plain text communication. HTTPS: Encrypted using SSL/TLS, secure data transmission over networks."
        },
        {
          q: "What are different routing protocols?",
          a: "RIP, OSPF, BGP. Distance vector vs Link state protocols for finding optimal paths in networks."
        },
        {
          q: "Explain DNS and how it works.",
          a: "Domain Name System translates domain names to IP addresses through hierarchical distributed database system."
        },
        {
          q: "What is subnet masking and CIDR?",
          a: "Subnet mask divides networks into smaller subnets. CIDR provides flexible IP addressing and routing."
        }
      ]
    }
  ];

  const hrQuestions = [
    {
      q: "Tell me about yourself",
      a: "Structure your answer around your education, relevant experience, key skills, and career goals. Keep it concise (2-3 minutes) and focus on what's relevant to the role."
    },
    {
      q: "Why should we hire you?",
      a: "Highlight your unique combination of skills, experience, and enthusiasm. Connect your strengths to the company's needs."
    },
    {
      q: "What are your strengths?",
      a: "Choose 2-3 relevant strengths with specific examples. Focus on skills that align with the job requirements."
    },
    {
      q: "How do you fit this role?",
      a: "Research the role thoroughly and connect your skills, experience, and interests to the job requirements."
    },
    {
      q: "Describe a challenge you overcame.",
      a: "Use the STAR method (Situation, Task, Action, Result) to structure your response with a specific example."
    },
    {
      q: "Where do you see yourself in 5 years?",
      a: "Show ambition while aligning with the company's growth path. Demonstrate commitment and realistic career progression."
    },
    {
      q: "Why do you want to work here?",
      a: "Research the company thoroughly. Mention specific aspects like culture, products, mission, or growth opportunities."
    },
    {
      q: "What motivates you?",
      a: "Connect your personal drivers to professional success. Mention learning, problem-solving, teamwork, or impact."
    }
  ];

  const toggleHRQuestion = (question: string) => {
    setOpenHRQuestions(prev => 
      prev.includes(question) 
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

  return (
    <section id="interview" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Interview Preparation
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Master the most commonly asked technical and HR interview questions
          </p>
        </motion.div>

        <Tabs defaultValue="dsa" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8 sm:mb-12 lg:mb-16"
          >
            <TabsList className="grid grid-cols-5 bg-white shadow-lg p-1 sm:p-2 rounded-xl sm:rounded-2xl border-0 w-full max-w-4xl overflow-x-auto">
              {technicalCategories.map((category) => (
                <TabsTrigger 
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 rounded-lg sm:rounded-xl py-2 sm:py-3 px-2 sm:px-6 font-medium text-xs sm:text-sm transition-all min-w-0"
                >
                  <span className="flex items-center justify-center space-x-1 sm:space-x-2">
                    {category.icon}
                    <span className="hidden sm:inline truncate">{category.name}</span>
                  </span>
                </TabsTrigger>
              ))}
              <TabsTrigger 
                value="hr"
                className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-900 rounded-lg sm:rounded-xl py-2 sm:py-3 px-2 sm:px-6 font-medium text-xs sm:text-sm transition-all min-w-0"
              >
                <span className="flex items-center justify-center space-x-1 sm:space-x-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">HR Round</span>
                </span>
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {technicalCategories.map((category, categoryIndex) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <Card className="bg-white shadow-lg border-0 rounded-xl sm:rounded-2xl overflow-hidden">
                  <CardHeader className="text-center pb-6 sm:pb-8 bg-gradient-to-r from-blue-50 to-purple-50 px-4 sm:px-8">
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {category.name} Questions
                    </CardTitle>
                    <p className="text-sm sm:text-base text-gray-600">Click on any question to reveal the answer</p>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 lg:p-8">
                    {category.questions.map((question, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="group"
                      >
                        <Collapsible>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-between p-4 sm:p-5 lg:p-6 h-auto bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg sm:rounded-xl text-left transition-all duration-300 hover:shadow-md"
                            >
                              <span className="font-medium text-gray-800 text-left text-sm sm:text-base leading-relaxed pr-2">
                                Q{index + 1}. {question.q}
                              </span>
                              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-gray-800 transition-transform group-data-[state=open]:rotate-180 flex-shrink-0" />
                            </Button>
                          </CollapsibleTrigger>
                          
                          <CollapsibleContent className="mt-3 sm:mt-4">
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="p-4 sm:p-5 lg:p-6 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-100"
                            >
                              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                {question.a}
                              </p>
                            </motion.div>
                          </CollapsibleContent>
                        </Collapsible>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}

          <TabsContent value="hr" className="space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white shadow-lg border-0 rounded-xl sm:rounded-2xl overflow-hidden">
                <CardHeader className="text-center pb-6 sm:pb-8 bg-gradient-to-r from-orange-50 to-red-50 px-4 sm:px-8">
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    HR Round Questions
                  </CardTitle>
                  <p className="text-sm sm:text-base text-gray-600">Click on any question to reveal the answer</p>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 lg:p-8">
                  {hrQuestions.map((question, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Collapsible
                        open={openHRQuestions.includes(question.q)}
                        onOpenChange={() => toggleHRQuestion(question.q)}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-between p-4 sm:p-5 lg:p-6 h-auto bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg sm:rounded-xl text-left transition-all duration-300 hover:shadow-md"
                          >
                            <span className="font-medium text-gray-800 text-left text-sm sm:text-base leading-relaxed pr-2">
                              Q{index + 1}. {question.q}
                            </span>
                            {openHRQuestions.includes(question.q) ? (
                              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 transition-colors flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 transition-colors flex-shrink-0" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent className="mt-3 sm:mt-4">
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-4 sm:p-5 lg:p-6 bg-orange-50 rounded-lg sm:rounded-xl border border-orange-100"
                          >
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                              {question.a}
                            </p>
                          </motion.div>
                        </CollapsibleContent>
                      </Collapsible>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default InterviewPrepSection;
