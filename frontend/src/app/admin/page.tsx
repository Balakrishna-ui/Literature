import { prisma } from '@/lib/prisma';
import { Users, Eye, TrendingUp, BookOpen } from 'lucide-react';

export default async function AdminDashboard() {
  // Fetch high-level stats
  const totalVisitors = await prisma.visitorLog.count();
  const totalBooks = await prisma.book.count();
  
  // Get recent visitors
  const recentVisitors = await prisma.visitorLog.findMany({
    take: 5,
    orderBy: { visitedAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Visitors</p>
              <p className="text-3xl font-bold text-gray-900">{totalVisitors}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Page Views</p>
              <p className="text-3xl font-bold text-gray-900">{totalVisitors}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Books</p>
              <p className="text-3xl font-bold text-gray-900">{totalBooks}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Growth</p>
              <p className="text-3xl font-bold text-gray-900">+12%</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-full">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Visitor Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Browser</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentVisitors.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    No visitor logs found yet.
                  </td>
                </tr>
              ) : (
                recentVisitors.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.pageUrl}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.device || 'Unknown'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.browser || 'Unknown'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.visitedAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
