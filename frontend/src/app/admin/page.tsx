import { prisma } from '@/lib/prisma';
import { Users, FileText, BookOpen, Image as ImageIcon } from 'lucide-react';

export default async function AdminDashboard() {
  // Fetch stats
  const totalVisitors = await prisma.visitorLog.count();
  const totalBooks = await prisma.book.count();
  const totalImages = await prisma.galleryImage.count();
  
  // Most visited page
  const pageVisits = await prisma.visitorLog.groupBy({
    by: ['pageUrl'],
    _count: { pageUrl: true },
    orderBy: { _count: { pageUrl: 'desc' } },
    take: 1,
  });
  const mostVisitedPage = pageVisits.length > 0 ? pageVisits[0].pageUrl : '/';

  // Recent visitors
  const recentVisitors = await prisma.visitorLog.findMany({
    take: 5,
    orderBy: { visitedAt: 'desc' },
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Dashboard Overview</h2>
        <p className="text-slate-400 text-sm">Welcome back! Here's what's happening on your website.</p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Visitors */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <div className="text-slate-400 text-xs font-medium mb-1">Total Visitors</div>
            <div className="text-2xl font-bold text-white">{totalVisitors}</div>
          </div>
        </div>

        {/* Most Visited Page */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <div className="text-slate-400 text-xs font-medium mb-1">Most Visited Page</div>
            <div className="text-2xl font-bold text-white">{mostVisitedPage}</div>
          </div>
        </div>

        {/* Total Books */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="text-slate-400 text-xs font-medium mb-1">Total Books</div>
            <div className="text-2xl font-bold text-white">{totalBooks}</div>
          </div>
        </div>

        {/* Gallery Images */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-pink-400" />
          </div>
          <div>
            <div className="text-slate-400 text-xs font-medium mb-1">Gallery Images</div>
            <div className="text-2xl font-bold text-white">{totalImages}</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Line Chart Area (Placeholder for visual matching) */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 min-h-[300px] flex flex-col">
          <h3 className="text-white font-medium mb-6">Visitor Activity (Last 7 Days)</h3>
          <div className="flex-1 relative flex items-end">
            <div className="absolute inset-0 border-b border-slate-700/50"></div>
            {/* Simple CSS curve placeholder matching the image */}
            <div className="w-full h-full relative">
               <div className="absolute bottom-0 left-0 right-0 border-b border-slate-700 w-full z-10"></div>
               {/* Y-axis labels */}
               <div className="absolute left-0 h-full flex flex-col justify-between text-[10px] text-slate-500 pb-6">
                 <span>8</span>
                 <span>6</span>
                 <span>4</span>
                 <span>2</span>
                 <span>0</span>
               </div>
               {/* X-axis labels */}
               <div className="absolute bottom-[-20px] left-8 right-0 flex justify-between text-[10px] text-slate-500">
                 <span>Jun 22</span>
                 <span>Jun 23</span>
                 <span>Jun 24</span>
                 <span>Jun 25</span>
                 <span>Jun 26</span>
                 <span>Jun 27</span>
                 <span>Jun 28</span>
               </div>
               {/* The Curve */}
               <svg className="absolute inset-0 h-full w-full pl-6" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M 0 100 L 60 100 C 70 100, 75 20, 80 20 C 85 20, 95 100, 100 80" fill="none" stroke="#a855f7" strokeWidth="1" />
                  <path d="M 0 100 L 60 100 C 70 100, 75 20, 80 20 C 85 20, 95 100, 100 80 L 100 100 Z" fill="url(#purpleGradient)" opacity="0.3" />
                  <defs>
                    <linearGradient id="purpleGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
               </svg>
            </div>
          </div>
        </div>

        {/* Bar Chart Area */}
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 min-h-[300px] flex flex-col">
          <h3 className="text-white font-medium mb-6">Page-wise Traffic</h3>
          <div className="flex-1 relative flex items-end">
            <div className="w-full h-full relative flex items-end pl-8 pb-6">
               <div className="absolute bottom-6 left-8 right-0 border-b border-slate-700 w-full z-10"></div>
               {/* Y-axis labels */}
               <div className="absolute left-0 h-[calc(100%-24px)] flex flex-col justify-between text-[10px] text-slate-500">
                 <span>8</span>
                 <span>6</span>
                 <span>4</span>
                 <span>2</span>
                 <span>0</span>
               </div>
               {/* X-axis labels */}
               <div className="absolute bottom-0 left-8 right-0 flex justify-center text-[10px] text-slate-500">
                 <span>Home</span>
               </div>
               
               {/* The Bar */}
               <div className="w-full mx-10 h-[90%] bg-[#ec4899] rounded-t-sm z-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Visitors Table */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800">
          <h3 className="text-white font-medium">Recent Visitor Activity</h3>
        </div>
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-[#151f38] text-xs font-semibold text-slate-300">
            <tr>
              <th className="px-5 py-3 font-medium">Page</th>
              <th className="px-5 py-3 font-medium">IP Address</th>
              <th className="px-5 py-3 font-medium">Date & Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {recentVisitors.map((visitor) => (
              <tr key={visitor.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-5 py-3">{visitor.pageUrl}</td>
                <td className="px-5 py-3">{visitor.ip || 'Unknown'}</td>
                <td className="px-5 py-3">{new Date(visitor.visitedAt).toLocaleString()}</td>
              </tr>
            ))}
            {recentVisitors.length === 0 && (
              <tr>
                <td colSpan={3} className="px-5 py-8 text-center text-slate-500">
                  No visitors recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
