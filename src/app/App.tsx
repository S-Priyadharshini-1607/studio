import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom';
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

// Admin Components
import Login from './pages/admin/Login';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isServicePage = location.pathname.startsWith('/service/');
  const isAdminPage = ['/login', '/dashboard', '/upload', '/gallery-manager'].includes(location.pathname);

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

  const navigateToService = (service: string) => {
    navigate(`/service/${service}`);
    window.scrollTo(0, 0);
  };

  const navigateToHome = (section = 'hero') => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(section);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If on a service page, the current page is 'service' for the navbar
  const currentPage = isServicePage ? 'service' : 'home';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      {!isAdminPage && (
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          onNavigateService={navigateToService}
          onNavigateHome={navigateToHome}
          currentPage={currentPage}
        />
      )}

      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Portfolio />
              <Features onNavigateService={navigateToService} />
              <VisualSection />
              <Contact />
              <Location />
            </>
          } />
          
          <Route path="/service/:serviceName" element={<ServicePageWrapper onBack={() => navigateToHome('services')} />} />
          
          <Route path="/login" element={<Login />} />
          
          {/* Catch-all route to redirect back home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdminPage && <Footer />}
      {!isAdminPage && <Chatbot />}
    </div>
  );
}

// Helper component to extract params from URL for ServicePage
function ServicePageWrapper({ onBack }: { onBack: () => void }) {
  const { serviceName } = useParams();
  return <ServicePage serviceName={serviceName || ''} onBack={onBack} />;
}