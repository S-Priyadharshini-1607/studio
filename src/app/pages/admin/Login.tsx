import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { motion } from 'motion/react';
import { Lock, Mail, Camera } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-700"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-amber-500/10 rounded-3xl mb-6">
            <Camera className="text-amber-500" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 font-serif">Admin Access</h1>
          <p className="text-gray-400">Please sign in to manage your studio</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 text-white pl-12 pr-4 py-4 rounded-2xl focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="admin@focusstudio.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 text-white pl-12 pr-4 py-4 rounded-2xl focus:border-amber-500 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-2xl transition-all transform active:scale-[0.98] shadow-lg shadow-amber-900/20"
          >
            Sign In
          </button>
        </form>

        <div className="mt-10 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-white text-sm transition-colors"
          >
            ← Back to Public Website
          </button>
        </div>
      </motion.div>
    </div>
  );
}
