import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Features from './components/Features';
import VisualSection from './components/VisualSection';
import Chatbot from './components/Chatbot';
import Contact from './components/Contact';
import Location from './components/Location';
import Footer from './components/Footer';

import ServicePage from './components/ServicePage';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [currentPage, setCurrentPage] = useState<'home' | 'service'>('home');
  const [selectedService, setSelectedService] = useState('');

  const navigateToService = (service: string) => {
    setSelectedService(service);
    setCurrentPage('service');
    // Use hash for service pages
    if (window.location.hash !== `#${service}`) {
      window.history.pushState({ page: 'service', service }, '', `#${service}`);
    }
    window.scrollTo(0, 0);
  };

  const navigateToHome = (section = 'hero') => {
    setCurrentPage('home');
    // Clear hash for home
    if (window.location.hash || window.location.pathname !== '/') {
      window.history.pushState({ page: 'home' }, '', '/');
    }
    
    if (section === 'hero') {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state && state.page === 'service') {
        setSelectedService(state.service);
        setCurrentPage('service');
      } else {
        // If no state, check hash as fallback
        const hash = window.location.hash.replace('#', '');
        if (hash) {
          setSelectedService(hash);
          setCurrentPage('service');
        } else {
          setCurrentPage('home');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Handle initial state
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setSelectedService(hash);
      setCurrentPage('service');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">

      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode} 
        onNavigateService={navigateToService}
        onNavigateHome={navigateToHome}
        currentPage={currentPage}
      />

      <main>
        {currentPage === 'home' ? (
          <>
            <Hero />
            <About />
            <Portfolio />
            <Features onNavigateService={navigateToService} />
            <VisualSection />
            <Contact />
            <Location />
          </>
        ) : (
          <ServicePage 
            serviceName={selectedService} 
            onBack={() => { 
              navigateToHome('services'); 
            }} 
          />
        )}
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
}