'use client';

import { useEffect, useState } from 'react';
import { apiRequest } from '@/lib/api';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

interface Stats {
  totalVisitors: number;
  pageTraffic: { pageUrl: string; _count: { pageUrl: number } }[];
  recentActivity: { id: number; pageUrl: string; visitorIp: string; visitedAt: string }[];
}

interface SummaryCard {
  totalBooks: number;
  totalImages: number;
}

function StatCard({ title, value, icon, color }: { title: string; value: number | string; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-sm">{title}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [summary, setSummary] = useState<SummaryCard>({ totalBooks: 0, totalImages: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [visitorsData, booksData, imagesData] = await Promise.all([
          apiRequest('/api/visitors'),
          apiRequest('/api/books'),
          apiRequest('/api/gallery/images'),
        ]);
        setStats(visitorsData);
        setSummary({ totalBooks: booksData.length, totalImages: imagesData.length });
      } catch {
        // Stats might fail if no data yet; that's OK
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Build chart data from recentActivity (last 7 days)
  const chartData = (() => {
    if (!stats?.recentActivity) return [];
    const days: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days[d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })] = 0;
    }
    stats.recentActivity.forEach((v) => {
      const label = new Date(v.visitedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (label in days) days[label]++;
    });
    return Object.entries(days).map(([date, visitors]) => ({ date, visitors }));
  })();

  const pageChartData = stats?.pageTraffic?.slice(0, 6).map((p) => ({
    page: p.pageUrl.replace('/', '') || 'Home',
    visits: p._count.pageUrl,
  })) || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-slate-400 mt-1">Welcome back! Here&apos;s what&apos;s happening on your website.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Visitors"
          value={stats?.totalVisitors ?? 0}
          color="bg-purple-500/20"
          icon={<svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>}
        />
        <StatCard
          title="Most Visited Page"
          value={stats?.pageTraffic[0]?.pageUrl || '—'}
          color="bg-blue-500/20"
          icon={<svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>}
        />
        <StatCard
          title="Total Books"
          value={summary.totalBooks}
          color="bg-green-500/20"
          icon={<svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>}
        />
        <StatCard
          title="Gallery Images"
          value={summary.totalImages}
          color="bg-pink-500/20"
          icon={<svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Visitors Area Chart */}
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Visitor Activity (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="visitors" stroke="#a855f7" fill="url(#colorVisitors)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Page Traffic Bar Chart */}
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Page-wise Traffic</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={pageChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="page" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
              />
              <Bar dataKey="visits" fill="#ec4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4">Recent Visitor Activity</h2>
        {stats?.recentActivity && stats.recentActivity.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 text-left text-slate-400 font-medium">Page</th>
                  <th className="pb-3 text-left text-slate-400 font-medium">IP Address</th>
                  <th className="pb-3 text-left text-slate-400 font-medium">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats.recentActivity.map((v) => (
                  <tr key={v.id}>
                    <td className="py-3 text-slate-300">{v.pageUrl}</td>
                    <td className="py-3 text-slate-400 font-mono text-xs">{v.visitorIp}</td>
                    <td className="py-3 text-slate-400">{new Date(v.visitedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8">No visitor data yet. Visitors will appear here once they start browsing your website.</p>
        )}
      </div>
    </div>
  );
}
