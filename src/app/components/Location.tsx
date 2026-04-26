import { motion } from 'motion/react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { useInView } from './hooks/useInView';

export default function Location() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section
      id="location"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Visit Us</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stop by our office or schedule a virtual tour
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-2xl h-96"
          >
            <iframe
              src="https://maps.google.com/maps?q=1%20Floor%2C%20Focus%20Photography%2C%20Near%20GH%2C%20Mandhaveli%2C%20Kallakurichi%20-%20Kachirapalayam%20Road%2C%20Kallakurichi-606202%2C%20Tamil%20Nadu&t=&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
          </motion.div>

          {/* Location Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <MapPin className="text-blue-600 dark:text-blue-400" size={24} aria-label="Address" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Address</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    1 Floor, Focus Photography, Near GH, Mandhaveli,<br />
                    Kallakurichi – Kachirapalayam Road,<br />
                    Kallakurichi-606202, Tamil Nadu
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <Clock className="text-purple-600 dark:text-purple-400" size={24} aria-label="Working Hours" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Working Hours</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Sunday to Saturday<br />
                    9:00 AM to 9:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Phone className="text-green-600 dark:text-green-400" size={24} aria-label="Phone" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    <a href="tel:08792740847" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      08792740847
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <a 
              href="https://www.google.com/maps/search/?api=1&query=1+Floor%2C+Focus+Photography%2C+Near+GH%2C+Mandhaveli%2C+Kallakurichi+-+Kachirapalayam+Road%2C+Kallakurichi-606202%2C+Tamil+Nadu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block text-center w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              Get Directions
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
