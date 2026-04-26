import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import image1 from '../../assets/picture/1.jpeg';
import image2 from '../../assets/picture/2.jpeg';
import image3 from '../../assets/picture/3.jpeg';
import image4 from '../../assets/picture/4.jpeg';
import image5 from '../../assets/picture/5.jpeg';

const BACKGROUND_IMAGES = [image1, image2, image3, image4, image5];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0 bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key="hero-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={BACKGROUND_IMAGES[currentImageIndex]}
              alt="Photography gallery"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center text-white">
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-10 w-16 h-16 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"
        />
      </div>
    </section>
  );
}
