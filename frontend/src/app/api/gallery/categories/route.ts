import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { requireAuth } from '@/lib/auth-server';
export async function GET() {
  if (!db) return NextResponse.json({ message: 'Firebase not connected' }, { status: 500 });
  const snapshot = await db.collection('galleryCategories').get();
  return NextResponse.json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
}
export async function POST(req: NextRequest) {
  const user = await requireAuth(req);
  if (!user || user.role !== 'admin') return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  if (!db) return NextResponse.json({ message: 'Firebase not connected' }, { status: 500 });
  const body = await req.json();
  const newRef = db.collection('galleryCategories').doc();
  await newRef.set({ name: body.name, id: newRef.id });
  return NextResponse.json({ name: body.name, id: newRef.id }, { status: 201 });
}
