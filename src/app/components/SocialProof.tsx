import { motion } from 'motion/react';
import { Users, Award, TrendingUp } from 'lucide-react';
import { useInView } from './hooks/useInView';
import { useEffect, useState } from 'react';

const stats = [
  { icon: Users, value: 500, suffix: '+', label: 'Happy Couples' },
  { icon: Award, value: 25, suffix: '+', label: 'Awards Won' },
  { icon: TrendingUp, value: 100, suffix: '%', label: 'Satisfaction Rate' },
];

const testimonials = [
  {
    name: 'Sarah & James',
    role: 'Married June 2025',
    content: 'Our wedding photos are absolutely stunning! Every moment was captured with such beauty and emotion.',
  },
  {
    name: 'Emma & Michael',
    role: 'Married September 2025',
    content: 'Professional, creative, and so easy to work with. Our photos exceeded all expectations!',
  },
  {
    name: 'Lisa & David',
    role: 'Married March 2026',
    content: 'We can\'t stop looking at our wedding album. These photos will be treasured forever!',
  },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {target < 10 ? count.toFixed(1) : count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function SocialProof() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Icon className="text-blue-600 dark:text-blue-400" size={32} />
                </div>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {isInView && <Counter target={stat.value} suffix={stat.suffix} />}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by Thousands
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            See what our users have to say
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-bold">{testimonial.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
