import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    authenticate(req);
    const totalVisitors = await prisma.visitor.count();
    const pageTraffic = await prisma.visitor.groupBy({
      by: ['pageUrl'],
      _count: { pageUrl: true },
      orderBy: { _count: { pageUrl: 'desc' } },
    });
    const recentActivity = await prisma.visitor.findMany({
      take: 10,
      orderBy: { visitedAt: 'desc' },
    });
    return NextResponse.json({ totalVisitors, pageTraffic, recentActivity });
  } catch {
    return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  }
}
