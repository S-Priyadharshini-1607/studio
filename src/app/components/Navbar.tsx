import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About us', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Contact', id: 'contact' },
  ];


  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-2xl font-bold transition-colors min-w-[150px] ${
              isScrolled ? 'text-rose-600' : 'text-white'
            }`}
          >
            FocusStudio
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => scrollToSection(link.id)}
                className={`transition-colors font-bold tracking-wider uppercase text-xs ${
                  isScrolled 
                    ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600' 
                    : 'text-white hover:text-blue-200'
                }`}
              >
                {link.name}
              </motion.button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4 min-w-[200px] justify-end">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300' 
                  : 'hover:bg-white/20 text-white'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => scrollToSection('hero')}
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Get Started
            </motion.button>
          </div>


          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left py-3 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-bold uppercase text-sm tracking-wide border-b border-gray-100 dark:border-gray-800 last:border-0"
                >
                  {link.name}
                </button>
              ))}

              <button
                onClick={() => scrollToSection('hero')}
                className="w-full mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
