import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getFirebaseDb } from './firebase-admin';

export async function requireAuth(req: NextRequest): Promise<{ id: string, role?: string, [key: string]: any } | null> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];
  
  if (!process.env.JWT_SECRET) {
    return null;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    
    
    const userDoc = await db.collection('users').doc(decoded.id).get();
    if (userDoc.exists) {
      return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    return null;
  }
}
