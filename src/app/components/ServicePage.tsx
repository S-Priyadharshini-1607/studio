import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Lightbox } from './ui/Lightbox';

// Import Prewedding Images
import pre1 from '../../assets/prewedding/01.jpg.jpeg';
import pre2 from '../../assets/prewedding/010.jpg.jpeg';
import pre3 from '../../assets/prewedding/016.jpg.jpeg';
import pre4 from '../../assets/prewedding/03.jpg.jpeg';
import pre5 from '../../assets/prewedding/04.jpg.jpeg';
import pre6 from '../../assets/prewedding/05.jpg.jpeg';
import pre7 from '../../assets/prewedding/07.jpg.jpeg';
import pre8 from '../../assets/prewedding/08.jpg.jpeg';
import pre9 from '../../assets/prewedding/020.jpg.jpeg';
import pre10 from '../../assets/prewedding/021.jpg.jpeg';

// Import Wedding Images
import wed1 from '../../assets/wedding/009A2700.JPG.jpeg';
import wed2 from '../../assets/wedding/009A2713.JPG.jpeg';
import wed3 from '../../assets/wedding/009A2739.JPG.jpeg';
import wed4 from '../../assets/wedding/009A3450.JPG.jpeg';
import wed5 from '../../assets/wedding/009A3762.JPG.jpeg';
import wed6 from '../../assets/wedding/009A4511.JPG.jpeg';
import wed7 from '../../assets/wedding/009A8499.JPG.jpeg';
import wed8 from '../../assets/wedding/009A8547.JPG.jpeg';
import wed9 from '../../assets/wedding/009A8548.JPG.jpeg';
import wed10 from '../../assets/wedding/009A8556.JPG.jpeg';

interface ServicePageProps {
  serviceName: string;
  onBack: () => void;
}

const serviceData: Record<string, { title: string; description: string; images: string[] }> = {
  'Wedding': {
    title: 'Wedding Photography',
    description: 'Timeless, elegant, and emotive wedding photography that captures every moment of your special day, from the quiet whispers to the grand celebrations.',
    images: [wed1, wed2, wed3, wed4, wed5, wed6, wed7, wed8, wed9, wed10]
  },
  'Prewedding': {
    title: 'Prewedding Photography',
    description: 'Capture the anticipation and romance before your big day. We find the most scenic locations and use natural light to tell your unique love story.',
    images: [pre1, pre2, pre3, pre4, pre5, pre6, pre7, pre8, pre9, pre10]
  },
  'Postwedding': {
    title: 'Postwedding Celebrations',
    description: 'The stress of the wedding is over, and now it is just about you two. Relaxed, beautiful, and intimate post-wedding sessions to celebrate your new chapter.',
    images: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544078755-9a849788f8d5?q=80&w=800&auto=format&fit=crop'
    ]
  },
  'Engagement': {
    title: 'Engagement Sessions',
    description: 'The moment she says yes, captured forever. From surprise proposals to stylized engagement shoots, we ensure every detail of this milestone is documented.',
    images: [
      'https://images.unsplash.com/photo-1515543169302-35804576d165?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533158097560-64299b9ed9ee?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596484552834-6a58f850d0a1?q=80&w=800&auto=format&fit=crop'
    ]
  },
  'Birthday Shoots': {
    title: 'Birthday & Event Shoots',
    description: 'Celebrate another trip around the sun with a fun, vibrant birthday photoshoot. Whether it is a sweet sixteen or a milestone 50th, we bring the energy and creativity.',
    images: [
      'https://images.unsplash.com/photo-1530103862676-de889ca2bd91?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=800&auto=format&fit=crop'
    ]
  },
  'Baby Shower': {
    title: 'Baby Shower Photography',
    description: 'Celebrate the upcoming arrival of your little one with beautiful, glowing portraits and joyous event coverage with family and friends.',
    images: [
      'https://images.unsplash.com/photo-1555243896-c709bfa0b564?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop'
    ]
  },
  'Newborn Shoot': {
    title: 'Newborn Photography',
    description: 'Those first few weeks are fleeting. We create safe, warm, and beautiful environments to capture the delicate features of your newborn.',
    images: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555243896-c709bfa0b564?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544078755-9a849788f8d5?q=80&w=800&auto=format&fit=crop'
    ]
  },
  'Candid Photography': {
    title: 'Candid Photography',
    description: 'No forced smiles. No awkward posing. Just genuine emotions, laughter, and beautiful, raw moments captured perfectly as they happen.',
    images: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop'
    ]
  },
  'School Function': {
    title: 'School Function Photography',
    description: 'From annual days to sports events, we cover school functions with professional equipment to capture the bright smiles and talents of students.',
    images: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&auto=format&fit=crop'
    ]
  },
  'College Functions': {
    title: 'College Event Photography',
    description: 'Fests, farewells, graduations, and alumni meets. We document the high-energy and unforgettable moments of college life.',
    images: [
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=800&auto=format&fit=crop'
    ]
  }
};

