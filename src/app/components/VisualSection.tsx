import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useInView } from './hooks/useInView';
import { ImageWithFallback } from './figma/ImageWithFallback';
import lovImage from '../../assets/lov.jpg';

const benefits = [
  'Unlimited photos on your wedding day',
  'Professional editing & retouching',
  'Online gallery for easy sharing',
  'Engagement session included',
  'Premium wedding album option',
];

export default function VisualSection() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3]">
                <ImageWithFallback
                  src={lovImage}
                  alt="Wedding couple"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating card */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 max-w-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-green-600 dark:text-green-400" size={24} />
                  </div>
                  <div>
                    <div className="font-bold">Goal Achieved!</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      5 tasks completed today
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Love Story, Beautifully Told
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              We combine artistic vision with technical expertise to create timeless wedding photographs that you'll cherish forever.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="text-green-500 flex-shrink-0" size={24} />
                  <span className="text-lg">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center gap-2 group"
            >
              Try Demo
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
