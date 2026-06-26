import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { authenticate } from '@/lib/auth';

type Params = { params: Promise<{ section: string }> };

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const payload = authenticate(req);
    if (payload.role !== 'Super Admin') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    const { section } = await params;
    const { content, image } = await req.json();
    const updated = await prisma.aboutContent.upsert({
      where: { sectionName: section },
      update: { content, image },
      create: { sectionName: section, content, image },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  }
}
