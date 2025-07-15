
import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import useEmblaCarousel from 'embla-carousel-react';

const StudyNotesSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'center',
    loop: true,
    dragFree: false,
    containScroll: 'trimSnaps'
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const subjects = [
    {
      name: 'HTML',
      letter: 'H',
      description: 'Web Structure & Markup',
      color: 'bg-vibrant-orange',
      link: 'https://drive.google.com/file/d/10l_B4Q8T5b3BHDEtkmB5jSwirBS5WIZo/view'
    },
    {
      name: 'CSS',
      letter: 'C',
      description: 'Styling & Design',
      color: 'bg-vibrant-blue',
      link: 'https://drive.google.com/file/d/1vBQCi0M-3gHjKW5WRcceclPGOxVET07f/view'
    },
    {
      name: 'JavaScript',
      letter: 'J',
      description: 'Dynamic Programming',
      color: 'bg-vibrant-yellow',
      link: 'https://drive.google.com/file/d/1q0Zyqv3rn-MTTbLEjzPpugNTyOVJMAzA/view'
    },
    {
      name: 'React',
      letter: 'R',
      description: 'Modern UI Framework',
      color: 'bg-vibrant-cyan',
      link: 'https://drive.google.com/file/d/1Wrq1IYLVYpxRSH1T3TGZLjDmnbU01ksx/view'
    },
    {
      name: 'Python',
      letter: 'P',
      description: 'Programming Fundamentals',
      color: 'bg-vibrant-green',
      link: 'https://drive.google.com/file/d/1y4OM50r1vcwzvD_njM8kzLW7n5wGP10N/view'
    },
    {
      name: 'Java',
      letter: 'J',
      description: 'Object-Oriented Programming',
      color: 'bg-vibrant-red',
      link: 'https://drive.google.com/file/d/1EVqik9kZ1CTn5M-EWWdnuDFASgi2Y02P/view'
    },
    {
      name: 'Core CS',
      letter: 'C',
      description: 'CN, OS, DBMS, OODP',
      color: 'bg-vibrant-purple',
      link: 'https://drive.google.com/drive/folders/1y_X-FNxQIrA36S779P7M5AV4D3OWal18?usp=sharing'
    }
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section id="notes" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4 sm:mb-6">
            Study Notes
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Interactive learning materials designed for your success
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Carousel Container */}
          <div className="overflow-visible" ref={emblaRef}>
            <div className="flex items-center -ml-2 sm:-ml-4">
              {subjects.map((subject, index) => (
                <div 
                  key={subject.name} 
                  className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_35%] xl:flex-[0_0_30%] pl-2 sm:pl-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => scrollTo(index)}
                    className={`mx-1 sm:mx-2 cursor-pointer transition-all duration-500 transform ${
                      index === selectedIndex 
                        ? 'scale-100 opacity-100 z-10' 
                        : 'scale-75 sm:scale-80 md:scale-85 opacity-60 hover:opacity-80 hover:scale-80 sm:hover:scale-85 md:hover:scale-90'
                    }`}
                  >
                    <Card className="h-48 sm:h-56 md:h-64 lg:h-72 border-0 shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden backdrop-blur-sm bg-card/80 hover:bg-card/90">
                      <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6 text-center h-full flex flex-col justify-between">
                        <div>
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 ${subject.color} rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4 shadow-lg`}>
                            <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">{subject.letter}</span>
                          </div>
                          
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1 sm:mb-2">{subject.name}</h3>
                          <p className="text-muted-foreground mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm leading-relaxed">{subject.description}</p>
                        </div>
                        
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(subject.link, '_blank');
                          }}
                          className={`${subject.color} hover:opacity-90 text-white font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg sm:rounded-xl w-full shadow-lg transition-all duration-300 hover:scale-105 text-xs sm:text-sm`}
                        >
                          <span className="hidden sm:inline">Access Notes</span>
                          <span className="sm:hidden">Access</span>
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation hint text */}
          <div className="text-center mt-6 sm:mt-8">
            <p className="text-xs sm:text-sm text-muted-foreground px-4">
              <span className="hidden sm:inline">Click on any card to center it • Swipe or drag to navigate</span>
              <span className="sm:hidden">Tap card to center • Swipe to navigate</span>
            </p>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center space-x-1.5 sm:space-x-2 mt-6 sm:mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                index === selectedIndex 
                  ? 'bg-primary w-6 sm:w-8' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2 sm:w-3'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudyNotesSection;
