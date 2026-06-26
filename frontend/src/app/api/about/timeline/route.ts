import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/auth';

export async function GET() {
  const timeline = await prisma.careerTimeline.findMany({ orderBy: { year: 'asc' } });
  return NextResponse.json(timeline);
}

export async function POST(req: NextRequest) {
  try {
    const payload = authenticate(req);
    if (payload.role !== 'Super Admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    const data = await req.json();
    const timeline = await prisma.careerTimeline.create({ data });
    return NextResponse.json(timeline, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  }
}
