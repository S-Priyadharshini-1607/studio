import AdminNavbar from './AdminNavbar';
import { motion } from 'motion/react';
import { Edit2, Trash2, Search, Filter } from 'lucide-react';

export default function GalleryManager() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminNavbar />
      
      <main className="flex-1 ml-20 md:ml-64 p-6 md:p-10">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Gallery Management</h1>
            <p className="text-gray-500 dark:text-gray-400">View, edit, or remove photos from your public portfolio.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search photos..."
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full pl-11 pr-6 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <button className="p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full text-gray-500 hover:text-amber-500 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop`} 
                  alt="Gallery item"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <button className="p-3 bg-white text-gray-900 rounded-full hover:bg-amber-500 hover:text-white transition-colors">
                    <Edit2 size={20} />
                  </button>
                  <button className="p-3 bg-white text-rose-600 rounded-full hover:bg-rose-600 hover:text-white transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-amber-600 mb-1 tracking-wider uppercase">Wedding</div>
                <h3 className="font-bold text-gray-900 dark:text-white truncate">Classic Wedding Shoot 0{i}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
