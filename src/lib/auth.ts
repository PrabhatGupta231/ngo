import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret';

export async function signToken(payload: any) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
}

export async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_session')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    return null;
  }
}