export default function ServicePage({ serviceName, onBack }: ServicePageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  // Fallback data in case the serviceName doesn't strictly match
  const data = serviceData[serviceName] || {
    title: `${serviceName} Photography`,
    description: `We offer premium ${serviceName.toLowerCase()} photography services. Our team is dedicated to capturing your most beautiful moments with stunning clarity.`,
    images: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop'
    ]
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 md:p-16 shadow-2xl overflow-hidden"
        >
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {data.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {data.description}
            </p>
          </div>
          
          {/* Sample Gallery Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Sample Gallery</h2>
            <div className={(serviceName === 'Prewedding' || serviceName === 'Wedding') 
              ? "grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]" 
              : "grid md:grid-cols-3 gap-6"}>
              {data.images.map((img, idx) => {
                let spanClass = "";
                if (serviceName === 'Prewedding') {
                  if (idx === 0) spanClass = "md:col-span-2 md:row-span-2";
                  else if (idx === 7) spanClass = "md:col-span-2 md:row-span-2";
                  else spanClass = "md:col-span-1 md:row-span-1";
                } else if (serviceName === 'Wedding') {
                  if (idx === 0) spanClass = "md:col-span-4 md:row-span-2";
                  else if (idx === 1) spanClass = "md:col-span-2 md:row-span-2";
                  else if (idx === 4) spanClass = "md:col-span-2 md:row-span-2";
                  else if (idx === 9) spanClass = "md:col-span-2 md:row-span-1";
                  else spanClass = "md:col-span-1 md:row-span-1";
                } else {
                  spanClass = "aspect-[4/5]";
                }

                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * idx }}
                    onClick={() => openLightbox(idx)}
                    className={`rounded-2xl overflow-hidden shadow-lg group relative cursor-pointer ${spanClass}`}
                  >
                    <img 
                      src={img} 
                      alt={`${serviceName} sample ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          <Lightbox 
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            images={data.images}
            currentIndex={currentIndex}
            onPrev={() => setCurrentIndex((prev) => (prev - 1 + data.images.length) % data.images.length)}
            onNext={() => setCurrentIndex((prev) => (prev + 1) % data.images.length)}
          />

          {/* Pricing / Booking Call to Action */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-rose-50 dark:bg-gray-700/50 p-10 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6">What's Included</h3>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-rose-600" size={24} />
                  <span className="text-lg">Professional Photography</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-rose-600" size={24} />
                  <span className="text-lg">High-Resolution Edits</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-rose-600" size={24} />
                  <span className="text-lg">Digital Gallery Access</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-rose-600" size={24} />
                  <span className="text-lg">Quick Turnaround Time</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col justify-center items-center bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 p-10 rounded-3xl text-center">
              <h3 className="text-3xl font-bold mb-4">Book Your Session</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg max-w-md">
                Ready to create some magic? Get in touch with us to schedule your {serviceName.toLowerCase()} session.
              </p>
              <button 
                onClick={onBack}
                className="px-10 py-4 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                Contact Us Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
