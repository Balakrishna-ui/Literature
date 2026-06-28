import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { requireAuth } from '@/lib/auth-server';

export async function GET() {
  try {
    if (!db) return NextResponse.json({ message: 'Firebase not connected' }, { status: 500 });
    const snapshot = await db.collection('aboutContent').get();
    const content = snapshot.docs.map(doc => ({ sectionName: doc.id, ...doc.data() }));
    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching content' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    if (!user || user.role !== 'admin') return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    if (!db) return NextResponse.json({ message: 'Firebase not connected' }, { status: 500 });
    
    const body = await req.json();
    const sectionName = body.sectionName || 'general';
    const sectionRef = db.collection('aboutContent').doc(sectionName);
    await sectionRef.set({ content: body.content, image: body.image }, { merge: true });
    
    return NextResponse.json({ sectionName, ...body });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating content' }, { status: 500 });
  }
}
