import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { requireAuth } from '@/lib/auth-server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!db) return NextResponse.json({ message: 'Firebase not connected' }, { status: 500 });
  const snapshot = await db.collection('galleryImages').orderBy('createdAt', 'desc').get();
  return NextResponse.json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
}
