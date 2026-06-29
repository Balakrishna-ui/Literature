import { prisma } from '@/lib/prisma';
import { Users, UserPlus, Calendar, Activity, Globe, Monitor } from 'lucide-react';

export default async function AnalyticsPage() {
  // Stats
  const totalVisitors = await prisma.visitorLog.count();
  
  // Unique visitors (by IP)
  const uniqueVisitors = await prisma.visitorLog.groupBy({
    by: ['ip'],
    _count: true,
  });
  
  // Date calculations
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() - 7);
  
  const thisMonth = new Date();
  thisMonth.setDate(1);

  const visitorsToday = await prisma.visitorLog.count({
    where: { visitedAt: { gte: today } }
  });

  const visitorsThisWeek = await prisma.visitorLog.count({
    where: { visitedAt: { gte: thisWeek } }
  });

  const visitorsThisMonth = await prisma.visitorLog.count({
    where: { visitedAt: { gte: thisMonth } }
  });

  const allLogs = await prisma.visitorLog.findMany({
    orderBy: { visitedAt: 'desc' },
    take: 50
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Detailed Analytics</h2>
        <p className="text-slate-400 text-sm">Comprehensive traffic and visitor data for your website.</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <div className="text-slate-400 text-xs font-medium mb-1">Total Views</div>
            <div className="text-2xl font-bold text-white">{totalVisitors}</div>
          </div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <div className="text-slate-400 text-xs font-medium mb-1">Unique Visitors</div>
            <div className="text-2xl font-bold text-white">{uniqueVisitors.length}</div>
          </div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Activity className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="text-slate-400 text-xs font-medium mb-1">Views Today</div>
            <div className="text-2xl font-bold text-white">{visitorsToday}</div>
          </div>
        </div>

        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-pink-400" />
          </div>
          <div>
            <div className="text-slate-400 text-xs font-medium mb-1">Views This Month</div>
            <div className="text-2xl font-bold text-white">{visitorsThisMonth}</div>
          </div>
        </div>
      </div>

      {/* Traffic Sources & Devices Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 min-h-[300px]">
          <h3 className="text-white font-medium mb-6">Traffic by Country</h3>
          <div className="flex items-center justify-center h-48 text-slate-500 flex-col">
            <Globe className="w-12 h-12 text-slate-700 mb-2" />
            <p className="text-sm">Not enough geographic data yet.</p>
          </div>
        </div>
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-5 min-h-[300px]">
          <h3 className="text-white font-medium mb-6">Device Types</h3>
          <div className="flex items-center justify-center h-48 text-slate-500 flex-col">
            <Monitor className="w-12 h-12 text-slate-700 mb-2" />
            <p className="text-sm">Not enough device data yet.</p>
          </div>
        </div>
      </div>

      {/* Full Visitor Log */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-white font-medium">Complete Visitor Log (Last 50)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-[#151f38] text-xs font-semibold text-slate-300">
              <tr>
                <th className="px-5 py-3 font-medium">Page URL</th>
                <th className="px-5 py-3 font-medium">IP Address</th>
                <th className="px-5 py-3 font-medium">Browser / Agent</th>
                <th className="px-5 py-3 font-medium">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {allLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-5 py-3">{log.pageUrl}</td>
                  <td className="px-5 py-3">{log.ip || 'Unknown'}</td>
                  <td className="px-5 py-3 max-w-xs truncate" title={log.userAgent || ''}>{log.userAgent || 'Unknown'}</td>
                  <td className="px-5 py-3">{new Date(log.visitedAt).toLocaleString()}</td>
                </tr>
              ))}
              {allLogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-slate-500">
                    No visitors recorded yet. Wait for someone to visit the site!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
