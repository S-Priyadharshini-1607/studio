import { useState, useEffect, useRef } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import logoImg from '../../assets/logo.jpeg';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onNavigateService: (service: string) => void;
  onNavigateHome: (section?: string) => void;
  currentPage: 'home' | 'service';
}

export default function Navbar({ 
  darkMode, 
  toggleDarkMode, 
  onNavigateService, 
  onNavigateHome, 
  currentPage 
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
      ref={navRef as any}
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
            onClick={() => onNavigateHome(currentPage === 'service' ? 'services' : 'hero')}
            className={`flex items-center gap-2 text-2xl font-bold transition-colors min-w-[150px] cursor-pointer ${
              isScrolled ? 'text-rose-600' : 'text-white'
            }`}
          >
            <img src={logoImg} alt="FocusStudio Logo" className="w-10 h-10 rounded-full object-cover" />
            <span>FocusStudio</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-8">
            {navLinks.map((link, index) => (
              <div key={link.id} className="relative">
                <motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => {
                    if (link.id === 'services') {
                      setIsServicesOpen(!isServicesOpen);
                    } else if (link.id === 'hero') {
                      onNavigateHome();
                    } else {
                      scrollToSection(link.id);
                      setIsServicesOpen(false);
                    }
                  }}
                  className={`transition-colors font-bold tracking-wider uppercase text-xs flex items-center gap-1 ${
                    isScrolled 
                      ? 'text-gray-700 dark:text-gray-300 hover:text-blue-600' 
                      : 'text-white hover:text-blue-200'
                  }`}
                >
                  {link.name}
                </motion.button>
                {link.id === 'services' && isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 w-48 overflow-hidden"
                  >
                    {['Wedding', 'Prewedding', 'Postwedding', 'Engagement', 'Birthday Shoots', 'Baby Shower', 'Newborn Shoot', 'Candid Photography', 'School Function', 'College Function'].map((service) => (
                      <button
                        key={service}
                        onClick={() => {
                          onNavigateService(service);
                          setIsServicesOpen(false);
                        }}
                        className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-gray-700 transition-colors"
                      >
                        {service}
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4 min-w-[200px] justify-end">
            <button
              onClick={toggleDarkMode}
              className={`p-3 rounded-full transition-colors ${
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
              className={`p-3 transition-colors ${isScrolled ? 'text-gray-900 dark:text-white' : 'text-white'}`}
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
                <div key={link.id}>
                  <button
                    onClick={() => {
                      if (link.id === 'services') {
                        setIsServicesOpen(!isServicesOpen);
                      } else {
                        scrollToSection(link.id);
                        setIsServicesOpen(false);
                      }
                    }}
                    className="flex justify-between items-center w-full text-left py-3 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-bold uppercase text-sm tracking-wide border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    {link.name}
                  </button>
                  {link.id === 'services' && isServicesOpen && (
                    <div className="pl-4 py-2 flex flex-col gap-3 border-b border-gray-100 dark:border-gray-800">
                      {['Wedding', 'Prewedding', 'Postwedding', 'Engagement', 'Birthday Shoots', 'Baby Shower', 'Newborn Shoot', 'Candid Photography', 'School Function', 'College Function'].map((service) => (
                        <button
                          key={service}
                          onClick={() => {
                            onNavigateService(service);
                            setIsServicesOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                          className="text-left text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-amber-600"
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
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
