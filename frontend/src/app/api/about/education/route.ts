import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/auth';

export async function GET() {
  const education = await prisma.education.findMany({ orderBy: { year: 'desc' } });
  return NextResponse.json(education);
}

export async function POST(req: NextRequest) {
  try {
    const payload = authenticate(req);
    if (payload.role !== 'Super Admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    const data = await req.json();
    const education = await prisma.education.create({ data });
    return NextResponse.json(education, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  }
}
