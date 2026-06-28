import { NextRequest, NextResponse } from 'next/server';
import { getFirebaseDb } from '@/lib/firebase-admin';
import { requireAuth } from '@/lib/auth-server';
export async function GET() {
  let db;
  try { db = getFirebaseDb(); } catch (e) { return NextResponse.json({ message: 'Firebase not connected' }, { status: 500 }); }
  
  const snapshot = await db.collection('careerTimeline').orderBy('year', 'asc').get();
  return NextResponse.json(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
}
export async function POST(req: NextRequest) {
  let db;
  try { db = getFirebaseDb(); } catch (e) { return NextResponse.json({ message: 'Firebase not connected' }, { status: 500 }); }
  const user = await requireAuth(req);
  if (!user || user.role !== 'admin') return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  
  const body = await req.json();
  const newRef = db.collection('careerTimeline').doc();
  await newRef.set({ ...body, id: newRef.id });
  return NextResponse.json({ ...body, id: newRef.id }, { status: 201 });
}
