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
import Loading from './components/Loading';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
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
      <AnimatePresence>
        {showLoading && <Loading />}
      </AnimatePresence>

      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main>
        <Hero />
        <About />
        <Portfolio />
        <Features />
        <VisualSection />
        <Contact />
        <Location />
      </main>


      <Footer />
      <Chatbot />
    </div>
  );
}