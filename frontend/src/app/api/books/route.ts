import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const books = await prisma.book.findMany({ orderBy: { displayOrder: 'asc' } });
  return NextResponse.json(books);
}

export async function POST(req: NextRequest) {
  try {
    const { authenticate } = await import('@/lib/auth');
    const payload = authenticate(req);
    if (payload.role !== 'Super Admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    const data = await req.json();
    const book = await prisma.book.create({ data });
    return NextResponse.json(book, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  }
}
