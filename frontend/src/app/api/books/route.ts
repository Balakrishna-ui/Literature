import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { requireAuth } from '@/lib/auth-server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    if (!db) return NextResponse.json({ message: 'Firebase not connected' }, { status: 500 });
    const snapshot = await db.collection('books').orderBy('displayOrder', 'asc').get();
    const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching books' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    if (!db) return NextResponse.json({ message: 'Firebase not connected' }, { status: 500 });
    
    const body = await req.json();
    const newRef = db.collection('books').doc();
    const newBook = { ...body, id: newRef.id };
    await newRef.set(newBook);
    
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating book' }, { status: 500 });
  }
}
