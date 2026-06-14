import AdminNavbar from '../../components/admin/AdminNavbar';
import { motion } from 'motion/react';
import { Users, Image as ImageIcon, MessageSquare, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Total Images', value: '49', icon: ImageIcon, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Enquiries', value: '12', icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Visitors Today', value: '128', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Engagement', value: '+15%', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminNavbar />
      
      <main className="flex-1 ml-20 md:ml-64 p-6 md:p-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Welcome back, Admin</h1>
          <p className="text-gray-500 dark:text-gray-400">Here's what's happening with FocusStudio today.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${stat.bg} rounded-2xl`}>
                  <stat.icon className={stat.color} size={24} />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-6">Recent Enquiries</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center font-bold text-gray-500">
                    JD
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 dark:text-white">John Doe</div>
                    <div className="text-sm text-gray-500">Wedding Enquiry • 2 hours ago</div>
                  </div>
                  <div className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full font-medium">New</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-6 bg-rose-50 dark:bg-rose-900/10 text-rose-600 rounded-3xl hover:bg-rose-100 dark:hover:bg-rose-900/20 transition-colors border border-rose-100 dark:border-rose-900/20">
                <ImageIcon size={32} className="mb-2" />
                <span className="font-bold">Add Photo</span>
              </button>
              <button className="flex flex-col items-center justify-center p-6 bg-blue-50 dark:bg-blue-900/10 text-blue-600 rounded-3xl hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors border border-blue-100 dark:border-blue-900/20">
                <Users size={32} className="mb-2" />
                <span className="font-bold">View Team</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
