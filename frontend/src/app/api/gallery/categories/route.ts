import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const categories = await prisma.galleryCategory.findMany({ include: { images: true } });
  return NextResponse.json(categories);
}
