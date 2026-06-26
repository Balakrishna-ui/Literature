import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const content = await prisma.aboutContent.findMany();
  return NextResponse.json(content);
}
