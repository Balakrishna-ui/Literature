import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getFirebaseDb } from '@/lib/firebase-admin';

const generateToken = (id: string, role: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export async function POST(req: NextRequest) {
  try {
    console.log('[Login API] Request received');
    
    // Validate request body
    const body = await req.json();
    const { email, password } = body;
    
    if (!email || !password) {
      console.warn('[Login API] Missing email or password in request body');
      return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
    }

    console.log(`[Login API] Processing login for email: ${email}`);
    
    // Initialize Database
    let db;
    try {
      db = getFirebaseDb();
      console.log('[Login API] Firebase Admin DB connected successfully');
    } catch (err: any) {
      console.error('[Login API] Firebase Initialization Error:', err.message);
      return NextResponse.json({ success: false, message: 'Firebase connection failed: ' + err.message }, { status: 500 });
    }

    // Query Firestore
    console.log('[Login API] Querying Firestore for user...');
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).limit(1).get();

    let user: any = null;
    let userId: string = '';

    if (snapshot.empty) {
      console.log('[Login API] User not found in database');
      
      // Auto-seed ONLY for the official admin account
      if (email === 'admin@literacture.com' && password === 'admin123') {
          console.log('[Login API] Auto-seeding default admin account...');
          const hashedPassword = await bcrypt.hash(password, 10);
          const newRef = usersRef.doc();
          user = {
              email,
              name: 'Administrator',
              role: 'admin',
              password: hashedPassword,
              createdAt: new Date().toISOString()
          };
          await newRef.set(user);
          userId = newRef.id;
          console.log('[Login API] Auto-seed complete');
      } else {
        console.warn(`[Login API] Invalid credentials for ${email}`);
        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
      }
    } else {
      console.log('[Login API] User found, validating password...');
      const userDoc = snapshot.docs[0];
      user = userDoc.data();
      userId = userDoc.id;
    }

    // Password Validation
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.warn(`[Login API] Password validation failed for ${email}`);
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    console.log('[Login API] Password valid, generating token...');
    
    // Generate Token
    let token = '';
    try {
      token = generateToken(userId, user.role);
    } catch (err: any) {
      console.error('[Login API] Token Generation Error:', err.message);
      return NextResponse.json({ success: false, message: 'Token generation failed: ' + err.message }, { status: 500 });
    }

    console.log('[Login API] Login successful');
    return NextResponse.json({
      success: true,
      id: userId,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    }, { status: 200 });

  } catch (error: any) {
    console.error('[Login API] Unhandled Server Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Server error: ' + (error.message || String(error)) 
    }, { status: 500 });
  }
}
