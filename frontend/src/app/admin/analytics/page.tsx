'use client';

import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

interface Visitor {
  id: number;
  pageUrl: string;
  visitorIp: string;
  visitedAt: string;
}

interface PageTraffic {
  pageUrl: string;
  _count: { pageUrl: number };
}

interface Stats {
  totalVisitors: number;
  pageTraffic: PageTraffic[];
  recentActivity: Visitor[];
}

const COLORS = ['#a855f7', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'7' | '30'>('7');

  useEffect(() => {
    apiRequest('/api/visitors/stats')
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const buildDailyData = (days: number) => {
    if (!stats?.recentActivity) return [];
    const dayMap: Record<string, number> = {};
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dayMap[d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })] = 0;
    }
    stats.recentActivity.forEach((v) => {
      const label = new Date(v.visitedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (label in dayMap) dayMap[label]++;
    });
    return Object.entries(dayMap).map(([date, visitors]) => ({ date, visitors }));
  };

  const chartData = buildDailyData(Number(period));

  const pieData = stats?.pageTraffic.slice(0, 6).map((p, i) => ({
    name: p.pageUrl.replace('/', '') || 'Home',
    value: p._count.pageUrl,
    color: COLORS[i % COLORS.length],
  })) || [];

  const pageBarData = stats?.pageTraffic.slice(0, 8).map((p) => ({
    page: (p.pageUrl.replace('/', '') || 'Home').substring(0, 12),
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
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Visitor Analytics</h1>
          <p className="text-slate-400 mt-1">Track your website traffic and audience</p>
        </div>
        <div className="flex gap-2">
          {(['7', '30'] as const).map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${period === p ? 'bg-purple-600 text-white' : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'}`}>
              Last {p} days
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">Total Page Views</p>
          <p className="text-3xl font-bold text-white mt-1">{stats?.totalVisitors ?? 0}</p>
          <p className="text-slate-500 text-xs mt-1">All time</p>
        </div>
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">Pages Tracked</p>
          <p className="text-3xl font-bold text-white mt-1">{stats?.pageTraffic.length ?? 0}</p>
          <p className="text-slate-500 text-xs mt-1">Unique pages</p>
        </div>
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5">
          <p className="text-slate-400 text-sm">Top Page</p>
          <p className="text-xl font-bold text-white mt-1">{stats?.pageTraffic[0]?.pageUrl || '—'}</p>
          <p className="text-slate-500 text-xs mt-1">{stats?.pageTraffic[0]?._count.pageUrl ?? 0} visits</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Daily Visitors (Last {period} days)</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              <Area type="monotone" dataKey="visitors" stroke="#a855f7" fill="url(#grad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Traffic by Page</h2>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                  {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-48 text-slate-500">No traffic data yet</div>
          )}
        </div>
      </div>

      {/* Page Bar Chart */}
      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4">Page-wise Visit Count</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={pageBarData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="page" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} />
            <Bar dataKey="visits" radius={[4, 4, 0, 0]}>
              {pageBarData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Visitors Table */}
      <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4">Recent Visitor Activity</h2>
        {stats?.recentActivity && stats.recentActivity.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 text-left text-slate-400 font-medium">#</th>
                  <th className="pb-3 text-left text-slate-400 font-medium">Page</th>
                  <th className="pb-3 text-left text-slate-400 font-medium">IP Address</th>
                  <th className="pb-3 text-left text-slate-400 font-medium">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats.recentActivity.map((v, i) => (
                  <tr key={v.id} className="hover:bg-white/5">
                    <td className="py-3 text-slate-500 text-xs">{i + 1}</td>
                    <td className="py-3 text-slate-300">{v.pageUrl}</td>
                    <td className="py-3 text-slate-400 font-mono text-xs">{v.visitorIp}</td>
                    <td className="py-3 text-slate-400">{new Date(v.visitedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8">
            No visitor data yet. Once visitors browse your website, their activity will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
