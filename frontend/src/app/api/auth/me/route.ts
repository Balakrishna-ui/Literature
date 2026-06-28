import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Not authorized, no token' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ message: 'Server error: JWT_SECRET not configured' }, { status: 500 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    if (!db) {
      return NextResponse.json({ message: 'Firebase not connected' }, { status: 500 });
    }
    
    const userDoc = await db.collection('users').doc(decoded.id).get();
    
    if (userDoc.exists) {
      const { password, ...userWithoutPassword } = userDoc.data() as any;
      return NextResponse.json({ id: userDoc.id, ...userWithoutPassword });
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ message: 'Not authorized, token failed' }, { status: 401 });
  }
}
