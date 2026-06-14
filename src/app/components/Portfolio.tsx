import { useState, useEffect } from 'react';
import { fetchGalleryFromSheets, deleteSheetItem, uploadToCloudinary, syncWithGoogleSheets, updateSheetItem } from '../../lib/services';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import InlineControls from './admin/InlineControls';
import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Lightbox } from './ui/Lightbox';

import portImage1 from '../../assets/port/port1.jpeg';
import portImage2 from '../../assets/port/port2.jpeg';
import portImage3 from '../../assets/port/port3.jpeg';
import portImage4 from '../../assets/port/port4.jpeg';
import portImage5 from '../../assets/port/port5.jpeg';
import portImage6 from '../../assets/port/port6.jpeg';
import portImage7 from '../../assets/port/port7.jpeg';
import portImage8 from '../../assets/port/port8.jpeg';

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

// Import Engagement Images
import eng1 from '../../assets/engagement/1.avif';
import eng2 from '../../assets/engagement/2.jpg';
import eng3 from '../../assets/engagement/3.jpg';
import eng4 from '../../assets/engagement/4.jpg';
import eng5 from '../../assets/engagement/5.jpeg';
import eng6 from '../../assets/engagement/6.jpg';
import eng7 from '../../assets/engagement/7.jpg';
import eng8 from '../../assets/engagement/8.avif';

// Import Birthday Images
import birth1 from '../../assets/birthday/1.jpg';
import birth2 from '../../assets/birthday/2.jpg';
import birth3 from '../../assets/birthday/4.jpg';
import birth4 from '../../assets/birthday/5.jpg';
import birth5 from '../../assets/birthday/6.jpg';
import birth6 from '../../assets/birthday/7.jpg';

// Import Baby Shower Images
import bs1 from '../../assets/baby_shower/bs1.jpg';
import bs2 from '../../assets/baby_shower/bs2.jpg';
import bs3 from '../../assets/baby_shower/bs3.webp';
import bs4 from '../../assets/baby_shower/bs4.jpg';
import bs5 from '../../assets/baby_shower/bs5.webp';
import bs6 from '../../assets/baby_shower/bs6.jpg';
import bs7 from '../../assets/baby_shower/bs7.jpg';

const portfolioImages = [
  { url: portImage1, alt: 'Wedding Couple Portrait' },
  { url: portImage2, alt: 'Traditional Wedding Ceremony' },
  { url: portImage3, alt: 'Artistic Ring Shot' },
  { url: portImage4, alt: 'Romantic Prewedding Moment' },
  { url: portImage5, alt: 'Candid Smile' },
  { url: portImage6, alt: 'Elegant Bride' },
  { url: portImage7, alt: 'Outdoor Celebration' },
  { url: portImage8, alt: 'Laughter and Joy' },
  // Extended gallery images
  { url: wed1, alt: 'Wedding Day Magic' },
  { url: wed2, alt: 'Wedding Vows' },
  { url: wed3, alt: 'The Grand Entrance' },
  { url: wed4, alt: 'Wedding Celebration' },
  { url: wed5, alt: 'First Dance' },
  { url: pre1, alt: 'Sun-kissed Prewedding' },
  { url: pre2, alt: 'Golden Hour Romance' },
  { url: pre3, alt: 'Lakeside Prewedding' },
  { url: pre4, alt: 'Urban Prewedding' },
  { url: eng1, alt: 'She Said Yes!' },
  { url: eng2, alt: 'The Proposal' },
  { url: eng3, alt: 'Engagement Bliss' },
  { url: birth1, alt: 'Birthday Celebration' },
  { url: birth2, alt: 'Fun Times' },
  { url: bs1, alt: 'Baby Shower Glow' },
  { url: bs2, alt: 'Expecting with Joy' },
  { url: wed6, alt: 'Wedding Details' },
  { url: wed7, alt: 'Traditional Attire' },
  { url: wed8, alt: 'Joyful Moments' },
  { url: pre5, alt: 'Nature Prewedding' },
  { url: pre6, alt: 'Serene Prewedding' },
  { url: eng4, alt: 'Engagement Details' },
  { url: eng5, alt: 'Together Forever' },
  { url: birth3, alt: 'Birthday Cake' },
  { url: birth4, alt: 'Party Vibes' },
  { url: bs3, alt: 'Baby Shower Decorations' },
  { url: bs4, alt: 'Family Love' },
  { url: wed9, alt: 'The Happy Couple' },
  { url: wed10, alt: 'Wedding Portraits' },
  { url: pre7, alt: 'Classic Prewedding' },
  { url: pre8, alt: 'Timeless Romance' },
  { url: eng6, alt: 'Engagement Fun' },
  { url: eng7, alt: 'Love Story' },
  { url: birth5, alt: 'Celebration Smiles' },
  { url: birth6, alt: 'Event Photography' },
  { url: bs5, alt: 'Baby Shower Memories' },
  { url: bs6, alt: 'Sweet Expectations' },
  { url: pre9, alt: 'Dreamy Prewedding' },
  { url: pre10, alt: 'Adventure Prewedding' },
  { url: eng8, alt: 'Engagement Sunset' },
  { url: bs7, alt: 'Celebration of Life' },
];


