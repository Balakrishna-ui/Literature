import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/firebase-admin';

const generateToken = (id: string, role: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!db) {
      return NextResponse.json({ message: 'Firebase not connected' }, { status: 500 });
    }

    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).limit(1).get();

    let user: any = null;
    let userId: string = '';

    if (snapshot.empty) {
      // Auto-seed admin user if they try to login with default credentials and DB is empty
      if ((email === 'admin@literacture.com' && password === 'admin123') || 
          (email === 'admin@example.com' && password === 'password123')) {
          const hashedPassword = await bcrypt.hash(password, 10);
          const newRef = usersRef.doc();
          user = {
              email,
              name: 'Admin',
              role: 'admin',
              password: hashedPassword
          };
          await newRef.set(user);
          userId = newRef.id;
      } else {
          return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
      }
    } else {
      const doc = snapshot.docs[0]!;
      user = doc.data();
      userId = doc.id;
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      return NextResponse.json({
        id: userId,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(userId, user.role),
      });
    } else {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: 'Server error: ' + (error.message || String(error)) }, { status: 500 });
  }
}
