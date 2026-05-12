import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Upload, Image, LogOut, Camera } from 'lucide-react';
import { auth } from '../../../lib/firebase';
import { signOut } from 'firebase/auth';

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 h-screen w-20 md:w-64 bg-gray-900 text-white flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <Camera className="text-amber-500" size={32} />
        <span className="hidden md:block font-serif text-xl font-bold tracking-tight">
          Admin Portal
        </span>
      </div>

      <div className="flex-1 px-4 py-8 space-y-4">
        <Link 
          to="/dashboard" 
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-800 transition-colors group"
        >
          <LayoutDashboard className="text-gray-400 group-hover:text-amber-500" size={24} />
          <span className="hidden md:block font-medium">Dashboard</span>
        </Link>
        <Link 
          to="/upload" 
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-800 transition-colors group"
        >
          <Upload className="text-gray-400 group-hover:text-amber-500" size={24} />
          <span className="hidden md:block font-medium">Upload Photo</span>
        </Link>
        <Link 
          to="/gallery-manager" 
          className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-800 transition-colors group"
        >
          <Image className="text-gray-400 group-hover:text-amber-500" size={24} />
          <span className="hidden md:block font-medium">Manage Gallery</span>
        </Link>
      </div>

      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-rose-900/30 text-rose-400 transition-colors group"
        >
          <LogOut size={24} />
          <span className="hidden md:block font-medium">Logout</span>
        </button>
      </div>
    </nav>
  );
}
