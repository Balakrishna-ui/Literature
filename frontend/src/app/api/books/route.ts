import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    return NextResponse.json({ success: true, books });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const book = await prisma.book.create({
      data: {
        title: body.title,
        category: body.category || 'NOVEL',
        shortDescription: body.shortDescription,
        fullDescription: body.fullDescription,
        coverImage: body.coverImage,
        publishedYear: body.publishedYear,
        publisher: body.publisher,
        pages: parseInt(body.pages) || null,
        buyLink: body.buyLink,
        isFeatured: body.isFeatured || false,
        displayOrder: parseInt(body.displayOrder) || 0,
      }
    });

    return NextResponse.json({ success: true, book });
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json({ success: false, error: 'Failed to create book' }, { status: 500 });
  }
}
