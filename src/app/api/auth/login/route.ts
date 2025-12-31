import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { generateToken } from '@/lib/auth';
import { getApprovedEmails } from '@/types';

export async function POST(request: NextRequest) {
	try {
		const { email, password, rememberMe } = await request.json();
		const normalizedEmail = email.toLowerCase().trim();

		// Check if email is approved
		const approvedEmails = getApprovedEmails();
		const userName = approvedEmails[normalizedEmail];

		if (!userName) {
			return NextResponse.json({ success: false, error: 'Email not authorized' }, { status: 403 });
		}

		// Check password
		if (password !== process.env.AUTH_PASSWORD) {
			return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
		}

		// Generate token and set cookie
		const user = { email: normalizedEmail, name: userName };
		const token = generateToken(user);

		const cookieStore = await cookies();

		const cookieOptions = {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax' as const,
			path: '/',
		};

		// Session cookie (no maxAge) vs persistent cookie
		if (rememberMe) {
			console.log('Setting persistent cookie (7 days)');
			cookieStore.set('auth_token', token, {
				...cookieOptions,
				maxAge: 60 * 60 * 24 * 7,
			});
		} else {
			console.log('Setting session cookie (no maxAge)');
			cookieStore.set('auth_token', token, cookieOptions);
		}

		return NextResponse.json({ success: true, user });
	} catch (error) {
		console.error('Login error:', error);
		return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
	}
}
