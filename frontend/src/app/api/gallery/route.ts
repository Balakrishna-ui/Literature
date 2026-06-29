import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Ensure default categories exist
async function ensureCategories() {
  const categories = [
    'Personal Photos',
    'Literary Events',
    'Award Ceremonies',
    'Book Launches',
    'Natakalu Images',
    'Historical Moments'
  ];

  for (const name of categories) {
    const existing = await prisma.galleryCategory.findUnique({
      where: { name }
    });
    if (!existing) {
      await prisma.galleryCategory.create({
        data: { name }
      });
    }
  }
}

export async function GET(request: Request) {
  try {
    await ensureCategories();
    
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    const categories = await prisma.galleryCategory.findMany({
      orderBy: { name: 'asc' }
    });

    const where = categoryId ? { categoryId } : {};

    const images = await prisma.galleryImage.findMany({
      where,
      include: { category: true },
      orderBy: [
        { displayOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json({ success: true, categories, images });
  } catch (error) {
    console.error('Failed to fetch gallery', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Check if categoryId is provided
    let { categoryId } = data;
    
    if (!categoryId && data.categoryName) {
      const category = await prisma.galleryCategory.findUnique({ where: { name: data.categoryName }});
      if (category) categoryId = category.id;
    }

    if (!categoryId) {
       return NextResponse.json({ success: false, error: 'Category ID is required' }, { status: 400 });
    }

    const image = await prisma.galleryImage.create({
      data: {
        url: data.url,
        title: data.title || '',
        description: data.description || '',
        categoryId: categoryId,
        isFeatured: data.isFeatured || false,
        displayOrder: parseInt(data.displayOrder) || 0,
      },
      include: { category: true }
    });

    return NextResponse.json({ success: true, image });
  } catch (error) {
    console.error('Failed to add gallery image', error);
    return NextResponse.json({ success: false, error: 'Failed to add gallery image' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;
    
    if (updateData.displayOrder) {
        updateData.displayOrder = parseInt(updateData.displayOrder);
    }

    const image = await prisma.galleryImage.update({
      where: { id },
      data: updateData,
      include: { category: true }
    });

    return NextResponse.json({ success: true, image });
  } catch (error) {
    console.error('Failed to update gallery image', error);
    return NextResponse.json({ success: false, error: 'Failed to update gallery image' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    await prisma.galleryImage.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete gallery image', error);
    return NextResponse.json({ success: false, error: 'Failed to delete gallery image' }, { status: 500 });
  }
}
