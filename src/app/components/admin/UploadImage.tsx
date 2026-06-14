import AdminNavbar from './AdminNavbar';
import { motion } from 'motion/react';
import { Upload, Cloud, Link as LinkIcon, Database, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { uploadToCloudinary, syncWithGoogleSheets } from '../../../lib/services';
import { toast } from 'sonner';

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Wedding');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !title) {
      toast.error('Please provide both a photo and a title.');
      return;
    }

    setIsUploading(true);
    try {
      // 1. Upload to Cloudinary
      const imageUrl = await uploadToCloudinary(file);
      
      // 2. Sync with Google Sheets
      await syncWithGoogleSheets({
        title,
        category,
        url: imageUrl
      });

      toast.success('Photo uploaded and synced successfully!');
      setFile(null);
      setTitle('');
    } catch (error) {
      toast.error('Upload failed. Please check your API configuration.');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminNavbar />
      
      <main className="flex-1 ml-20 md:ml-64 p-6 md:p-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Upload New Content</h1>
          <p className="text-gray-500 dark:text-gray-400">Add new photos to Cloudinary and sync them with Google Sheets.</p>
        </header>

        <div className="max-w-4xl bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
          <div 
            className={`border-2 border-dashed ${file ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-900/10' : 'border-gray-200 dark:border-gray-700'} rounded-[2rem] p-12 text-center hover:border-amber-500 transition-colors group relative`}
          >
            <input 
              type="file" 
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {file ? (
              <div className="flex flex-col items-center">
                <CheckCircle2 className="text-amber-500 mb-4" size={48} />
                <h3 className="text-xl font-bold mb-2">{file.name}</h3>
                <p className="text-gray-500">Ready to upload</p>
              </div>
            ) : (
              <>
                <div className="inline-flex p-6 bg-gray-50 dark:bg-gray-800 rounded-full mb-6 group-hover:bg-amber-50 dark:group-hover:bg-amber-900/20 transition-colors">
                  <Upload className="text-gray-400 group-hover:text-amber-500" size={48} />
                </div>
                <h3 className="text-xl font-bold mb-2">Drag & Drop Photos</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Or click to browse from your computer</p>
                <div className="px-8 py-3 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-full font-bold inline-block">
                  Choose Files
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Photo Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-amber-500 focus:outline-none" 
                  placeholder="e.g. Traditional Wedding Portrait" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-amber-500 focus:outline-none appearance-none"
                >
                  <option>Wedding</option>
                  <option>Prewedding</option>
                  <option>Engagement</option>
                  <option>Birthday</option>
                  <option>Baby Shower</option>
                </select>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/10 rounded-3xl p-8 border border-amber-100 dark:border-amber-900/20">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Database className="text-amber-600" size={20} />
                Cloud Sync Details
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Cloud size={16} />
                  <span>Images stored securely on Cloudinary</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <LinkIcon size={16} />
                  <span>Public URLs generated automatically</span>
                </li>
              </ul>
              <button 
                onClick={handleUpload}
                disabled={isUploading}
                className={`w-full mt-8 py-4 ${isUploading ? 'bg-gray-400' : 'bg-amber-600 hover:bg-amber-700'} text-white rounded-2xl font-bold shadow-lg shadow-amber-900/20 transition-all flex items-center justify-center gap-2`}
              >
                {isUploading ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Uploading...
                  </>
                ) : (
                  'Start Upload & Sync'
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