export default function Portfolio() {
  const { user } = useAuth();
  const [images, setImages] = useState(portfolioImages);
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    const data = await fetchGalleryFromSheets();
    if (data && data.length > 0) {
      setImages(data);
    }
  };

  const handleDelete = async (url: string) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    try {
      await deleteSheetItem(url);
      setImages(images.filter(img => img.url !== url));
      toast.success('Deleted successfully');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const handleAdd = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      const title = prompt('Enter photo title:');
      if (!title) return;
      
      toast.loading('Uploading...');
      try {
        const url = await uploadToCloudinary(file);
        const newItem = { title, category: 'All', url };
        await syncWithGoogleSheets(newItem);
        setImages([...images, newItem]);
        toast.dismiss();
        toast.success('Uploaded successfully');
      } catch (err) {
        toast.dismiss();
        toast.error('Upload failed');
      }
    };
    input.click();
  };

  const handleReplace = async (oldUrl: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      
      toast.loading('Replacing image...');
      try {
        const newUrl = await uploadToCloudinary(file);
        await updateSheetItem(oldUrl, { url: newUrl });
        setImages(images.map(img => img.url === oldUrl ? { ...img, url: newUrl } : img));
        toast.dismiss();
        toast.success('Image replaced successfully');
      } catch (err) {
        toast.dismiss();
        toast.error('Failed to replace image');
      }
    };
    input.click();
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const visibleImages = showAll ? images : images.slice(0, 8);

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Capture Your Moments
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            A glimpse into the beautiful moments we've captured for couples around the world
          </p>
          
          {user && (
            <InlineControls 
              variant="section" 
              onAdd={handleAdd} 
            />
          )}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: (index % 8) * 0.1 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onClick={() => openLightbox(index)}
              className="relative aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer group"
            >
              {user && (
                <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <InlineControls 
                    onReplace={() => handleReplace(image.url)}
                    onEdit={() => {
                      const newTitle = prompt('Enter new title:', image.alt || image.title);
                      if (newTitle) alert('Update logic would go here');
                    }}
                    onDelete={() => handleDelete(image.url)}
                  />
                </div>
              )}
              <ImageWithFallback
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <Lightbox 
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={visibleImages.map(img => img.url)}
          currentIndex={currentIndex}
          onPrev={() => setCurrentIndex((prev) => (prev - 1 + visibleImages.length) % visibleImages.length)}
          onNext={() => setCurrentIndex((prev) => (prev + 1) % visibleImages.length)}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button 
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-4 bg-rose-600 text-white rounded-full font-semibold hover:bg-rose-700 transition-all transform hover:scale-105"
          >
            {showAll ? 'Show Less' : 'View Full Gallery'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
