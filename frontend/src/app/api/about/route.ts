import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    let about = await prisma.aboutContent.findFirst();

    if (!about) {
      // Create a default if none exists
      about = await prisma.aboutContent.create({
        data: {
          authorName: 'Author Name',
        }
      });
    }

    return NextResponse.json({ success: true, about });
  } catch (error) {
    console.error('Failed to fetch about content', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch about content' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing ID' }, { status: 400 });
    }

    const updated = await prisma.aboutContent.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, about: updated });
  } catch (error) {
    console.error('Failed to update about content', error);
    return NextResponse.json({ success: false, error: 'Failed to update about content' }, { status: 500 });
  }
}
