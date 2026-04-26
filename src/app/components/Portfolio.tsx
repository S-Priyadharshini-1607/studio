import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { ImageWithFallback } from './figma/ImageWithFallback';

import portImage1 from '../../assets/port/port1.jpeg';
import portImage2 from '../../assets/port/port2.jpeg';
import portImage3 from '../../assets/port/port3.jpeg';
import portImage4 from '../../assets/port/port4.jpeg';
import portImage5 from '../../assets/port/port5.jpeg';
import portImage6 from '../../assets/port/port6.jpeg';
import portImage7 from '../../assets/port/port7.jpeg';
import portImage8 from '../../assets/port/port8.jpeg';

const portfolioImages = [
  {
    url: portImage1,
    alt: 'Portfolio image 1',
  },
  {
    url: portImage2,
    alt: 'Portfolio image 2',
  },
  {
    url: portImage3,
    alt: 'Portfolio image 3',
  },
  {
    url: portImage4,
    alt: 'Portfolio image 4',
  },
  {
    url: portImage5,
    alt: 'Portfolio image 5',
  },
  {
    url: portImage6,
    alt: 'Portfolio image 6',
  },
  {
    url: portImage7,
    alt: 'Portfolio image 7',
  },
  {
    url: portImage8,
    alt: 'Portfolio image 8',
  },
];

export default function Portfolio() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Portfolio
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A glimpse into the beautiful moments we've captured for couples around the world
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {portfolioImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer group"
            >
              <ImageWithFallback
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-4 bg-rose-600 text-white rounded-full font-semibold hover:bg-rose-700 transition-all transform hover:scale-105">
            View Full Gallery
          </button>
        </motion.div>
      </div>
    </section>
  );
}
