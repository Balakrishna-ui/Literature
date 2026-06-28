import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { requireAuth } from '@/lib/auth-server';
export async function GET() {
  if (!db) return NextResponse.json({ message: 'Firebase not connected' }, { status: 500 });
  
  const snapshot = await db.collection('visitors').orderBy('timestamp', 'desc').get();
  const allVisitors: any[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const totalVisitors = allVisitors.length;

  const pageCounts: Record<string, number> = {};
  allVisitors.forEach(v => {
    const url = v.pageUrl || '/';
    pageCounts[url] = (pageCounts[url] || 0) + 1;
  });

  const pageTraffic = Object.entries(pageCounts)
    .map(([pageUrl, count]) => ({ pageUrl, _count: { pageUrl: count } }))
    .sort((a, b) => b._count.pageUrl - a._count.pageUrl);

  const recentActivity = allVisitors.slice(0, 50).map(v => ({
    id: v.id,
    pageUrl: v.pageUrl || '/',
    visitorIp: v.visitorIp || v.ip || 'Unknown',
    visitedAt: v.timestamp || new Date().toISOString()
  }));

  return NextResponse.json({
    totalVisitors,
    pageTraffic,
    recentActivity
  });
}
