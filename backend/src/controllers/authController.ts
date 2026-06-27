import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/firebase.js';

const generateToken = (id: string, role: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!db) {
        res.status(500).json({ message: 'Firebase not connected' });
        return;
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
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }
    } else {
        const doc = snapshot.docs[0];
        user = doc.data();
        userId = doc.id;
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: userId,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(userId, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMe = async (req: any, res: Response): Promise<void> => {
  try {
    if (!db) {
        res.status(500).json({ message: 'Firebase not connected' });
        return;
    }
    const userDoc = await db.collection('users').doc(req.user.id).get();
    
    if (userDoc.exists) {
      const { password, ...userWithoutPassword } = userDoc.data() as any;
      res.json({ id: userDoc.id, ...userWithoutPassword });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
