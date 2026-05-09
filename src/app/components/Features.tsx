import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import weddingHeader from '../../assets/wedding/custom_header.jpg';
import preweddingHeader from '../../assets/prewedding/custom_header.jpg';
import engagementHeader from '../../assets/engagement/custom_header.jpg';
import postweddingHeader from '../../assets/postwedding/custom_header.jpg';
import birthdayHeader from '../../assets/birthday/custom_header.jpg';
import babyShowerHeader from '../../assets/baby_shower/custom_header.jpg';
import newbornHeader from '../../assets/newborn/custom_header.jpg';
import candidHeader from '../../assets/candid/custom_header.jpg';
import schoolHeader from '../../assets/school/custom_header.jpg';

interface FeaturesProps {
  onNavigateService?: (service: string) => void;
}

const mainServices = [
  {
    name: 'Wedding',
    color: 'from-amber-500 to-orange-600',
    image: weddingHeader
  },
  {
    name: 'Prewedding',
    color: 'from-rose-500 to-pink-500',
    image: preweddingHeader
  },
  {
    name: 'Postwedding',
    color: 'from-blue-500 to-cyan-500',
    image: postweddingHeader
  },
  {
    name: 'Engagement',
    color: 'from-purple-500 to-indigo-500',
    image: engagementHeader
  },
  {
    name: 'Birthday',
    color: 'from-orange-500 to-amber-500',
    image: birthdayHeader
  },
  {
    name: 'Baby Shower',
    color: 'from-pink-400 to-rose-400',
    image: babyShowerHeader
  },
  {
    name: 'Newborn Shoot',
    color: 'from-emerald-400 to-teal-500',
    image: newbornHeader
  },
  {
    name: 'Candid Photography',
    color: 'from-fuchsia-500 to-purple-500',
    image: candidHeader
  },
  {
    name: 'School & College Function',
    color: 'from-blue-400 to-indigo-500',
    image: schoolHeader
  },

];

export default function Features({ onNavigateService }: FeaturesProps) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section
      id="services"
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-800 min-h-screen flex items-center"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive photography packages tailored to capture your vision perfectly
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mainServices.map((service, index) => {
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => onNavigateService && onNavigateService(service.name)}
                className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-pointer group border border-gray-100 dark:border-gray-800 flex flex-col h-full"
              >
                <div className="relative h-80 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10 duration-500" />
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 transition-all duration-500 group-hover:h-full`} />
                  
                  <div className="absolute bottom-8 left-8 right-8 z-20 flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-white tracking-wide group-hover:text-amber-400 transition-colors">
                      {service.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
