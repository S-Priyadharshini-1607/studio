import { motion } from 'motion/react';
import { Camera, Heart, Image, Sparkles } from 'lucide-react';
import { useInView } from './hooks/useInView';

const features = [
  {
    icon: Camera,
    title: 'Wedding Day Coverage',
    description: 'Full-day photography coverage capturing every precious moment from getting ready to the last dance.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: Heart,
    title: 'Engagement Sessions',
    description: 'Romantic pre-wedding sessions at your favorite locations to capture your love story.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Image,
    title: 'Fine Art Albums',
    description: 'Luxury handcrafted albums that become treasured family heirlooms for generations.',
    color: 'from-orange-500 to-rose-500',
  },
  {
    icon: Sparkles,
    title: 'Artistic Editing',
    description: 'Professional retouching and color grading that brings out the magic in every photograph.',
    color: 'from-amber-500 to-orange-500',
  },
];

export default function Features() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section
      id="services"
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-800"
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
            Comprehensive wedding photography packages tailored to capture your special day perfectly
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
