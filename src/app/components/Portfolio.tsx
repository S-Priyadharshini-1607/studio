import { useState } from 'react';
import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Lightbox } from './ui/Lightbox';

import portImage1 from '../../assets/port/port1.jpeg';
import portImage2 from '../../assets/port/port2.jpeg';
import portImage3 from '../../assets/port/port3.jpeg';
import portImage4 from '../../assets/port/port4.jpeg';
import portImage5 from '../../assets/port/port5.jpeg';
import portImage6 from '../../assets/port/port6.jpeg';
import portImage7 from '../../assets/port/port7.jpeg';
import portImage8 from '../../assets/port/port8.jpeg';

const categories = [
  'All',
  'Wedding',
  'Prewedding',
  'Postwedding',
  'Engagement',
  'Birthday Shoots',
  'Baby Shower',
  'Newborn Shoot',
  'Candid Photography',
  'School Function',
  'College Function'
];

import pre1 from '../../assets/prewedding/01.jpg.jpeg';
import pre2 from '../../assets/prewedding/010.jpg.jpeg';
import wed1 from '../../assets/wedding/009A2700.JPG.jpeg';
import wed2 from '../../assets/wedding/009A2713.JPG.jpeg';

const allPortfolioImages = [
  { url: portImage1, alt: 'Wedding Couple', category: 'Wedding' },
  { url: portImage2, alt: 'Prewedding Moment', category: 'Prewedding' },
  { url: portImage3, alt: 'Engagement Ring', category: 'Engagement' },
  { url: portImage4, alt: 'Birthday Celebration', category: 'Birthday Shoots' },
  { url: portImage5, alt: 'Newborn Baby', category: 'Newborn Shoot' },
  { url: portImage6, alt: 'Baby Shower Joy', category: 'Baby Shower' },
  { url: portImage7, alt: 'Candid Smile', category: 'Candid Photography' },
  { url: portImage8, alt: 'School Event', category: 'School Function' },
  { url: pre1, alt: 'Prewedding Scenic', category: 'Prewedding' },
  { url: pre2, alt: 'Prewedding Love', category: 'Prewedding' },
  { url: wed1, alt: 'Grand Wedding', category: 'Wedding' },
  { url: wed2, alt: 'Wedding Vows', category: 'Wedding' },
  { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop', alt: 'Postwedding', category: 'Postwedding' },
  { url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop', alt: 'College Event', category: 'College Function' },
];

export default function Portfolio() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredImages = activeCategory === 'All' 
    ? allPortfolioImages 
    : allPortfolioImages.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-24 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Capture Your Moments
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A glimpse into the beautiful memories we've documented across all our services
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-rose-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.url}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10 }}
                onClick={() => openLightbox(index)}
                className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl cursor-pointer group"
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-1">{image.category}</span>
                  <p className="text-white text-lg font-bold">{image.alt}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Lightbox 
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={filteredImages.map(img => img.url)}
          currentIndex={currentIndex}
          onPrev={() => setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)}
          onNext={() => setCurrentIndex((prev) => (prev + 1) % filteredImages.length)}
        />
      </div>
    </section>
  );
}
