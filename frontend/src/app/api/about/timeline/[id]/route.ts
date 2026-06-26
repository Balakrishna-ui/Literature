import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/auth';

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const payload = authenticate(req);
    if (payload.role !== 'Super Admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    const { id } = await params;
    const data = await req.json();
    const timeline = await prisma.careerTimeline.update({ where: { id: Number(id) }, data });
    return NextResponse.json(timeline);
  } catch {
    return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const payload = authenticate(req);
    if (payload.role !== 'Super Admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    const { id } = await params;
    await prisma.careerTimeline.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: 'Timeline item deleted' });
  } catch {
    return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  }
}
