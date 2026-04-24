import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { ImageWithFallback } from './figma/ImageWithFallback';

const portfolioImages = [
  {
    url: 'https://images.unsplash.com/photo-1533091090875-1ff4acc497dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzc3MDAxNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Wedding rings',
  },
  {
    url: 'https://images.unsplash.com/photo-1573676048035-9c2a72b6a12a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzc3MDAxNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Newly wed couple',
  },
  {
    url: 'https://images.unsplash.com/flagged/photo-1552981941-424aac2b4311?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzc3MDAxNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Groom and bride kissing',
  },
  {
    url: 'https://images.unsplash.com/photo-1617724975854-70b5d0cedb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzc3MDAxNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Beach wedding',
  },
  {
    url: 'https://images.unsplash.com/photo-1519741196428-6a2175fa2557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzc3MDAxNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Romantic couple',
  },
  {
    url: 'https://images.unsplash.com/photo-1563808599481-34a342e44508?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzc3MDAxNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Couple on dock',
  },
  {
    url: 'https://images.unsplash.com/photo-1617725145063-56958eadf557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzc3MDAxNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Walking on beach',
  },
  {
    url: 'https://images.unsplash.com/photo-1608326670856-e3b41eecb106?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzc3MDAxNTIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: 'Couple on rocks',
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
