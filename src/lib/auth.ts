import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import type { JWTPayload, User } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET!;
const TOKEN_EXPIRY = '7d';

export function generateToken(user: User): string {
	return jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): JWTPayload | null {
	try {
		return jwt.verify(token, JWT_SECRET) as JWTPayload;
	} catch {
		return null;
	}
}

export async function getAuthUser(): Promise<User | null> {
	const cookieStore = await cookies();
	const token = cookieStore.get('auth_token')?.value;

	if (!token) return null;

	const payload = verifyToken(token);
	if (!payload) return null;

	return {
		email: payload.email,
		name: payload.name,
	};
}
