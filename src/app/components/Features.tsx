import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Heart, 
  Image as ImageIcon, 
  Sparkles, 
  Plane, 
  Baby, 
  Calendar, 
  Video, 
  Briefcase,
  Users,
  Megaphone,
  PartyPopper
} from 'lucide-react';
import { useInView } from './hooks/useInView';

type Category = 'Photoshoot Type' | 'Lifestyle Photoshoot' | 'Event Photoshoot' | 'Commercial Photoshoot' | 'Services';

const serviceData: Record<Category, { name: string; icon: any; color: string; image: string }[]> = {
  "Photoshoot Type": [
    { name: "Drone Shoot", icon: Plane, color: "from-blue-500 to-cyan-500", image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=600&auto=format&fit=crop" },
    { name: "Portfolio", icon: ImageIcon, color: "from-purple-500 to-indigo-500", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop" },
    { name: "Pre Wedding Shoot", icon: Heart, color: "from-rose-500 to-pink-500", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600&auto=format&fit=crop" },
    { name: "Newborn Shoot", icon: Baby, color: "from-emerald-500 to-teal-500", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop" },
    { name: "Event Shoot", icon: Calendar, color: "from-orange-500 to-amber-500", image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&auto=format&fit=crop" },
    { name: "Candid Photography", icon: Camera, color: "from-fuchsia-500 to-purple-500", image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=600&auto=format&fit=crop" }
  ],
  "Lifestyle Photoshoot": [
    { name: "Maternity Shoot", icon: Heart, color: "from-rose-400 to-pink-500", image: "https://images.unsplash.com/photo-1555243896-c709bfa0b564?q=80&w=600&auto=format&fit=crop" },
    { name: "Kids Shoot", icon: Baby, color: "from-cyan-400 to-blue-500", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=600&auto=format&fit=crop" },
    { name: "Family Shoot", icon: Users, color: "from-violet-500 to-purple-600", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop" }
  ],
  "Event Photoshoot": [
    { name: "Birthday Party Shoot", icon: PartyPopper, color: "from-yellow-400 to-orange-500", image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=600&auto=format&fit=crop" },
    { name: "Mehendi Ceremony Photoshoot", icon: Sparkles, color: "from-green-400 to-emerald-600", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=600&auto=format&fit=crop" }
  ],
  "Commercial Photoshoot": [
    { name: "Commercial Photoshoot", icon: Briefcase, color: "from-slate-600 to-slate-800", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop" },
    { name: "Advertising Shoot", icon: Megaphone, color: "from-red-500 to-rose-600", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop" }
  ],
  "Services": [
    { name: "Videography", icon: Video, color: "from-indigo-500 to-blue-600", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop" }
  ]
};

const categories = Object.keys(serviceData) as Category[];

export default function Features() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState<Category>("Photoshoot Type");

  return (
    <section
      id="services"
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-800 min-h-screen"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive photography and videography packages tailored to capture your vision perfectly
          </p>
        </motion.div>

        {/* Category Selection */}
        <div className="mb-12">
          {/* Mobile Dropdown */}
          <div className="md:hidden">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value as Category)}
              className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm appearance-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow-md hover:shadow-lg'
                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {serviceData[activeCategory].map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                  >
                    <div className="p-6 flex items-center gap-4 border-b border-gray-100 dark:border-gray-800">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm`}
                      >
                        <Icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {service.name}
                      </h3>
                    </div>
                    <div className="relative h-48 w-full overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
