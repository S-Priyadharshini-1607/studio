import { motion } from 'motion/react';
import { Send, Phone, MessageSquare } from 'lucide-react';
import { useState } from 'react';

import contactBg from '../../assets/mes/contact-bg.jpeg';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={contactBg}
          alt="Message page backdrop" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex justify-end py-20">
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
              Send us a message
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Get in touch with your customers to provide them with better service. You can modify the form fields to gather more precise information.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter Name"
                  className="w-full px-0 py-2 border-b border-gray-300 focus:border-amber-600 focus:outline-none transition-colors bg-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91"
                  className="w-full px-0 py-2 border-b border-gray-300 focus:border-amber-600 focus:outline-none transition-colors bg-transparent"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="Enter Email"
                  className="w-full px-0 py-2 border-b border-gray-300 focus:border-amber-600 focus:outline-none transition-colors bg-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter Subject"
                  className="w-full px-0 py-2 border-b border-gray-300 focus:border-amber-600 focus:outline-none transition-colors bg-transparent"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Message *</label>
              <textarea
                required
                rows={4}
                placeholder="Type Your Message..."
                className="w-full px-0 py-2 border-b border-gray-300 focus:border-amber-600 focus:outline-none transition-colors bg-transparent resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="px-10 py-3 border border-gray-900 rounded-full text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 font-medium"
              >
                {isSubmitted ? 'Sent successfully!' : 'Submit'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-24 left-10 z-50 flex flex-col gap-4">
        <a
          href="tel:8870378137"
          className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="Call FocusStudio"
        >
          <Phone size={24} />
        </a>
        <a
          href="https://wa.me/918870378137"
          className="w-14 h-14 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="WhatsApp FocusStudio"
        >
          <MessageSquare size={24} />
        </a>
      </div>
    </section>
  );
}
