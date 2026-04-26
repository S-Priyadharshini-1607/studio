import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';

const ABOUT_IMAGES = [
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop"
];


export default function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % ABOUT_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white relative inline-block">
            About us
            <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-amber-600"></div>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative h-[400px] md:h-[600px] w-full">
              <div className="absolute -inset-4 border-2 border-amber-200 dark:border-amber-900/30 rounded-lg -z-10 translate-x-8 translate-y-8"></div>
              <div className="relative h-full w-full overflow-hidden rounded-lg shadow-2xl bg-gray-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <ImageWithFallback
                      src={ABOUT_IMAGES[currentImageIndex]}
                      alt={`Studio story image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Text Side */}

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="space-y-4">
              <span className="text-sm font-semibold tracking-widest text-amber-600 dark:text-amber-400 uppercase">
                The Studio
              </span>
              <h2 className="text-4xl md:text-6xl font-serif text-gray-900 dark:text-white leading-tight">
                Artistry & Emotion
              </h2>
            </div>

            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
              <p>
                At Glow Studio, we transcend traditional photography. We craft cinematic legacies. 
                Our bright, highly editorial style is tailored for couples who view their love story 
                as a masterpiece.
              </p>
              <p>
                Based globally, our discreet, fine-art approach captures the raw emotion, 
                sophisticated details, and unscripted magic of your most important days.
              </p>
            </div>

            <div className="pt-4">
              <span className="text-4xl font-serif italic text-amber-600 dark:text-amber-400">
                Glow
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
