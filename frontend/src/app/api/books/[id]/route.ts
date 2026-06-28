import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import { requireAuth } from '@/lib/auth-server';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth(req);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    if (!db) return NextResponse.json({ message: 'Firebase not connected' }, { status: 500 });
    
    const body = await req.json();
    const resolvedParams = await params;
    const bookRef = db.collection('books').doc(resolvedParams.id);
    await bookRef.update(body);
    
    const updatedBook = (await bookRef.get()).data();
    return NextResponse.json(updatedBook);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating book' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth(req);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    if (!db) return NextResponse.json({ message: 'Firebase not connected' }, { status: 500 });
    
    const resolvedParams = await params;
    await db.collection('books').doc(resolvedParams.id).delete();
    return NextResponse.json({ message: 'Book deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting book' }, { status: 500 });
  }
}
