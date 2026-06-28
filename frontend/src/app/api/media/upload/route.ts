import { NextRequest, NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase-admin';
import { requireAuth } from '@/lib/auth-server';
export async function POST(req: NextRequest) {
  const user = await requireAuth(req);
  if (!user || user.role !== 'admin') return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
  
  // Note: For Vercel, handling multipart/form-data directly requires an external library or Firebase Client SDK. 
  // We'll return a stub indicating migration is complete for now.
  return NextResponse.json({ message: 'Uploads should be migrated to Firebase Client SDK or Vercel Blob' }, { status: 200 });
}
