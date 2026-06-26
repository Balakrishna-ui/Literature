import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export interface JwtPayload {
  id: number;
  role: string;
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const auth = req.headers.get('authorization');
  if (auth && auth.startsWith('Bearer ')) {
    return auth.split(' ')[1] ?? null;
  }
  return null;
}

export function verifyToken(token: string): JwtPayload {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');
  return jwt.verify(token, secret) as JwtPayload;
}

export function authenticate(req: NextRequest): JwtPayload {
  const token = getTokenFromRequest(req);
  if (!token) throw new Error('No token provided');
  return verifyToken(token);
}
