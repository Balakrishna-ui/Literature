import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Track a visitor (public)
export async function POST(req: NextRequest) {
  try {
    const { pageUrl, visitorIp } = await req.json();
    const ip = visitorIp || req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Unknown';
    const visitor = await prisma.visitor.create({
      data: { pageUrl, visitorIp: ip },
    });
    return NextResponse.json(visitor, { status: 201 });
  } catch (err) {
    console.error('[Visitor Track Error]', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
